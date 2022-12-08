import { findNonSerializableValue } from "@reduxjs/toolkit";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsFeed, selectNewsFeed } from "../store/newsfeedSlice";
import { Link } from "react-router-dom";

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
            <div className="newsFeedArticle">
                <img className="articleImage" src={article.urlToImage} />
              <h1 className="articleTitle">{article.title}</h1>
              <a href={article.url}>Link to article</a>
            </div>
          ))
        : null}
    </div>
  );
};

export default newsfeed;
