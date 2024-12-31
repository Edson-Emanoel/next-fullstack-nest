import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PrismaService } from 'src/db/prisma.service';
import { errorPessoaNomeExists } from './errors/errorPessoaNomeExists';

@Injectable()
export class PessoaService {
  constructor(private readonly prismaService:PrismaService){}

  async create(createPessoaDto: CreatePessoaDto) {
    const pessoaExists = await this.prismaService.pessoa.findFirst({
      where: { nome: createPessoaDto.nome }
    })

    if(pessoaExists){
      throw new errorPessoaNomeExists(createPessoaDto.nome);
    }

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
