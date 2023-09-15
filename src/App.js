import React, { useEffect, useState } from "react";

import UserCard from "./components/UserCard/UserCard";
import UserEditModal from "./components/UserFormModal/UserFormModal";
import Pagination from "./components/Pagination/Pagination";

import userIcon from "./assets/user.png";
import { users } from "./assets/db";

import "./App.scss";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dob: "",
    gender: "",
    food: "",
    hobbies: "",
  });

  const [userCards, setUserCards] = useState(users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const cardsPerPage = 6;
  const totalPages = Math.ceil(userCards.length / cardsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const visibleUserCards = userCards.slice(startIndex, endIndex);

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsViewModalOpen(false);
  };

  useEffect(() => {
    try {
      sessionStorage.setItem("usercards", JSON.stringify(userCards));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [userCards]);

  const handleDelete = (userToDelete) => {
    const updatedUsers = userCards.filter((user) => user !== userToDelete);
    setUserCards(updatedUsers);
  };

  const handleEdit = (userToEdit) => {
    setSelectedUser(userToEdit);
    setIsEditModalOpen(true);
  };

  const handleView = (userToView) => {
    setSelectedUser(userToView);
    setIsViewModalOpen(true);
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const openViewModal = (user) => {
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    for (const key in formData) {
      if (formData[key].trim() === "") {
        errors[key] = "This field is empty";
      }
    }

    // If there are errors, don't submit the form
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (selectedUser) {
      // Edit existing user
      const updatedUsers = userCards.map((user) =>
        user === selectedUser ? formData : user
      );
      setUserCards(updatedUsers);
      setSelectedUser(null);
    } else {
      // Add new user
      setUserCards([...userCards, formData]);
    }
    setFormData({
      name: "",
      age: "",
      dob: "",
      gender: "",
      food: "",
      hobbies: "",
    });
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsViewModalOpen(false);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const fetchUsers = () => {
    try {
      const savedUsers = JSON.parse(sessionStorage.getItem("usercards"))
        ? JSON.parse(sessionStorage.getItem("userCards"))
        : [];

      if (savedUsers) {
        setUserCards(savedUsers);
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>User's Inventory</h1>
        <img src={userIcon} alt="user-icon" />
      </header>

      <nav>
        <h1>List Of Users</h1>
        <button className="btn btn-secondary" onClick={openViewModal}>
          Add User
        </button>
      </nav>

      {userCards.length > 0 && (
        <div className="container">
          {visibleUserCards.map((user, index) => (
            <UserCard
              key={index}
              user={user}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onView={handleView}
            />
          ))}
        </div>
      )}

      <UserEditModal
        onClose={closeModal}
        user={selectedUser}
        handleSubmit={handleSubmit}
        isAddModalOpen={isAddModalOpen}
        isEditModalOpen={isEditModalOpen}
        selectedUser={selectedUser}
        setFormData={setFormData}
        formData={formData}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        isViewModalOpen={isViewModalOpen}
      />

      <Pagination
        totalPages={totalPages}
        prevPage={prevPage}
        currentPage={currentPage}
        nextPage={nextPage}
      />
    </div>
  );
};

export default App;
