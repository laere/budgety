import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, path }) => {
  return (
    <div className="dashboard-card">
      <div className="card-content">
        <p className="title">{title}</p>
      </div>
      <footer className="card-footer title is-3">
        <Link to={path} className="card-footer-item">
          +
        </Link>
      </footer>
    </div>
  );
};

export default Card;
