import { Module, OnModuleInit } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { DbModule } from 'src/db/db.module';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  imports: [DbModule],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})

export class ProdutoModule implements OnModuleInit{
  constructor(
    private prismaService: PrismaService,
    private produtoService: ProdutoService
  ){}

  async onModuleInit() {
    const products = new Array(100).fill(0).map((_, index) => index + 1);

    await this.prismaService.produto.deleteMany();

    for (const produtoIndex of products){
      await this.produtoService.create({
        nome: `Product ${produtoIndex}`,
        descricao: `Product ${produtoIndex}`,
        preco: produtoIndex * 100
      })
    }
  }
}