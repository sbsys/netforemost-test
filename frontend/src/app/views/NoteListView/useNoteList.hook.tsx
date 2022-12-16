/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
/* props */
import { FieldSetProps } from 'app/components';
import { NoteListContextProps } from './NoteList.props';
/* components */
import { Button, ButtonProps, Legend } from 'shared/components';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAppNotify } from 'app/hooks';
/* services */
import { getNoteListService } from 'app/services';
/* assets */
import { MdAdd, MdClose, MdDangerous } from 'react-icons/md';
/* types */
import { NoteModel } from 'app/types';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';

export const useNoteList = () => {
    /* states */
    const [notes, setNotes] = useState<NoteModel[]>([]);

    const [searchParam, setSearchParam] = useState<string>('');

    const noteList = useMemo(() => {
        let list = [...notes];

        if (searchParam && list.length > 0)
            list = list.filter(
                note =>
                    note.title.toLowerCase().includes(searchParam.toLocaleLowerCase()) ||
                    note.body.toLowerCase().includes(searchParam.toLocaleLowerCase())
            );

        return list;
    }, [notes, searchParam]);

    /* utils */
    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAppNotify();

    const navigate = useNavigate();

    /* functions */
    const handleGetNoteList = useCallback(async () => {
        showLoader();

        const service = await getNoteListService();

        hideLoader();

        if (!service.status)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setNotes(service.data);
    }, [hideLoader, notify, showLoader]);

    const handleClearSearchParam = useCallback(() => {
        setSearchParam('');
    }, []);

    const handleNavigateToCreateNote = useCallback(() => {
        navigate('create');
    }, [navigate]);

    const handleNavigateToEditNote = useCallback(
        (noteId: string) => () => {
            navigate(`${noteId}/edit`);
        },
        [navigate]
    );

    const handleNavigateToDetailNote = useCallback(
        (noteId: string) => () => {
            navigate(`${noteId}/detail`);
        },
        [navigate]
    );

    const getNoteById = useCallback(
        (noteId: string) => {
            return notes.find(note => note.id === noteId);
        },
        [notes]
    );

    /* reactivity */
    useEffect(() => {
        handleGetNoteList();
    }, [handleGetNoteList]);

    /* props */
    const createNoteButtonProps: ButtonProps = useMemo(
        () => ({
            className: ButtonStyles.FillSecondary,
            onClick: handleNavigateToCreateNote,
            children: (
                <>
                    <i>
                        <MdAdd />
                    </i>

                    <Legend hasDots>Add note</Legend>
                </>
            ),
        }),
        [handleNavigateToCreateNote]
    );

    const searchInputProps: FieldSetProps = useMemo(
        () => ({
            field: {
                className: FieldStyles.OutlinePrimary,
                placeholder: 'Search note',
                value: searchParam,
                onChange: (event: any) => setSearchParam(event.target.value),
                afterContent: searchParam.length > 0 && (
                    <Button onClick={handleClearSearchParam} className={ButtonStyles.Plain}>
                        <i>
                            <MdClose />
                        </i>
                    </Button>
                ),
            },
        }),
        [handleClearSearchParam, searchParam]
    );

    /* context */
    const context: NoteListContextProps = {
        /* states */
        noteList,
        /* functions */
        handleGetNoteList,
        handleNavigateToEditNote,
        handleNavigateToDetailNote,
        getNoteById,
        /* props */
        createNoteButtonProps,
        searchInputProps,
    };

    return { context };
};
