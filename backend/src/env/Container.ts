import 'reflect-metadata';
import { Container } from 'inversify';
import { Symbols } from './Symbols';
/* serializers */
import { NoteSerializer } from '../contexts/notes/infrastructure/serializers';
import { InMemoryNoteRepository } from '../contexts/notes/infrastructure/repositories';
/* repositories */
import { NoteRepository } from '../contexts/notes/domain';
/* use cases */
import { CreateNoteUseCase, UpdateNoteUseCase } from '../contexts/notes/application/commands';
import { GetNoteListUseCase } from '../contexts/notes/application/queries';
/* handlers */
/* controllers */
import {
    CreateNoteController,
    GetNoteListController,
    UpdateNoteController,
} from '../contexts/notes/infrastructure/controllers';
/* routes */
import { NoteRoutes } from '../apps/api/routes';
/* apps */
import { Api } from '../apps';

const container = new Container();
/* serializers */
container.bind<NoteSerializer>(Symbols.NoteSerializer).to(NoteSerializer);
/* repositories */
container.bind<NoteRepository>(Symbols.NoteRepository).to(InMemoryNoteRepository);
/* use cases */
container.bind<CreateNoteUseCase>(Symbols.CreateNoteUseCase).to(CreateNoteUseCase);
container.bind<GetNoteListUseCase>(Symbols.GetNoteListUseCase).to(GetNoteListUseCase);
container.bind<UpdateNoteUseCase>(Symbols.UpdateNoteUseCase).to(UpdateNoteUseCase);
/* handlers */
/* controllers */
container.bind<CreateNoteController>(Symbols.CreateNoteController).to(CreateNoteController);
container.bind<GetNoteListController>(Symbols.GetNoteListController).to(GetNoteListController);
container.bind<UpdateNoteController>(Symbols.UpdateNoteController).to(UpdateNoteController);
/* routes */
container.bind<NoteRoutes>(Symbols.NoteRoutes).to(NoteRoutes);
/* apps */
container.bind<Api>(Symbols.Api).to(Api);

export { container };
