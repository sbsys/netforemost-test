import 'reflect-metadata';
import { Container } from 'inversify';
import { Symbols } from './Symbols';
/* serializers */
/* repositories */
/* use cases */
/* handlers */
/* controllers */
/* routes */
/* apps */
import { Api } from '../apps';

const container = new Container();
/* serializers */
/* repositories */
/* use cases */
/* handlers */
/* controllers */
/* routes */
/* apps */
container.bind<Api>(Symbols.Api).to(Api);

export { container };
