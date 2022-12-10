/* imports */
import 'dotenv/config';

export type Environment = 'development' | 'production' | 'testing';

export const CONSTANTS = {
    /* application */
    ENVIRONMENT: (process.env['ENVIRONMENT'] ?? 'development') as Environment,
    PORT: process.env['PORT'] ?? '8080',
    MICROSERVICE: process.env['MICROSERVICE'] ?? 'microservice',
};
