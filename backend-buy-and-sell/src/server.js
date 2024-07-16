const Hapi = require('@hapi/hapi');

const start = async () => {
    const server = Hapi.server({
        port:8000, 
        host: 'localhost',
    });

    server.route({
        method: 'GET',
        path: '/hello',
        handler: (req, res) => {
            console.log("Success!")
            return res.response("Hello!").code(200);
        }
    });

    await server.start();
    console.log(`Server is listening on ${server.info.uri}`);
}


process.on("unhandledRejection", err=>{
    console.log(err);
    process.exit(1);
})

start();