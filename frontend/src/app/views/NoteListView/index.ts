import { lazy } from 'react';

const NoteListView = lazy(() => import('./NoteList.view'));

export { NoteListView };

export * from './NoteList.context';
