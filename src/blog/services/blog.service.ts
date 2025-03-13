import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from '../dtos/blog.dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from '../schemas/blog.schemas';
import { BlogQueryDto} from '../dtos/blog-query.dtos';
import { sortFunction } from 'src/shared/utils/sort.utils';

@Injectable()
export class BlogService {

    constructor(
        @InjectModel(Blog.name) private readonly blogModel: 
        Model<Blog>,
    ) {}

    async findAll(queryParams: BlogQueryDto,
        selectObject: any = { __v :0 }
    ) {
        const { limit = 5, page = 1, title, sort } = queryParams;

        const query: any = {};

        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }

        const sortObject = sortFunction(sort);

        const blogs = await this.blogModel
            .find(query)
            .populate('category', { title : 1 })
            .skip(page - 1)
            .sort(sortObject)
            .select(selectObject)
            .limit(limit)
            .exec();

        const count = await this.blogModel.countDocuments(query);

        return {count, blogs};
    }

    async fineOne(id: string,
        selectObject: any = { __v :0 }) {
        const blog = await this.blogModel
        .findOne({_id:id})
        .populate('category', { title : 1 })
        .select(selectObject)
        .exec();
        if (blog) {
            return blog;
        } else {
            throw new NotFoundException();
        }
    }

    async create(body: BlogDto) {
        const newBlog = new this.blogModel(body)

        await newBlog.save()
        return newBlog;
    }

    async update(id:string, body: BlogDto) {
        return await this.blogModel.findByIdAndUpdate(id, body, {new: true});
    }

    async delete(id:string) {
        const blog = await this.fineOne(id, {_id: 1});
        await blog.deleteOne();
    }
}
