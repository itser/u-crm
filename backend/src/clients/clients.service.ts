import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma.service';
import {Client as ClientModel, Prisma} from '@prisma/client';
import {FindManyQueryDto} from '../dto/find-many-query.dto';

@Injectable()
export class ClientsService {
    constructor(private prisma: PrismaService) {}

    async findAll(query: FindManyQueryDto) {
        return this.prisma.client.findMany(this.prisma.handleFindManyQuery(query));
    }

    async total(query: FindManyQueryDto) {
        return this.prisma.client.count(this.prisma.handleFindManyTotalQuery(query));
    }

    async client(postWhereUniqueInput: Prisma.ClientWhereUniqueInput): Promise<ClientModel | null> {
        return this.prisma.client.findUnique({
            where: postWhereUniqueInput,
        });
    }

    async createClient(data: Prisma.ClientCreateInput): Promise<ClientModel> {
        return this.prisma.client.create({
            data,
        });
    }

    async updateClient(params: {
        where: Prisma.ClientWhereUniqueInput;
        data: Prisma.ClientUpdateInput;
    }): Promise<ClientModel> {
        const { data, where } = params;
        return this.prisma.client.update({
            data,
            where,
        });
    }

    async deleteClient(where: Prisma.ClientWhereUniqueInput): Promise<ClientModel> {
        return this.prisma.client.delete({
            where,
        });
    }
}
