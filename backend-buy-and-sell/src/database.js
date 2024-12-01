import mysql from 'mysql'
import { KEYS } from '../KEYS.js'

console.log(KEYS)

const connection = mysql.createConnection({
    host: KEYS.HOST,
    user: KEYS.USER,
    password: KEYS.PASSWORD,
    database: 'buy-and-sell'
});

export const db = {
    connect: () => connection.connect(), 
    query: (queryString, escapedValues) =>
        new Promise((resolve, reject) => {
            connection.query(queryString, escapedValues, (error, results, fields) => {
                if (error) reject(error);
                resolve({results, fields});
            })
        }),
    end: () => connection.end(),
}







