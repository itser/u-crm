import {Body, Controller, Delete, Get, Param, Post, Put, Query, Res} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {Category as CategoryModel} from ".prisma/client";
import {FindManyQueryDto} from "../dto/find-many-query.dto";
import { Response } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
      @Body() postData: { name: string },
  ): Promise<CategoryModel> {
    return this.categoriesService.create(postData);
  }

  @Get()
  async findAll(@Query() query: FindManyQueryDto, @Res() response: Response) {
    const results = await this.categoriesService.findAll(query);
    const total = await this.categoriesService.total(query);
    response.set('Content-Range', `transactions */${total}`);//TODO Content-Range: transactions 0-9/100
    response.json(results);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryModel> {
    return this.categoriesService.findOne({ id: Number(id) });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CategoryModel): Promise<CategoryModel> {
    return this.categoriesService.update({
      where: { id: Number(id) },
      data: data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoriesService.remove({ id: Number(id) });
  }
}
