import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dtos/blog.dtos';

@Injectable()
export class BlogService {
    private blogs = [
        {_id: 1, title: "title 1", content: "content 1"},
        {_id: 2, title: "title 2", content: "content 2"},
    ];

    findAll() {
        return this.blogs
    }

    fineOne(id: string) {
        const blog = this.blogs.find((item) => item._id.toString() === id);

        if (blog) {
            return blog;
        } else {
            throw new NotFoundException;
        }
    }

    create(body: BlogDto) {
        const id = Math.random();
        const newBlog = { ...body, _id:id };

        this.blogs.push(newBlog);
        return newBlog;
    }

    update(id:string, body: BlogDto) {
        const blog = this.fineOne(id)

        blog.title = body.title;
        blog.content = body.content;

        return blog;
    }

    delete(id:string) {
        const blog = this.fineOne(id);

        const newBlogs = this.blogs.filter((item) => item._id !== blog._id);

        this.blogs = newBlogs;
    }
}
