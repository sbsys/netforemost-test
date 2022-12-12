/* react */
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
/* props */
import { FieldSetProps } from 'app/components';
import { UpdateNoteContextProps, UpdateNoteValidations } from './UpdateNote.props';
/* context */
import { useNoteListContext } from '../NoteListView';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAppNotify } from 'app/hooks';
/* services */
import { updateNoteService } from 'app/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
/* types */
import { UpdateNoteDTO } from 'app/types';
/* assets */
import { MdBookmarkAdded, MdDangerous } from 'react-icons/md';
/* atyles */
import { FieldStyles } from 'shared/styles';

export const useUpdateNote = () => {
    /* states */
    const { noteId } = useParams<{ noteId: string }>();

    const {
        /* functions */
        handleGetNoteList,
        getNoteById,
    } = useNoteListContext();

    const note = useMemo(() => getNoteById(noteId ?? ''), [getNoteById, noteId]);

    /* utils */
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<UpdateNoteDTO>({
        mode: 'all',
        resolver: yupResolver(UpdateNoteValidations),
    });

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAppNotify();

    const navigate = useNavigate();

    /* functions */
    const handleCancelUpdateNote = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleUpdateNote = handleSubmit(async data => {
        showLoader();

        const service = await updateNoteService(noteId ?? '', data);

        hideLoader();

        if (!service.status)
            return notify('danger', {
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        notify('success', {
            icon: <MdBookmarkAdded />,
            text: service.message,
            timestamp: new Date(),
        });

        handleGetNoteList();

        navigate(`../${noteId}/detail`, { replace: true });
    });

    /* props */
    const titleInputProps: FieldSetProps = {
        field: {
            className: errors.title ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: 'Title',
            defaultValue: note?.title,
            ...register('title'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: errors.title?.message ?? 'update note title',
            children: errors.title?.message ?? 'update note title',
        },
    };

    const bodyInputProps: FieldSetProps = {
        field: {
            className: errors.body ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: 'Body',
            defaultValue: note?.body,
            ...register('body'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: errors.body?.message ?? 'update note body',
            children: errors.body?.message ?? 'update note body',
        },
    };

    const updateNoteInputListProps: FieldSetProps[] = note ? [titleInputProps, bodyInputProps] : [];

    /* context */
    const context: UpdateNoteContextProps = {
        /* functions */
        handleCancelUpdateNote,
        handleUpdateNote,
        /* props */
        updateNoteInputListProps,
    };

    return { context };
};
