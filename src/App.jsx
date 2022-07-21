import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import SimpleBottomNavigation from './components/MainNav'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Container } from '@material-ui/core'

import Search from './components/Pages/Search/Search'
import Series from './components/Pages/Series/Series'
import Trending from './components/Pages/Trending/Trending'
import  Movies  from './components/Pages/Movies/Movies'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Header/>
    <div className='App'>
<Container>
  <Routes>

<Route path={'/'} element ={<Trending/>} />
<Route path={'/movies'} element ={<Movies/>} />
<Route path={'/series'} element ={<Series/>} />
<Route path={'/search'} element ={<Search/>} />


</Routes>

</Container>
    </div>
    <SimpleBottomNavigation/>
   </BrowserRouter>
    
  )
}

export default App
