import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import CreatePapers from './pages/CreatePapers';
import DeletePaper from './pages/DeletePaper';
import EditPaper from './pages/EditPaper';
import ShowPaper from './pages/ShowPaper';

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<Home/>}/>
      <Route path = '/papers/create' element = {<CreatePapers/>}/>
      <Route path = '/papers/details/:id' element = {<ShowPaper/>}/>
      <Route path = '/papers/edit/:id' element = {<EditPaper/>}/>
      <Route path = '/papers/delete/:id' element = {<DeletePaper/>}/>
    </Routes>
  )
}

export default App