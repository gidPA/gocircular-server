import { db } from "./helper/db";
import app from './app';
import { envConfig } from "./config";


db.testConnection();

const port: number = Number(envConfig.port);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
});