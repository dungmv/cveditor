// server.js
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 8800
const app = next({ dev })
const handle = app.getRequestHandler()

const templateRouter = require('./api/templates');
const authRouter = require('./api/auth');

app.prepare().then(() => {
  const server = express()

  server.get('/api/templates/:id', templateRouter.get);
  server.post('/api/templates', templateRouter.create);
  server.post('/api/auth', authRouter.login);

  server.get('/', (req, res) => {
    return app.render(req, res, '/index', req.query)
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
