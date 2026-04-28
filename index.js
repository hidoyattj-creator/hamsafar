const http = require('http');

const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 3000);

const routes = {
  '/': {
    service: 'hamsafar',
    message: 'Intercity rides service for Tajikistan',
    status: 'ok',
  },
  '/health': {
    status: 'ok',
  },
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || host}`);
  const payload = routes[url.pathname];

  if (!payload) {
    response.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
});

server.listen(port, host, () => {
  console.log(`hamsafar service listening on http://${host}:${port}`);
});
