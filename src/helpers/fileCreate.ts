import fs from 'fs-extra';
import { generalData } from '../types/generalData';
import * as Data from '../types/Data';
import * as ConsoleLog from '../helpers/consoleLog'

let template: string;
let started: boolean = false;

let properties: any = [];
let dependencies: any = [];
let artifact: any = [];

let path = './src/media/'

export const PomEArtifact = (pomEArtifactData: any, generalData: generalData, template: string)=>{

    pomEArtifactData.data.forEach((el: any, key: number)=>{
        console.log("Inserindo ao pom:", el.name)
        properties+=`<${generalData.groupId}.${pomEArtifactData.type}_._${el.name}${template}>capp/EnterpriseServiceBus</${generalData.groupId}.${pomEArtifactData.type}_._${el.name}${template}>\n`;
        dependencies +=`
<dependency>
    <groupId>${generalData.groupId}.${pomEArtifactData.type}</groupId>
    <artifactId>${el.name}${template}</artifactId>
    <version>1.0.0</version>
    <type>zip</type>
</dependency>`;

        artifact+=
`<artifact name="${el.name}${template}" groupId="${generalData.groupId}" version="1.0.0" type="synapse/${pomEArtifactData.type}" serverRole="EnterpriseServiceBus">
    <file>src/main/synapse-config/api/NotificacaoAPI.xml</file>
</artifact>\n`;
        
    }); 



    console.log(`\t------ pom e artifact ${pomEArtifactData.type}------`)

}
export const WritePomEArtifact = ()=>{

    fs.writeFileSync(path+'pom.xml', '');

    fs.appendFileSync(`${path}pom.xml`, `${properties}\n${dependencies}`);
    fs.appendFileSync(`${path}artifact.xml`, artifact);

}

export const Apis = (apiData: Data.Apis, generalData: generalData)=>{
    console.log('----------------------------------------------------------------');
    console.log('================== creating APIS ==========================');
    template = generalData.encodePattern == 'nameAfter' ? 'API': ''; 
    let sequence = generalData.encodePattern == 'nameAfter' ? 'Sequence' : '';
    
    fs.mkdirSync(`${path}/api`);

    apiData.data.forEach((el: Data.ApiData)=>{
        // {
        //     "name": "users",
        //     "context": "/users",
        //     "resources": [
        //         {"get": "/"},
        //         {"get": "/getName"},
        //         {"post": "/changeName"}
        //     ]
        // },


        let fileContent = '';
        let faultSequence: string;
        let outSequence: string;
        generalData.sequences?.data.forEach((el) => {
            faultSequence = el.name == 'Fault' ? `faultSequence="${el.name+sequence}"` : '';
            outSequence = el.name == 'Out' ? `outSequence="${el.name+sequence}"` : '';
        });
        
        el.resources.forEach((resource)=>{
            fileContent += 
`<resource methods="${resource.method.toUpperCase()}" ${faultSequence} ${outSequence}  uri-template="${resource.url}">
    <inSequence>
        <log level="custom">
            <property name="Requisição recebido" value="${resource.url}"/>
        </log>
        <property name="HTTP_SC" scope="axis2" type="STRING" value="200"/>
        <respond/>
    </inSequence>
    <outSequence/>
    <faultSequence/>
</resource>           
`
        });

        fs.writeFileSync(`${path}/api/${el.name}${template}.xml`, 
`<?xml version="1.0" encoding="UTF-8"?>
<api context="${el.context}" name="HealthCheckAPI" xmlns="http://ws.apache.org/ns/synapse">
    ${fileContent}
</api>
`)

    });
    
    PomEArtifact(apiData, generalData, template);
    ConsoleLog.success("----------------- Apis have been created ---------------------");
}

export const Sequences = (sequenceData: Data.Sequences, generalData: generalData)=>{
    console.log('----------------------------------------------------------------');
    console.log('================== creating sequences ==========================');
    template = generalData.encodePattern == 'nameAfter' ? 'Sequence': '';  

    PomEArtifact(sequenceData, generalData, template);

    fs.mkdirSync(`${path}sequences`)

    let fileContent = '';

    sequenceData.data.forEach((el: any, key: number) => {
        switch(el.name){
            case 'EnvironmentVariables': EnvironmentVariablesSequence(template, generalData);
                break;
            default:  
            fs.writeFileSync(`./src/media/sequences/${el.name}${template}.xml`, `
<?xml version="1.0" encoding="UTF-8"?>
<sequence name="${el.name}${template}" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
    <log level="custom">
        <property name="entrando na sequence" value="${el.name}${template}"/>
    </log>    
</sequence>`)
        }

       
    });

    
    ConsoleLog.success("---------------- Sequences have been created-----------------");

}

