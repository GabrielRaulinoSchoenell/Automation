import fs from 'fs-extra';

let template: string;
let started: boolean = false;

export const PomEArtifact = (pomEArtifactData: any, generalData: any)=>{
    let properties: any = [];

    !started ? fs.writeFileSync('./src/media/pom.xml', '') : null;
    started = true;

    console.log(pomEArtifactData)
    pomEArtifactData.forEach((el: any, key: number)=>{
        
        properties.push(`<${generalData.groupId}.${pomEArtifactData.type}_._${el}${template}>capp/EnterpriseServiceBus</${generalData.groupId}.${pomEArtifactData.type}_._${el}${template}>\n`);
        fs.appendFileSync('./src/media/pom.xml', properties[key]);
    }); 

    pomEArtifactData.forEach((el: any, key: number)=>{
        let template = generalData.encodePattern == 'nameAfter' ? pomEArtifactData.type : '';
        properties.push(`<dependency>\n<groupId>${generalData.groupId}.${pomEArtifactData.type}</groupId>\n<artifactId>${el}${template}</artifactId>\n<version>1.0.0</version>\n<type>zip</type>\n</dependency>`);
        fs.appendFileSync('./src/media/pom.xml', properties[key + pomEArtifactData.length]);
    }); 

    console.log(properties);
}

export const Sequences = (sequenceData: any, generalData: any)=>{
    template = generalData.encodePattern == 'nameAfter' ? 'Sequence' : '';  

    PomEArtifact(sequenceData, generalData);

    sequenceData.forEach((el: string, key: number) => {
        fs.writeFileSync(`./src/media/${el}${template}.xml`, `
<?xml version="1.0" encoding="UTF-8"?>
<sequence name="${el}${template}" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
    <log level="custom">
        <property name="entrando na sequence" value="${el}${template}"/>
    </log>    
</sequence>
        `)
    });
}

export const DataServices = (dataServiceData: any, generalData: any)=>{
    template = generalData.encodePattern == 'nameAfter' ? 'DSS' : '';

    PomEArtifact(dataServiceData, generalData);


    dataServiceData.forEach((el: any, key: number)=>{
        let config = '';
        let query = `<query id="${el.function} keyColumns="${el.properties[0]}" useConfig="database">\n`;
        let operation = `<operation name="${el.function}"><call-query href="${el.function}">`;

        el.properties.forEach((param: string)=>{
            query += `<property name="${param}" paramType="SCALAR" sqlType="STRING" />\n`;
            operation += `<with-param name="${param} query-param="${param}">` 
        });

        query += '</query>';
        operation += `</call-query>
        </operation>`;



        fs.writeFileSync(`./src/media/${el}${template}.dbo`, `
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