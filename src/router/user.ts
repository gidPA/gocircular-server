import {login, register} from "../controller/user";
import HyperExpress from 'hyper-express';

const router = new HyperExpress.Router();

router.post("/login", login);
router.post("/register", register);

export default router;

