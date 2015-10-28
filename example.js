'use strict';

// ./node_modules/.bin/babel-node --harmony example.js

import http from 'http';
import koa from 'koa';
import UniversalLog from 'universal-log';
import UniversalLogServer from './src';

const PORT = 8888;
const PREFIX = '/v1';

let log = new UniversalLog();
let logServer = new UniversalLogServer(log);
let server = koa();
server.use(logServer.getMiddleware(PREFIX));
let httpServer = http.createServer(server.callback());
httpServer.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});
