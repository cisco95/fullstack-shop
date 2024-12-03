import mysql from 'mysql'
import { KEYS } from '../KEYS.js'

const connection = mysql.createConnection({
    host: KEYS.HOST,
    user: KEYS.USER,
    password: KEYS.PASSWORD,
    database: 'buy-and-sell',
    connectTimeout: 20000

});

export const db = {
    connect: () => connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            process.exit(1); // Exit the process if the connection fails
        } else {
            console.log('Connected to the database');
        }
    }),
    query: (queryString, escapedValues) =>
        new Promise((resolve, reject) => {
            connection.query(queryString, escapedValues, (error, results, fields) => {
                if (error) reject(error);
                resolve({results, fields});
            });
        }),
    end: () => connection.end(),
};








