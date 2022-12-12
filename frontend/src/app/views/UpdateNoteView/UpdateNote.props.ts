/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'app/components';
/* utils */
import * as yup from 'yup';

export interface UpdateNoteContextProps {
    /* functions */
    handleCancelUpdateNote: () => void;
    handleUpdateNote: (event: BaseSyntheticEvent) => void;
    /* props */
    updateNoteInputListProps: FieldSetProps[];
}

export interface UpdateNoteProviderProps extends ChildrenProps {
    context: UpdateNoteContextProps;
}

export const UpdateNoteValidations = yup.object({
    title: yup.string().required('note title is required'),
    body: yup.string().required('note body is required'),
});
