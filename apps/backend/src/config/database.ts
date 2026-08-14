import config from "./config";
import pgPromise from "pg-promise";

const pgp = pgPromise();
export const db = pgp(config.db);
