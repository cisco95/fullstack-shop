import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./db/buy-sell-db.db', (err) =>{
    if (err) {
        console.log(err.message);
    }
    console.log('Connected to the database')
})

/*
//This also works, but uses an absolute path. 

import sqlite3 from 'sqlite3';
import path from 'path'

const dbPath = path.resolve(__dirname, '../db/buy-sell-db.db');

export const db = new sqlite3.Database(dbPath, (err) =>{
    if (err) {
        console.log(err.message);
    } else {
        console.log('Connected to the database')
    }
}) */