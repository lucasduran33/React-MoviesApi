import React from 'react' 
import axios from 'axios'
import { useEffect } from 'react';
import { Chip } from '@material-ui/core';

export const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
}) => {

const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
setGenres(genres.filter((g) =>g.id !== genre.id));
setPage(1);
}

const handleRemove = (genre) =>{
    setSelectedGenres(
        selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
}


    const fetchGenres = async () =>{
     const  {data} =  await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=181dcf13c77d96bc6de0063ed0e59097&language=en-US`);
     setGenres(data.genres)
    };

console.log(genres)

    useEffect(() => {
        fetchGenres();
return () => {
    setGenres({});
}
    },[]);
  return (
    <div style={{padding: '6px 0'}}>
{

selectedGenres.map((genre) =>( 
<Chip
label={genre.name}
style={{margin: 2}}
clickable 
size='small'
color='primary'
key={genre.id}
onDelete={() => handleRemove(genre)}
/>
))

}
{

genres.length > 1 ? genres.map((genre) =>( 
<Chip
label={genre.name}
style={{margin: 2}}
clickable 
size='small'
key={genre.id}
onClick={() => handleAdd(genre)}
/>
))
: 
null
}

<Chip

/>
    </div>
  )
}
