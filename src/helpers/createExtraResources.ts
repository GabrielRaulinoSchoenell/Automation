import fs from 'fs-extra';
import * as ConsoleLog from './consoleLog'

export const defining  = (extra: any, generalData: any)=>{
    let postmanEndpointsContent = '';
    let endpointListingContent = '';
    let apiListingContent = '';
    
    let sequenceContent = '';

    console.log(generalData.sequences.data)
    generalData.sequences.data.forEach((sequence: any)=>{
        sequenceContent += `A sequence ${sequence.name} realiza ______.\n<br>\n`;
    });

    generalData.apis.data.forEach((api: any)=>{
        let context = api.context;
        
        apiListingContent += `Api ${api.name} tem o contexto ${api.context} e tem recursos que servem para _________\n<br>\n`
        api.resources.forEach((resource: any, key: number) => {
            

            let methods = resource.method.split(' ');
            methods.forEach((method: string) => {
                endpointListingContent += `\t<tr>
        <td>${method.toUpperCase()}</td>
        <td>${context}${resource.url}</td>
        <td>Esse endpoint faz...........</td>
    </tr>\n`;
            postmanEndpointsContent += `
                {
                    "name": "${context}${resource.url}",
                    "request": {
                        "method": "${method.toUpperCase()}",
                        "header": "[]",
                        "body": {
                            "mode": "raw",
                            "raw": {"body": "body"},
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": "{{base_url}}${context}${generalData.versionType=='url' ? generalData.version : ''}${resource.url}"
                    },
                    "response": []
                }${(key +1 == api.resources.length) ? '' : ','}
                `
            });

            

        });

    });
    let postmanCollectionContent = `
    {
        "info": {
            "_postman_id":"1234",
            "name": "${generalData.project}",
            "description": "${generalData.description}",
            "schema":  "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        "item": [${postmanEndpointsContent}]

    }`;

    let definingContent = `
# ${generalData.project}

Este arquivo é uma documentação completa do projeto. Vamos passar por todos os pontos que sejam necessarios para o entendimento do projeto:

## Listagem de endpoints

*Os endpoints podem ser baixados como Collection no POSTMAN em ExtraResources/postmanCollection.json*

### A seguir a listagem rápida dos endpoints:

<table border=1>
    <tr>
        <td>METHOD</td>
        <td>ENDPOINT</td>
        <td>DESCRIÇÃO</td>
    </tr>
    ${endpointListingContent}
</table>

____
____

## Informações para GMUD

<font color='#fb2' size='4'>Os servidores afetados pelo código são:</font>

* sjo-____ 
*  http:____

1. TOTVs, afetados pelos endpoints ou recursos: 
    * /___
    * /___ (GET e POST)
    * /___ (apenas POST)
2. SalesForce, afetados pelos endpoints ou recursos:
    * /___
    * ___Sequence
<br>
<br>

### As areas afetados pelo código são:

1. TI, _______


## Operações do projeto

### APIs: 
${apiListingContent}
### Sequences: 
${sequenceContent}
### Endpoints:
### DataServies:`;



extra.defining ? fs.writeFileSync(`./src/media/ExtraResources/defining.md`, definingContent) : null; 
extra.postman ? fs.writeFileSync(`./src/media/ExtraResources/postmanCollection.json`, postmanCollectionContent) : null;
}

export const vars = (extra: any, generalData: any, envType: any)=>{
    let varsContent = '===== variaveis em HOMOLOG, se alguma var for secreta, pegue-a no openShift =====\n\n';
    generalData.env.forEach((el: any) => {
        varsContent += `setX -m ${el.var} "${el.values[envType]}"\n`
    }); 

    extra.setVars ? fs.writeFileSync(`./src/media/ExtraResources/setVars.txt`,varsContent) : null;
   
}

export const ExtraResources = (extra: any, generalData: any, envType: number)=>{
    console.log('----------------------------------------------------------------');
    console.log('================ Creating ExtraResources =======================');
    
    fs.mkdirSync('./src/media/ExtraResources');
    
    
    vars(extra, generalData, envType)
    defining(extra, generalData);  

   
    let postmanEnvContent = `{
        "id": "1234",
        "name": "${generalData.project}ENV",
        "values": [
                {
                    "key": "base_url",
                    "value": "${generalData.projectUrl}",
                    "enabled": true
                }
            ]
        }
    `;

    extra.creation ? fs.writeFileSync(`./src/media/ExtraResources/creation.json`, JSON.stringify(generalData)): null;
    extra.postman ? fs.writeFileSync(`./src/media/ExtraResources/postmanEnv.json`, postmanEnvContent) : null;


    ConsoleLog.success("---------------- Extra Resources have been created -----------------")
}