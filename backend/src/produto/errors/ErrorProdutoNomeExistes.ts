export class ErrorProdutoNomeExistes extends Error{
      constructor(nome: string){
            super(`O produto com nome ${nome} já existe!`)
      }
}