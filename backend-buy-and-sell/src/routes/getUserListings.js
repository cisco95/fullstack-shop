import * as admin from 'firebase-admin';
import { db } from "../database";
import Boom from '@hapi/boom';


export const getUserListingsRoute = {
    method: 'GET', 
    path: '/api/users/{userId}/listings',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token);
        const userId = req.params.userId;
        console.log(userId);
        if (user.user_id !== userId) throw Boom.unauthorized('User can only access their own listings.');
        console.log(`Route /api/users/${userId}/listings reached, connecting to DB`)
        const { results } = await db.query(
            'SELECT * FROM listings WHERE user_id=?', 
            [userId],
        )
        console.log(results);
        return results;
    }
}


/*
export const getUserListingsRoute ={
    method: 'GET',
    path: '/api/users/{userId}/listings', //curl -v http://localhost:8000/api/users/12345/listings
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token);
        const userId = req.params.userId;
        if (user.user_id !== userId) throw Boom.unauthorized('Users can only access their own listings. ')
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM listings WHERE user_id=?", [userId], (err, rows)=>{
                if (err) {
                    console.error('Database error:', err.message);
                    reject(h.response({error: err.message}).code(500));
                } else {
                    console.log('Database query successful:', rows);
                    resolve(h.response(rows).code(200));
                }
            });
        }).catch(error => {
            console.error('Promise error:', error);
            return h.response({error: 'Internal Server Error'}).code(500);
        });
    }
}

*/