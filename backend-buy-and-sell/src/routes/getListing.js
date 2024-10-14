import { db } from "../database";

export const getListingRoute = {
    method: 'GET', 
    path: '/api/listings/{id}', 
    handler: async (request, h) => {
        console.log("Backend is being reached!")
        const id = request.params.id;
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM listings WHERE id=?", [id], (err, rows)=>{
                if (err) {
                    console.log('Database error:', err.message);
                    reject(h.response({ error: err.message })
                    .header('Access-Control-Allow-Origin', 'https://upgraded-space-fortnight-q9qq5gw9479c9q7x-4200.app.github.dev')
                    .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                    .header('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization')
                    .code(500));
                } else {
                    console.log('Database query successful:', rows);
                    resolve(h.response(rows)
                    .header('Access-Control-Allow-Origin', 'https://upgraded-space-fortnight-q9qq5gw9479c9q7x-4200.app.github.dev')
                    .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                    .header('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization')
                    .code(200));
                }
            });
        }).catch(error => {
            console.log('Promise error:', error);
            return h.response({ error: 'Internal Server Error' })
            .header('Access-Control-Allow-Origin', 'https://upgraded-space-fortnight-q9qq5gw9479c9q7x-4200.app.github.dev')
            .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            .header('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization')
            .code(500);
        });
    } 
}