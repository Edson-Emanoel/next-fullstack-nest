import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class PokemonService {
  constructor(private readonly prismaService:PrismaService){}

  create(createPokemonDto: CreatePokemonDto) {
    return this.prismaService.pokemon.create({
      data: createPokemonDto
    });
  }

  findAll() {
    return this.prismaService.pokemon.findMany();
  }

  findOne(id: number) {
    return this.prismaService.pokemon.findUnique({
      where: { id }
    });
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return this.prismaService.pokemon.update({
      where: { id },
      data: updatePokemonDto
    })
  }

  remove(id: number) {
    return this.prismaService.pokemon.delete({
      where: { id }
    });
  }
}