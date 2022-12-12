export const Symbols = {
    /* serializers */
    NoteSerializer: Symbol.for('NoteSerializer'),
    /* repositories */
    NoteRepository: Symbol.for('NoteRepository'),
    /* use cases */
    CreateNoteUseCase: Symbol.for('CreateNoteUseCase'),
    GetNoteListUseCase: Symbol.for('GetNoteListUseCase'),
    UpdateNoteUseCase: Symbol.for('UpdateNoteUseCase'),
    /* handlers */
    /* controllers */
    CreateNoteController: Symbol.for('CreateNoteController'),
    GetNoteListController: Symbol.for('GetNoteListController'),
    UpdateNoteController: Symbol.for('UpdateNoteController'),
    /* routes */
    NoteRoutes: Symbol.for('NoteRoutes'),
    /* apps */
    Api: Symbol.for('Api'),
};
