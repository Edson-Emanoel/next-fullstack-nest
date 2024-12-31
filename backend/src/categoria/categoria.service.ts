import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/db/prisma.service';
import { errorCategoryNome } from './errors/errorCategoryNome';

@Injectable()
export class CategoriaService {
  constructor(private readonly prismaService:PrismaService){}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoryExists = await this.prismaService.categoria.findFirst({
      where: { nome: createCategoriaDto.nome }
    })

    if (categoryExists){
      throw new errorCategoryNome(createCategoriaDto.nome);
    }

    return this.prismaService.categoria.create({
      data: createCategoriaDto
    });
  }

  findAll() {
    return this.prismaService.categoria.findMany();
  }

  findOne(id: number) {
    return this.prismaService.categoria.findUnique({
      where: { id }
    });
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return this.prismaService.categoria.update({
      where: { id },
      data: updateCategoriaDto
    });
  }

  remove(id: number) {
    return this.prismaService.categoria.delete({
      where: { id }
    });
  }
}