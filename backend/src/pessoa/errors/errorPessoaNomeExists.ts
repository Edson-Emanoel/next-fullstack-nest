export class errorPessoaNomeExists extends Error{
      constructor(nome: string){
            super(`Já existe uma pessoa com o Nome ${nome}`)
      }
}