const Sequelize = require('sequelize');
let count = 0;

const options = {
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true
    
};

const sequelize = new Sequelize('postgres://task:123456@localhost:5432/task-app') // Example for postgres

const connectWithRetry = () => {
    console.log('PostgreSQL connection with retry')
    sequelize.authenticate()
		.then(() => {
		console.log('Connection has been established successfully.');
	  })
	  .catch(err => {
        console.log('PostgreSQL connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000)
	  });
};

connectWithRetry();

exports.sequelize = sequelize;