const EnvironmentVariablesSequence = (template: string, data: any)=>{
    let properties = '';
    data.env.forEach((el: any, key: string)=>{
        properties += `\n\t<property expression="get-property('env', '${el.var}')" name="${el.name}" scope="default" type="STRING"/>` 
    });

    fs.writeFileSync(`./src/media/sequences/EnvironmentVariablesSequence${template}.xml`, `
<?xml version="1.0" encoding="UTF-8"?>
<sequence name="EnvironmentVariablesSequence${template}" trace="disable" xmlns="http://ws.apache.org/ns/synapse">${properties}
</sequence>
        `)
}



export const DataServices = (dataServiceData: any, generalData: any)=>{
    console.log('----------------------------------------------------------------');
    console.log('================= creating DataServices ========================');
    template = generalData.encodePattern == 'nameAfter' ? 'DSS' : '';

    
    fs.mkdirSync(`${path}dataServices`)

    PomEArtifact(dataServiceData, generalData, template);

    dataServiceData.data.forEach((el: any, key: number)=>{
        let query = `<query id="${el.function}" keyColumns="${el.properties[0]}" useConfig="database">\n`;
        let operation = `<operation name="${el.function}">
        <call-query href="${el.function}">\n`;

        el.properties.forEach((param: string)=>{
            query += `\t\t<property name="${param}" paramType="SCALAR" sqlType="STRING" />\n`;
            operation += `\t\t\t<with-param name="${param}" query-param="${param}"/>\n` 
        });

        query += `\t</query>
`;
        operation += `\t\t</call-query>
\t</operation>`;



        fs.writeFileSync(`./src/media/${el.name}${template}.dbs`, `
<data enableBatchRequests="true" name="${el}${template}" serviceNamespace="" serviceGroup="" transports="http https">
    <description />
    <config enableOData="true" id="database">
        <!--<property name="driverClassName"> </property>-->
        <!--<property name="url">$SYSTEM:___DATABASE VAR___</property>-->
        <!--<property name="username">$SYSTEM:___USERNAME VAR___</property>-->
        <!--<property name="password">$SYSTEM:___PASSWORD VAR___</property>-->
    </config>
    ${query}
    ${operation}
</data>`);
    });

    ConsoleLog.success("---------------- DataServices have been created -----------------");
}

export const finalize = ()=>{
    started = false;
    WritePomEArtifact();
    properties = [];
    dependencies = [];

    ConsoleLog.success("---------------- Everything is at it's place!!! -----------------");
    // ConsoleLog.bigLetters('nice')
};

export const ExtraResources = (extra: any, generalData: any, envType: number)=>{
    console.log('----------------------------------------------------------------');
    console.log('================ Creating ExtraResources =======================');
    
    fs.mkdirSync('./src/media/ExtraResources');
    
    let varsContent = '===== variaveis em HOMOLOG, se alguma var for secreta, pegue-a no openShift =====\n\n';
    generalData.env.forEach((el: any) => {
        varsContent += `setX -m ${el.var} ${el.values[envType]}\n`
    }); 

    let endpointListingContent = '';
    let apiListingContent = '';
    let postmanEndpointsContent = '';

    generalData.apis.data.forEach((api: any)=>{
        let context = api.context;
        
        apiListingContent += `Api ${api.name} tem o contexto ${api.context} e tem recursos que servem para _________`
        api.resources.forEach((resource: any, key: number) => {
            endpointListingContent += `\t<tr>
        <td>${resource.method.toUpperCase()}</td>
        <td>${context}${resource.url}</td>
        <td>Esse endpoint faz...........</td>
    </tr>\n`;

            let methods = resource.method.split(' ');
            methods.forEach((method: string) => {
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
                        "url": "{{base_url}}${context}/${generalData.versionType=='url' ? generalData.version : ''}/${resource.url}"
                    },
                    "response": []
                }${(key +1 == api.resources.length) ? '' : ','}
                `
            });

            

        });

    });

    let sequenceContent = '';
    generalData.sequences.data.forEach((sequence: any)=>{
        sequenceContent += `A sequence ${sequence.name} realiza ______.\n 
        * É utilizado pelas APIs _____. 
        * Ela é o meio de um fluxo, que começa com _____, vem para ____ e depois parte para _____. No final, ______ acontece` 
    });

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

<h3 style="color: #fa0">Os servidores afetados pelo código são:</h3>

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
   

    extra.setVars ? fs.writeFileSync(`./src/media/ExtraResources/setVars.txt`,varsContent) : null;
    extra.creation ? fs.writeFileSync(`./src/media/ExtraResources/creation.json`, JSON.stringify(generalData)): null;
    extra.defining ? fs.writeFileSync(`./src/media/ExtraResources/defining.md`, definingContent) : null; 
    extra.postman ? fs.writeFileSync(`./src/media/ExtraResources/postmanCollection.json`, postmanCollectionContent) : null,


    ConsoleLog.success("---------------- Extra Resources have been created -----------------")
}