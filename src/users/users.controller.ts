import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, UseFilters, Param, HttpException, HttpStatus, Delete, Put, SetMetadata, Logger, Request, Redirect, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserRO } from './user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { User } from './user.decorator';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PostRO } from 'src/posts/post.dto';


@Controller('users')

export class UsersController {
    SERVER_URL: string = "http://localhost:4000/users/";
    constructor(private usersService: UsersService) { }
    private logger = new Logger('PostsController');

    private logData(options: any) {
        options.user && this.logger.log('USER' + JSON.stringify(options.user));
        options.data && this.logger.log('DATA' + JSON.stringify(options.data));
        options.id && this.logger.log('TASK' + JSON.stringify(options.id));
    }

    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user", "admin")
    showAllUsers() {
        return this.usersService.showAll();
    }

    @Post('/create')
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    createUser(@Body() data: UserDTO) {
        this.logData({ data })
        return this.usersService.register(data);
    }

    @Get(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user", "admin")
    readUser(@Param('id') id: string) {
        return this.usersService.read(id)
    }


    @Put(':id')
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user", "admin")
    updateUser(@Param('id') id: string, @Body() data: Partial<UserDTO>) {
        return this.usersService.update(id, data)
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user", "admin")
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

    @Get('/search/:query')
    search(@Param('query') query: string) {
        return this.usersService.search(query);
    }

    @Put('changePassword')
    @UseGuards(AuthGuard)
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    changePasswrod(@Body() data: string, @Param('') user: Partial<UserDTO>, @User('id') id: string) {
        return this.usersService.changePassword(id, user, data)
    }

    @Get('/confirm/:email')
    confrim() {
        return Redirect('http://localhost:3000')
    }

    @Post('/follow/:id')
    @UseGuards(AuthGuard)
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    follow(@Param('id') id: string, @Body() data: Partial<UserRO>) {
        return this.usersService.follow(id, data);
    }

    @Post('/follow-post/:id')
    @UseGuards(AuthGuard)
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    followPost(@Param('id') id: string, @Body() data: Partial<PostRO>) {
        return this.usersService.followPost(id, data);
    }

    @Post('/:id/unfollow')
    @UseGuards(AuthGuard)
    unfollow(@Param('id') following: string, @Body() follower: Partial<UserRO>) {
        return this.usersService.unfollow(following, follower);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image',
        {
            storage: diskStorage({
                destination: './avatar',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                }
            })
        }))
    uploadFile(@UploadedFile() file) {
        console.log(file);
        return file;
    }

    @Get('/image/:imgPath')
    seeUploadedFile(@Param('imgPath') image, @Res() res) {
        return res.sendFile(
            image, { root: 'avatar' }
        )
    }
}
