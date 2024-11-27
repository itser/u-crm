import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    Query, Res,
} from '@nestjs/common';
import {ClientsService} from "./clients.service";
import { Client as ClientModel } from '@prisma/client';
import { FindManyQueryDto } from '../dto/find-many-query.dto';
import { Response } from 'express';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientService: ClientsService) {}

    @Get()
    async findAll(@Query() query: FindManyQueryDto, @Res() response: Response) {
        const results = await this.clientService.findAll(query);
        const total = await this.clientService.total(query);
        response.set('Content-Range', `transactions */${total}`);//TODO Content-Range: transactions 0-9/100
        response.json(results);
    }

    @Post()
    async createClient(
        @Body() postData: { name: string },
    ): Promise<ClientModel> {
        return this.clientService.createClient(postData);
    }

    @Get(':id')
    async getClientById(@Param('id') id: string): Promise<ClientModel> {
        return this.clientService.client({ id: Number(id) });
    }

    @Put(':id')
    async updateClient(@Param('id') id: string, @Body() data: ClientModel): Promise<ClientModel> {
        return this.clientService.updateClient({
            where: { id: Number(id) },
            data: data,
        });
    }

    @Delete(':id')
    async deleteClient(@Param('id') id: string): Promise<ClientModel> {
        return this.clientService.deleteClient({ id: Number(id) });
    }
}
