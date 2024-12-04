import { auth } from "firebase-admin";
import { db } from "../database";
import * as admin from 'firebase-admin';

export const deleteListingRoute = {
    method: 'DELETE',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        const { id } = req.params;
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token);
        const userId = user.user_id;
        console.log(`Route /api/listings/${id} reached for DELETE, connecting to DB`)
        db.query(
            'DELETE FROM listings WHERE id = ? AND user_id = ?',
            [id, userId],
        )
        console.log("Item deleted from DB successfully.")
        return {message: "Item Deleted Successfully"}
    }
}


/*
export const deleteListingRoute = {
    method: 'DELETE', 
    // curl -X "DELETE" http://localhost:8000/api/listings/{itemId}
    path: '/api/listings/{id}', 
    handler: async (req, h) => {
        const { id } = req.params;
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token);
        const userId = user.user_id;
        
        new Promise((resolve, reject) => {
            db.run("DELETE FROM listings WHERE id=? AND user_id=?", [id, userId], (err, rows)=>{
                if (err) {
                    console.error("Database error:", err.message);
                    reject(h.response({error: err.message}).code(500));
                } else {
                    console.log("Database item delete successful.");
                    resolve(h.response(rows).code(200));
                }
            });
        });
        return {message: "Item Deleted Successfully"}
    }
}

*/