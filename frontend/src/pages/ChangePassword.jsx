import React, { useState } from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const ChangePassword = () => {

  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {email} = useParams();

  const handleChange = () => {

    const data = {
      email,
      password1,
      password2,
    };

    setLoading(true);
    axios
      .post(`http://localhost:5555/user/${email}/change`, data)
      .then(
        res => {

        if(res.data === "wrong passwords") {
            enqueueSnackbar('pls confirm passwords', { variant: 'wrong' });
            setPassword1('');
            setPassword2('');
        }
          
        else{
          enqueueSnackbar('password Changed', { variant: 'success' });
          navigate(`/${email}`);
          
          setLoading(false);
        }
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
      <h1 className='text-3x1 my-4'>Pls change password</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>email</label>
          <input
            disabled
            value={email}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>new password</label>
          <input
            type='password'
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Confirm new password</label>
          <input
            type='password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleChange}>
          Change password
        </button>

      </div>

    </div>
  )
}

export default ChangePassword