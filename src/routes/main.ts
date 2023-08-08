import {Router, Request, Response} from 'express';
import * as GenerateController from '../controllers/GenerateController'

const router = Router();

router.post('/generate', GenerateController.generate);
router.post('/readFiles', GenerateController.readFiles);
router.delete('/deleteAll', GenerateController.deleteAll);
router.post('/createLogFiles', GenerateController.createLogFiles);
router.post('/createLogForXML', GenerateController.createLogForXML);
router.post('/listFunctionalities', GenerateController.listFunctionalities);
router.post('/readFilesAndGenerate', GenerateController.readFilesAndGenerate);

export default router