import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import RepositoryList from "./components/RepositoryList";
import RepositoryDetails from "./components/RepositoryDetails";
import FollowerList from "./components/FollowerList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/repositories/:username" element={<RepositoryList />} />
        <Route path="/repository/:repoName" element={<RepositoryDetails />} />
        <Route path="/followers/:username" element={<FollowerList />} />
      </Routes>
    </Router>
  );
};

export default App;
