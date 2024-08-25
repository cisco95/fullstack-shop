import { db } from "../database";

export const updateListingRoute = {
    method: "POST",
    /* curl -X POST -H "Content-Type: application/json" -d '{"name": "Air Conditioner", "description": "Makes the air very cold", "price": 120}' http://localhost:8000/api/listing/ce8a4cda-3f2d-4849-b535-7afb908ffa82 */
    path: "/api/listing/{id}",
    handler: async (req, h) =>{
        const {name, description, price} = req.payload;
        const { id } = req.params;
        const userId = '12345'
        new Promise((resolve, reject) =>{
            db.run(`
                UPDATE listings 
                SET name=?, description=?, price=? 
                WHERE id=? AND user_id=?`, 
                [name, description, price, id, userId], 
            (err, rows) => {
                if (err) {
                    console.error("Database error:", err.message);
                    reject(h.response({error: err.message}).code(500));
                } else {
                    console.log("Database update successful:", rows);
                    resolve(h.response(rows).code(200));
                }
            });
        return new Promise((resolve, reject) =>{
            db.all("SELECT * FROM listings WHERE id=? AND user_id=?", [id, userId], (err, rows) =>{
                if (err) {
                    console.error("Database error:", err.message);
                    reject(h.response({error: err.message}).code(500));
                } else {
                    console.log("Database query successful:", rows);
                    resolve(h.response(rows).code(200));
                }
            })
        })
            
        })
    }
}