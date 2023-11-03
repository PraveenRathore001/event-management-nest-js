import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const ExtractId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization.split(' ')[1];    
    const decode: any = jwt.decode(token);    
    const userId = decode.id;      
    return userId;
  },
);   