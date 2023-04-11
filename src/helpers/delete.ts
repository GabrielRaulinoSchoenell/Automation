import fs from 'fs-extra';

export const deleteAll = (files: any, path: any)=>{
    console.log('Deletando todos os arquivos......\n')
    files.forEach((el: any)=>{
        fs.statSync(path+el).isDirectory() ? fs.rmSync(path+el, {recursive: true, force: true}) : fs.unlinkSync(path+el)
    });
}

export const deleteSpecific = (files: string[], path: string, specific: any)=>{


    // if(specific == 'directories' || specific == 'folders'){
    //     files.forEach((el: any)=>{
    //         if(fs.statSync(path).isDirectory())
    //             fs.rm(path+el, {recursive: true, force: true});
    //     });
    //     return;
    // }

    // if(specific == 'files'){
    //     files.forEach((el: any)=>{
    //         (fs.statSync(path+specific).isDirectory()) ? fs.rm(path+specific, {recursive: true, force: true}) : fs.unlinkSync(path+el)
    //     });
    //     return;
    // }

    let directories: any = [];
    files.forEach((el)=>{
        fs.statSync(path+el).isDirectory() ? directories.push(el) : null;
    });

    // console.log(directories)

    files.forEach((el: any)=>{
        if(fs.existsSync(path+specific)){
            directories.forEach((dir: any)=>{
                deleteSpecific(fs.readdirSync(path+el), path+el, specific);
            });
        }
        
        // if (fs.statSync(path+el).isDirectory() && el == specific){
        //     fs.rm(path+specific, {recursive: true, force: true})
        // } else if(fs.statSync(path+el).isDirectory()){
        //     let files = fs.readdirSync(path+el);
        //     console.log(files);
        //     deleteSpecific(files, path+el, specific)
        // }
        // if(el == specific){    
        //     console.log('deletando', specific)
        //     specific.indexOf('.') > -1  ? fs.unlinkSync(path+el) : null
        // } 

        // if(fs.statSync(path+specific).isDirectory()){
        //     console.log(el);
            // deleteSpecific(el, path+el, specific);
        // }
      
        //  ? fs.rm(path+specific, {recursive: true, force: true}) : 
    });
}