import * as zod from 'zod';

export const envSchema = zod.object({
    VITE_NODE_ENV: zod.enum(['dev', 'prod', 'stage', 'test']),

    VITE_API_URL: zod
        .url('VITE_API_URL must be a valid URL including http:// or https://')
        .refine((url) => !url.endsWith('/'), {
            message: 'VITE_API_URL should not have a trailing slash',
        }),

    VITE_API_TIMEOUT: zod.coerce
        .number()
        .int('Timeout must be a whole number (milliseconds)')
        .positive('Timeout must be greater than 0')
        .max(60000, 'Timeout should not exceed 60 seconds (60000ms)'),
});
