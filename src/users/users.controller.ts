import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, UseFilters, Param, HttpException, HttpStatus, Delete, Put, SetMetadata, Logger, Request, Redirect, Res, Query } from '@nestjs/common';
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
    show() {
        return this.usersService.show();
    }

    @Get('/page')
    showAllUsers(@Query('page') page: number) {
        return this.usersService.showAll(page);
    }

    @Post('/create')
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    createUser(@Body() data: UserDTO) {
        this.logData({ data })
        return this.usersService.register(data);
    }

    @Get(':id')
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

    @Get('/search/:query')
    search1(@Param('query') query: string) {
        return this.usersService.search1(query);
    }

    @Get('/find-chat/:username')
    findByUsername(@Param('username') username: string) {
        return this.usersService.findByUsername(username);
    }

    @Put('/changePassword/:username')
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    changePasswrod(@Body() data: Partial<UserDTO>, @Param('username') username: string) {
        return this.usersService.changePassword(data, username)
    }

    @Get('/send-email/:username')
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    sendEmail(@Param('username') username: string) {
        return this.usersService.sendEmail(username)
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


    @Post('/unfollow-post/:id')
    @UseGuards(AuthGuard)
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    unfollowPost(@Param('id') id: string, @Body() data: Partial<PostRO>) {
        return this.usersService.unFollowPost(id, data);
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

    @Get('/searchPage/:searchBy/:query')
    search(@Param('query') query: string, @Param('searchBy') searchBy: string, @Query('page') page: number) {
        return this.usersService.searchPage(query, searchBy, page);
    }
    @Get('/search/:searchBy')
    searchPage(@Query('query') query: string, @Param('searchBy') searchBy: string) {
        return this.usersService.search(query, searchBy);
    }

    @Get('/search')
    searchOther(@Query('query') query: string) {
        return this.usersService.searchOther(query);
    }
}
