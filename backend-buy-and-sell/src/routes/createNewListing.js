import {v4 as uuid} from 'uuid';
import { db } from '../database';


export const createNewListingRoute ={
    method: 'POST',
    /* curl -X POST -H "Content-Type: application/json" -d '{"name": "AC", "description": "an AC unit", "price": 100}' http://localhost:8000/api/listings */
    path: '/api/listings', 
    handler: async (req, h) =>{
        const id = uuid();
        const {name = '', description = '', price = 0} = req.payload;
        const userId = '12345';
        const views = 0;

        new Promise((resolve, reject) => {
            db.run(`INSERT INTO listings(id, name, description, price, user_id, views)
                VALUES(?, ?, ?, ?, ?, ?)`, 
                [id, name, description, price, userId, views ],
                (err, rows) => {
                    if (err) {
                        console.error('Database error:', err.message);
                        reject(h.response({error: err.message}).code(500));
                    } else {
                        console.log('Database query successful:', rows);
                        resolve(h.response(rows).code(200));
                    }
                }
            );
            
        })

        return {id, name, description, price, user_id: userId, views};
    }
}