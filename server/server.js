const jsonServer = require('json-server');
const path = require('path')
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
  static: './build'
});

const PORT = process.env.PORT || 3000;

server.use(middlewares);
server.use(jsonServer.rewriter({
  "/api/films/:slug": "/api/films?slug=:slug&_expand=category&_embed=comments",
  '/api/*': '/$1',
}))
server.use(router);

server.listen(PORT, () => {
  console.log('Server is running');
});