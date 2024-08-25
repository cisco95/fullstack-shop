import { db } from "../database";

export const getUserListingsRoute ={
    method: 'GET',
    path: '/api/users/{userId}/listings', //curl -v http://localhost:8000/api/users/12345/listings
    handler: async (req, h) => {
        const userId = req.params.userId;
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