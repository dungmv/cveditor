// server.js
const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 8800
const app = next({ dev })
const handle = app.getRequestHandler()

const templateRouter = require('./api/templates');
const authRouter = require('./api/auth');
const profileRouter = require('./api/profile');

app.prepare().then(() => {
  const server = express();

  // parse application/x-www-form-urlencoded
  server.use(cookieParser());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({extended: true}));
  server.get('/api/templates/:id', templateRouter.get);
  server.post('/api/templates', templateRouter.create);
  server.post('/api/auth', authRouter.login);
  server.get('/api/profiles/:id', profileRouter.get);
  server.put('/api/profiles/:id', profileRouter.update);

  server.get('/', (req, res) => {
    return app.render(req, res, '/index', req.query)
  })

  server.get('/cvex/:id', (req, res) => {
    return app.render(req, res, '/cvex', {id: req.params.id});
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
