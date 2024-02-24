import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const guestNav = [
  { to: '/', text: 'Login' },
  { to: '/register', text: 'Register' },
];

const userNav = [
  { to: '/', text: 'Home' },
  { to: '/new', text: 'New Todo' },
];

export default function Header() {
  const { user, logout } = useAuth();
  const finalNav = user?.id ? userNav : guestNav;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8999/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      const userResponse = await axios.get('http://localhost:8999/auth/me', {
        headers: { Authorization: `Bearer ${response.data.token}` }
      });
      useAuth.setUser(userResponse.data);
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar bg-black"> {/* Added "bg-black" class for black background */}
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">MotorRent, {user?.id ? user.username : 'Guest'}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {finalNav.map(el => (
            <li key={el.to} >
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          {user?.id ? (
            <li>
              <Link to="#" onClick={handleLogout}>Logout</Link>
            </li>
          ) : (
            <li>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className="input input-ghost"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="input input-ghost"
                />
                <button onClick={handleLogin} className="btn btn-primary ml-2">Login</button>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
