import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsFeed, selectNewsFeed } from "../store/newsfeedSlice";
import Card from "react-bootstrap/Card";

import Card from "react-bootstrap/Card";


const newsfeed = () => {
  const dispatch = useDispatch();

  const NewsFeed = useSelector(selectNewsFeed);
  console.log(NewsFeed.newsFeed ? NewsFeed.newsFeed.articles[0] : null);

  useEffect(() => {
    dispatch(fetchNewsFeed());
  }, []);

  return (
    <div className="newsFeedBody">
      {NewsFeed.newsFeed
        ? NewsFeed.newsFeed.articles.map((article) => (

            <Card id="card-body" border="warning"  style={{ width: "18rem" }}>
              <Card.Img variant="top" src={article.urlToImage} />
              <Card.Body>
                <Card.Title id='card-title' >
                  { <a id="card-link" href={article.url}>{article.title}</a>}
                </Card.Title>
                <Card.Text id="card-text" >
                  {article.description}
                  </Card.Text>
              </Card.Body>
            </Card>
          ))
        : null}
    </div>
  );
};

export default newsfeed;


