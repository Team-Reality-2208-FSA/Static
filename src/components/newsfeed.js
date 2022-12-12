
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsFeed, selectNewsFeed } from "../store/newsfeedSlice";
import Card from "react-bootstrap/Card";


const newsfeed = () => {
  const dispatch = useDispatch();

  const NewsFeed = useSelector(selectNewsFeed);
  console.log(NewsFeed.newsFeed ? NewsFeed.newsFeed.articles : null);

  useEffect(() => {
    dispatch(fetchNewsFeed());
  }, []);

  return (
    <>
    <h1>Crime Feed</h1>
    <br></br>
    <h3 className="wheelHeader">Top Stories</h3>
    <div className="newsFeedBody">
      
      {NewsFeed.newsFeed
        ? NewsFeed.newsFeed.articles.map((article, idx) => (
          idx < 4 && (
            <Card id="card-body"   style={{ width: "18rem" }}>
              <Card.Img id="card-image" variant="top" src={article.urlToImage} />
              <Card.Body>
                <Card.Title id='card-title' >
                  { <a id="card-link" href={article.url}>{article.title}</a>}
                </Card.Title>
                <Card.Text id="card-text" >
                  {article.description}
          
                  </Card.Text>
              </Card.Body>
            </Card>
          )
        ))
        : null}
    </div>
    <h3 className="wheelHeader">Your Area</h3>
    <div className="newsFeedBody">
      
      {NewsFeed.newsFeed
        ? NewsFeed.newsFeed.articles.map((article, idx) => (
          idx > 7 && idx < 12  && (
            <Card id="card-body"   style={{ width: "18rem" }}>
              <Card.Img id="card-image" variant="top" src={article.urlToImage} />
              <Card.Body>
                <Card.Title id='card-title' >
                  { <a id="card-link" href={article.url}>{article.title}</a>}
                </Card.Title>
                <Card.Text id="card-text" >
                  {article.description}
          
                  </Card.Text>
              </Card.Body>
            </Card>
          )
        ))
        : null}
    </div>
    <h3 className="wheelHeader">Specific Crime</h3>
    <div className="newsFeedBody">
      
      {NewsFeed.newsFeed
        ? NewsFeed.newsFeed.articles.map((article, idx) => (
          idx > 10 && idx < 15 && (
            <Card id="card-body"   style={{ width: "18rem" }}>
              <Card.Img id="card-image" variant="top" src={article.urlToImage} />
              <Card.Body>
                <Card.Title id='card-title' >
                  { <a id="card-link" href={article.url}>{article.title}</a>}
                </Card.Title>
                <Card.Text id="card-text" >
                  {article.description}
          
                  </Card.Text>
              </Card.Body>
            </Card>
          )
        ))
        : null}
    </div>
    </>
  );
};

export default newsfeed;

