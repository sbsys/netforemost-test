import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Controller } from '../../../shared/infrastructure';
import { GetTaskListUseCase } from '../../application/queries';
import { TaskMessage } from '../../domain';
import { TaskSerializer } from '../serializers';

@injectable()
export class GetTaskListController extends Controller {
    constructor(
        /* use case */
        @inject(Symbols.GetTaskListUseCase) private getTaskList: GetTaskListUseCase,
        /* serializer */
        @inject(Symbols.TaskSerializer) private taskSerializer: TaskSerializer
    ) {
        super();
    }

    protected async implementation(): Promise<void> {
        const result = await this.getTaskList.execute();

        if (result.isError) {
            const error = result.getError();

            return (this.errorResponse[error.kind] ?? this.internalServerError)(error.message, error.args);
        }

        return this.ok<TaskMessage>(
            'task.success.list',
            result.getSuccess().map(item => this.taskSerializer.fromEntityToResponse(item))
        );
    }
}
