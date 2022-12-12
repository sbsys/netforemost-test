import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { inject, injectable } from 'inversify';
import { CONSTANTS, Symbols } from '../../env';
import { App } from '../../types';
import { mergeRoutes } from '../../utils';
import { NoteRoutes } from './routes';

@injectable()
export class Api implements App {
    private app = express();
    private apiPathV1 = mergeRoutes('/', CONSTANTS.MICROSERVICE, '/api/v1');

    constructor(@inject(Symbols.NoteRoutes) private taskRoutes: NoteRoutes) {
        this.configure();
        this.routes();
    }

    private configure(): void {
        this.app.set('trust proxy', true);
        this.app.disable('x-powered-by');

        this.app.use(cors());
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
    }

    private routes(): void {
        this.taskRoutes.configure(this.app, mergeRoutes(this.apiPathV1, '/notes'));
    }

    run(): void {
        this.app.listen(CONSTANTS.PORT);
    }
}
