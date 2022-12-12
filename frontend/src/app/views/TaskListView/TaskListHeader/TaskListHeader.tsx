/* react */
import { memo } from 'react';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'app/components';
/* assets */
import { MdAdd, MdClose } from 'react-icons/md';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';
import styles from './TaskListHeader.module.scss';

const TaskListHeader = () => {
    return (
        <section className={styles.Header}>
            <div className={styles.Actions}>
                <Button className={ButtonStyles.FillSecondary}>
                    <i>
                        <MdAdd />
                    </i>

                    <Legend hasDots>New task</Legend>
                </Button>
            </div>

            <FieldSet
                field={{
                    className: FieldStyles.OutlinePrimary,
                    placeholder: 'Search task',
                    afterContent: (
                        <Button className={ButtonStyles.Plain}>
                            <i>
                                <MdClose />
                            </i>
                        </Button>
                    ),
                }}
            />
        </section>
    );
};

export default memo(TaskListHeader);
