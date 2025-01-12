"use client"
import { getErrorMessage } from "@/common/codeview.helper";
import { getSrcDoc } from "@/common/editor.helper";
import { Code, CodeLayout, ConsoleMessageWrapper } from "@/common/types";
import CodeEditor from "@/components/common/CodeEditor";
import Navbar from "@/components/common/Navbar";
import CodeMirror from '@uiw/react-codemirror';
import {json} from '@codemirror/lang-json'
import { useEffect, useState } from "react";
import {consoleDark} from '@uiw/codemirror-theme-console'
import { javascript } from "@codemirror/lang-javascript";






export default function CodeView() {
  const [code, setCode] = useState<Code>({ html: "", css: "", js: "" })
  const [srcDoc, setSrcDoc] = useState("")
  const [layout, setLayout] = useState<CodeLayout>(CodeLayout.TOP)
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessageWrapper>({})
  const [isConsoleOpen, setIsConsoleOpen] = useState(false)
  const handleCodeChange = (language: string) => {
    return function (newCode: string | undefined) { 
      switch (language) {
        case 'js': {
          setCode((oldCode) => ({ ...oldCode, js: newCode || "" }));
          break;
        }
        case 'html': {
          setCode((oldCode) => ({ ...oldCode, html: newCode || ""}));
          break;
        }
        case 'css': {
          setCode((oldCode) => ({ ...oldCode, css: newCode || ""}));
          break;
        }
      }

    }
  }



  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(getSrcDoc({ ...code }))
    }, 500)
    return () => clearTimeout(timeout)
  }, [code])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data?.method) return;
      setConsoleMessages((oldMessages) => {
        const newMessages = {...oldMessages}
        const newKey = event.data.id.toString()+'|'+event.data.method+'|'+event.data.args.toString()
        if(!(newKey in newMessages) || typeof event.data.args === 'object'){
          newMessages[newKey] = event.data.method === 'error' ? {...event.data,args:getErrorMessage(event.data.args[0])}  :  event.data
        }
        return newMessages
      })
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className="flex flex-col h-[100vh]">
      <Navbar layout={layout} handleLayoutChange={(layout: CodeLayout) => setLayout(layout)} />
      <div className={`flex h-full ${layout === CodeLayout.TOP ? 'flex-col' : layout === CodeLayout.LEFT ? 'flex-row' : 'flex-row-reverse'}`}>

        <div className={`flex
           ${layout === CodeLayout.TOP ? 'flex-row  w-full h-[300px] gap-1' : 'flex-col w-[400px] h-full'}
          `}>
          <CodeEditor width="100%" height="300px" language="html" code={code.html} onChange={handleCodeChange('html')} />
          <CodeEditor width="100%" height="300px" language="css" code={code.css} onChange={handleCodeChange('css')} />
          <CodeEditor width="100%" height="300px" language="javascript" code={code.js} onChange={handleCodeChange('js')} />
        </div>
        <div className="flex-1 flex flex-col relative"> 
            <iframe
              sandbox="allow-scripts allow-same-origin"
              srcDoc={srcDoc}
              width="100%"
              height="100%"
            /> 
          <div className={`${isConsoleOpen ? 'h-[400px]' : 'h-16'} w-full absolute bottom-0 h-16 bg-black flex flex-col justify-center items-start px-2`}>
            <button onClick={() => setIsConsoleOpen(oldValue => !oldValue)} className="p-2 bg-zinc-600 text-white font-bold rounded-sm hover:bg-zinc-700 mt-2 mb-4">Console</button>
            <div className={isConsoleOpen ? 'flex-1 w-full  overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500' : 'hidden'}>
              {Object.entries(consoleMessages).map(([key,{ method, args }]) => method === 'log' ? <div key={key} className="text-white w-full px-4 py-2 border-t border-gray-600">
                <p>{args.join(" ")}</p>
                {args.filter(arg => typeof arg === 'object').map(arg => <CodeMirror
                    value={JSON.stringify(arg,null,2)}
                    width='100%' 
                    extensions={[javascript()]}
                    onChange={(val) => {}} 
                    theme={consoleDark}
                    basicSetup={{
                      lineNumbers:false
                    }}

                /> )}
              </div> : <div key={key} className="text-white bg-red-800 w-full px-4 py-2 border-t border-gray-600">
                  <span>{args[0]}</span><br/><span className="px-[50px]">{args[1]}</span>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
