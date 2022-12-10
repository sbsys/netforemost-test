import { injectable } from 'inversify';
import { Result, UniqueEntityID } from '../../../shared/domain';
import { Serializer } from '../../../shared/infrastructure';
import { TaskEntity, TaskError } from '../../domain';
import { BodyValueObject } from '../../domain/Body.value';
import { CreatedValueObject } from '../../domain/Created.value';
import { TitleValueObject } from '../../domain/Title.value';
import { TaskModel } from '../models';

@injectable()
export class TaskSerializer extends Serializer<TaskError, TaskEntity, TaskModel, TaskModel, TaskModel> {
    public fromEntityToDTO(entity: TaskEntity): TaskModel {
        return {
            id: entity.id.toString(),
            title: entity.props.title.value,
            body: entity.props.body.value,
            created: entity.props.created.value.toISOString(),
        };
    }

    public fromModelToEntity(model: TaskModel): Result<TaskError, TaskEntity> {
        const title = TitleValueObject.create({ title: model.title });

        if (title.isError) return Result.Error(title.getError());

        const body = BodyValueObject.create({ body: model.body });

        if (body.isError) return Result.Error(body.getError());

        const created = CreatedValueObject.create({ created: new Date(model.created) });

        if (created.isError) return Result.Error(created.getError());

        const task = TaskEntity.create(
            {
                title: title.getSuccess(),
                body: body.getSuccess(),
                created: created.getSuccess(),
            },
            new UniqueEntityID(model.id)
        );

        if (task.isError) return Result.Error(task.getError());

        return Result.Success(task.getSuccess());
    }

    public fromEntityToResponse(entity: TaskEntity): TaskModel {
        return {
            id: entity.id.toString(),
            title: entity.props.title.value,
            body: entity.props.body.value,
            created: entity.props.created.value.toISOString(),
        };
    }
}
