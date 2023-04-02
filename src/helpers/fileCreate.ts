import fs from 'fs-extra';
import { generalData } from '../types/generalData';
import * as Data from '../types/Data';

let template: string;
let started: boolean = false;

let properties: any = [];
let dependencies: any = [];

let path = './src/media/'

export const PomEArtifact = (pomEArtifactData: any, generalData: any)=>{
    let template = generalData.encodePattern == 'nameAfter' ? pomEArtifactData.type : '';

    console.log("Pom e artifact data:", pomEArtifactData.data)
    pomEArtifactData.data.forEach((el: any, key: number)=>{
        properties.push(`<${generalData.groupId}.${pomEArtifactData.type}_._${el.name}${template}>capp/EnterpriseServiceBus</${generalData.groupId}.${pomEArtifactData.type}_._${el.name}${template}>\n`);
        dependencies.push(`
<dependency>
    <groupId>${generalData.groupId}.${pomEArtifactData.type}</groupId>
    <artifactId>${el.name}${template}</artifactId>
    <version>1.0.0</version>
    <type>zip</type>
</dependency>`);
        
    }); 

}
export const WritePomEArtifact = ()=>{

    fs.writeFileSync(path+'pom.xml', '');

    properties.forEach((el: string)=>{
        fs.appendFileSync('./src/media/pom.xml', el);
    });
        fs.appendFileSync(`${path}pom.xml`, '\n')
    
    dependencies.forEach((el: string)=>{
        fs.appendFileSync('./src/media/pom.xml', el);
    })
    
}

export const apis = (apiData: Data.Apis, generalData: generalData)=>{
    template = generalData.encodePattern == 'nameAfter' ? apiData.type: '';  
}

export const Sequences = (sequenceData: Data.Sequences, generalData: generalData)=>{
    template = generalData.encodePattern == 'nameAfter' ? sequenceData.type: '';  

    PomEArtifact(sequenceData, generalData);

    let fileContent = '';

    sequenceData.data.forEach((el: any, key: number) => {
        switch(el.name){
            case 'EnvironmentVariables': EnvironmentVariablesSequence(template, generalData);
                break;
            default:  
            fs.writeFileSync(`./src/media/${el.name}${template}.xml`, `
<?xml version="1.0" encoding="UTF-8"?>
<sequence name="${el.name}${template}" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
    <log level="custom">
        <property name="entrando na sequence" value="${el.name}${template}"/>
    </log>    
</sequence>
                    `)
        }
        (el.name ='EnvironmentVariables') ? EnvironmentVariablesSequence(template, generalData) : null;


       
    });

}

const EnvironmentVariablesSequence = (template: string, data: any)=>{
    let properties = '';
    data.env.forEach((el: any, key: string)=>{
        properties += `\n\t<property expression="get-property('env', '${el.var}')" name="${el.name}" scope="default" type="STRING"/>` 
    });

    fs.writeFileSync(`./src/media/EnvironmentVariablesSequence${template}.xml`, `
<?xml version="1.0" encoding="UTF-8"?>
<sequence name="EnvironmentVariablesSequence${template}" trace="disable" xmlns="http://ws.apache.org/ns/synapse">${properties}
</sequence>
        `)
}



export const DataServices = (dataServiceData: any, generalData: any)=>{
    template = generalData.encodePattern == 'nameAfter' ? 'DSS' : '';

    PomEArtifact(dataServiceData, generalData);

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
</data>
    
        
        `);
    });
}

export const finalize = ()=>{
    started = false;
    WritePomEArtifact();
    properties = [];
    dependencies = [];
};