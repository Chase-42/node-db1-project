const express = require('express');

const server = express();

const accountRouter = require('./accounts/accountsRouter.js');

server.use(express.json());
server.use('/api/accounts', accountRouter);

server.get('/', (req, res) => {
  res.send('<h2> Welcome to node-db1-project server! <h3>');
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: 'Something went wrong 🙁'
  });
});

module.exports = server;
