import HyperExpress, {Request, Response} from 'hyper-express';
import cors from './middleware/cors';
import router from './router/index';

const app = new HyperExpress.Server();

//Global Middlewares
app.use(cors);
app.use(router);



//test route
app.get("/", async (request: Request, response: Response) => {
    response.send("HyperExpress Typescript Test");
});



export default app;