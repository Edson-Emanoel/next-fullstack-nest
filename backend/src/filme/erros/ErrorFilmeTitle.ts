export class ErrorFilmeTitle extends Error{
      constructor(title: string){
            super(`Esse filme ${title} já existe!`)
      }
}