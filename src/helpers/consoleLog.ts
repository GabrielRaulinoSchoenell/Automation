export const success = (text: string)=>{
    console.log("\x1b[32m", text,"\x1b[0m");
}

export const error = (text: string)=>{
    console.log("\x1b[31m","Ocorreu um erro: " + text ,"\x1b[0m");
}

export const bigLetters = (text: any)=>{

    let abc: any = {
        n: 
        `
        |\\    |
        | \\   |
        |  \\  |  
        |   \\_|
        `,
        i:
        `
        |
        |
        |
        |
        `,
        c: `
        ______
        |
        |
        |
        |_____        
        `,
        e: `
        ______
        |
        |_____
        |
        |_____
        ` 
    };

    let finalText

    for(let i = 0; i< text.length; i++){
        finalText += abc[text[i]]
    };
    console.log(finalText)

}