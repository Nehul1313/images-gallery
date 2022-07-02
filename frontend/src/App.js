import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./components/Header.js";
import Search from "./components/search.js";
import ImageCard from "./components/ImageCard.js";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Welcome from "./components/Welcome.js";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";
const UNSPLASH_KEY = "dRfgDAQ9bnf3q-h7lQ_SKFzgk7P2uVQjsu2_JzVb-Nk";

function App() {
  const [word, setWord] = useState("");
  const [images, setImages] = useState([]);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => getSavedImages(), []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}&client_id=${UNSPLASH_KEY}`);
      setImages([{ ...res.data, title: word }, ...images]);
    } catch (error) {
      console.log(error);
    }
    setWord("");
  };

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        setImages(images.filter((image) => image.id !== id));
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id); 
    imageToBeSaved.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if(res.data?.inserted_id){
        setImages(images.map((image) => image.id === id ? {...image, saved: true} : image));}
      
    } catch (error) {
      console.log(error);
      
    }

  }

  return (
    <div className="App">
      <Header title="Images Gallery"></Header>

      <Search
        word={word}
        setWord={setWord}
        handleSubmit={handleSearchSubmit}
      ></Search>
      <Container className="mt-4">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col className="pb-3" key={i}>
                <ImageCard image={image} deleteImage={handleDeleteImage} saveImage={handleSaveImage} />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
}

export default App;
