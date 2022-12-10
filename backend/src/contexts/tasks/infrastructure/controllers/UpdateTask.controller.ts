import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Controller } from '../../../shared/infrastructure';
import { UpdateTaskUseCase } from '../../application/commands';
import { TaskMessage } from '../../domain';

@injectable()
export class UpdateTaskController extends Controller {
    constructor(@inject(Symbols.UpdateTaskUseCase) private updateTask: UpdateTaskUseCase) {
        super();
    }

    protected async implementation(): Promise<void> {
        const { taskId } = this.req.params;

        if (!taskId) return this.badRequest('task.exceptions.id.notvalid' as TaskMessage);

        const { title, body } = this.req.body;

        const result = await this.updateTask.execute({ taskId, title, body });

        if (result.isError) {
            const error = result.getError();

            return (this.errorResponse[error.kind] ?? this.internalServerError)(error.message, error.args);
        }

        return this.ok<TaskMessage>('task.success.updated');
    }
}
