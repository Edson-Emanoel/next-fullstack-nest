import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class PessoaService {
  constructor(private readonly prismaService:PrismaService){}

  create(createPessoaDto: CreatePessoaDto) {
    return this.prismaService.pessoa.create({
      data: createPessoaDto
    });
  }

  findAll() {
    return this.prismaService.pessoa.findMany();
  }

  findOne(id: number) {
    return this.prismaService.pessoa.findUnique({
      where: { id }
    });
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return this.prismaService.pessoa.update({
      where: { id },
      data: updatePessoaDto
    });
  }

  remove(id: number) {
    return this.prismaService.pessoa.delete({
      where: { id }
    });
  }
}
