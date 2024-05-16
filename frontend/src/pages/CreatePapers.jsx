import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const CreatePapers = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [journal, setJournal] = useState('');
  const [filename, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  // const onChangeFile = e => {
  //   setFileName(e.target.files[0]);
  // }
  const handleSavePaper = () => {
    // const data = {
    //   title,
    //   author,
    //   publishYear,
    //   journal,
    // };

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publishYear', publishYear);
    formData.append('journal', journal);
    formData.append('paperImage', filename);


    setLoading(true);
    axios
      .post(`http://localhost:5555/papers`, formData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Paper Created successfully', {variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happened. Please check console');
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(error);
      });
  }


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3x1 my-4'>Create Paper</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='text'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Journal</label>
          <input
            type='text'
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500' htmlFor='file_picker'>Paper Front Page</label>
          <input
            className='border-2 border-gray-500 px-4 py-2 w-full'
            type='file'
            name = 'file_picker'
            id = 'file_picker'
            onChange={(e) => setFileName(e.target.files[0])}
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' formEncType= 'multipart/form-data' onClick={handleSavePaper}>
          Save
        </button>

      </div>

    </div>
  )
}

export default CreatePapers