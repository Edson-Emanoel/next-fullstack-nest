import { Injectable } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class FilmeService {
  constructor(private readonly prismaService:PrismaService){}

  create(createFilmeDto: CreateFilmeDto) {
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
