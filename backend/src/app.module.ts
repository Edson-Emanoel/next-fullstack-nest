import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { ProdutoModule } from './produto/produto.module';
// import { FilmeModule } from './filme/filme.module';
import { CategoriaModule } from './categoria/categoria.module';
import { FilmeModule } from './filme/filme.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [DbModule, ProdutoModule, CategoriaModule, FilmeModule, PessoaModule, PokemonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
