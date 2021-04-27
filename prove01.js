const http = require("http");
const { handler } = require("./prove01-routes");
const routes = require('./prove01-routes');

const server = http.createServer(routes.handler);

server.listen(3000);