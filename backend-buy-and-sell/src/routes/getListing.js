import { db } from "../database";

export const getListingRoute = {
    method: 'GET', 
    path: '/api/listings/{id}', 
    handler: async (request, h) => {
        console.log("Backend is being reached!")
        const id = request.params.id.replace(/["']/g, "");
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM listings WHERE id=?", [id], (err, rows)=>{
                if (err) {
                    console.log('Database error:', err.message);
                    reject(h.response({ error: err.message })
                    .code(500));
                } else {
                    console.log('Database query successful:', rows);
                    resolve(h.response(rows)
                    .code(200));
                }
            });
        }).catch(error => {
            console.log('Promise error:', error);
            return h.response({ error: 'Internal Server Error' })
            .code(500);
        });
    } 
}