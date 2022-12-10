export const Symbols = {
    /* serializers */
    TaskSerializer: Symbol.for('TaskSerializer'),
    /* repositories */
    TaskRepository: Symbol.for('TaskRepository'),
    /* use cases */
    CreateTaskUseCase: Symbol.for('CreateTaskUseCase'),
    GetTaskListUseCase: Symbol.for('GetTaskListUseCase'),
    UpdateTaskUseCase: Symbol.for('UpdateTaskUseCase'),
    /* handlers */
    /* controllers */
    CreateTaskController: Symbol.for('CreateTaskController'),
    GetTaskListController: Symbol.for('GetTaskListController'),
    UpdateTaskController: Symbol.for('UpdateTaskController'),
    /* routes */
    TaskRoutes: Symbol.for('TaskRoutes'),
    /* apps */
    Api: Symbol.for('Api'),
};
