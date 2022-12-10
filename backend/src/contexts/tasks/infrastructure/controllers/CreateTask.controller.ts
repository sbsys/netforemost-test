import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Controller } from '../../../shared/infrastructure';
import { CreateTaskUseCase } from '../../application/commands';
import { TaskMessage } from '../../domain';

@injectable()
export class CreateTaskController extends Controller {
    constructor(@inject(Symbols.CreateTaskUseCase) private createTask: CreateTaskUseCase) {
        super();
    }

    protected async implementation(): Promise<void> {
        const { title, body } = this.req.body;

        const result = await this.createTask.execute({ title, body });

        if (result.isError) {
            const error = result.getError();

            return (this.errorResponse[error.kind] ?? this.internalServerError)(error.message, error.args);
        }

        return this.created<TaskMessage>('task.success.created');
    }
}
