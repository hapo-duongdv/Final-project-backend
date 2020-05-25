import { Controller, Delete, Param, HttpException, HttpStatus, Body, Get, UseGuards, ValidationPipe, Post, UseFilters, Put, Logger, UsePipes } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';
import { User } from 'src/users/user.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserDTO } from 'src/users/user.dto';
import { PostsService } from './posts.service';
import { PostDTO } from './post.dto';

@Controller('posts')
export class PostsController {

    private logger = new Logger('PostsController');
    
    constructor(private postsService: PostsService) { }

    private logData(options: any){
        options.user && this.logger.log('USER' + JSON.stringify(options.user));
        options.data && this.logger.log('DATA' + JSON.stringify(options.data));
        options.id && this.logger.log('TASK' + JSON.stringify(options.id));
    }

    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user")
    showAll() {
        return this.postsService.showAll();
    }

    @Post('/create')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user")
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    create( @Body() data: PostDTO, @User('id') user) {
        this.logData({ data, user });
        return this.postsService.create(data, user);
    }

    @Get(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user")
    read(@Param('id') id: string) {
        return this.postsService.read(id)
    }


    @Put(':id')
    @UseGuards(AuthGuard,RolesGuard )
    @Roles("user")
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    update(@Param('id') id: string ,@Body() data: Partial<PostDTO>) {
        this.logData({ id, data });
        return this.postsService.update(id, data);
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user")
    delete(@Param('id') id: string) {
        this.logData({ id });
        return this.postsService.delete(id);
    }
}
