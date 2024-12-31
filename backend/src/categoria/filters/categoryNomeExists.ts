import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { errorCategoryNome } from "../errors/errorCategoryNome";
import { Response } from "express"

@Catch(errorCategoryNome)
export class categoryFilterNomeExists implements ExceptionFilter{
      catch(exception: any, host: ArgumentsHost) {
          const ctx = host.switchToHttp();
          const res = ctx.getResponse<Response>();

          res.status(409).json({
            statusCode: 409,
            message: exception.message
          })
      }

}