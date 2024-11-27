import {Body, Controller, Delete, Get, Param, Post, Put, Query, Res} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import {Transaction as TransactionModel} from ".prisma/client";
import {FindManyQueryDto} from "../dto/find-many-query.dto";
import { Response } from 'express';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async findAll(@Query() query: FindManyQueryDto, @Res() response: Response) {
    const results = await this.transactionsService.findAll(query);
    const total = await this.transactionsService.total(query);

    //const range = query.range ? JSON.parse(query.range) : [0, total - 1];
    //const [start, end] = range;
    //res.setHeader('Content-Range', `posts ${start}-${end}/${total}`);

    response.set('Content-Range', `transactions */${total}`);//TODO Content-Range: transactions 0-9/100
    response.json(results);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TransactionModel> {
    return this.transactionsService.findOne({ id: Number(id) });
  }

  @Post()
  async create(
      @Body() postData,
  ): Promise<TransactionModel> {
    return this.transactionsService.create(postData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: TransactionModel): Promise<TransactionModel> {
    return this.transactionsService.update({
      where: { id: Number(id) },
      data: data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.transactionsService.remove({ id: Number(id) });
  }
}
