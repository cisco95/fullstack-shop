import { db } from "../database";

export const addViewToListingRoute = {
method: 'POST',
path: '/api/listings/{id}/add-view', 
handler: async (req, h) => {
    const id = req.params.id.replace(/["']/g, "");
    console.log(`Route /api/listings/${id}/add-view reached, connecting to DB`)
    await db.query(
        'UPDATE listings SET views=views+1 WHERE id =?', 
        [id], 
    );
    console.log("View incremented, updated listing:")
    const { results } = await db.query(
        'SELECT * FROM listings WHERE id=?', [id],
        [id], 
    );
    console.log(results);
    return results;       
}
}

/*
export const addViewToListingRoute = {
    method: 'POST',
    path: '/api/listings/{id}/add-view', //test with "curl -X POST http://localhost:8000/api/listings/123/add-view"
    handler: async (request, h) => {
        try {
            const id = request.params.id;
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
*/


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