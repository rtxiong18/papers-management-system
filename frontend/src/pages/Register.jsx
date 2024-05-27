import React, { useState } from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = () => {
    const data = {
      email,
      password1,
      password2,
    };

    setLoading(true);
    axios
      .post(`http://localhost:5555/user/register`, data)
      .then(
        res => {
          if (res.data === "User existed") {
              enqueueSnackbar('User existed already', { variant: 'wrong' });
          }
          else if(res.data === "wrong passwords") {
              enqueueSnackbar('pls confirm passwords', { variant: 'wrong' });
              setPassword1('');
              setPassword2('');
          }
          else{
            enqueueSnackbar('User registered', { variant: 'success' });
            navigate('/papers/home');
          }
          setLoading(false);
      }
      )
      .catch((error) => {
        setLoading(false);
        //alert('An error happened. Please check console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  }
  return (
    <div className='p-4'>
      <h1 className='text-3x1 my-4'>Pls register as a new user</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>email</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>password</label>
          <input
            type='password'
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Confirm password</label>
          <input
            type='password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleRegister}>
          Register
        </button>
        <div className='flex'>
          <h1 className='text-3x1 my-4'>Already a user?</h1>
          <Link to='/user/login'>
            <h1 className='text-3x1 my-4 text-blue-600'>&nbsp; login here</h1>
          </Link>
        </div>

      </div>

    </div>
  )
}

export default Register