import {Request, Response} from 'express';
import fs from 'fs-extra';
import * as create from '../helpers/fileCreate';
import * as deleteAction from '../helpers/delete';
import * as create_readme from '../helpers/createReadme';
import * as ConsoleLog from '../helpers/consoleLog';

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

    create.Sequences(data.sequences, data)
    create.DataServices(data.dataServices, data);
    create.ExtraResources(data.extra, data, 0)
    // createEndpoints(teste.endpoints);
    create.Apis(data.apis, data);
    // createMessagers(teste.messageProcessorEStore);
    // createTemplate(teste.templates);
    // createResources(teste.resources);
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
