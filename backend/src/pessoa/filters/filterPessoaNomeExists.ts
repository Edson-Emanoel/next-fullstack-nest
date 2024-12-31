import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { errorPessoaNomeExists } from "../errors/errorPessoaNomeExists";
import { Response } from "express";

@Catch(errorPessoaNomeExists)
export class filterPessoaNomeExists implements ExceptionFilter{
      catch(exception: any, host: ArgumentsHost) {
          const ctx = host.switchToHttp();
          const res = ctx.getResponse<Response>()

          res.status(409).json({
            statusCode: 409,
            message: exception.message
          })
      }
      
}