import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProdutoNomeExisteFilter } from './produto/filters/ProdutoNomeExisteFilter';
import { FilterTitle } from './filme/filter/FilterTitle';
import { categoryFilterNomeExists } from './categoria/filters/categoryNomeExists';
import { filterPessoaNomeExists } from './pessoa/filters/filterPessoaNomeExists';
import { filterProdutoNotFound } from './produto/filters/filterProdutoNotFound';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  // Registrando o seu filtro
  app.useGlobalFilters(
    new ProdutoNomeExisteFilter(),
    new filterProdutoNotFound(),
    new FilterTitle(),
    new categoryFilterNomeExists(),
    new filterPessoaNomeExists(),
  )

  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();