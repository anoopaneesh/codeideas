type getSrcDocProps = {
    css : string,
    html: string,
    js: string
}
export const getSrcDoc = ({css,html,js} : getSrcDocProps) => {
    return `
    <html>
     <head>
      <style> ${css} </style> 
       
     </head> 
     <body>  
  ${html} 
      <script>
        var __console__index = 0;
        var __console__methods = ["log","error"]
        for(var __i=0;__i<__console__methods.length;__i++){
            let method = __console__methods[__i]
            let prev = console[method].bind(this)
            console[method] = function(...args){
                window.parent.postMessage({method,args,id:__console__index++})
                prev(...args)
            }
        }
      </script>
      <script>
      try{
        ${js}
      }catch(error){
        console.error(error)
        }
       
       </script> 

      </body>
      </html>
    `
}