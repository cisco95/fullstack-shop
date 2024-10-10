import Hapi from '@hapi/hapi';
import routes from './routes';
import db from './database';

let server;

const start = async () => {
    server = Hapi.server({
        port: 8000, 
        host: 'localhost',
        routes: {
            cors: true
            // cors: {
            //     origin: ['https://upgraded-space-fortnight-q9qq5gw9479c9q7x-4200.app.github.dev'], 
            //     headers: ['Accept', 'Content-Type', 'Authorization'], // Allow these headers
            //     exposedHeaders: ['Accept'], // Expose these headers
            //     additionalExposedHeaders: ['Accept'], // Additional exposed headers
            //     maxAge: 60,
            //     credentials: true // Allow credentials

            // }
        }
    });

    routes.forEach(route => server.route(route));

    server.route({
        method: 'GET',
        path: '/api/test-cors',
        handler: (request, h) => {
          return h.response('CORS is working').header('Access-Control-Allow-Origin', 'https://upgraded-space-fortnight-q9qq5gw9479c9q7x-4200.app.github.dev');
        }
      });

      server.route({
        method: 'OPTIONS',
        path: '/{any*}',
        handler: (request, h) => {
          return h.response().header('Access-Control-Allow-Origin', 'https://upgraded-space-fortnight-q9qq5gw9479c9q7x-4200.app.github.dev')
                             .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                             .header('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization');
        },
        options: {
            auth: false
        }
      });
    
    await server.start();
    console.log(`Server is listening on ${server.info.uri}`);
}


process.on("unhandledRejection", err=>{
    console.log(err);
    process.exit(1);
})

process.on('SIGINT', async ()=>{
    console.log("Stopping server...");
    await server.stop({ timeout: 1000});

    db.close()
    console.log("Server stopped");
    process.exit(0);
});


start();