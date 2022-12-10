import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { UseCase } from '../../../shared/application';
import { Result } from '../../../shared/domain';
import { TaskEntity, TaskRepository } from '../../domain';
import { TaskError } from '../../domain/Task.error';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetTaskListRequest {}

type GetTaskListResponse = Result<TaskError, TaskEntity[]>;

@injectable()
export class GetTaskListUseCase implements UseCase<GetTaskListRequest, GetTaskListResponse> {
    constructor(@inject(Symbols.TaskRepository) private taskRepository: TaskRepository) {}

    async execute(): Promise<GetTaskListResponse> {
        const taskList = await this.taskRepository.readTaskList();

        if (taskList.isError) return Result.Error(taskList.getError());

        return Result.Success(taskList.getSuccess());
    }
}
