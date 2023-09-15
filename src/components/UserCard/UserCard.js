// src/UserCard.js
import React from "react";
import "./UserCard.scss";

const UserCard = ({ user, onDelete, onEdit, onView }) => {
  let circleColor = "";
  if (user.age <= 25) {
    circleColor = "green";
  } else if (user.age >= 25 && user.age <= 50) {
    circleColor = "purple";
  } else {
    circleColor = "orange";
  }

  return (
    <div className="user-card">
      <div className="user-name">
        <h2>{user.name}</h2>
        <div className={`circle ${circleColor}`} />
      </div>
      <div className="user-info">
        <p>
          Age: <small>{user.age}</small>
        </p>
        <p>
          Dob:
          <small>{user.dob}</small>
        </p>
        <p>
          Gender: <small>{user.gender}</small>
        </p>
        <p>
          Food: <small>{user.food}</small>
        </p>
        <p>
          Hobbies: <small>{user.hobbies}</small>
        </p>
      </div>
      <div className="user-actions">
        <button className="btn btn-primary" onClick={() => onDelete(user)}>
          Delete
        </button>
        <button className="btn btn-secondary" onClick={() => onEdit(user)}>
          Edit
        </button>
        <button className="btn btn-secondary" onClick={() => onView(user)}>
          View
        </button>
      </div>
    </div>
  );
};

export default UserCard;
