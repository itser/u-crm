import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsController } from './clients/clients.controller';
import { AccountsController } from './accounts/accounts.controller';
import { ClientsService } from './clients/clients.service';
import { AccountsService } from './accounts/accounts.service';
import { PrismaModule } from 'nestjs-prisma';
import {PrismaService} from "./prisma.service";
import {CategoriesController} from "./categories/categories.controller";
import {CategoriesService} from "./categories/categories.service";
import {TransactionsController} from "./transactions/transactions.controller";
import {TransactionsService} from "./transactions/transactions.service";

@Module({
  imports: [PrismaModule],
  controllers: [AppController, ClientsController, AccountsController, CategoriesController, TransactionsController],
  providers: [AppService, ClientsService, PrismaService, AccountsService, CategoriesService, TransactionsService],
})
export class AppModule {}
