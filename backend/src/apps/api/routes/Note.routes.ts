import { Express, Router } from 'express';
import { inject, injectable } from 'inversify';
import {
    CreateNoteController,
    GetNoteListController,
    UpdateNoteController,
} from '../../../contexts/notes/infrastructure/controllers';
import { Symbols } from '../../../env';
import { Routes } from '../../../types';

@injectable()
export class NoteRoutes implements Routes<Express> {
    private router = Router();

    constructor(
        @inject(Symbols.CreateNoteController) private createNoteController: CreateNoteController,
        @inject(Symbols.GetNoteListController) private getNoteListController: GetNoteListController,
        @inject(Symbols.UpdateNoteController) private updateNoteController: UpdateNoteController
    ) {}

    configure(app: Express, path: string): void {
        this.router.get('/', (req, res) => this.getNoteListController.execute(req, res));
        this.router.post('/', (req, res) => this.createNoteController.execute(req, res));
        this.router.patch('/:noteId', (req, res) => this.updateNoteController.execute(req, res));

        app.use(path, this.router);
    }
}
