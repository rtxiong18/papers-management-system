import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import CreatePapers from './pages/CreatePapers';
import DeletePaper from './pages/DeletePaper';
import EditPaper from './pages/EditPaper';
import ShowPaper from './pages/ShowPaper';
import Login from './pages/Login';
import Register from './pages/Register';
import DeleteUser from './pages/DeleteUser';
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<Login/>}/>
      <Route path = '/user/register' element = {<Register/>}/>
      <Route path = '/:email/deleteuser' element = {<DeleteUser/>}/>
      <Route path = '/:email/changepassword' element = {<ChangePassword/>}/>
      <Route path = '/:email' element = {<Home/>}/>
      <Route path = '/:email/create' element = {<CreatePapers/>}/>
      <Route path = '/:email/details/:id' element = {<ShowPaper/>}/>
      <Route path = '/:email/edit/:id' element = {<EditPaper/>}/>
      <Route path = '/:email/delete/:id' element = {<DeletePaper/>}/>
    </Routes>
  )
}

export default App