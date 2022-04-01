import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { UserState } from "../context/UserProvider";
import axios from "axios";
function ShortenUrlCard({ shortUrl, setShortUrl }) {
  const [state, setState] = useState({ longUrl: "" });
  const [baseUrl] = useState(() =>
    process.env.NODE_ENV === "production"
      ? window.location.hostname
      : window.location.hostname + ":" + window.location.port
  );
  const { user } = UserState();
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.token);
    let urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    try {
      if (!urlPattern.test(state.longUrl)) {
        return alert("Invalid URL entered!");
      } else {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const urlData = { longUrl: state.longUrl };
        const { data } = await axios.post(
          `https://url-shortner-be.herokuapp.com/api/url/create`,
          urlData,
          config
        );
        setShortUrl(data.shortUrl);
      }
    } catch (error) {
      if (error) console.log(error.message);
      return;
    }
  };
  return (
    <Card
      className="text-center shorten-url-card"
      style={{ backgroundColor: "transparent" }}
    >
      <Card.Body>
        <Card.Title>Enter your URL here!</Card.Title>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Paste your URL here..."
              name="longUrl"
              value={state.longUrl}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </Card.Body>
      {shortUrl && (
        <Card.Footer className="text-muted">
          Short URL :<a href={`/${shortUrl}`}>{`${baseUrl}/${shortUrl}`} </a>
          <span className="copy-btn">
            <Button
              size="sm"
              variant="success"
              onClick={() => {
                navigator.clipboard.writeText(`${baseUrl}/${shortUrl}`.trim());
              }}
            >
              Copy
            </Button>
          </span>
        </Card.Footer>
      )}
    </Card>
  );
}

export default ShortenUrlCard;
