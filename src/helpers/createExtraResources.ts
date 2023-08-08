import fs from 'fs-extra';
import * as ConsoleLog from './consoleLog'

export const defining = (extra: any, generalData: any) => {
  let postmanEndpointsContent = '';
  let postmanCollectionFolder = '';
  let endpointListingContent = '';
  let apiListingContent = '';
  let swaggerUrl = '';
  let swaggerTags = '';
  let sequenceContent = '';

  generalData.sequences.data.forEach((sequence: any) => {
    sequenceContent += `A sequence ${sequence.name} realiza ______.\n<br>\n`;
  });

  generalData.apis.data.forEach((api: any, genKey: number) => {
    let context = api.context;
    swaggerTags += aggreagateSwaggerTags(api)

    apiListingContent += `Api ${api.name} tem o contexto ${api.context} e tem recursos que servem para _________\n<br>\n`
    api.resources.forEach((resource: any, key: number) => {
      let swaggerParameter = ''

      let parameters: any = resource.url?.split('/').filter((el: string) => el.includes('{'));
      parameters?.forEach((param: string) => {
        swaggerParameter += aggreagateSwaggerParameter(param)
      })

      let methods = resource.method.split(' ');
      methods.forEach((method: string) => {
        endpointListingContent += generateEndpointListingContent(method, context, resource)
        swaggerUrl += aggreagateSwaggerUrl(context, resource, api, swaggerParameter)

        const isLastIteration = key === api.resources.length - 1;
        postmanEndpointsContent += aggregatePostmanContent(isLastIteration, generalData, api, method, resource, context)
      });
    });

    postmanCollectionFolder += aggregatePostmannCollectionFolder(api, postmanEndpointsContent)

    postmanEndpointsContent = '';

  });

  let definingContent = generateDefining(generalData, endpointListingContent, sequenceContent, apiListingContent)
  let postmanCollectionContent = generatePostmanCollectionContent(generalData, postmanCollectionFolder)
  let swaggerContent = generateSwaggerContent(generalData, swaggerTags, swaggerUrl)

  extra.defining ? fs.writeFileSync(`./src/media/ExtraResources/defining.md`, definingContent) : null;
  extra.postman ? fs.writeFileSync(`./src/media/ExtraResources/postmanCollection.json`, postmanCollectionContent) : null;
  extra.swagger ? fs.writeFileSync(`./src/media/ExtraResources/${generalData.project}.yaml`, swaggerContent) : null
}

export const vars = (extra: any, generalData: any, envType: any) => {
  let varsContent = '===== variaveis em HOMOLOG, se alguma var for secreta, pegue-a no openShift =====\n\n';
  generalData.env?.forEach((el: any) => {
    varsContent += `setX -m ${el.var} "${el.values[envType]}"\n`
  });

  extra.setVars ? fs.writeFileSync(`./src/media/ExtraResources/setVars.txt`, varsContent) : null;

}

export const ExtraResources = (extra: any, generalData: any, envType: number) => {
  console.log('----------------------------------------------------------------');
  console.log('================ Creating ExtraResources =======================');

  fs.mkdirSync('./src/media/ExtraResources');


  vars(extra, generalData, envType)
  defining(extra, generalData);


  let postmanEnvContent = generatePostmanEnvContent(generalData)

  extra.creation ? fs.writeFileSync(`./src/media/ExtraResources/creation.json`, JSON.stringify(generalData)) : null;
  extra.postman ? fs.writeFileSync(`./src/media/ExtraResources/postmanEnv.json`, postmanEnvContent) : null;


  ConsoleLog.success("---------------- Extra Resources have been created -----------------")
}

function aggregatePostmanContent(isLastIteration: any, generalData: any, api: any, method: any, resource: any, context: any) {
  return `{
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
          "url": "{{base_url}}${context}${resource.url ? resource.url : ''}"
      },
      "response": []
  }${isLastIteration ? '' : ','}`
}

