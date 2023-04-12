import {Router, Request, Response} from 'express';
import * as GenerateController from '../controllers/GenerateController'

const router = Router();

router.post('/generate', GenerateController.generate);
router.post('/readFiles', GenerateController.readFiles);
router.delete('/deleteAll', GenerateController.deleteAll)

export default router;