import { createTheme, Tabs,Tab, TextField, ThemeProvider } from '@material-ui/core';
import React from 'react'
import { useState,useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import SingleContent from  '../../SingleContent/SingleContent'
import CustomPagination from '../../../Pagination/CustomPagination';
import axios from 'axios'
import {Button} from '@material-ui/core';
export default function Search (){


const [type,setType] = useState(0);
const [text, setText] = useState('')
const [page,setPage] = useState(1)
const [content,setContent] = useState([]);
const [numOfPages, setNumOfPages] = useState();


const darkTheme = createTheme({
    palette:{
        type:'dark',
        primary:{
            main:'#fff',
        },
    },
  });
const fetchSearch = async() => {
const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=181dcf13c77d96bc6de0063ed0e59097&language=en-US&query=${text}&page=${page}&include_adult=false`
    );
    setContent(data.results)
setNumOfPages(data.total_pages)
}

useEffect(() => {
    window.scroll(0,0);
    fetchSearch()

},[type,page])

    return (
        <div>
<ThemeProvider theme={darkTheme}>
<div style={{display:'flex',margin:'15px, 0'}}>

<TextField 
            style={{flex:1}}
            className='searchBox'
            label='Search'
            variant='filled'
            onChange={(e) => setText(e.target.value)}
/>
<Button 
variant='contained' 
style={{marginLeft:10}}
onClick={fetchSearch}
><SearchIcon/></Button>
            </div>
            <Tabs value={type} 
            indicatorColor='primary'
            textColor='primary'
            onChange={(event,newValue) => {
                setType(newValue);
                setPage(1);
            }}
            style={{paddingBottom: '5'}}
            > 
            <Tab style={{width: '50%'}} label='Search Movies'/>
            <Tab style={{width: '50%'}} label='Search TV Series'/>
            </Tabs>
            </ThemeProvider>
            <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {!text &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
        </div>
    )
}