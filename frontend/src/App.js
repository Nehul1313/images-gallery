import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./components/Header.js";
import Search from "./components/search.js";
import ImageCard from "./components/ImageCard.js";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Welcome from "./components/Welcome.js";
// eslint-disable-next-line

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";
const UNSPLASH_KEY = "dRfgDAQ9bnf3q-h7lQ_SKFzgk7P2uVQjsu2_JzVb-Nk";

function App() {
  const [word, setWord] = useState("");
  const [images, setImages] = useState([]);

  //console.log(images);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    //console.log(word);
    console.log('sending fetch request');

    // fetch(
    //   `${API_URL}/new-image?query=${word}&client_id=${UNSPLASH_KEY}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('adding found image to the state');
    //     setImages([{ ...data, title: word }, ...images]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}&client_id=${UNSPLASH_KEY}`);
      console.log('adding found image to the state');
      setImages([{ ...res.data, title: word }, ...images]);
    } catch (error) {
      console.log(error);
    }

    console.log('clearing search form');
    setWord("");
  };

  //console.log(word);
  // console.log(UNSPLASH_KEY);

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

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
                <ImageCard image={image} deleteImage={handleDeleteImage} />
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
