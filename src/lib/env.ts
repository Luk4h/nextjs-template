import "server-only";
import fs from "node:fs";
import { ZodError, z } from "zod";

const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    PORT: z.string().default("3000"),
    DATABASE_URL: z.string(),
    PULSE_API_KEY: z.string(),
    AUTH_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
});

type EnvType = z.infer<typeof envSchema>;

export const createEnv = (env: NodeJS.ProcessEnv): EnvType => {
    // Skips validation if SKIP_ENV_VALIDATION is set
    if (env.SKIP_ENV_VALIDATION) {
        // Cast the env to EnvType to ensure type safety
        return env as unknown as EnvType;
    }

    // Loads Docker secrets into environment
    if (fs.existsSync("/run/secrets")) {
        const secrets = fs.readdirSync("/run/secrets");
        for (const secret of secrets) {
            env[secret] = fs
                .readFileSync(`/run/secrets/${secret}`, "utf8")
                // Docker secrets alawys end with a newline character
                .trim();
        }
    }

    try {
        const parsedEnv = envSchema.parse(env);
        return parsedEnv;
    } catch (error) {
        console.error("Error parsing environment variables:");

        if (error instanceof ZodError) {
            for (const issue of error.issues) {
                console.error(`${issue.path[0]} is ${issue.message}.`);
            }
        }
        process.exit(1);
    }
};

export const env = createEnv(process.env);
