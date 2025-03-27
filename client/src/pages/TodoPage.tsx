import { useState, useEffect } from 'react';
import { getTodos, addTodo, deleteTodo } from '../api/todo';
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
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[3000px] px-8 py-6 flex flex-col items-center">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">TASKY</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-1 border rounded-md text-sm hover:bg-gray-100"
          >
            로그아웃
          </button>
        </header>

        <main className="bg-white shadow-md rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-1">할 일 목록</h2>
          <p className="text-sm text-gray-500 mb-6">환영합니다, {email}님!</p>

          <ul className="space-y-3 mb-6 text-left">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                    className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className={`text-gray-800 font-medium ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-sm text-red-500 hover:text-red-700 px-3 py-1 rounded-md hover:bg-red-50"
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
    </div>
  );
}
