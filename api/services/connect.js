const mongoose = require('mongoose');
//	, Admin = mongoose.mongo.Admin;
const connections = {};

exports.getDatabaseConnection = function(dbName) {
    if(connections[dbName]) {
        //database connection already exist. Return connection object
        return connections[dbName];
    } else {

        connections[dbName] = mongoose.createConnection('mongodb://177.92.18.238:6969/dentalQI_'+ dbName,{
            useMongoClient: true,
            poolSize: 100,
            socketTimeoutMS: 999999,
            keepAlive: true,
            connectTimeoutMS: 999999 
        });

/*		connections[dbName].on('open', function() {
		    // connection established
		    new Admin(connections[dbName].db).listDatabases(function(err, result) {
		        console.log(result.databases);
		        // database list stored in result.databases
		        var allDatabases = result.databases;    
		    });
		});*/

        return connections[dbName];
    }
}