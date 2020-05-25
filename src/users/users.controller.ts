import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, UseFilters, Param, HttpException, HttpStatus, Delete, Put, SetMetadata, Logger, Request, Redirect } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserRO } from './user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { User } from './user.decorator';

@Controller('users')

export class UsersController {
    constructor(private usersService: UsersService) { }
    private logger = new Logger('PostsController');

    private logData(options: any){
        options.user && this.logger.log('USER' + JSON.stringify(options.user));
        options.data && this.logger.log('DATA' + JSON.stringify(options.data));
        options.id && this.logger.log('TASK' + JSON.stringify(options.id));
    }

    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user")
    showAllUsers() {
        return this.usersService.showAll();
    }

    @Post('/create')
    // @UseGuards(AuthGuard, RolesGuard)
    // @Roles("admin", "user")
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    createUser(@Body() data: UserDTO ) {
        this.logData({data})
        return this.usersService.register(data);
    }

    @Get(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user")
    readUser(@Param('id') id: string) {
        return this.usersService.read(id)
    }


    @Put(':id')
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user")
    updateUser(@Param('id') id: string , @Body() data: Partial<UserDTO>) {
        return this.usersService.update(id ,data)
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin")
    deleteUser(@Param('id') id: string) {
        return this.usersService.delete(id)
    }

    @Post('/login')
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    login(@Body() data) {
        return this.usersService.login(data);
    }

    @Get('/me/:token')
    @UseGuards(AuthGuard)
    getInfo(@Param('token') token: string) {
        return this.usersService.getInfor(token);
    }

    @Get(':query')
    @UseGuards(AuthGuard)
    search(@Param('query') query: string) {
        return this.usersService.search(query);
    }

    @Put('changePassword')
    @UseGuards(AuthGuard)
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    changePasswrod(@Body() data: string, @Param('') user :Partial<UserDTO>, @User('id') id: string){
        return this.usersService.changePassword(id , user, data )
    }

    @Get('/confirm/:email')
    confrim(){
        return Redirect('http://localhost:3000')
    }
}
