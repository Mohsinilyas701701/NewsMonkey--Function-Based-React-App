import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalizeTitle = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeTitle(props.category)} - NewsMonkey`;
    updateNews();
  }, []);

  const handlePrevClick = async () => {
    setPage(page - 1);
    updateNews();
  };

  const handleNextClick = async () => {
    setPage(page + 1);
    updateNews();
  };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${
      props.category
    }&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1 className='text-center my-5 pt-5'>
        News Monkey - Top {capitalizeTitle(props.category)} Headlines
      </h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
        scrollableTarget='scrollableDiv'
      >
        <div className='container'>
          <div className='row'>
            {articles.map((element) => {
              return (
                <div className='col-md-4 my-2' key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 20) : ""}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    imgUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://i.ytimg.com/vi/alsrnCc0fUQ/maxresdefault.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      <div className='container d-flex justify-content-between align-items-center my-5'>
        <button
          disabled={page <= 1}
          type='button'
          className='btn btn-dark'
          onClick={handlePrevClick}
        >
          &laquo; Prev
        </button>
        <button
          type='button'
          disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
          className='btn btn-dark'
          onClick={handleNextClick}
        >
          Next &raquo;
        </button>
      </div>
    </>
  );
};

export default News;

News.defaultProps = {
  country: "us",
  pageSize: 6,
  category: "sports",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
