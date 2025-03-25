import { useEffect, useState } from 'react';
import { getTodos, addTodo, deleteTodo } from '../api/todo';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface Todo {
  id: number;
  text: string;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

  const navigate = useNavigate();

  const email = jwtDecode<{ email: string }>(localStorage.getItem('token')!);
  

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <h2>📝 할 일 목록</h2>
      <h3 className="text-gray-600">환영합니다, {email.email}님!</h3>
      <button onClick={handleLogout}>로그아웃</button>
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
