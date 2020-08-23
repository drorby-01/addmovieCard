import React, { useState, useEffect } from 'react';
import './App.css';

import ImageComponent, { IImageProps } from './components/image';
import CustomHeader from './components/header';

import { data } from "./data"
import MovieList from './components/movie-list';
import { IMovie } from './components/movie';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { getAllByTestId, configure } from '@testing-library/react';
import Filter from './components/filter';
import Configuration from "./components/configuration"
import NewMovie from "./components/new Movie"
// jsx element


const images: Array<any> = [
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGnMVTv0j0SVGZtdxSAh2aulvySNcgLHoqwg&usqp=CAU", height: 200, width: 300 },
    { src: "https://media.wired.com/photos/5c6750d23e8add2cdb91724f/125:94/w_2393,h_1800,c_limit/shark-551025353.jpg", height: 300, width: 500 },
    { src: "", height: 200, width: 300 }
]

// create function element
function App() {

    const initialMovies: Array<any> = data;
    const initialDeletedMovies: Array<any> = []
    
    const [movies, setMovies] = useState(initialMovies)
    const [deletedMovies, setDeletedMovies] = useState(initialDeletedMovies)
    const [visibilityAddMovieForm,setVisibilty]=useState("none")
    // const [getter, setter] = useState(Initial State)
    const [starsColor,setStarColor] = useState("")
    const [visibleConfiguration,setVisibilty1]=useState("none")

    function getStarsColor(color:string){
        
        setStarColor(color)
        return color
    }


    function clearMovies() {
        setMovies([])
    }

    function revert() {
        const deletedMoviesCopy = [...deletedMovies];
        if (!deletedMoviesCopy.length) return;
        const getLastRevertMovie = deletedMoviesCopy[0];
        deletedMoviesCopy.splice(0, 1)
        setMovies([...movies, getLastRevertMovie])
        setDeletedMovies([...deletedMoviesCopy])
    }

    function addMovie(movie:IMovie) {
         console.log(movie)
         setMovies([...movies,movie])
    }

    function deleteMovie(moovieId: string): void {
        /* function that delete movie by is movieid
         the movieid is come from the movie component
         so to go from the root we need to go dwon to the childern we need to send to the movelist
         prop with function then to call movie with prop.deleteMovie ->movie */
        const moviesCopy = [...movies]
        const [index, m] = getMoviesData()
        moviesCopy.splice(index, 1);
        setMovies(moviesCopy)
        setDeletedMovies([...deletedMovies, m])
        function getMoviesData(): Array<any> {
            const index = movies.findIndex(m => m.imdbID === moovieId);
            const movie = movies.find(m => m.imdbID === moovieId);
            return [index, movie]
        }
    }

    function showMovieForm(){
        setVisibilty("block")
    }

    function filterOperation(value: string) {
        if (!value) return setMovies(data);
        const filteredMovies = data.filter(movie => movie.Title.toLowerCase().includes(value))
        setMovies(filteredMovies)
    }
     
    function showConfiguration(){
        setVisibilty1("block")
    }
    return <div className="container">
        
         
        <CustomHeader style={{ color: "green" }} text={"Movies"} />


        <div className="row">
            <Filter filterOperation={filterOperation} />
            
        </div>
        <div className="row">
        <Configuration starsColor={getStarsColor} visible={visibleConfiguration}/>
        
        </div>
        <div className="row">
            <Button onClick={clearMovies} > clear Movies</Button>
            <Button className="ml-1" onClick={showMovieForm} > Add movie</Button> 
            <Button className="ml-1" onClick={revert} > revert</Button>
            <Button className="ml-1" onClick={showConfiguration} > Add Configuration</Button> 
        </div>
         <NewMovie addMovie={addMovie} visible={visibilityAddMovieForm}/>
        <MovieList noDataMessage="No Data for you firend" movies={moviesAdapter(movies)} />
    </div>


    function moviesAdapter(movies: Array<any>): Array<IMovie> {
        return movies.map((movie: any) => {
            const { Title, Year, rank, Poster, imdbID, Type } = movie;
            return { starsColor ,deleteMovie, baseAdditionalInfoUrl: "http://imdb.com/title", title: Title, year: Year, poster: Poster, type: Type, id: imdbID, rate: rank }
        })
    }

}


interface IProps {
    images: Array<IImageProps>
}
function ImageList(props: IProps): any {
    const { images } = props
    return <div>
        {images.map((imgProps: any) => (<ImageComponent {...imgProps} url={imgProps.src} />))}
    </div>

}


function Details() {
    return <span> Details component </span>
}




// return <React.Fragment>
// <h1> aaa</h1>
// <h1> aaa</h1>
// </React.Fragment>


//also works
// function App2() {
//     return header
// }

export default App;
