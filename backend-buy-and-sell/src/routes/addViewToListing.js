import { db } from "../database";

export const addViewToListingRoute = {
    method: 'POST',
    path: '/api/listings/{id}/add-view', 
    handler: async (req, h) => {
        try {
            const id = req.params.id;
            await db.run('UPDATE listings SET views=views+1 WHERE id =?', [id], );
            const results = await db.all('SELECT * FROM listings WHERE id=?', [id],(err, rows)=>{
                if (err) {
                    console.error('Database error:', err.message);
                } else {
                    console.log('Database query successful:', rows);
                }
            });
            const updatedListing = results[0];
            console.log(JSON.stringify(updatedListing));
            return h.response(updatedListing).code(200)
        } catch (error){
            console.error(error);
            return h.response({error: 'Internal Server Error'}).code(500);
        }
    }
}



/*
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
 */