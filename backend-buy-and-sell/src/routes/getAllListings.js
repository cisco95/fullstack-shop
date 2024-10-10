import { db } from "../database";

export const getAllListingsRoute = {
    method: 'GET',
    path: '/api/listings',
    handler: async (request, h) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM listings", [], (err, rows) => {
                if (err) {
                    console.error('Database error:', err.message);
                    reject(h.response({ error: err.message }).code(500));
                } else {
                    console.log('Database query successful:', rows);
                    resolve(h.response(rows).code(200).header('X-Custom-Header', 'Successful Call!'));
                }
            });
        }).catch(error => {
            console.error('Promise error:', error);
            return h.response({ error: 'Internal Server Error' }).code(500);
        });
    }
};
