/* react */
import { memo, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
/* context */
import { useNoteListContext } from '../NoteListView';
/* layouts */
import { PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* utils */
import { format } from 'date-fns';
/* assets */
import { MdReviews } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './NoteDetail.module.scss';

const NoteDetailView = () => {
    /* states */
    const { noteId } = useParams<{ noteId: string }>();

    const {
        /* functions */
        getNoteById,
    } = useNoteListContext();

    const note = useMemo(() => getNoteById(noteId ?? ''), [getNoteById, noteId]);

    /* utils */
    const navigate = useNavigate();

    /* functions */
    const handleCloseNoteDetail = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleEditNote = useCallback(() => {
        navigate(`../${noteId}/edit`, { replace: true });
    }, [navigate, noteId]);

    return (
        <PanelLayout orientation="col" className={styles.NoteDetail}>
            <div className={styles.Header} title="Note detail">
                <i>
                    <MdReviews />
                </i>

                <Legend hasDots>Note detail</Legend>
            </div>

            {note && (
                <ScrollLayout orientation="col">
                    <div className={styles.Content}>
                        <div className={styles.Title}>
                            <h3 title={note.title}>
                                <Legend justify="center" hasDots>
                                    {note.title}
                                </Legend>
                            </h3>

                            <Legend justify="end" hasDots title={format(new Date(note.created), 'MMM do, yyyy')}>
                                {format(new Date(note.created), 'MMM do, yyyy')}
                            </Legend>
                        </div>

                        <Legend title={note.body}>{note.body}</Legend>
                    </div>
                </ScrollLayout>
            )}

            <div className={styles.Actions}>
                <Button
                    type="button"
                    className={ButtonStyles.OutlineNone}
                    title="Close"
                    onClick={handleCloseNoteDetail}>
                    <Legend hasDots justify="center">
                        Close
                    </Legend>
                </Button>

                <Button
                    type="button"
                    disabled={!note}
                    className={ButtonStyles.FillWarning}
                    title="Edit"
                    onClick={handleEditNote}>
                    <Legend hasDots justify="center">
                        Edit
                    </Legend>
                </Button>
            </div>
        </PanelLayout>
    );
};

export default memo(NoteDetailView);
