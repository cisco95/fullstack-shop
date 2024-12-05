import { db } from "../database";
import * as admin from 'firebase-admin';

export const updateListingRoute = {
    method: 'POST', 
    path: '/api/listings/{id}',
    handler: async(req, h) => {
        console.log("Backend called for post to /api/listings/{id}")
        const { id } = req.params;
        const {name, description, price} = req.payload;
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token);
        const userId = user.user_id;
        console.log(`Route /api/listings/${id} for POST has been reached, connecting to DB`)
        await db.query(
            `UPDATE listings
            SET name = ?, description = ?, price = ?
            WHERE id = ? AND user_id = ?`,
            [name, description, price, id, userId],
        )
        console.log('DB listing has been updated. Results: ');
        const results = await db.query(
            'SELECT * FROM listings WHERE id = ? AND user_id = ?',
            [id, userId],
        )
        console.log(results);
        return results;
    }
}

/*

export const updateListingRoute = {
    method: "POST",
    path: "/api/listing/{id}",
    handler: async (req, h) => {
        const { id } = req.params;
        const { name, description, price } = req.payload;
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token);
        const userId = user.user_id;

        try {
            await new Promise((resolve, reject) => {
                db.run(`
                    UPDATE listings 
                    SET name=?, description=?, price=? 
                    WHERE id=? AND user_id=?`, 
                    [name, description, price, id, userId], 
                (err) => {
                    if (err) {
                        console.error("Database error:", err.message);
                        reject(h.response({ error: err.message }).code(501));
                    } else {
                        console.log("Database update successful");
                        resolve();
                    }
                });
            });

            const rows = await new Promise((resolve, reject) => {
                db.all("SELECT * FROM listings WHERE id=? AND user_id=?", [id, userId], (err, rows) => {
                    if (err) {
                        console.error("Database error:", err.message);
                        reject(h.response({ error: err.message }).code(502));
                    } else {
                        console.log("Database query successful:", rows);
                        resolve(rows);
                    }
                });
            });

            return h.response(rows).code(200);
        } catch (error) {
            return error;
        }
    }
};
*/