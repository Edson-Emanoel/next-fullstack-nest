import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { ProdutoModule } from './produto/produto.module';
import { FilmeModule } from './filme/filme.module';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [DbModule, ProdutoModule, FilmeModule, CategoriaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
