import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Prisma} from "@prisma/client";
import {Category as CategoryModel} from ".prisma/client";
import {FindManyQueryDto} from "../dto/find-many-query.dto";

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.CategoryCreateInput): Promise<CategoryModel> {
        return this.prisma.category.create({
            data,
        });
    }

    async findAll(query: FindManyQueryDto) {
        return this.prisma.category.findMany(this.prisma.handleFindManyQuery(query));
    }

    async total(query: FindManyQueryDto) {
        return this.prisma.category.count(this.prisma.handleFindManyTotalQuery(query));
    }

    async findOne(categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput): Promise<CategoryModel | null> {
        return this.prisma.category.findUnique({
            where: categoryWhereUniqueInput,
        });
    }

    async update(params: {
        where: Prisma.CategoryWhereUniqueInput;
        data: Prisma.CategoryUpdateInput;
    }): Promise<CategoryModel> {
        const { data, where } = params;
        return this.prisma.category.update({
            data,
            where,
        });
    }

    async remove(where: Prisma.CategoryWhereUniqueInput): Promise<CategoryModel> {
        return this.prisma.category.delete({
            where,
        });
    }
}
