import {Request, Response} from 'express';
import fs from 'fs-extra';
import * as create from '../helpers/fileCreate'

export const generate = (req: Request, res: Response)=>{
    console.log('requisição recebida /generate');

    let data = req.body;

    if(!data){
        console.log('Nenhum dado enviado')
        res.json({err: 'no data'});
        return;
    }

    create.Sequences(data.sequences, data);
    create.DataServices(data.dataServices, data);
    // createEndpoints(teste.endpoints);
    // createApis(teste.apis);
    // createMessagers(teste.messageProcessorEStore);
    // createTemplate(teste.templates);
    // createResources(teste.resources);
    return res.json({msg: "arquivos criados"})
}

export const generateDataService = (params: string[])=>{
    // passa parametros e gera o data service.
}

export const deleteAll = (req: Request, res: Response)=>{
    // deletar tudo
}