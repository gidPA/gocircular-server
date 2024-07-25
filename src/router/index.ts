import HyperExpress, {Request, Response} from "hyper-express";
import userRouter from "./user";
// import jwtCheck from "./controller/jwtCheck.js";
// import aclCheck from "./controller/aclCheck.js";


const router = new HyperExpress.Router();

router.options('/*', (request: Request, response: Response) => {
    // response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    // response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //response.setHeader('Access-Control-Allow-Credentials', 'true'); // Optional, if you need to include credentials
    return response.send('');
});

    
//routes
router.use("/api/user", userRouter);

// router.post('/api/mqtt/cred-check', jwtCheck.checkUserJwtToken);
// router.post('/api/mqtt/acl-check', aclCheck);

// router.get('/', (request, response) => {
//     return response.status(200).send("API ready to go!");
// })
    
export default router;