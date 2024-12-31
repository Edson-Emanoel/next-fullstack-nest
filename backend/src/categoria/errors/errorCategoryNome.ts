export class errorCategoryNome extends Error {
      constructor(nome: string){
            super(`Categoria com nome ${nome} já existe!`)
      }
}