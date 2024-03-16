import { MongoOption } from '@lib/database/mongodb/interfaces/repository.interface';
import { Logger } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { IMongoGenericRepository } from './abstracts/mongo-repository-abstract';
import * as R from 'ramda';

export class MongoGenericRepository<T> implements IMongoGenericRepository<T> {
  private readonly logger = new Logger(MongoGenericRepository.name);
  private _repository: Model<T>;
  protected repository: Model<T>;

  constructor(repository: Model<T>) {
    this._repository = repository;
  }

  async findAll(query: any, option?: MongoOption): Promise<any[]> {
    this.logger.debug(
      '[MongoGenericRepository/findAll] call - collection=%s, query=%o, option=%o',
      this._repository.modelName,
      query,
      option,
    );

    const limit: number = (option && option.limit) || 0;
    const skip: number = (option && option.skip) || 0;

    const sort: any = option && option.sort;

    const queryModel = this._repository.find();
    queryModel.setQuery(query);
    option?.select && queryModel.select(option && option.select);

    if (!R.isNil(limit) && limit > 0) {
      queryModel.limit(limit);
    }
    if (!R.isNil(skip) && skip > 0) {
      queryModel.skip(skip);
    }

    if (!R.isNil(sort) && !R.isEmpty(sort)) {
      queryModel.sort(sort);
    }

    if (option && option.populate) {
      queryModel.populate(option.populate);
    }

    if (option && option.lean) {
      return R.map(
        (i) => this.setLeanItem(i, option && option.populate),
        await queryModel.lean().exec(),
      );
    } else {
      return queryModel.exec();
    }
  }

  async find(id: any, option?: MongoOption): Promise<any> {
    this.logger.debug(
      '[MongoGenericRepository/findOne] call - collection=%s, id=%s, option=%o',
      this._repository.modelName,
      id,
      option,
    );

    const queryModel = this._repository.findById(id);

    if (option && option.select) {
      queryModel.select(option.select);
    }

    if (option && option.hidden) {
      const hiddenFields = option.hidden.map((i) => {
        return `+${i}`;
      });
      queryModel.select(hiddenFields);
    }

    if (option && option.populate) {
      queryModel.populate(option.populate);
    }

    if (option && option.lean) {
      return this.setLeanItem(
        await queryModel.lean().exec(),
        option && option.populate,
      );
    } else {
      const result = await queryModel.exec();
      if (result) {
        return result.toObject();
      } else {
        return result;
      }
    }
  }

  async findOne(query: any, option?: MongoOption): Promise<any> {
    this.logger.debug(
      '[MongoGenericRepository/findOne] call - collection=%s, query=%o, option=%o',
      this._repository.modelName,
      query,
      option,
    );

    const sort: any = option && option.sort;

    const queryModel = this._repository.findOne();
    queryModel.setQuery(query);

    if (!R.isNil(sort) && !R.isEmpty(sort)) {
      queryModel.sort(sort);
    }

    if (option && option.select) {
      queryModel.select(option.select);
    }

    if (option && option.hidden) {
      const hiddenFields = option.hidden.map((i) => {
        return `+${i}`;
      });
      queryModel.select(hiddenFields);
    }

    if (option && option.populate) {
      queryModel.populate(option.populate);
    }

    if (option && option.lean) {
      return this.setLeanItem(
        await queryModel.lean().exec(),
        option && option.populate,
      );
    } else {
      const result = await queryModel.exec();
      if (result) {
        return result.toObject();
      } else {
        return result;
      }
    }
  }

  async create(item: any): Promise<any> {
    this.logger.debug(
      '[MongoGenericRepository/create] call - collection=%s, item=%o',
      this._repository.modelName,
      item,
    );

    try {
      const result = await this._repository.create(item);
      if (result) {
        return result.toObject();
      } else {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, item: any, option: MongoOption): Promise<any> {
    // let result;

    // if (option && option.populate) {
    //   result = await this._repository
    //     .findByIdAndUpdate(id, item, Object.assign(option, { new: true }))
    //     .populate(option.populate)
    //     .exec();
    // } else {
    //   result = await this._repository
    //     .findByIdAndUpdate(id, item, { new: true })
    //     .exec();
    // }

    const queryModel = this._repository.findByIdAndUpdate(id, item, {
      new: true,
    });

    if (option && option.select) {
      queryModel.select(option.select);
    }

    if (option && option.hidden) {
      const hiddenFields = option.hidden.map((i) => {
        return `+${i}`;
      });
      queryModel.select(hiddenFields);
    }

    if (option && option.populate) {
      queryModel.populate(option.populate);
    }

    const result = await queryModel.exec();
    if (result) {
      return result.toObject();
    } else {
      return result;
    }
  }

  async updateOne(
    query: FilterQuery<T>,
    item: UpdateQuery<T>,
    option: MongoOption,
  ): Promise<any> {
    this.logger.debug(
      '[MongoGenericRepository/updateOne] call - collection=%s, item=%o',
      this._repository.modelName,
      item,
    );

    const queryModel = this._repository.findOneAndUpdate(query, item, {
      new: true,
    });

    if (option && option.select) {
      queryModel.select(option.select);
    }

    if (option && option.hidden) {
      const hiddenFields = option.hidden.map((i) => {
        return `+${i}`;
      });
      queryModel.select(hiddenFields);
    }

    if (option && option.populate) {
      queryModel.populate(option.populate);
    }

    const result = await queryModel.exec();
    if (result) {
      return result.toObject();
    } else {
      return result;
    }
  }

  async count(query: any): Promise<any> {
    this.logger.debug(
      '[MongoGenericRepository/count] call - collection=%s, query=%o',
      this._repository.modelName,
      query,
    );

    const queryModel = this._repository.countDocuments();
    queryModel.setQuery(query);

    return await queryModel.exec();
  }

  delete(id: string): Promise<any> {
    this.logger.debug(
      '[MongoGenericRepository/delete] call - collection=%s, id=%s',
      this._repository.modelName,
      id,
    );

    return this._repository.deleteOne({ _id: id }).exec();
  }

  deleteAll(query: any): Promise<any> {
    this.logger.debug(
      '[MongoGenericRepository/deleteAll] call - collection=%s, query=%o',
      this._repository.modelName,
      query,
    );

    return this._repository.deleteMany(query).exec();
  }

  private setLeanItem<T = any>(item: T, populate: string[] = []) {
    const filter = (item: any) => {
      delete item.__v;

      if (R.isNil(item.id) || R.isEmpty(item.id)) {
        item.id = item._id;
        delete item._id;
      }
    };
    const subFilter = (key: string) => {
      if (item[key]) {
        delete item[key].__v;

        if (R.isNil(item[key].id) || R.isEmpty(item[key].id)) {
          item[key].id = item[key]._id;
          delete item[key]._id;
        }
      }
    };

    if (item) {
      filter(item);

      if (R.length(populate) > 0) {
        R.forEach(subFilter, populate);
      }
    }

    return item;
  }

  aggregate<T>(aggregation): Promise<(Record<string, any> & T)[]> {
    this.logger.debug(
      '[MongoGenericRepository/aggregate] call - collection=%s, aggregation=%o',
      this._repository.modelName,
      aggregation,
    );

    return this._repository.aggregate(aggregation).exec();
  }
}
