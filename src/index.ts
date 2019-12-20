import { createApp } from './app';
import { GRAPHQL_PATH, PORT } from './config';

const server = createApp().listen(PORT, () => {
    console.log(`> Server ready at http://localhost:${PORT}${GRAPHQL_PATH}`);
});

function shutdown() {
    server.close(err => {
        if (err) {
            console.error(err);
        }
        process.exit(err ? 1 : 0);
    });
}

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', () => {
    console.log('> Got SIGINT. Graceful shutdown');
    shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', () => {
    console.log('> Got SIGTERM. Graceful shutdown');
    shutdown();
});
