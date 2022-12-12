/* react */
import { memo } from 'react';
/* context */
import { useNoteListContext } from '../NoteList.context';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { NoteListItem } from '../NoteListItem';
/* styles */
import styles from './NoteListBody.module.scss';

const NoteListBody = () => {
    const {
        /* states */
        noteList,
    } = useNoteListContext();

    return (
        <ScrollLayout orientation="col">
            <ul className={styles.Body}>
                {noteList.map((note, noteIndex) => (
                    <li key={noteIndex}>
                        <NoteListItem {...note} />
                    </li>
                ))}
            </ul>
        </ScrollLayout>
    );
};

export default memo(NoteListBody);
