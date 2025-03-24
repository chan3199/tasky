import { useEffect, useState } from 'react';
import { getTodos, addTodo, deleteTodo } from '../api/todo';

interface Todo {
  id: number;
  text: string;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAdd = async () => {
    const newTodo = await addTodo(text);
    setTodos([...todos, newTodo]);
    setText('');
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>📝 할 일 목록</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>추가</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}{' '}
            <button onClick={() => handleDelete(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
