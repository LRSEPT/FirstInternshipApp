import { useState, useEffect} from 'react'
import './App.css'
import axios from 'axios'
import SearchIcon from './SearchIcon.svg';
import { ButtonPagination } from './ButtonPagination';
import { IndividualImage } from '../Components/IndividualImage';
import '../Components/IndividualImage.css'

const Pictures = ({searchItem, searchResult, images}) => {
  return (
  <div className='pictures'>
  {
      searchItem !== "" ?
      !searchResult.length > 0 ? <h2>No result found</h2> : 
      searchResult.map((image) => (
          <IndividualImage key={image.id} image={image} />
      ))
      :images.length>0 && images.map((image) => (<IndividualImage key={image.id} image={image} />))
  }
  </div>
  )
}

function App() {
  const [images, setImages] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(1);
  const [allImages, setAllImages] = useState([]);
  const [buttonOn, setButtonOn] = useState(true);
  const [isSearchOn, setIsSearchOn] = useState(false);
  const api_key = import.meta.env.VITE_CLIENT_ID;
  const perPage = 50;

  const fetchAPI = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}&client_id=${api_key}`
      );
      const data = response.data;
      setImages(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [page]);

  const fetchAllAPI = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${searchItem}&per_page=${perPage}&page=${page}&client_id=${api_key}`
      );
      const data = response.data.results;
      setAllImages(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching all data: ", error);
    }
  };

  useEffect(() => {
    searchItem === undefined ? setIsSearchOn(false) : setIsSearchOn(true);
    fetchAllAPI();
  }, [page,searchItem]);

  useEffect(() => {
    const filteredResults = allImages.filter((image) =>
      image.alt_description && image.alt_description.toLowerCase().includes(searchItem.toLowerCase())
    );
    setSearchResult(filteredResults);
  }, [allImages, searchItem]);
  
  useEffect(() => {},[page]);

  return (
    <div className='app' >
      <h1>This is beautiful</h1>
      <div className='search'>
        <input 
          placeholder='Search for picture'
          onChange={(e) => {setSearchItem(e.target.value);setPage(1);}}
        />
        <img
          src={SearchIcon}
          alt='search'
        />
      </div>
      <ButtonPagination page={page} setPage={setPage} isSearchOn={isSearchOn} />
      <Pictures searchItem={searchItem} searchResult={searchResult} images={images}/>
      <ButtonPagination page={page} setPage={setPage} isSearchOn={isSearchOn} />
    </div>
  )  
}

export default App;
