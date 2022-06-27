import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.js';
import Search from './components/search.js';
import {useState} from 'react'

const UNSPLASH_KEY = 'dRfgDAQ9bnf3q-h7lQ_SKFzgk7P2uVQjsu2_JzVb-Nk';

function App() {
  const [word,setWord] = useState('');

  const handleSearchSubmit = (e) =>{
    e.preventDefault();
    console.log(word);
    fetch(`https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`)
    .then((res) => res.json())
    .then((data)=>{
      console.log(data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  //console.log(word);
  // console.log(UNSPLASH_KEY);

  return (
    <div className="App">
      <Header title="Images Gallery"></Header>  
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit}></Search>
    </div>
  );
}

export default App;
