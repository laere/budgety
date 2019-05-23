import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, path }) => {
  return (
    <div class="dashboard-card">
      <div class="card-content">
        <p class="title">{title}</p>
      </div>
      <footer class="card-footer title is-3">
        <Link to={path} class="card-footer-item">
          +
        </Link>
      </footer>
    </div>
  );
};

export default Card;
