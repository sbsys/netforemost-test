/* react */
import { memo } from 'react';
/* context */
import { useNoteListContext } from '../NoteList.context';
/* components */
import { Button } from 'shared/components';
import { FieldSet } from 'app/components';
/* styles */
import styles from './NoteListHeader.module.scss';

const NoteListHeader = () => {
    const {
        /* props */
        createNoteButtonProps,
        searchInputProps,
        sortNotesButtonListProps,
    } = useNoteListContext();

    return (
        <section className={styles.Header}>
            <div className={styles.Actions}>
                <Button {...createNoteButtonProps} />
            </div>

            <FieldSet {...searchInputProps} />

            <div className={styles.Actions}>
                {sortNotesButtonListProps.map((sortNotesButtonProps, sortNotesButtonIndex) => (
                    <Button {...sortNotesButtonProps} key={sortNotesButtonIndex} />
                ))}
            </div>
        </section>
    );
};

export default memo(NoteListHeader);
