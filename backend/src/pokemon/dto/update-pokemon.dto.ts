import { CreatePokemonDto } from './create-pokemon.dto';

export interface UpdatePokemonDto extends Partial<CreatePokemonDto> {
      id: number;
}
