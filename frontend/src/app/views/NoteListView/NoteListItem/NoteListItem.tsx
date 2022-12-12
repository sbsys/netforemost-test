/* react */
import { FC, memo } from 'react';
/* context */
import { useNoteListContext } from '../NoteList.context';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* utils */
import { format } from 'date-fns';
/* types */
import { NoteModel } from 'app/types';
/* assets */
import { MdEdit, MdReviews } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './NoteListItem.module.scss';

const NoteListItem: FC<NoteModel> = ({ id, title, created }) => {
    const {
        /* functions */
        handleNavigateToEditNote,
        handleNavigateToDetailNote,
    } = useNoteListContext();

    return (
        <PanelLayout orientation="row" className={styles.Item}>
            <PanelLayout orientation="col" className={styles.Title}>
                <h3 title={title}>
                    <Legend hasDots>{title}</Legend>
                </h3>

                <Legend hasDots title={format(new Date(created), 'MMM do, yyyy')}>
                    {format(new Date(created), 'MMM do, yyyy')}
                </Legend>
            </PanelLayout>

            <div className={styles.Actions}>
                <Button className={ButtonStyles.FillWarning} onClick={handleNavigateToEditNote(id)}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>

                <Button className={ButtonStyles.FillPrimary} onClick={handleNavigateToDetailNote(id)}>
                    <i>
                        <MdReviews />
                    </i>
                </Button>
            </div>
        </PanelLayout>
    );
};

export default memo(NoteListItem);
