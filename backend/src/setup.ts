import { container } from './env';
import { Api } from './apps';
/* handlers */

function handlers(): void {
    const handlerList: [] = [];

    handlerList.forEach(handler => container.resolve(handler).setupSubscriptions());
}

function setup() {
    container.resolve(Api).run();

    handlers();
}

export { setup };
