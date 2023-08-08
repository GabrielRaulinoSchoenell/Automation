export const success = (text: string)=>{
    console.log("\x1b[32m", text,"\x1b[0m");
}

export const error = (text: string)=>{
    console.log("\x1b[31m","Ocorreu um erro: " + text ,"\x1b[0m");
}
