import Todo from '@interfaces/todo';

interface PropsButtons {
    index: number;
    text: string;
    completed: boolean;
    setTodoList: (todoList: Todo[]) => void;
    setModal: (todo: boolean) => void;
}

export default PropsButtons;