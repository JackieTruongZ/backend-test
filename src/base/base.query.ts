import { db } from "@/databases/db";
import { IParamSearch, ITags } from "@/interfaces/base.interface";
import { hash } from "bcrypt";
import { Filter, ObjectId, WithId } from "mongodb";
import { FilterQuery } from "mongoose";


abstract class BaseQuery<TBase, TCreateDto, TUpdateDto> {

    protected abstract collectionName: string;
    protected abstract attributeBase: string;
    protected abstract listFieldFilter: string[];


    public find = async (): Promise<any> => {
        const data: Omit<TBase, '_id'>[] = await db.collection<TBase>(this.collectionName).find({}).toArray();
        return data;
    }
    public findById = async (dataId: string): Promise<any> => {
        // create query

        const query: Filter<TBase> = { _id: new ObjectId(dataId) } as Filter<TBase>;

        // query 
        const findData: WithId<TBase> = await db.collection<TBase>(this.collectionName).findOne(query);

        return findData;
    }

    public findByAttributeBase = async (attribute: string): Promise<any> => {
        // create query
        const query: Filter<TBase> = { [this.attributeBase]: attribute } as Filter<TBase>;

        // query 
        const findData: Omit<TBase, '_id'> = await db.collection<TBase>(this.collectionName).findOne(query);

        return findData;

    }

    public findByAttributeBaseWithoutId = async (attribute: string): Promise<any> => {
        // create query
        const query: Filter<TBase> = { [this.attributeBase]: attribute } as Filter<TBase>;

        // query
        const findData: WithId<TBase> = await db.collection<TBase>(this.collectionName).findOne(query) as WithId<TBase>;

        return findData;
    }

    public findByAttribute = async (attributeName: string, attribute: string): Promise<any> => {
        // create query
        const query: Filter<TBase> = { [attributeName]: attribute } as Filter<TBase>;

        // query 
        const findData: Omit<TBase, '_id'> = await db.collection<TBase>(this.collectionName).findOne(query);

        return findData;

    }

    public createTagQuery = (tag: ITags): FilterQuery<any> => {
        const tagQuery: FilterQuery<TBase[]> = {} as FilterQuery<TBase[]>;
        tag.field.forEach(field => {
            tagQuery[field] = tag.name;
        });
        return tagQuery;
    };

    public findAllByParam = async (filter: IParamSearch): Promise<any> => {


        let query: Filter<TBase> = {} as Filter<TBase>;

        // search by keyword
        if (filter.keyword) {
            const keywordQuery: Filter<TBase> = {
                $or: this.listFieldFilter.map(field => ({ [field]: { $regex: filter.keyword, $options: 'i' } }))
            } as Filter<TBase>;

            // op1: using Object assign 

            // query = Object.assign(query, queryChild);

            // op2 : using assign simple

            query = { ...query, ...keywordQuery };
        }

        // search by tags
        if (filter.tags) {
            const filters = [];

            filter.tags.forEach(tag => {
                const field = {};
                field[tag.name] = { $in: tag.field };
                filters.push(field);
            });

            const tagQuery: Filter<TBase> = { $and: filters } as Filter<TBase>;
            query = { ...query, ...tagQuery };

        }

        let sortOptions = {};

        // search by sort  value : 1 || -1
        if (filter.sort) {
            const [key, value] = filter.sort.split(",").map(item => item.trim());
            sortOptions = { [key]: parseInt(value) };

            // const result = await db.collection<TBase>(this.collectionName).find(query).sort(sortOptions).limit(filter.limit).skip(filter.skip).toArray();
            // return result;
        }

        const pageSize = filter.limit; // Số lượng kết quả trên mỗi trang
        const currentPage = Math.ceil(filter.skip / pageSize) + 1; // Trang hiện tại


        //---------- CREATE PIPELINE ---------------------------
        const pipeline = [
            { $match: query },
            sortOptions && { $sort: sortOptions },
            { $skip: filter.skip },
            { $limit: pageSize },
            { $count: "totalItems" }
        ];


        //---------- USE AGGREGATE FRAMEWORK  ---------------------------
        const [countResult, result] = await Promise.all([
            db.collection<TBase>(this.collectionName).aggregate(pipeline).toArray(),
            db.collection<TBase>(this.collectionName).find(query).sort(sortOptions).limit(pageSize).skip(filter.skip).toArray()
        ]);

        const totalItems = countResult.length > 0 ? countResult[0].totalItems : 0;
        const totalPages = Math.ceil(totalItems / pageSize); // Tổng số trang

        const paginationResult = {
            currentPage,
            pageSize,
            totalPages,
            totalItems,
            results: result
        };

        return paginationResult;

    }


    public saveData = async (createData: TCreateDto): Promise<any> => {

        const save = await db.collection<any>(this.collectionName).insertOne(createData);
        const saveData = await this.findById(save.insertedId.toString())
        return saveData;
    }

    public updateData = async (dataId: string, updatedData: TCreateDto): Promise<any> => {

        const updateQuery: Filter<TBase> = { _id: new ObjectId(dataId) } as Filter<TBase>;

        // query
        const result = await db.collection(this.collectionName).updateOne(updateQuery, { $set: updatedData });
        return result;
    }

    public async updateAddAttribute(dataId: string, updateData: any) {

        const updateQuery: Filter<TBase> = { _id: new ObjectId(dataId) } as Filter<TBase>;

        // query
        const result = await db.collection(this.collectionName).updateOne(updateQuery, { $set: updateData });
        return result;
    }


    public deleteById = async (dataId: string): Promise<any> => {

        const result = await db.collection(this.collectionName).deleteOne({ _id: new ObjectId(dataId) });
        return result;

    }

}

export default BaseQuery;