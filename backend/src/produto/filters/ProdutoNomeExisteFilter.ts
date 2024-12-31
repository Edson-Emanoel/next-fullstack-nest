import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ErrorProdutoNomeExistes } from "../errors/ErrorProdutoNomeExistes";
import { Response } from "express";

@Catch(ErrorProdutoNomeExistes)
export class ProdutoNomeExisteFilter implements ExceptionFilter{
      catch(exception: any, host: ArgumentsHost) {
          const ctx = host.switchToHttp();
          const response = ctx.getResponse<Response>();

          response.status(409).json({
            statusCode: 409,
            message: exception.message
          });
      }

}