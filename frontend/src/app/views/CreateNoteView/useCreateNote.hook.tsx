/* react */
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
/* props */
import { FieldSetProps } from 'app/components';
import { CreateNoteContextProps, CreateNoteValidations } from './CreateNote.props';
/* context */
import { useNoteListContext } from '../NoteListView';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAppNotify } from 'app/hooks';
/* services */
import { createNoteService } from 'app/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
/* types */
import { CreateNoteDTO } from 'app/types';
/* assets */
import { MdBookmarkAdded, MdDangerous } from 'react-icons/md';
/* atyles */
import { FieldStyles } from 'shared/styles';

export const useCreateNote = () => {
    /* states */
    const {
        /* functions */
        handleGetNoteList,
    } = useNoteListContext();

    /* utils */
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateNoteDTO>({
        mode: 'all',
        resolver: yupResolver(CreateNoteValidations),
    });

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAppNotify();

    const navigate = useNavigate();

    /* functions */
    const handleCancelCreateNote = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleCreateNote = handleSubmit(async data => {
        showLoader();

        const service = await createNoteService(data);

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

        handleCancelCreateNote();
    });

    /* props */
    const titleInputProps: FieldSetProps = {
        field: {
            className: errors.title ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: 'Title',
            ...register('title'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: errors.title?.message ?? 'note title',
            children: errors.title?.message ?? 'note title',
        },
    };

    const bodyInputProps: FieldSetProps = {
        field: {
            className: errors.body ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: 'Body',
            ...register('body'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: errors.body?.message ?? 'note body',
            children: errors.body?.message ?? 'note body',
        },
    };

    const createNoteInputListProps: FieldSetProps[] = [titleInputProps, bodyInputProps];

    /* context */
    const context: CreateNoteContextProps = {
        /* functions */
        handleCancelCreateNote,
        handleCreateNote,
        /* props */
        createNoteInputListProps,
    };

    return { context };
};