function generateDefining(generalData: any, endpointListingContent: any, sequenceContent: any, apiListingContent: any) {
  console.log('generateDefinign = ', generalData, endpointListingContent, sequenceContent, apiListingContent)
  return `# Intelbras ChatBot API

- Documento de documentação
    - Integração
    - Interfaces envolvidas
    - Definição do serviço
    - Classificação processo de negocio
    - Contrato
    - recursos
        - 1 - POST /chatbot/sendMessage/{namespace}
            - Diagrama de Sequencia
    - Recursos a nivel de aplicação

## Integração

Esse documento tem o detalhamento técnico da API chatbot, mantido pelo time de automações para envios automáticos de mensagens pelo Whatsapp

## Iterfaces envolvidas

|Sistema            |Entidades                              |Tipo           |Direção
|-------------------|---------------------------------------|---------------|------------------------|
|Blip               |Envio de mensagem                      |API            |WSO2 -> Blip
|Integra Sistemas   |Logs de integração                     |Banco de dados |WSO2->Integra Sistemas
|??????????         |Plataforma para envio de requisições   |Frontend       |Frontend -> WSO2
|??????????         |Registro de mensagens e clientes       |Banco de dados |Excel -> WSO2

## areas envolvidas

|Area               |Lider              |Relação
|-------------------|-------------------|-------------|
|Arquitetura TI     |Maiko Flores Dalri |Criação
|Squad Automatização|Mailin Barcelos    |Sustentação
|E-commerce         |?????              |Consumo
|Solar              |??????             |Consumo


## classificação Processo de negócios
Área de negócio: E-commerce, vendas Solar
Capacidade expansão para outras áreas: A verificar
Nome do serviço: ChatBotAPI
contexto: /chatbot
versão: 1.0.0
Responsável Intelbras: Danilo Rodrigues
Impacto: Alto impacto interno e externo
Objetivo da integração: A integração foi criada para manter registro de consumo da API blip pelos setores comerciais, além do reenvio de mensagense e tratativa de erros. 

## Contrato
BlipSwagger.yaml

## Recursos
---

## 1 - POST /chatbot/sendMessage/{namespace}

Essa operação realiza (Respectivamente) 
- A verificação de segurança da mensagem
- O envio da requisição para a API da Blip
- Salva o log do envio 
- Salva o log do retorno

### diagrama de sequencia
SEQUENCIA

---
---

## Recursos a nivel de aplicação

Message Broker (active MQ)

### Sequences
|Nome                               | Função
|-----------------------------------|-----------------------|
|EnviaDadosLegaisSequence           | Envia dados legais para a api da Blip
|ProcessaMenssagemProcessorSequence | Lida com o envio e retorno da Blip
`;
}

function generateSwaggerContent(generalData: any, swaggerTags: any, swaggerUrl: any) {
  return `openapi: 3.0.3
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

}

function generatePostmanEnvContent(generalData: any) {
  return `{
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
}

function generateEndpointListingContent(method: any, context: any, resource: any) {
  return `\t<tr>
  <td>${method.toUpperCase()}</td>
  <td>${context}${resource.url}</td>
  <td>Esse endpoint faz...........</td>
</tr>\n`;
}

function aggreagateSwaggerParameter(param: any) {
  return `        - name: ${param.replace('{', '').replace('}', '')}
          in: path
          required: true
          style: simple
          explode: true
          schema:
            type: string\n`
}

function aggreagateSwaggerTags(api: any) {
  return `  - name: ${api.name}
    description: Descrição\n`;
}

function aggreagateSwaggerUrl(context: any, resource: any, api: any, swaggerParameter: any) {
  console.log("aaaaaaaaaaaaa", resource.url.indexOf('{'))
  console.log(resource.url.substring(resource.url.indexOf('{') +1, resource.url.indexOf('}')))
  return `
  '${context + (resource.url ? resource.url : '/')}':
    ${resource.method.toLowerCase()}:
      summary: explicacao
      ${(resource.url.indexOf('{') > 0) ? 
      `parameters:
        - name: ${resource.url.substring(resource.url.indexOf('{') +1, resource.url.indexOf('}'))}
          in: path
          description: Identificador unico do registro
          required: true
          type: string` : ''}
      responses:
        200:
          description: descrição`;
}

function aggregatePostmannCollectionFolder(api: any, postmanEndpointsContent: any) {
  return `{
    "name": "${api.name}",
    "item": [${postmanEndpointsContent}]
  },`;
}

function generatePostmanCollectionContent(generalData: any, postmanCollectionFolder: any){
  return `{
    "info": {
        "_postman_id":"1234",
        "name": "${generalData.project}",
        "description": "${generalData.description}",
        "schema":  "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [${postmanCollectionFolder}]

}`;
}