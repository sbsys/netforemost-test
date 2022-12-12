import { CommonsErrorMessage } from '../../shared/domain';

export type NoteMessage =
    | `note.${
          | `exceptions.${
                | `id.${'notfound' | 'notvalid'}`
                | `title.${'notvalid' | 'already'}`
                | `body.${'notvalid'}`
                | `created.${'notvalid'}`}`
          | `success.${'created' | 'list' | 'detail' | 'updated'}`}`
    | CommonsErrorMessage;
