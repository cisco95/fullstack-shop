import { db } from "../database";

export const deleteListingRoute = {
    method: 'DELETE', 
    // curl -X "DELETE" http://localhost:8000/api/listings/{itemId}
    path: '/api/listings/{id}', 
    handler: async (req, h) => {
        const { id } = req.params;
        const userId = '12345'
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