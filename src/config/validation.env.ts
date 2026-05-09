import * as zod from 'zod';

export const envSchema = zod.object({
    VITE_NODE_ENV: zod.enum(['dev', 'prod', 'stage', 'test']),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
    throw new Error('Invalid Environment Variables');
}

export const env = parsedEnv.data;
export type EnvTypes = zod.infer<typeof envSchema>;
