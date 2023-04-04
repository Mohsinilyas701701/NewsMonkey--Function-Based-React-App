import "./App.css";

import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const perPageArticles = 10;
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);
  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar color='#f11946' height={5} progress={progress} />
        <Routes>
          <Route
            exact
            path='/'
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={perPageArticles}
                key='general'
                country='us'
                category='general'
              />
            }
          ></Route>
          <Route
            exact
            path='business'
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                pageSize={perPageArticles}
                key='business'
                country='us'
                category='business'
              />
            }
          ></Route>
          <Route
            exact
            path='entertainment'
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={perPageArticles}
                key='entertainment'
                country='us'
                category='entertainment'
              />
            }
          ></Route>
          <Route
            exact
            path='general'
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                pageSize={perPageArticles}
                key='general'
                country='us'
                category='general'
              />
            }
          ></Route>
          <Route
            exact
            path='health'
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={perPageArticles}
                key='health'
                country='us'
                category='health'
              />
            }
          ></Route>
          <Route
            exact
            path='science'
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                pageSize={perPageArticles}
                key='science'
                country='us'
                category='science'
              />
            }
          ></Route>
          <Route
            exact
            path='sports'
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={perPageArticles}
                key='sports'
                country='us'
                category='sports'
              />
            }
          ></Route>
          <Route
            path='technology'
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                pageSize={perPageArticles}
                key='technology'
                country='us'
                category='technology'
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;