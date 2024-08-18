import { List } from 'antd';
import { TodoItem } from '../Item';
import styles from './TodoList.module.scss';
import { useTodoContext } from '../../context/TodoContext';

export const TodoList = () => {
    const { deleteTodo, toggleDone, toggleImportant, filteredItems } = useTodoContext();

    return (
        <List
            className={styles.todoList}
            dataSource={filteredItems}
            renderItem={(item) => (
                <List.Item>
                    <TodoItem
                        itemLabel={item.itemLabel}
                        isImportant={item.isImportant}
                        isDone={item.isDone}
                        onToggleDone={toggleDone}
                        onToggleImportant={toggleImportant}
                        onDelete={deleteTodo}
                        id={item.id}
                    />
                </List.Item>
            )}
        />
    );
};
