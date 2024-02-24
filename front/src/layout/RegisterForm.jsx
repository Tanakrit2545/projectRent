import axios from 'axios';
import { useState } from "react";
import '../layout/styles.css';

export default function RegisterForm() {
  const initialInputState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '', // MALE/FEMALE
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER'
  };

  const [input, setInput] = useState(initialInputState);

  const hdlChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      // Validation
      if (input.password !== input.confirmPassword) {
        return alert('Please check confirm password');
      }
      const rs = await axios.post('http://localhost:8999/auth/register', input);
      console.log(rs);
      if (rs.data.msg === 'Registration successful') {
        alert('Register Successful');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const resetForm = () => {
    setInput(initialInputState);
  };

  return (
    <div className="background-container1">
      <div className="background-container relative flex items-center justify-center h-screen">
        {/* Language switch */}
        <div className="language-switch absolute top-0 right-0 mt-10 mr-10">
          <div className="logo mt-30 " />
        </div>

        <div className="login-border1 p-5 rounded mt-5">
          <div className="text-3xl mb-5 center">สร้างบัญชี</div>

          <div className="register-link1">
            <a href="/login">มีบัญชีอยู่แล้วใช่หรือไม่</a>
          </div>

          <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
            <div className="flex space-x-4">
              <div className="form-control" style={{ textAlign: 'left', marginRight: '129px', maxWidth: '15rem' }}>
                <label className="label"></label>
                <div className="flex items-center" >
                  {/* ปรับ margin-right และขนาดของ SVG element */}
                  <svg className="w-8 h-8 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 20a8 8 0 0 1-5-1.8v-.6c0-1.8 1.5-3.3 3.3-3.3h3.4c1.8 0 3.3 1.5 3.3 3.3v.6a8 8 0 0 1-5 1.8ZM2 12a10 10 0 1 1 10 10A10 10 0 0 1 2 12Zm10-5a3.3 3.3 0 0 0-3.3 3.3c0 1.7 1.5 3.2 3.3 3.2 1.8 0 3.3-1.5 3.3-3.3C15.3 8.6 13.8 7 12 7Z" clip-rule="evenodd" />
                  </svg>
                  {/* จบส่วนของไอคอน */}
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    name="firstName"
                    placeholder="ชื่อ"
                    value={input.firstName}
                    onChange={hdlChange}
                  />
                </div>
              </div>



              <label className="form-control w-full max-w-xs " style={{ maxWidth: '14rem' }}>
                <div className="label"></div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="lastName"
                  placeholder="นามสกุล"
                  value={input.lastName}
                  onChange={hdlChange}
                />
              </label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', }}>
              <label className="form-control w-full max-w-xs" style={{ textAlign: 'left', marginRight: '369px', maxWidth: '15rem' }}>
                <div className="label"></div>
                <div className="flex items-center">
                  {/* ปรับ margin และขนาดของ SVG element ด้วย style */}
                  <svg className="w-8 h-8 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M5 4c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clip-rule="evenodd" />
                  </svg>
                  {/* จบส่วนของไอคอน */}
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    name="phoneNumber"
                    placeholder="เบอร์โทรศัพท์"
                    value={input.phoneNumber}
                    onChange={hdlChange}
                  />
                </div>
              </label>
            </div>


            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <label className="form-control w-full max-w-xs" style={{ textAlign: 'left', marginRight: '458px' }}>
                <div className="label"></div>
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-gray-800 dark:text-white mr-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM7 12c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5z" />
                  </svg>
                  <select
                    className="select select-bordered w-full max-w-xs custom-select"
                    name="gender"
                    value={input.gender}
                    onChange={hdlChange}
                  >
                    <option value="">ระบุเพศ</option>
                    <option value="MALE">ชาย</option>
                    <option value="FEMALE">หญิง</option>
                  </select>
                </div>
              </label>

            </div>


            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <label className="form-control w-full max-w-xs" style={{ textAlign: 'left', marginRight: '375px', }}>
                <div className="label"></div>


                <div className="flex items-center">
                  <svg className="w-8 h-8 text-gray-800 dark:text-white mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 5.6V18c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V5.6l-.9.7-7.9 6a2 2 0 0 1-2.4 0l-8-6-.8-.7Z" />
                    <path d="M20.7 4.1A2 2 0 0 0 20 4H4a2 2 0 0 0-.6.1l.7.6 7.9 6 7.9-6 .8-.6Z" />
                  </svg>
                  <input

                    type="email"
                    className="input input-bordered w-full max-w-xs"
                    name="email"
                    placeholder="อีเมล"
                    value={input.email}
                    onChange={hdlChange}
                  />
                </div>
              </label>
            </div>


            <div className="flex space-x-4">
              <label className="form-control w-full max-w-xs" style={{ textAlign: 'left', marginRight: '125px', maxWidth: '18rem' }}>
                <div className="label"></div>
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-gray-800 dark:text-white mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7c0-1.1.9-2 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6c.6 0 1 .4 1 1v3a1 1 0 1 1-2 0v-3c0-.6.4-1 1-1Z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="password"
                    className="input input-bordered w-full max-w-xs"
                    name="password"
                    placeholder="รหัสผ่าน"
                    value={input.password}
                    onChange={hdlChange}
                  />
                </div>
              </label>
              <label className="form-control w-full max-w-xs" style={{ maxWidth: '15rem' }}>
                <div className="label"></div>
                <input
                  type="password"
                  className="input input-bordered w-full max-w-xs"
                  name="confirmPassword"
                  placeholder="ยืนยันรหัสผ่าน"
                  value={input.confirmPassword}
                  onChange={hdlChange}
                />
              </label>
            </div>


            <div className="form-actions">
              <button className="btn btn-success">สร้างบัญชี</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
