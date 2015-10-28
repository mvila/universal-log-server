# UniversalLogServer [![Build Status](https://travis-ci.org/mvila/universal-log-server.svg?branch=master)](https://travis-ci.org/mvila/universal-log-server)

Server for UniversalLog remote output.

## Installation

```
npm install --save universal-log-server
```

## Example

```
import http from 'http';
import koa from 'koa';
import UniversalLog from 'universal-log';
import UniversalLogServer from 'universal-log-server';

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
```

## License

MIT
