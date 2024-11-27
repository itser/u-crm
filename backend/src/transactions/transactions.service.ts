import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Prisma} from "@prisma/client";
import {Transaction as TransactionModel} from ".prisma/client";
import {FindManyQueryDto} from "../dto/find-many-query.dto";

@Injectable()
export class TransactionsService {
    constructor(private prisma: PrismaService) {}

    async findAll(query: FindManyQueryDto) {
        return this.prisma.transaction.findMany(this.prisma.handleFindManyQuery(query));
    }

    async total(query: FindManyQueryDto) {
        return this.prisma.transaction.count(this.prisma.handleFindManyTotalQuery(query));
    }

    async create(data: Prisma.TransactionCreateInput): Promise<TransactionModel> {
        return this.prisma.transaction.create({
            data,
        });
    }

    async findOne(transactionWhereUniqueInput: Prisma.TransactionWhereUniqueInput): Promise<TransactionModel | null> {
        return this.prisma.transaction.findUnique({
            where: transactionWhereUniqueInput,
        });
    }

    async update(params: {
        where: Prisma.TransactionWhereUniqueInput;
        data: Prisma.TransactionUpdateInput;
    }): Promise<TransactionModel> {
        const { data, where } = params;
        return this.prisma.transaction.update({
            data,
            where,
        });
    }

    async remove(where: Prisma.TransactionWhereUniqueInput): Promise<TransactionModel> {
        return this.prisma.transaction.delete({
            where,
        });
    }
}
