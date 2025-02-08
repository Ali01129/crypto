import React from 'react';
const PageNotFound = () => {
  return (
    <div className="page-not-found">
    <div className="container">
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Oops! Page Not Found</h2>
      <p className="description">The page you are looking for does not exist or has been moved.</p>
      <a href="/" className="home-link">Back to Home</a>
    </div>
  </div>
  );
};

export default PageNotFound;