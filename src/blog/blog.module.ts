import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [],
  exports: [],
})
export class BlogModule {
    
}
