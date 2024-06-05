import { DB_DATABASE, DB_HOST, DB_PORT } from "@/config";
import { MongoClient, Db } from 'mongodb'

// const url = `mongodb://${DB_HOST}:${DB_PORT}`;
const url = `mongodb+srv://datnguyentruongnn:dat1234567@poca.kzc5eti.mongodb.net/?retryWrites=true&w=majority&appName=poca`;

const defaultDbName = `${DB_DATABASE}`;

const client = new MongoClient(url)

export let db: Db;

export const connect = async (dbName: string = defaultDbName) => {

    const conn = await client.connect();
    db = conn.db(dbName);
    console.log('====================================');
    console.log('connect db okkkkk');
    console.log('====================================');
    return client;

}
