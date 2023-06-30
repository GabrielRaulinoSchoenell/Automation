import {Request, Response, json} from 'express';
import fs from 'fs-extra';
import * as create from '../helpers/fileCreate';
import * as deleteAction from '../helpers/delete';
import * as create_readme from '../helpers/createReadme';
import * as ConsoleLog from '../helpers/consoleLog';
import * as create_extraResources from '../helpers/createExtraResources'
import { readDir, readFile } from '../helpers/readXml';
import * as xmlReader from 'xml2js';
import * as listFunctions from '../helpers/listFunctions';
import axios from 'axios'

export const generate = (req: Request, res: Response)=>{
    console.log('requisição recebida /generate\n');

    let {data} = req.body;
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

    console.log(req.body)

    // data.sequences ? create.Sequences(data.sequences, data) : console.log("No sequences... going to the next term.");
    // data.dataServices ? create.DataServices(data.dataServices, data) : console.log("No dataService... going to the next term.");
    // data.ednpoints ? create.endpoints(teste.endpoints): null;
    data.apis ? create.Apis(data.apis, data) : console.log("No Apis... going to the next term.");
    // createMessagers(teste.messageProcessorEStore);
    // createTemplate(teste.templates);
    // createResources(teste.resources);
    data.extra ? create_extraResources.ExtraResources(data.extra, data, 0) : console.log('No data.extra... skipping case 0/0') ;
    // create_readme.ReadMe(data);

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

    let data = fs.statSync(dirPath).isDirectory() ? readDir(dirPath) : readFile(dirPath);
    return res.json({data});
}

export const createLogFiles = (req: Request, res: Response) =>{
    let {dirPath}: any = req.body;
    let generalData = fs.readdirSync(dirPath);


    let content: any;
    generalData.forEach((file:string)=>{
        content = fs.readFileSync(dirPath+'/'+file);
    });

    let urlTemplate: any;
    xmlReader.parseString(content, (err, result)=>{
        result.api.resource.forEach((resource: any)=>{
            urlTemplate = resource.$['uri-template'];
            // console.log(el.inSequence);
            // el.inSequence.push({
            //     log: {
            //         '$':{
            //             level: "custom"
            //         }
            //     },
            //     property: {
            //         '$': {
            //             name: "------- Requisicao Recebida",
            //             value: `${urlTemplate} -------` 
            //         }
            //     }
            // })

            const logElement = {
                log: {
                  '$': {
                    level: 'custom'
                  },
                  property: [
                    {
                      '$': {
                        name: '======= Requisicao Finalizada',
                        value: `${urlTemplate} =======` 
                      }
                    }
                  ]
                }
              };

            let jsonAPI = JSON.stringify(resource);
            jsonAPI.replace(`"inSequence:[{`, `"inSequence:[{"log": `)
            console.log(jsonAPI);
            return;

            // jsonAPI.replace(<);


            // inSequenceElement.splice(inSequenceIndex, 0, logElement);
            
            // const updatedXmlData = resource.inSequence.push(result);

            // const updatedXmlFilePath = './src/media/Frqango.xml';
            // fs.writeFileSync(updatedXmlFilePath, updatedXmlData);            
        });
        let receivedLog = `
        <log level="custom">
            <property name=""/>
        </log>

        `

        // let context = result.api ? 
    })
    res.json({thank: "you"})
}


export const createLogForXML = (req: Request, res: Response)=>{
    let xml = req.body;

    console.log(xml);
}

export const listFunctionalities = (req: Request, res: Response)=>{
    const {fileName} = req.body;
    const {deleteFiles} = req.query;

    let path = './src/readFiles/';

    console.log("reading file: ", path + fileName);
    
    let file = fs.readFileSync(path + fileName)

    console.log("listando apis")
    let functionalities = listFunctions.listApis(file)

    res.json({functionalities})
}

export const readFilesAndGenerate = (req: Request, res: Response)=>{
    let {dirPath} = req.body;
    let data = fs.statSync(dirPath).isDirectory() ? readDir(dirPath) : readFile(dirPath);

    console.log(data)

    axios.post(`http://localhost:3000/generate?deleteFiles=deleteAll`, {data});

    res.json({criado: "kk"})
}