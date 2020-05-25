import { createParamDecorator } from '@nestjs/common';

export const Data = createParamDecorator(
  (data, req) => {
    return data ? req.user[data] : req.user;
  }
);
