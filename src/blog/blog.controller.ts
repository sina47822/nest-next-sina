import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogDto } from './dtos/blog.dtos';
import { BlogService } from './blog.service';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
    
    constructor (
        private readonly blogservice: BlogService
    ) {}

    @Get()
    findAll(@Query() queryParams) {
        return this.blogservice.findAll()
    }

    @Post()
    create(@Body() body: BlogDto) {
        return this.blogservice.create(body)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.blogservice.fineOne(id)
    }

    // @Get('category')
    // findAllCategiries() {
    //     return 'find all categories';
    // }

    // @Get('tag')
    // findAllTags() {
    //     return 'find all tags';
    // }

    @Put(':id')
    uodate(@Param('id') id : string, @Body() body: BlogDto) {
        return this.blogservice.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.blogservice.delete(id)
    }
}
