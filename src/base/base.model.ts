import { HttpException } from "@/exceptions/HttpException";
import { IParamSearch } from "@/interfaces/base.interface";
import { hash } from "bcrypt";
import { isEmpty } from "class-validator";
import { WithId } from "mongodb";


abstract class BaseModel<TBase, TCreateDto, TUpdateDto> {

    // query import
    protected abstract query: any;

    // attribute import 
    protected abstract nameBase: string;
    protected abstract attributeBase: string;

    /*
        Find all service
    */

    public async findAll(): Promise<any> {

        const data: Omit<TBase, '_id'>[] = await this.query.find();
        return data;

    }

    /*
        Find by Id service
   */

    public async findById(dataId: string): Promise<any> {

        // Check data empty
        if (isEmpty(dataId)) throw new HttpException(400, `${this.nameBase}Id is empty`);

        // query 
        const findData: Omit<TBase, '_id'> = await this.query.findById(dataId);

        // Exception handle
        if (!findData) throw new HttpException(409, `${this.nameBase} doesn't exist`);

        return findData;

    }

    /*
    Find by attributeBase service
*/

    public async findByAttributeBase(attribute: string): Promise<any> {

        // Check data empty
        if (isEmpty(attribute)) throw new HttpException(400, `${this.attributeBase}  is empty`);

        // query 
        const findData: Omit<TBase, '_id'> = await this.query.findByAttributeBase(attribute);

        // Exception handle
        if (!findData) throw new HttpException(409, `${this.attributeBase} doesn't exist`);

        return findData;

    }

    /*
Find by attribute service
*/

    public async findByAttribute(attributeName: string, attribute: string): Promise<any> {


        // Check data empty
        if (isEmpty(attribute)) throw new HttpException(400, `${attributeName}  is empty`);

        // query 
        const findData: Omit<TBase, '_id'> = await this.query.findByAttribute(attributeName, attribute);

        // Exception handle
        if (!findData) throw new HttpException(409, `${attributeName} doesn't exist`);

        return findData;

    }

    /* 
    
     Find by filter

    */

    public async findAllByParam(dto: IParamSearch) {
        const result = await this.query.findAllByParam(dto);
        return result;
    }

    /*
        Create  service
    */

    public create = async (createData: TCreateDto): Promise<any> => {

        // Check data empty
        if (isEmpty(createData)) throw new HttpException(400, `${this.nameBase} data is empty`);

        // check attribute base exist  =========================

        // Exception handle

        if (this.attributeBase === 'date') {

            const params: IParamSearch = {
                skip: 0,
                limit: 5,
                sort: "name,1",
                keyword: "",
                tags: [
                    {
                        name: 'userId',
                        field: [(createData as any).userId]
                    },
                    {
                        name: 'date',
                        field: [(createData as any).date]
                    },
                ]
            }

            const findData = await this.findAllByParam(params);

            if (findData.totalItems != 0) throw new HttpException(409, `This ${this.attributeBase} ${createData[this.attributeBase]} already exists`);

        }
        if (this.attributeBase) {

            const findData: Omit<TBase, '_id'> = await this.query.findByAttributeBase(createData[this.attributeBase]);

            if (findData) throw new HttpException(409, `This ${this.attributeBase} ${createData[this.attributeBase]} already exists`);
        }

        // end check attribute base exist  =========================

        // save data
        const saveData = await this.query.saveData(createData);

        return saveData;

    }

    /*
        Update service
    */

    public async update(dataId: string, updateData: TUpdateDto): Promise<any> {

        // Check data empty
        if (isEmpty(updateData)) throw new HttpException(400, `${this.nameBase} Data is empty`);

        // check attribute base exist  =========================

        if (updateData[this.attributeBase]) {

            // query
            const findData: WithId<TBase> = await this.query.findByAttributeBaseWithoutId(updateData[this.attributeBase]);

            // check exist
            if (findData && findData._id?.toString() !== dataId) {

                throw new HttpException(409, `This ${this.attributeBase} ${updateData[this.attributeBase]} already exists`);

            }

        }
        // end check attribute base exist  =========================

        if ((updateData as any).password) {

            const hashedPassword = await hash((updateData as any).password, 10);
            updateData = { ...updateData, password: hashedPassword };

        }


        // update infor ======================

        // query
        const findData: any = await this.query.findById(dataId);

        let updatedData: any;

        if (findData) {

            const updatedUser = { ...findData };

            if ((updateData as any).accessable) {
                updateData = {
                    ...findData,
                    accessable: {
                        ...(findData as any).accessable,
                        ...(updateData as any).accessable
                    }
                };
            }

            // create Updated data
            updatedData = { ...updatedUser, ...updateData };

            // Update handle  ==================== 

            const update = await this.query.updateData(dataId, updatedData);

            return updatedData;
            //====================

        } else {

            // Exception handle
            throw new HttpException(409, `${this.nameBase} doesn't exist`);

        }
        //======================

    }

    /*
        Delete  service
    */

    public async delete(dataId: string): Promise<any> {

        // check exist

        // query
        const findData: Omit<TBase, '_id'> = await this.query.findById(dataId);

        let result: any;

        // handle delete 

        if (findData) {

            // query delete
            result = await this.query.deleteById(dataId);

        } else {

            // Exception handle
            throw new HttpException(409, `${this.nameBase} doesn't exist`);

        }
        //======================

        return result;

    }
}

export default BaseModel;