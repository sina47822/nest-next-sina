import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogCategoryService } from '../services/blog-category.service';
import { BlogCategoryQueryDto } from '../dtos/blog-category-query.dtos';
import { BlogCategoryDto } from '../dtos/blog-category.dtos';

@ApiTags('BlogCategory')
@Controller('blog-category')
export class BlogCategoryController {
    
    constructor (
        private readonly blogCategoryService: BlogCategoryService
    ) {}

    @Get()
    findAll(
        @Query() queryParams: BlogCategoryQueryDto
    ) {
        return this.blogCategoryService.findAll(queryParams);
    }

    @Post()
    create(@Body() body: BlogCategoryDto) {
        return this.blogCategoryService.create(body);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.blogCategoryService.fineOne(id);
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
    update(
        @Param('id') id : string,
        @Body() body: BlogCategoryDto,
    ) {
        
            return this.blogCategoryService.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.blogCategoryService.delete(id)
    }
}
