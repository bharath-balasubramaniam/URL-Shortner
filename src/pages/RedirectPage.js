import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function RedirectPage(props) {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    console.log(location);
    (async () => {
      try {
        const shortUrl = location.pathname;
        console.log(shortUrl);
        const { data } = await axios.put(
          `https://url-shortner-us5z.onrender.com/api/url/redirect${shortUrl}`
        );
        console.log(data);
        setLoading(false);
        window.location.href = data.longUrl;
      } catch (error) {
        console.error(error);
        setLoading(false);
        window.location.href = "/not/found";
      }
    })();
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <div
      className="center-content"
      style={{
        fontSize: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "rgb(243, 211, 192)",
      }}
    >
      Redirecting....
    </div>
  ) : null;
}
export default RedirectPage;
