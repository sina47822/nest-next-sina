import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, blogSchema } from './schemas/blog.schemas';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [MongooseModule.forFeature([{
    name: Blog.name,
    schema:blogSchema
  }])],
  exports: [],
})
export class BlogModule {
    
}
