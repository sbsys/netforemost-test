import { injectable } from 'inversify';
import { Result, UniqueEntityID } from '../../../shared/domain';
import { Serializer } from '../../../shared/infrastructure';
import { NoteEntity, NoteError } from '../../domain';
import { BodyValueObject } from '../../domain/Body.value';
import { CreatedValueObject } from '../../domain/Created.value';
import { TitleValueObject } from '../../domain/Title.value';
import { NoteModel } from '../models';

@injectable()
export class NoteSerializer extends Serializer<NoteError, NoteEntity, NoteModel, NoteModel, NoteModel> {
    public fromEntityToDTO(entity: NoteEntity): NoteModel {
        return {
            id: entity.id.toString(),
            title: entity.props.title.value,
            body: entity.props.body.value,
            created: entity.props.created.value.toISOString(),
        };
    }

    public fromModelToEntity(model: NoteModel): Result<NoteError, NoteEntity> {
        const title = TitleValueObject.create({ title: model.title });

        if (title.isError) return Result.Error(title.getError());

        const body = BodyValueObject.create({ body: model.body });

        if (body.isError) return Result.Error(body.getError());

        const created = CreatedValueObject.create({ created: new Date(model.created) });

        if (created.isError) return Result.Error(created.getError());

        const task = NoteEntity.create(
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

    public fromEntityToResponse(entity: NoteEntity): NoteModel {
        return {
            id: entity.id.toString(),
            title: entity.props.title.value,
            body: entity.props.body.value,
            created: entity.props.created.value.toISOString(),
        };
    }
}
