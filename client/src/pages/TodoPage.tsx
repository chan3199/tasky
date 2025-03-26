import { useEffect, useState } from 'react';
import { getTodos, addTodo, deleteTodo } from '../api/todo';

interface Todo {
  id: number;
  text: string;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    (async () => {
      const data = await getTodos();
      setTodos(data);
    })();
  }, []);

  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    const added = await addTodo(newTodo);
    setTodos((prev) => [...prev, added]);
    setNewTodo('');
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">📋 할 일 목록</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          추가
        </button>
      </div>
      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center px-4 py-2 bg-white shadow rounded-lg border"
          >
            <span>{todo.text}</span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-sm text-red-500 hover:underline"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
