import fs from 'fs-extra';
import * as ConsoleLog from './consoleLog'

let progress = 0;
function createLoadingBar(message: any, total: any) {
    // console.log(total)
  
    const percentage = Math.ceil((progress / total));
    const barLength = progress;
    const bar = '█'.repeat(parseInt(barLength as any)) + ' '.repeat(100 - parseInt(barLength as any));

    // Create the loading bar string
    const loadingBar = `Progress: ==${bar}== ${percentage}%`;

    // Clear the previous output using a carriage return
    // process.stdout.write('\r' + loadingBar);

    progress++;

    if (progress > total) {
        process.stdout.write('\n');
    }
  }

export const defining  = (extra: any, generalData: any)=>{
    let postmanEndpointsContent = '';
    let postmanCollectionFolder = '';
    let endpointListingContent = '';
    let apiListingContent = '';
    let swaggerUrl = '';
    
    let swaggerTags = '';

    let sequenceContent = '';

    generalData.sequences.data.forEach((sequence: any)=>{
        sequenceContent += `A sequence ${sequence.name} realiza ______.\n<br>\n`;
    });

    generalData.apis.data.forEach((api: any, genKey: number)=>{
        let context = api.context;


        swaggerTags += 
`  - name: ${api.name}
    description: Descrição\n`
        
        apiListingContent += `Api ${api.name} tem o contexto ${api.context} e tem recursos que servem para _________\n<br>\n`
        api.resources.forEach((resource: any, key: number) => {
            let swaggerParameter = ''

            let parameters: any = resource.url?.split('/').filter((el: string) => el.includes('{'));
            parameters?.forEach((param: string)=>{
                swaggerParameter += `        - name: ${param.replace('{', '').replace('}', '')}
          in: path
          required: true
          style: simple
          explode: true
          schema:
            type: string\n`
            })

            let methods = resource.method.split(' ');
            methods.forEach((method: string) => {
                endpointListingContent += `\t<tr>
        <td>${method.toUpperCase()}</td>
        <td>${context}${resource.url}</td>
        <td>Esse endpoint faz...........</td>
    </tr>\n`;
            swaggerUrl += 
`  '${context + (resource.url ? resource.url : '/')}':
    ${resource.method.toLowerCase()}:
      tags:
        - ${api.name}
      summary: explicacao
      ${resource.method.toLowerCase() != 'get' 
    ? `requestBody:
        description: Descrição
        content:
          application/json:
            schema:
              properties:
                sample:
                  type: string
                  description: desc
                  example: exemplo
        required: true\n`
    :''} 
      description: Descrição
      ${! swaggerParameter ? '' : 'parameters:'}
${swaggerParameter}
      responses:
        '200':
          description: Sucesso
          content: 
            application/json:
              schema:
                type: object
                properties:
                  gereEmGenerateSwaggerPropertiesTODO: 
                    type: string
        '500':
          description: Erro
          content: 
            application/json:
              schema:
                type: string`;

          const isLastIteration = key === api.resources.length - 1;
              console.log('tt', genKey, generalData.apis.data.length -1, api.name, key, api.resources.length - 1)
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
                        "url": "{{base_url}}${context}/${api.versionType=='url' ? generalData.version : generalData.version} ${resource.url ? resource.url : ''}"
                    },
                    "response": []
                }${isLastIteration ? '':','}`          
           
        });
    });

    
    postmanCollectionFolder += `{
      "name": "${api.name}",
      "item": [${postmanEndpointsContent}]
    },`;

    postmanEndpointsContent = '';

  });

    let postmanCollectionContent = 
`{
    "info": {
        "_postman_id":"1234",
        "name": "${generalData.project}",
        "description": "${generalData.description}",
        "schema":  "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [${postmanCollectionFolder}]

}`;

    let swaggerContent = 
`openapi: 3.0.3
info:
  title: ${generalData.project}
  version: 1.0.11
tags:
${swaggerTags}paths:
${swaggerUrl}
components:
  securitySchemes:
    default:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: 'https://test.com'
          scopes: {}
x-wso2-cors:
  corsConfigurationEnabled: false
  accessControlAllowOrigins:
    - '*'
  accessControlAllowCredentials: false
  accessControlAllowHeaders:
    - authorization
    - Access-Control-Allow-Origin
    - Content-Type
    - SOAPAction
    - apikey
    - Internal-Key
  accessControlAllowMethods:
    - GET
    - PUT
    - POST
    - DELETE
    - PATCH
    - OPTIONS
x-wso2-production-endpoints:
  urls:
    - 'https://progress-wso2-homolog.apps.intelbras.com.br/account/v1'
  type: http
x-wso2-sandbox-endpoints:
  urls:
    - 'https://progress-wso2-homolog.apps.intelbras.com.br/account/v1'
  type: http
x-wso2-basePath: /supplierManagement/1.0.0
x-wso2-transports:
  - http
  - https
x-wso2-response-cache:
  enabled: false
  cacheTimeoutInSeconds: 300

    ` 


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
extra.swagger ? fs.writeFileSync(`./src/media/ExtraResources/${generalData.project}.yaml`, swaggerContent) : null
}

export const listing = (extra: any, generalData: any)=>{
    generalData.apis.data.forEach((api: any)=>{
        api.resources.forEach((resource: any)=>{
            // console.log("lsiting", api.name)
        })
    })
}

export const vars = (extra: any, generalData: any, envType: any)=>{
    let varsContent = '===== variaveis em HOMOLOG, se alguma var for secreta, pegue-a no openShift =====\n\n';
    generalData.env?.forEach((el: any) => {
        varsContent += `setX -m ${el.var} "${el.values[envType]}"\n`
    }); 

    extra.setVars ? fs.writeFileSync(`./src/media/ExtraResources/setVars.txt`,varsContent) : null;
   
}

export const ExtraResources = (extra: any, generalData: any, envType: number)=>{
    console.log('----------------------------------------------------------------');
    console.log('================ Creating ExtraResources =======================');
    
    fs.mkdirSync('./src/media/ExtraResources');
    
    
    vars(extra, generalData, envType)
    listing(extra, generalData)
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

