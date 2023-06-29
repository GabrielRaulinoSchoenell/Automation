import fs from 'fs-extra';
import { generalData } from '../types/generalData';
import * as Data from '../types/Data';
import * as ConsoleLog from '../helpers/consoleLog'
import * as teste from '../types/test'

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
    
    console.log('creating pom and artifacts for the APIs')
    PomEArtifact(apiData, generalData, template);
    ConsoleLog.success("----------------- Apis have been created ---------------------");
}

export const Sequences = (sequenceData: teste.Sequence, generalData: generalData)=>{
    console.log('----------------------------------------------------------------');
    console.log('================== creating sequences ==========================');
    template = generalData.encodePattern == 'nameAfter' ? 'Sequence': '';  

    if(sequenceData.type == 'create'){
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
    }
    

    
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
