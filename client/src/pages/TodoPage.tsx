import { useState, useEffect } from 'react';
import { getTodos, addTodo, deleteTodo, toggleTodo } from '../api/todo';
import { useNavigate } from 'react-router-dom';

export default function TodoPage() {
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('email') || '사용자';

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        navigate('/login');
      }
    };
    fetchTodos();
  }, [navigate]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newTodo = await addTodo(text);
    setTodos([...todos, newTodo]);
    setText('');
  };

  const handleToggle = async (id: number) => {
    const updated = await toggleTodo(id);
    setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('../');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10">
      <header className="w-full max-w-md flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">TASKY</h1>
        <button onClick={handleLogout} className="px-4 py-1 border rounded-md text-sm hover:bg-gray-100">
          로그아웃
        </button>
      </header>

      <main className="w-full max-w-md bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-1">할 일 목록</h2>
        <p className="text-sm text-center text-gray-500 mb-6">환영합니다, {email}님!</p>

        <ul className="space-y-3 mb-6">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className={`text-gray-800 font-medium ${todo.completed ? 'line-through' : ''}`}>
                {todo.text}
              </span>
              <button
                onClick={() => handleDelete(todo.id)}
                className="ml-auto text-red-500 hover:text-red-700 text-sm"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>

        <form onSubmit={handleAdd} className="flex items-center space-x-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="할 일을 입력하세요"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            추가
          </button>
        </form>
      </main>
    </div>
  );
}
