/* react */
import { memo } from 'react';
/* layouts */
import { PanelLayout } from 'shared/layouts';
import { ManagementLayout } from 'app/layouts';
/* components */
import { NoteListHeader } from '../NoteListHeader';
import { NoteListBody } from '../NoteListBody';
/* styles */
import styles from './NoteList.module.scss';

const NoteList = () => {
    return (
        <ManagementLayout>
            <PanelLayout orientation="col" className={styles.NoteList}>
                <NoteListHeader />

                <NoteListBody />
            </PanelLayout>
        </ManagementLayout>
    );
};

export default memo(NoteList);
