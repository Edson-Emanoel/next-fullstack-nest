import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ErrorFilmeTitle } from "../erros/ErrorFilmeTitle";
import { Response } from "express";

@Catch(ErrorFilmeTitle)
export class FilterTitle implements ExceptionFilter{
      catch(exception: any, host: ArgumentsHost) {
          const ctx = host.switchToHttp();
          const response = ctx.getResponse<Response>();

          response.status(409).json({
            statusCode: 409,
            message: exception.message
          });
      }

}