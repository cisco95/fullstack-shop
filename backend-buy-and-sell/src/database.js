import mysql from 'mysql'

let connection;

export const db = {
    connect: () => {
        connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            connectTimeout: 20000
        });
        connection.connect((err) => {
            if (err) {
                console.error('Error connecting to the database:', err);
                process.exit(1); // Exit the process if the connection fails
            } else {
                console.log('Connected to the database');
            }
        });
    },
    query: (queryString, escapedValues) =>
        new Promise((resolve, reject) => {
            connection.query(queryString, escapedValues, (error, results, fields) => {
                if (error) reject(error);
                resolve({results, fields});
            });
        }),
    end: () => connection.end(),
};








