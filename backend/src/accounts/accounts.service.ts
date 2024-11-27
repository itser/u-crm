import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Prisma} from "@prisma/client";
import {Account as AccountModel} from ".prisma/client";
import {FindManyQueryDto} from "../dto/find-many-query.dto";

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AccountCreateInput): Promise<AccountModel> {
    return this.prisma.account.create({
      data,
    });
  }

  async findAll(query: FindManyQueryDto) {
    return this.prisma.account.findMany(this.prisma.handleFindManyQuery(query));
  }

  async total(query: FindManyQueryDto) {
    return this.prisma.account.count(this.prisma.handleFindManyTotalQuery(query));
  }

  async findOne(accountWhereUniqueInput: Prisma.AccountWhereUniqueInput): Promise<AccountModel | null> {
    return this.prisma.account.findUnique({
      where: accountWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.AccountWhereUniqueInput;
    data: Prisma.AccountUpdateInput;
  }): Promise<AccountModel> {
    const { data, where } = params;
    return this.prisma.account.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.AccountWhereUniqueInput): Promise<AccountModel> {
    return this.prisma.account.delete({
      where,
    });
  }
}
