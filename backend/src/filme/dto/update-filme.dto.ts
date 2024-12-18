import { CreateFilmeDto } from './create-filme.dto';

export interface UpdateFilmeDto extends Partial<CreateFilmeDto> {
      id: number;
}