import { CreatePessoaDto } from './create-pessoa.dto';

export interface UpdatePessoaDto extends Partial<CreatePessoaDto> {
      id: number;
}