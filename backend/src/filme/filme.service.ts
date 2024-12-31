import { Injectable } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { PrismaService } from 'src/db/prisma.service';
import { ErrorFilmeTitle } from './erros/ErrorFilmeTitle';

@Injectable()
export class FilmeService {
  constructor(private readonly prismaService:PrismaService){}

  async create(createFilmeDto: CreateFilmeDto) {
    const filmeExiste = await this.prismaService.filme.findFirst({
      where: { titulo: createFilmeDto.titulo }
    })

    if(filmeExiste){
      throw new ErrorFilmeTitle(createFilmeDto.titulo);
    }


    return this.prismaService.filme.create({
      data: createFilmeDto
    })
  }

  findAll() {
    return this.prismaService.filme.findMany();
  }

  findOne(id: number) {
    return this.prismaService.filme.findUnique({
      where: { id }
    })
  }

  update(id: number, updateFilmeDto: UpdateFilmeDto) {
    return this.prismaService.filme.update({
      where: { id },
      data: updateFilmeDto
    })
  }

  remove(id: number) {
    return this.prismaService.filme.delete({
      where: { id }
    })
  }
}