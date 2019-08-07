import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import logo from "../assets/logo.svg";
import like from "../assets/like.svg";
import dislike from "../assets/dislike.svg";

import api from "../services/api";

export default function Main({ match }) {
  const [users, setusers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get(`/devs`, {
        headers: { user: match.params.id }
      });
      setusers(response.data);
    }
    loadUsers();
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id }
    });
    setusers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id }
    });
    setusers(users.filter(user => user._id !== id));
  }
  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="TinDev" />
      </Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <img src={user.avatar} alt={user.name} />
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </footer>

            <div className="buttons" onClick={() => handleLike(user._id)}>
              <button type="button" onClick={() => handleDislike(user._id)}>
                <img src={dislike} alt="TinDev" />
              </button>
              <button type="button">
                <img src={like} alt="TinDev" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
