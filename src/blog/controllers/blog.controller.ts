import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogDto } from '../dtos/blog.dtos';
import { BlogService } from '../services/blog.service';
import { BlogQueryDto } from '../dtos/blog-query.dtos';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
    
    constructor (
        private readonly blogservice: BlogService
    ) {}

    @Get()
    findAll(@Query() queryparams: BlogQueryDto) {
        console.log('Raw Query Params:', queryparams);
        console.log('Page Type:', typeof queryparams.page);
        console.log('Limit Type:', typeof queryparams.limit);
        return this.blogservice.findAll(queryparams);
    }

    @Post()
    create(@Body() body: BlogDto) {
        return this.blogservice.create(body);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.blogservice.fineOne(id);
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
    update(@Param('id') id : string, @Body() body: BlogDto) {
        return this.blogservice.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.blogservice.delete(id)
    }
}
