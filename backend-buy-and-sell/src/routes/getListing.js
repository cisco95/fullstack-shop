import { db } from "../database";

export const getListingRoute = {
    method: "GET", 
    path: '/api/listings/{id}', 
    handler: async (req, h) => {
        const id = req.params.id;
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM listings WHERE id=?", [id], (err, rows)=>{
                if (err) {
                    console.error('Database error:', err.message);
                    reject(h.response({ error: err.message }).code(500));
                } else {
                    console.log('Database query successful:', rows);
                    resolve(h.response(rows).code(200));
                }
            });
        }).catch(error => {
            console.error('Promise error:', error);
            return h.response({ error: 'Internal Server Error' }).code(500);
        });
    } 
}