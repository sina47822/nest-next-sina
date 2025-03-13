import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sortFunction } from 'src/shared/utils/sort.utils';
import { BlogCategoryDto } from '../dtos/blog-category.dtos';
import { BlogCategoryQueryDto } from '../dtos/blog-category-query.dtos';
import { BlogCategory } from '../schemas/blog-category.schema';

@Injectable()
export class BlogCategoryService {

    constructor(
        @InjectModel(BlogCategory.name) private readonly blogCategoryModel: 
        Model<BlogCategory>,
    ) {}


    async findAll(queryParams: BlogCategoryQueryDto,
        selectObject: any = { __v :0 }
    ) {
        const { limit = 5, page = 1, title, sort } = queryParams;

        const query: any = {};

        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }

        const sortObject = sortFunction(sort);

        const blogcategories = await this.blogCategoryModel
            .find(query)
            .skip(page - 1)
            .sort(sortObject)
            .select(selectObject)
            .limit(limit)
            .exec();

        const count = await this.blogCategoryModel.countDocuments(query);

        return {count, blogcategories};
    }

    async fineOne(id: string,
        selectObject: any = { __v :0 }) {
        const blog = await this.blogCategoryModel
        .findOne({_id:id})
        .select(selectObject)
        .exec();
        if (blog) {
            return blog;
        } else {
            throw new NotFoundException();
        }
    }

    async create(body: BlogCategoryDto) {
        const newBlog = new this.blogCategoryModel(body)

        await newBlog.save()
        return newBlog;
    }

    async update(id:string, body: BlogCategoryDto) {
        return await this.blogCategoryModel.findByIdAndUpdate(id, body, {new: true});
    }

    async delete(id:string) {
        const blog = await this.fineOne(id, {_id: 1});
        await blog.deleteOne();
    }
}
