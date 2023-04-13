import fs from 'fs-extra';
import * as xmlReader from 'xml2js';


let generalData: any = {
    project: "",
    description: "",
    groupId: "br.com.intelbras",
    encodePattern: "nameAfter",
    projectUrl: "",
    version: "1.0",
    versionType: "",
    extra: {
       setVars: true,
       drawio: false,
       defining: true,
       requestHelp: true,
       store: false,
       creation: false,
       postman: true
    },
    apis: {
        type: 'api',
        data: []
    },
    sequences: {
        type: 'sequence',
        data: []
    }
}

export const readFile = (file: any)=>{
    let xmlFile = fs.readFileSync(file);

    xmlReader.parseString(xmlFile, (err, result)=>{
        result.api ? generalData.apis.data.push(readAPIs(result.api)) : null;
        result.sequence ? generalData.sequences.data.push(readSequences(result.sequence)) : null;
    });

}

export const readAPIs = (data: any)=>{
    let resources: any = []
    data.resource.forEach((el: any)=>{
        resources.push({
            method: el.$.methods,
            url: el.$['uri-template']
          },)
    })

    data =  {
        name: data.$.name,
        context: data.$.context,
        resources
      }

      return data
}

export const readSequences = (data: any)=>{
    data =  {
        name: data.$.name
      }

      return data
}


export const readDir = (directory: any)=>{
    let dir = fs.readdirSync(directory);

    dir.forEach((file: any)=>{
        fs.statSync(directory+file).isDirectory() ? readDir(directory+file+'/') : readFile(directory+'/'+file);
    });

    return generalData;
}