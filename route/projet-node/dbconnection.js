const mysql = require('mysql');

var dbconnection = mysql.createConnection({
    port : 3306,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'stage'
});

dbconnection.connect((erreur) => {
    if (!erreur) {
        console.log('connecter');
    }
    else {
        console.log(erreur);
    }
});

module.exports = dbconnection;