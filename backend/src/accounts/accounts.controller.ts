import {Controller, Get, Post, Body, Put, Param, Delete, Query, Res} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import {Account as AccountModel} from ".prisma/client";
import {FindManyQueryDto} from "../dto/find-many-query.dto";
import { Response } from 'express';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async createClient(
      @Body() postData: { name: string },
  ): Promise<AccountModel> {
    return this.accountsService.create(postData);
  }

  @Get()
  async findAll(@Query() query: FindManyQueryDto, @Res() response: Response) {
    const results = await this.accountsService.findAll(query);
    const total = await this.accountsService.total(query);
    response.set('Content-Range', `transactions */${total}`);//TODO Content-Range: transactions 0-9/100
    response.json(results);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AccountModel> {
    return this.accountsService.findOne({ id: Number(id) });
  }

  @Put(':id')
  async updateClient(@Param('id') id: string, @Body() data: AccountModel): Promise<AccountModel> {
    return this.accountsService.update({
      where: { id: Number(id) },
      data: data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.accountsService.remove({ id: Number(id) });
  }
}
