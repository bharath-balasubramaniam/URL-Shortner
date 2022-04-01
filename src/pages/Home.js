import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserState } from "../context/UserProvider";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { Button, Form, Row, Col } from "react-bootstrap";
import ShortenUrlCard from "../components/ShortenUrlCard";
import UrlTable from "../components/UrlTable";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #faeee7;
`;
function HomePage() {
  const { user } = UserState();
  const [urls, setUrls] = React.useState([]);
  const [shortUrl, setShortUrl] = useState();
  const [search, setSearch] = React.useState("");
  const fetchUrls = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "https://url-shortner-be.herokuapp.com/api/url/dashboard",
        config
      );
      console.log(data, user, config);
      setUrls(data);
    } catch (error) {
      alert("failed to load the url's!");
    }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const clearSearch = () => {
    setSearch("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `https://url-shortner-be.herokuapp.com/api/url/search?longUrl=${search}`,
        config
      );
      console.log(data);
      setUrls([data]);
    } catch (error) {
      alert("failed to load the url's!");
    }
    // searchUrl(search);
  };
  useEffect(() => {
    fetchUrls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortUrl]);
  console.log(urls);
  return (
    <Container>
      <Navbar />
      <Row className="my-4">
        <Col className="center-content">
          <legend className="text-center">Try it now :</legend>
          <ShortenUrlCard shortUrl={shortUrl} setShortUrl={setShortUrl} />
        </Col>
      </Row>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form className="my-4" onSubmit={(e) => handleSubmit(e)}>
          <Form.Group>
            <Form.Label style={{ textAlign: "right", fontWeight: "600" }}>
              Search by Long URL :
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter long url to search"
              name="search"
              value={search}
              onChange={(e) => handleChange(e)}
              style={{ width: "22rem" }}
            />
          </Form.Group>
          <div
            className="mt-3"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Button variant="info" type="submit">
              Search
            </Button>
            <Button variant="secondary" onClick={() => clearSearch()}>
              Clear
            </Button>
          </div>
        </Form>
      </div>
      <UrlTable urls={urls} />
    </Container>
  );
}

export default HomePage;
