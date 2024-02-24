import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth';
import '../layout/styles.css';
import { FiSearch } from 'react-icons/fi'; // Importing the search icon from react-icons library

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    email: '', 
    password: '',
    role: 'USER' // Default role
  });
  const [language, setLanguage] = useState('THAI'); // Default language
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      // validation
      const response = await axios.post('http://localhost:8999/auth/login', input);
      const token = response.data.token;
      localStorage.setItem('token', token);
      const userResponse = await axios.get('http://localhost:8999/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(userResponse.data);
    } catch(err) {
      console.log(err.message);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle search
  const handleSearch = () => {
    // Perform search logic here
    console.log('Searching for:', searchQuery);
    // You can send a request to your backend for search functionality
  };

  return (
    <div className="background-container relative flex items-center justify-center h-screen"> 
    <div className="language-switch absolute top-0 left-40 mt-10 mr-10">
      <button onClick={() => handleLanguageChange('THAI')}>
        TH<span> | </span>
      </button>
      <button onClick={() => handleLanguageChange('ENGLISH')}>
        EN
      </button>
      <div className="logo mt-300  " />
    <span className="motorrent-text">MotorRent</span> {/* Added "MotorRent" text */}
  </div>
    
    <div className="search-support-container absolute top-0 right-0 mt-10 mr-10 flex">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        {/* Replacing the search button with a search icon */}
        <button onClick={handleSearch} className="search-button">
          <FiSearch />
        </button>
      </div>
      <div className="support-button">
        <button className="btn btn-support" style={{backgroundColor: '#EADF00', color: 'black'}}>
          Support
        </button>
      </div>
    </div>
    
    <div className="login-border p-5 rounded mt-5">
      <div className="login">{language === 'THAI' ? 'เข้าสู่ระบบ' : 'Login'}</div>
      <form className="flex flex-col gap-2 form-container" onSubmit={handleSubmit}>
        <label className="form-control">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-gray-800 dark:text-white mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 5.6V18c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V5.6l-.9.7-7.9 6a2 2 0 0 1-2.4 0l-8-6-.8-.7Z"/>
              <path d="M20.7 4.1A2 2 0 0 0 20 4H4a2 2 0 0 0-.6.1l.7.6 7.9 6 7.9-6 .8-.6Z"/>
            </svg>
            <input
              type="text"
              className="input input-bordered"
              name="email"
              placeholder={language === 'THAI' ? 'อีเมล' : 'Email'}
              value={input.email}
              onChange={handleChange}
            />
          </div>
          </label>

          <label className="form-control">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-gray-800 dark:text-white mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7c0-1.1.9-2 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6c.6 0 1 .4 1 1v3a1 1 0 1 1-2 0v-3c0-.6.4-1 1-1Z" clipRule="evenodd"/>
              </svg>
              <input
                type="password"
                className="input input-bordered"
                name="password"
                placeholder={language === 'THAI' ? 'รหัสผ่าน' : 'Password'}
                value={input.password}
                onChange={handleChange}
              />
            </div>
          </label>

          <div className="register-link">
            <a href="/register">{language === 'THAI' ? 'สร้างบัญชีใหม่' : 'Create a new account'}</a>
          </div>

          <div className="form-control">
            <div className="flex items-center">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="role"
                  value="USER"
                  checked={input.role === 'USER'}
                  onChange={handleChange}
                />
                <span className="ml-2">{language === 'THAI' ? 'ผู้เช่ารถทั่วไป' : 'User'}</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="role"
                  value="ADMIN"
                  checked={input.role === 'ADMIN'}
                  onChange={handleChange}
                />
                <span className="ml-2">{language === 'THAI' ? 'แอดมิน' : 'Admin'}</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn btn-success">{language === 'THAI' ? 'เข้าสู่ระบบ' : 'Login'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
