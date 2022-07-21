import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import SingleContent from '../../SingleContent/SingleContent'
import CustomPagination from '../../../Pagination/CustomPagination';
import { Genres  } from '../../Genres'
import useGenres from '../../../hooks/useGenre'
export default function Movies  () {
  const [page, setPage] = useState(1);
  const [content, setcontent] = useState([]);
  const [numOfPages, setNumOfPages] = useState()
  const [selectedGenres,setSelectedGenres]= useState([]);
  const [genres,setGenres]= useState([]);
  const genreforURL = useGenres(selectedGenres);
  
  const fetchMovies = async () => {


    
    const {data} = await axios.get(`
    https://api.themoviedb.org/3/discover/movie?api_key=181dcf13c77d96bc6de0063ed0e59097&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}
    `);
    setcontent(data.results)
    setNumOfPages(data.total_pages);
  };
   
  useEffect(() => {
fetchMovies();
  }, [page, genreforURL]
  )
  return (
    <div >
      <span className='pageTitle'></span>
    <Genres 
    type={'movie'}
    selectedGenres={selectedGenres}
    setSelectedGenres={setSelectedGenres}
    genres={genres}
    setGenres={setGenres}
    setPage={setPage}
    />
      <div className='trending'>
      { 
        content && content.map((c) => 
(<SingleContent 
key={c.id} 
id={c.id}
poster={c.poster_path}
title={c.title || c.name}
date={c.first_air_data || c.release_date}
media_type={c.media_type}
vote_average={c.vote_average}
/> ))}
      
    </div>
    {numOfPages > 1 && (    <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
)}
      </div>
   
  )
}
