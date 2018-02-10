var mongoose = require('mongoose');
require('./navbars');
require('./ayat');

var dbURI = {
    production: process.env.MLAB_URI,
    development: "mongodb://localhost/estihgagat",
    get: function(){
        if(process.env.NODE_ENV === 'production')
        {
            return this.production;
        }
        return this.development;
    }
};

mongoose.connect(dbURI.get());

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI.get());
});

mongoose.connection.on('error',function (err) {
console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
console.log('Mongoose disconnected');
});

/* Closing mongoDB connection at app termination */
var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () 
    {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

process.once('SIGUSR2', function () 
{
    gracefulShutdown('nodemon restart', function () 
    {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function () 
{
    gracefulShutdown('app termination', function () 
    {
        process.exit(0);
    });
});

process.on('SIGTERM', function() 
{
    gracefulShutdown('Heroku app shutdown', function () 
    {
        process.exit(0);
    });
});
