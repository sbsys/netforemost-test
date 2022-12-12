/* react */
import { memo } from 'react';
/* context */
import { useCreateNoteContext } from '../CreateNote.context';
/* layouts */
import { PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'app/components';
/* assets */
import { MdAdd } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CreateNote.module.scss';

const CreateNote = () => {
    const {
        /* functions */
        handleCancelCreateNote,
        handleCreateNote,
        /* props */
        createNoteInputListProps,
    } = useCreateNoteContext();

    return (
        <PanelLayout orientation="col" className={styles.CreateNote}>
            <div className={styles.Header} title="Create new note">
                <i>
                    <MdAdd />
                </i>

                <Legend hasDots>Create new note</Legend>
            </div>

            <form onSubmit={handleCreateNote}>
                <ScrollLayout orientation="col">
                    <div className={styles.Content}>
                        {createNoteInputListProps.map((noteProps, notePropsIndex) => (
                            <FieldSet {...noteProps} key={notePropsIndex} />
                        ))}
                    </div>
                </ScrollLayout>

                <div className={styles.Actions}>
                    <Button
                        type="button"
                        className={ButtonStyles.OutlineNone}
                        title="Cancel"
                        onClick={handleCancelCreateNote}>
                        <Legend hasDots justify="center">
                            Cancel
                        </Legend>
                    </Button>

                    <Button type="submit" className={ButtonStyles.FillSecondary} title="Create">
                        <Legend hasDots justify="center">
                            Create
                        </Legend>
                    </Button>
                </div>
            </form>
        </PanelLayout>
    );
};

export default memo(CreateNote);
