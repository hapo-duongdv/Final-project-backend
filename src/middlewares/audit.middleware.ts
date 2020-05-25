// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { UsersService } from 'src/users/users.service';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware<Request|any, Response> {
//   constructor(private readonly userService: UsersService) {}
//   async use(req: Request|any, res: Response, next: Function) {
    
//     const token = req.header('authorization');
//     if(!token) {
//       next();
//       return;
//     }
//     const user = await this.userService.getUserByToken(token);
//     if(!user) {
//       next();
//       return;
//     }
//     req.user = user;
//     next();
//   }
// }