import dotenv from 'dotenv';

dotenv.config();

export interface EnvConfig {
    db: {
        host: string | undefined,
        user: string | undefined,
        password: string| undefined,
        database: string| undefined
    },
    port: number | undefined,
    jwt: {
        secretKey: string | undefined,
        tokenHeaderKey: string| undefined
    }
}

export const envConfig: EnvConfig =
{
    db: {
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASS,
        database: process.env.MARIADB_DB
    },
    port: Number(process.env.PORT),
    jwt: {
        secretKey: process.env.JWT_SECRET_KEY,
        tokenHeaderKey: process.env.TOKER_HEADER_KEY,
    }
}