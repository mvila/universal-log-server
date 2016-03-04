'use strict';

import parseBody from 'co-body';

export class UniversalLogServer {
  constructor(log) {
    if (!log) throw new Error('\'log\' parameter is missing');
    this.log = log;
  }

  getMiddleware(prefix) {
    if (!prefix) prefix = '';
    if (prefix.endsWith('/')) prefix = prefix.slice(0, -1);
    let that = this;
    return function *(next) {
      let path = this.path;

      if (prefix) {
        if (!path.startsWith(prefix)) return yield next;
        path = path.substr(prefix.length);
      }

      if (!(this.method === 'POST' && path === '/logs')) return yield next;

      let body = yield parseBody.json(this);
      that.log.dispatch(
        body.logName, body.hostName, body.level, body.message
      );
      this.status = 204;
      this.logLevel = 'silence';

      return undefined;
    };
  }
}

export default UniversalLogServer;
