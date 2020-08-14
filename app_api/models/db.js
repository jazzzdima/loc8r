const mongoose = require('mongoose');
//const credentials = require('../../credentials');
const readline = require('readline');

let connectionDbString;
if (process.env.NODE_ENV === 'production') {
	connectionDbString = process.env.MONGODB_PROD_URI;
} else {
	connectionDbString = process.env.MONGODB_DEV_URI;
}

mongoose.connect(
	connectionDbString, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

mongoose.connection
	.on('open', () => {
		console.log('Mongoose connection open');
	})
	.on('error', err => {
		console.log(`Mongoose connection error ${err.message}`);
	})
	.on('disconnected', () => {
		console.log('Mongoose disconnected');	
	});

let grasefoolShutdown = function(msg, callback){
	mongoose.connection.close(() => {
		console.log('Mongoose disconnected throught ' + msg);
		callback();
	})
};

if (process.platform === 'win32'){
	let rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.on('SIGINT', () => {
		process.emit('SIGINT');
	});
}

process.once('SIGUSR2', () => {
	grasefoolShutdown('Nodemon restart', () => {
		process.kill(process.pid, 'SIGUSR2');
	});
});

process.on('SIGINT', () => {
	grasefoolShutdown('App termination', () => {
		process.exit(0);
	});
});

process.on('SIGTERM', () => {
	grasefoolShutdown('Heroku app shutdown', () => {
		process.exit(0);
	});
});

