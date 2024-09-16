// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.deezer.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Strip the /api prefix when forwarding to the Deezer API
      },
    })
  );
};
