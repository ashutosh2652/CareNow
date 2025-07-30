import { app } from "./app.js";
import { connect, disconnectdb } from "./config/db.js";
import { config } from "./config/env.js";
let server;
connect()
    .then(() => {
        app.on("error", (error) => {
            console.log("Error!!", error);
            throw error;
        });
        server = app.listen(config.PORT, () => {
            console.log(
                `Mongodb is connected successfully to port:${config.PORT}`
            );
        });
    })
    .catch((error) => {
        console.log("MONGODB failed to connect!!!", error);
        process.exit(1);
    });

["SIGTERM", "SIGINT"].forEach((sig) =>
    process.on(sig, async () => {
        console.info(`Caught ${sig} dranning...`);
        await disconnectdb();
        server.close(() => process.exit(0));
    })
);
