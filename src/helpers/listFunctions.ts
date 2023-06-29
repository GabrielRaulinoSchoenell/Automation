import * as xmlReader from 'xml2js';

export const listApis = (generalData: any)=>{
    const data: any = {
        apiContext: '',
        apiResources: ''
    };
    xmlReader.parseString(generalData, (err, result)=>{
        console.log("--- lendo arquivo", result.api.resource, " ---");
        data.apiContext = result.api.$.context
        result.api.resource.forEach((resource: any)=>{
            data.apiResources += ' ' + (resource.$["uri-template"] ? resource.$["uri-template"] : resource.$["uri-mapping"])
        })
    });
    
    return data;
}