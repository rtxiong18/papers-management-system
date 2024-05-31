import React, { useState } from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, Link} from 'react-router-dom'
import { useSnackbar } from 'notistack'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleLogin = () => {
        const data = {
            email,
            password,
        };

        setLoading(true);
        axios
            .post(`http://localhost:5555/user/login`, data)
            .then(res => {
                if (res.data === "success") {
                    enqueueSnackbar('Login success', { variant: 'success' });
                    navigate(`/${data.email}`);
                }
                else {
                    enqueueSnackbar('Email or password wrong', { variant: 'wrong' });
                    setEmail('');
                    setPassword('');
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                //alert('An error happened. Please check console');
                enqueueSnackbar('Error', { variant: 'error' });
                console.log(error);
            });
    }

    return (
        <div className='p-4'>
            <h1 className='text-3x1 my-4'>Welcome, pls login</h1>
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleLogin}>
                    Login
                </button>
                <div className='flex'>
                    <h1 className='text-3x1 my-4'>Not a user?</h1>
                    <Link to='/user/register'>
                        <h1 className='text-3x1 my-4 text-blue-600'>&nbsp; sign up here</h1>
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default Login