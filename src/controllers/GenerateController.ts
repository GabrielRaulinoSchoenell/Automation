import {Request, Response} from 'express';
import fs from 'fs-extra';
import * as create from '../helpers/fileCreate';
import * as deleteAction from '../helpers/delete';
import * as create_readme from '../helpers/createReadme';
import * as ConsoleLog from '../helpers/consoleLog';
import * as create_extraResources from '../helpers/createExtraResources'
import { readDir, readFile } from '../helpers/readXml';

export const generate = (req: Request, res: Response)=>{
    console.log('requisição recebida /generate\n');

    let data = req.body;
    let {deleteFiles} = req.query;

    let path = './src/media/';
    let files = fs.readdirSync(path);
    
    if(deleteFiles){
        switch(deleteFiles){
            case 'deleteAll': deleteAction.deleteAll(files, path);
                break;
            default: deleteAction.deleteSpecific(files, path, deleteFiles);
                break
        }
    }
    if(JSON.stringify(data) === "{}"){
        ConsoleLog.error('Nenhum dado enviado')
        res.json({err: 'no data'});
        return;
    }

    data.sequences ? create.Sequences(data.sequences, data) : null;
    data.dataServices ? create.DataServices(data.dataServices, data) : null;
    // createEndpoints(teste.endpoints);
    data.apis ? create.Apis(data.apis, data) : null;
    // createMessagers(teste.messageProcessorEStore);
    // createTemplate(teste.templates);
    // createResources(teste.resources);
    data.extra ? create_extraResources.ExtraResources(data.extra, data, 0) : null ;
    create_readme.ReadMe(data);

    create.finalize();
    return res.json({msg: "arquivos criados"})
}

export const generateDataService = (params: string[])=>{
    // passa parametros e gera o data service.
}

export const deleteAll = (req: Request, res: Response)=>{
    let path = './src/media/';
    let files = fs.readdirSync(path);
    console.log(files);
    
    deleteAction.deleteAll(files, path);

    res.json({del: "success"})
    return;
}

export const readFiles = (req: Request, res: Response)=>{
    let {dirPath} = req.body;

    let generalData = fs.statSync(dirPath).isDirectory() ? readDir(dirPath) : readFile(dirPath);
    return res.json({generalData});
}