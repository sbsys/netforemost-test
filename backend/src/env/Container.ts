import 'reflect-metadata';
import { Container } from 'inversify';
import { Symbols } from './Symbols';
/* serializers */
import { TaskSerializer } from '../contexts/tasks/infrastructure/serializers';
import { InMemoryTaskRepository } from '../contexts/tasks/infrastructure/repositories';
/* repositories */
import { TaskRepository } from '../contexts/tasks/domain';
/* use cases */
import { CreateTaskUseCase } from '../contexts/tasks/application/commands';
/* handlers */
/* controllers */
import { CreateTaskController } from '../contexts/tasks/infrastructure/controllers';
/* routes */
import { TaskRoutes } from '../apps/api/routes';
/* apps */
import { Api } from '../apps';

const container = new Container();
/* serializers */
container.bind<TaskSerializer>(Symbols.TaskSerializer).to(TaskSerializer);
/* repositories */
container.bind<TaskRepository>(Symbols.TaskRepository).to(InMemoryTaskRepository);
/* use cases */
container.bind<CreateTaskUseCase>(Symbols.CreateTaskUseCase).to(CreateTaskUseCase);
/* handlers */
/* controllers */
container.bind<CreateTaskController>(Symbols.CreateTaskController).to(CreateTaskController);
/* routes */
container.bind<TaskRoutes>(Symbols.TaskRoutes).to(TaskRoutes);
/* apps */
container.bind<Api>(Symbols.Api).to(Api);

export { container };
