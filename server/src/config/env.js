import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
    path: path.resolve(__dirname, "../../.env")
});

const envSchema = z.object({
    PORT: z.coerce.number().int().positive(),

    DB_NAME: z.string().min(1),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string(),
    DB_HOST: z.string().min(1),

    SESSION_SECRET: z.string().min(64)
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error("Invalid environment variables:");
    for (const issue of parsedEnv.error.issues) {
        console.error(`- ${issue.path.join(".")}: ${issue.message}`);
    }
    process.exit(1);
}

const env = {
    server: {
        port: parsedEnv.data.PORT
    },

    database: {
        dbName: parsedEnv.data.DB_NAME,
        dbUser: parsedEnv.data.DB_USER,
        dbPassword: parsedEnv.data.DB_PASSWORD,
        dbHost: parsedEnv.data.DB_HOST
    },

    session: {
        sessionSecret: parsedEnv.data.SESSION_SECRET
    }
};

export default env;