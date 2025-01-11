export const getErrorMessage = (error : Error) => {
    const lineInfo = error.stack?.split('about:srcdoc:')?.[1]?.split(":")
    console.log(lineInfo)
    if(lineInfo){
        return [`${error.toString()}`,`at index.js:${parseInt(lineInfo[0]) - 22}:${lineInfo[1]}`]
        
    }
    return [error.toString()]
}