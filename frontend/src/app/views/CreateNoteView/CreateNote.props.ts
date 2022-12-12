/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'app/components';
/* utils */
import * as yup from 'yup';

export interface CreateNoteContextProps {
    /* functions */
    handleCancelCreateNote: () => void;
    handleCreateNote: (event: BaseSyntheticEvent) => void;
    /* props */
    createNoteInputListProps: FieldSetProps[];
}

export interface CreateNoteProviderProps extends ChildrenProps {
    context: CreateNoteContextProps;
}

export const CreateNoteValidations = yup.object({
    title: yup.string().required('note title is required'),
    body: yup.string().required('note body is required'),
});
