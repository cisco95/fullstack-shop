import Hapi from '@hapi/hapi';
import routes from './routes';
import db from './database';

let server;

const start = async () => {
    server = Hapi.server({
        port: 8000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['https://upgraded-space-fortnight-q9qq5gw9479c9q7x-4200.app.github.dev/listings/*'],
                headers: ['Accept', 'Content-Type', 'Authorization']
            }
        }
    });

    // Add global CORS handler
    server.ext('onPreResponse', (request, h) => {
        const response = request.response;
        if (response.isBoom) {
            response.output.headers['Access-Control-Allow-Origin'] = 'https://upgraded-space-fortnight-q9qq5gw9479c9q7x-4200.app.github.dev';
            response.output.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
            response.output.headers['Access-Control-Allow-Headers'] = 'Accept, Content-Type, Authorization';
        } else {
            response.header('Access-Control-Allow-Origin', 'https://upgraded-space-fortnight-q9qq5gw9479c9q7x-4200.app.github.dev');
            response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            response.header('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization');
        }
        return h.continue;
    });

    routes.forEach(route => server.route(route));

    server.route({
        method: 'GET',
        path: '/api/test-cors',
        handler: async (request, h) => {
            console.log("Received request for listing id:", request.params.id);
            return h.response({'message':'CORS is working'})
                     .header('Access-Control-Allow-Origin', 'https://upgraded-space-fortnight-q9qq5gw9479c9q7x-4200.app.github.dev')
                     .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                     .header('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization');
        }
    });
    

    await server.start();
    console.log(`Server is listening on ${server.info.uri}`);
}

process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
});

process.on('SIGINT', async () => {
    console.log("Stopping server...");
    await server.stop({ timeout: 1000 });

    db.close();
    console.log("Server stopped");
    process.exit(0);
});

start();
