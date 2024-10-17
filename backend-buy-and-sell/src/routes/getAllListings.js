import { db } from "../database";

export const getAllListingsRoute = {
    method: 'GET',
    path: '/api/listings',
    handler: async (request, h) => {
        console.log("This has reached the server/DB using getAllListings")
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM listings", [], (err, rows) => {
                if (err) {
                    console.error('Database error:', err.message);
                    reject(h.response({ error: err.message })
                    .header('Access-Control-Allow-Origin', 'https://upgraded-space-fortnight-q9qq5gw9479c9q7x-4200.app.github.dev')
                    .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                    .header('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization')
                    .code(500));
                } else {
                    console.log('"getAllListings" successful:', rows);
                    resolve(h.response(rows)
                    .header('Access-Control-Allow-Origin', 'https://upgraded-space-fortnight-q9qq5gw9479c9q7x-4200.app.github.dev')
                    .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                    .header('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization')
                    .code(200));
                }
            });
        }).catch(error => {
            console.error('Promise error:', error);
            return h.response({ error: 'Internal Server Error' })
            .header('Access-Control-Allow-Origin', 'https://upgraded-space-fortnight-q9qq5gw9479c9q7x-4200.app.github.dev')
            .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            .header('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization')
            .code(500);
        });
    }
};
