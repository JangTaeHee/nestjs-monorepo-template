import { MongoOption } from '@lib/database/mongodb/interfaces/repository.interface';
import mongoose, { FilterQuery, Schema, UpdateQuery } from 'mongoose';

export abstract class IMongoGenericRepository<T> {
  abstract findAll(query: any, option?: MongoOption): Promise<T[]>;

  abstract find(
    id: mongoose.Schema.Types.ObjectId | string,
    option?: MongoOption,
  ): Promise<T>;

  abstract findOne(
    query: any,
    option?: MongoOption,
  ): Promise<
    | (Omit<T, Exclude<keyof mongoose.Document, 'id'>> & {
        id: string | Schema.Types.ObjectId;
      })
    | undefined
  >;

  abstract create<T = any>(item: T): Promise<any>;

  abstract update(
    id: mongoose.Schema.Types.ObjectId | string,
    item: any,
    option?: MongoOption,
  ): Promise<any>;

  abstract updateOne(
    query: FilterQuery<T>,
    item: UpdateQuery<T>,
    option?: MongoOption,
  ): Promise<any>;

  abstract delete(id: mongoose.Schema.Types.ObjectId | string): Promise<any>;

  abstract deleteAll(query: any): Promise<any>;

  abstract count(query: any): Promise<any>;

  abstract aggregate<T = any>(
    aggregation: any[],
  ): Promise<(T & { _id?: Record<string, any> })[]>;
}
