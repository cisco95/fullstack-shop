import {v4 as uuid} from 'uuid';
import { db } from '../database';
import * as admin from 'firebase-admin';


export const createNewListingRoute = {
    method: 'POST',
    path: '/api/listings',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token);
        const id = uuid();
        const {name = '', description = "", price = 0} = req.payload;
        const userId = user.user_id;
        const views = 0;
        console.log(`Route /api/listings/ for POST has been reached, connecting to DB`)
        await db.query(
            `INSER INTO listings(id, name, description, price, user_id, views) 
            VALUES(?, ?, ?, ?, ?, ?)`,
            [id, name, description, price, userId, views],
        )
        console.log("DB updated successfully, new item added.")

        return {id, name, description, price, user_id: userId, views};
    }
}




// export const createNewListingRoute ={
//     method: 'POST',
//     /* curl -X POST -H "Content-Type: application/json" -d '{"name": "AC", "description": "an AC unit", "price": 100}' http://localhost:8000/api/listings */
//     path: '/api/listings', 
//     handler: async (req, h) =>{
//         const token = req.headers.authtoken;
//         const user = await admin.auth().verifyIdToken(token);
//         const id = uuid();
//         const {name = '', description = '', price = 0} = req.payload;
//         const userId = user.user_id;
//         const views = 0;
        
//         new Promise((resolve, reject) => {
//             db.run(`INSERT INTO listings(id, name, description, price, user_id, views)
//                 VALUES(?, ?, ?, ?, ?, ?)`, 
//                 [id, name, description, price, userId, views ],
//                 (err, rows) => {
//                     if (err) {
//                         console.error('Database error:', err.message);
//                         reject(h.response({error: err.message}).code(500));
//                     } else {
//                         console.log('Database query successful:', rows);
//                         resolve(h.response(rows).code(200));
//                     }
//                 }
//             );
            
//         })
        
//         return {id, name, description, price, user_id: userId, views};
//     }
// }
