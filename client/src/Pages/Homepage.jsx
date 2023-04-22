import React, { useEffect, useState } from "react";
import { Card, Form, Loader, Navbar } from "../components";
import { bgImage32 } from "../assets";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />); // {...post} passes all the data of that post to the Card
  }

  return <h2 className="defaultTitle">{title}</h2>;
};

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://ai-image-d3iy.onrender.com/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <div className="head-main">
      <Navbar />
        <div className="main-div">
        <div className="header">
          <img src={bgImage32} alt="bgimage" />
          <div className="wrapper">
            <p className="line_1">
              <span>Unleash Your Creativity with Cutting-</span>
              <span>Edge AI Image Generation:</span>
            </p>
            <p className="line_2">
              Transform Your Ideas into Stunning Visuals!
            </p>
          </div>
        </div>

        <div className="homepage-form">
          <Form
            labelName="Search posts"
            type="text"
            name="text"
            placeholder="Search something..."
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>

        <div className="homepage-cards">
          <p>Featured Gallery</p>
          {loading ? (
            <div className="loading-icon">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && ( // if there is a search text
                <h2 className="search-text">Showing Resuls for {searchText}</h2>
              )}
              <div className="wrapper-grid">
                {searchText ? (
                  <RenderCards
                    data={searchedResults}
                    title="No Search Results Found"
                  />
                ) : (
                  <RenderCards data={allPosts} title="No Posts Yet" />
                )}
              </div>
            </>
          )}
        </div>
      </div>
     
      <div className="footers">
        <p>© Manav - 2023</p>
      </div>
      
    </div>
  );
};

export default Homepage;
