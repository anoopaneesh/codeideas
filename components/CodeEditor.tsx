"use client"
import React, { useEffect, useRef } from 'react' 
import Image from 'next/image'
import { languageDetails } from '@/common/editor.constant'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { autocompletion } from '@codemirror/autocomplete'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'


interface CodeEditorProps {
    width: string
    height: string
    language: 'css' | 'html' | 'javascript',
    code: string
    onChange: (newCode: string | undefined) => void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ width, height, language, code, onChange }) => {
    const extensionsRef = useRef([autocompletion()])
    useEffect(() => {
        switch(language){
            case 'javascript' : {
                extensionsRef.current.push(javascript())
                break;
            }
            case 'html':{
                extensionsRef.current.push(html())
                break;
            }
            case 'css':{
                extensionsRef.current.push(css())
                break;
            }
        }
    },[])
    return (
        <div className='flex flex-col' style={{ width: width, height: height }} >
            <div className='w-full h-10 bg-neutral-950 flex gap-1 items-center px-2'>
                <Image
                    src={languageDetails[language].image}
                    width={16}
                    height={16}
                    alt={languageDetails[language].alt}
                />
                <p className='text-white font-bold'>{languageDetails[language].title}</p>
            </div>
                <CodeMirror
                    value={code}
                    width='100%'
                    height={`calc(${height} - 24px)`}
                    extensions={extensionsRef.current}
                    onChange={(val) => onChange(val)}
                    theme={vscodeDark}
                /> 

        </div>
    )
}

export default CodeEditor
