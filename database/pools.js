import pkg from "pg";
import "dotenv/config";

const { Pool }= pkg
const ENV = process.env;
const {PGUSER, PGPASSWORD, PGHOST, PGDATABASE} = ENV;

const client = new Pool({
    connectionString:`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
})

export default client;
