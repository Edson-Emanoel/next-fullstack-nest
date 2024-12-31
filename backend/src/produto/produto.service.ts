import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/db/prisma.service';
import { ErrorProdutoNomeExistes } from './errors/ErrorProdutoNomeExistes';
import { errorNotFound } from 'src/errors/errorNotFound';

@Injectable()
export class ProdutoService {
  constructor(private readonly prismaService: PrismaService){}

  async create(createProdutoDto: CreateProdutoDto) {
    const productsExists = await this.prismaService.produto.findFirst({
      where: { nome: createProdutoDto.nome }
    })

    if(productsExists){
      throw new ErrorProdutoNomeExistes(createProdutoDto.nome)
    }
    
    return this.prismaService.produto.create({
      data: createProdutoDto,
    })
  }

  findAll() {
    return this.prismaService.produto.findMany();
  }

  async findOne(id: number) {
    const produto = await this.prismaService.produto.findUnique({
      where: {id}
    });
    
    if(!produto){
      throw new errorNotFound('Produto', 'id', id)
    }

    return produto

  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    
    const produto = await this.prismaService.produto.findUnique({
      where: { id },
    });

    if(!produto){
      throw new errorNotFound('Produto', 'id', id)
    }

    return this.prismaService.produto.update({
      where: {id},
      data: updateProdutoDto
    });
  }

  async remove(id: number) {
    const produto = await this.prismaService.produto.findUnique({
      where: { id },
    });

    if(!produto){
      throw new errorNotFound('Produto', 'id', id)
    }

    return this.prismaService.produto.delete({
      where: {id}
    });
  }
}