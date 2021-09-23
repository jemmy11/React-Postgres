const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Task App'));

app.listen(port, () => console.log(`task-app listening on port ${port}!`));


const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://task:123456@localhost:5432/task-app') // Example for postgres

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
