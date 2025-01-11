export type Code = {
  html: string,
  css: string,
  js: string
}
export enum CodeLayout{
  LEFT,TOP,RIGHT
}

export type ConsoleMessage = {
  method:string
  args:any[]
}

export type ConsoleMessageWrapper = {
  [id:string] : ConsoleMessage
}