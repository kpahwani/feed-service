const { server } = require('./app');

const port = process.env.port || 8002;

server().then((app) => {
    app.listen(port);
    console.log(`Server started at ${port}`);
});
