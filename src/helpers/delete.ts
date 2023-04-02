import fs from 'fs-extra';

export const deleteAll = (files: any, path: any)=>{
    files.forEach((el: any)=>{
        fs.statSync(path+el).isDirectory() ? fs.rm(path+el, {recursive: true, force: true}) : fs.unlinkSync(path+el)
    });
}

export const deleteSpecific = (files: string[], path: string, specific: any)=>{
    console.log('deletando', specific)

    switch(specific){
        case 'directories':  
        case 'folders': 
            
            files.forEach((el: any)=>{
                console.log(el)
                if(fs.statSync(path+end).isDirectory())
                    fs.rm(path, {recursive: true, force: true});
            });
    }


    // files.forEach((el: any)=>{
    //     (fs.statSync(path+specific).isDirectory()) ? fs.rm(path+specific, {recursive: true, force: true}) : fs.unlinkSync(path+el)
    // });
}