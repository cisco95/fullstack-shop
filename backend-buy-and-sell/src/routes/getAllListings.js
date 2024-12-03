import { db } from "../database";

export const getAllListingsRoute = {
    method: 'GET', 
    path: '/api/listings',
    handler: async (req, h) => {
        console.log("Route /api/listings reached, connecting to DB")
        const { results } = await db.query('SELECT * FROM listings');
        console.log("DB Query successful. Results: ")
        console.log(results);
        return results;
    }
}

// export const getAllListingsRoute = {
//     method: 'GET',
//     path: '/api/listings',
//     handler: async (request, h) => {
//         return new Promise((resolve, reject) => {
//             db.all("SELECT * FROM listings", [], (err, rows) => {
//                 if (err) {
//                     console.error('Database error:', err.message);
//                     reject(h.response({ error: err.message })
//                     .code(500));
//                 } else {
//                     console.log('Database query successful:', rows);
//                     resolve(h.response(rows)
//                     .code(200));
//                 }
//             });
//         }).catch(error => {
//             console.error('Promise error:', error);
//             return h.response({ error: 'Internal Server Error' })
//             .code(500);
//         });
//     }
// };
