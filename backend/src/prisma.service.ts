import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {FindManyQueryDto} from "./dto/find-many-query.dto";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    handleFindManyQuery(query: FindManyQueryDto) {
        // Default values in case parameters are not passed
        const { filter = '{}', range = '[0,10]', sort = '["id", "ASC"]' } = query;

        // Parse filter, range, and sort from JSON string to actual values
        const parsedFilter = JSON.parse(filter);  // Parse filter to an object
        const parsedRange = JSON.parse(range);    // Parse range to [start, end]
        const parsedSort = JSON.parse(sort);      // Parse sort to [field, direction]

        // Destructure values from parsedRange and parsedSort
        const [start, end] = parsedRange;
        const [sortField, sortOrder] = parsedSort;

        // Build the 'where' condition based on the parsed filter
        const where = this.buildWhere(parsedFilter);

        return {
            where, // Apply the filters
            orderBy: {
                [sortField]: sortOrder.toLowerCase(), // Apply sorting direction (ASC/DESC)
            },
            skip: start, // Pagination: skip the first 'start' items
            take: end - start + 1, // Pagination: fetch 'end - start' items
        }
    }

    handleFindManyTotalQuery(query: FindManyQueryDto) {
        // Default values in case parameters are not passed
        const { filter = '{}', range = '[0,10]', sort = '["id", "ASC"]' } = query;

        // Parse filter, range, and sort from JSON string to actual values
        const parsedFilter = JSON.parse(filter);  // Parse filter to an object

        // Build the 'where' condition based on the parsed filter
        const where = this.buildWhere(parsedFilter);

        return {
            where, // Apply the filters
        }
    }

    // Helper method to convert filter object into Prisma 'where' input
    private buildWhere(filter: Record<string, any>): {} {
        const where = {};

        Object.keys(filter).forEach((key) => {
            const value = filter[key];
            if (key === 'date_from') {
                const dateTo = filter['date_to'] ?? null;
                if (dateTo) {
                    where['createdAt'] = {
                        gte: new Date(value).toISOString(),
                        lte: new Date(dateTo).toISOString(),
                    };
                } else {
                    where['createdAt'] = {
                        gte: new Date(value).toISOString(),
                    };
                }
            } else if (key === 'date_to') {
                const dateFrom = filter['date_from'] ?? null;
                if (dateFrom) {
                    where['createdAt'] = {
                        gte: new Date(dateFrom).toISOString(),
                        lte: new Date(value).toISOString(),
                    };
                } else {
                    where['createdAt'] = {
                        lte: new Date(value).toISOString(),
                    };
                }
            } else if (Array.isArray(value)) {
                // If the filter value is an array, use Prisma's `in` operator
                where[key] = { in: value };
            } else if (typeof value === 'string') {
                // Apply 'contains' filter for strings (case-insensitive if needed)
                where[key] = { contains: value }; // Add `mode: 'insensitive'` if supported
            } else {
                // For other types, apply direct equality matching
                where[key] = value;
            }
        });

        return where;
    }
}
