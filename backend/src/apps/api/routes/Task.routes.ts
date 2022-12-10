import { Express, Router } from 'express';
import { inject, injectable } from 'inversify';
import { CreateTaskController, GetTaskListController } from '../../../contexts/tasks/infrastructure/controllers';
import { Symbols } from '../../../env';
import { Routes } from '../../../types';

@injectable()
export class TaskRoutes implements Routes<Express> {
    private router = Router();

    constructor(
        @inject(Symbols.CreateTaskController) private createTaskController: CreateTaskController,
        @inject(Symbols.GetTaskListController) private getTaskListController: GetTaskListController
    ) {}

    configure(app: Express, path: string): void {
        this.router.get('/', (req, res) => this.getTaskListController.execute(req, res));
        this.router.post('/', (req, res) => this.createTaskController.execute(req, res));

        app.use(path, this.router);
    }
}
