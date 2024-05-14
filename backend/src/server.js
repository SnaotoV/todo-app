import app from './app';
import config from './config/config';
import MongoDB from './config/mongo.config';
async function startServer() {
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Connected to the database!");
        const PORT = config.app.port;

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        })

    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}
startServer();