import {Request, Response} from 'express';
import fs from 'fs-extra';
import * as create from '../helpers/fileCreate';
import * as create_readme from '../helpers/createReadme'

export const generate = (req: Request, res: Response)=>{
    console.log('requisição recebida /generate');

    let data = req.body;

    if(!data){
        console.log('Nenhum dado enviado')
        res.json({err: 'no data'});
        return;
    }

    create.Sequences(data.sequences, data)
    console.log("---------- Sequences have been created, creating Data Services ------------");


    create.DataServices(data.dataServices, data);
    // createEndpoints(teste.endpoints);
    // createApis(teste.apis);
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
    files.forEach((el)=>{
        fs.unlinkSync(path+el)
    });

    res.json({del: "success"})
    return;
}

export const deleteByType = (req: Request, res: Response)=>{
    let {fileType} = req.params;
}