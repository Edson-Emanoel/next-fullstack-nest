import { Module } from '@nestjs/common';
import { FilmeService } from './filme.service';
import { FilmeController } from './filme.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [FilmeController],
  providers: [FilmeService],
})
export class FilmeModule {}
