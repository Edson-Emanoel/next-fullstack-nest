import { CreateCategoriaDto } from './create-categoria.dto';

export interface UpdateCategoriaDto extends Partial<CreateCategoriaDto> {
      id: number;
}