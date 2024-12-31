import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { errorNotFound } from "src/errors/errorNotFound";
import { Response } from "express";

@Catch(errorNotFound)
export class filterProdutoNotFound implements ExceptionFilter{
      catch(exception: any, host: ArgumentsHost) {
            const ctx = host.switchToHttp();
            const res = ctx.getResponse<Response>();

            res.status(404).json({
                  statusCode: 404,
                  message: exception.message
            })
      }
}