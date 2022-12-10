export const Symbols = {
    /* serializers */
    TaskSerializer: Symbol.for('TaskSerializer'),
    /* repositories */
    TaskRepository: Symbol.for('TaskRepository'),
    /* use cases */
    CreateTaskUseCase: Symbol.for('CreateTaskUseCase'),
    /* handlers */
    /* controllers */
    CreateTaskController: Symbol.for('CreateTaskController'),
    /* routes */
    TaskRoutes: Symbol.for('TaskRoutes'),
    /* apps */
    Api: Symbol.for('Api'),
};
