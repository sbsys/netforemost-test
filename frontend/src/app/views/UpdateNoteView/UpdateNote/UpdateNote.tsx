/* react */
import { memo } from 'react';
/* context */
import { useUpdateNoteContext } from '../UpdateNote.context';
/* layouts */
import { PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'app/components';
/* assets */
import { MdAdd } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateNote.module.scss';

const UpdateNote = () => {
    const {
        /* functions */
        handleCancelUpdateNote,
        handleUpdateNote,
        /* props */
        updateNoteInputListProps,
    } = useUpdateNoteContext();

    return (
        <PanelLayout orientation="col" className={styles.UpdateNote}>
            <div className={styles.Header} title="Update new note">
                <i>
                    <MdAdd />
                </i>

                <Legend hasDots>Update new note</Legend>
            </div>

            <form onSubmit={handleUpdateNote}>
                <ScrollLayout orientation="col">
                    <div className={styles.Content}>
                        {updateNoteInputListProps.map((noteProps, notePropsIndex) => (
                            <FieldSet {...noteProps} key={notePropsIndex} />
                        ))}
                    </div>
                </ScrollLayout>

                <div className={styles.Actions}>
                    <Button
                        type="button"
                        className={ButtonStyles.OutlineNone}
                        title="Cancel"
                        onClick={handleCancelUpdateNote}>
                        <Legend hasDots justify="center">
                            Cancel
                        </Legend>
                    </Button>

                    <Button type="submit" className={ButtonStyles.FillSecondary} title="Update">
                        <Legend hasDots justify="center">
                            Update
                        </Legend>
                    </Button>
                </div>
            </form>
        </PanelLayout>
    );
};

export default memo(UpdateNote);
