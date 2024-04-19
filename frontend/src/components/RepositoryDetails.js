import React from "react";

const RepositoryDetails = ({ match }) => {
  const { repoName } = match.params;

  return (
    <div>
      <h2>Repository Details</h2>
      <p>Repository Name: {repoName}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default RepositoryDetails;
