import React, { useEffect } from "react";
import "./UserFormModal.scss";

const UserFormModal = ({
  onClose,
  handleSubmit,
  isAddModalOpen,
  isEditModalOpen,
  selectedUser,
  setFormData,
  formData,
  formErrors,
  isViewModalOpen,
}) => {
  useEffect(() => {
    if (isEditModalOpen && selectedUser) {
      setFormData(selectedUser);
    } else {
      setFormData({});
    }
  }, [isEditModalOpen, selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name);
    console.log(value);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div
      className={`modal ${
        isAddModalOpen || isEditModalOpen || isViewModalOpen ? "open" : ""
      }`}
    >
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>
          {isEditModalOpen
            ? "Edit User"
            : isViewModalOpen
            ? "View User"
            : "Add User"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="section">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={isViewModalOpen ? selectedUser?.name : formData?.name}
                  onChange={handleChange}
                  required
                  disabled={isViewModalOpen}
                />
                {formErrors.name && (
                  <span className="error">{formErrors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  value={isViewModalOpen ? selectedUser?.dob : formData?.dob}
                  onChange={handleChange}
                  required
                  disabled={isViewModalOpen}
                />
                {formErrors.dob && (
                  <span className="error">{formErrors.dob}</span>
                )}
              </div>

              <div className="form-group">
                <label>Favorite Food:</label>
                <select
                  name="food"
                  value={isViewModalOpen ? selectedUser?.food : formData?.food}
                  onChange={handleChange}
                  required
                  disabled={isViewModalOpen}
                >
                  <option value="">Select an option</option>
                  <option value="pizza">Pizza</option>
                  <option value="burger">Burger</option>
                  <option value="sushi">Sushi</option>
                  <option value="pasta">Pasta</option>
                </select>
                {formErrors.food && (
                  <span className="error">{formErrors.food}</span>
                )}
              </div>
            </div>

            <div className="section">
              <div className="form-group">
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  value={isViewModalOpen ? selectedUser?.age : formData?.age}
                  onChange={handleChange}
                  required
                  disabled={isViewModalOpen}
                />
                {formErrors.age && (
                  <span className="error">{formErrors.age}</span>
                )}
              </div>

              <div className="form-group">
                <label>Gender:</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="MALE"
                      checked={
                        isViewModalOpen
                          ? selectedUser?.gender === "MALE"
                          : formData?.gender === "MALE"
                      }
                      onChange={handleChange}
                      required
                      disabled={isViewModalOpen}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="FEMALE"
                      checked={
                        isViewModalOpen
                          ? selectedUser?.gender === "FEMALE"
                          : formData?.gender === "FEMALE"
                      }
                      onChange={handleChange}
                      required
                      disabled={isViewModalOpen}
                    />
                    Female
                  </label>
                </div>
                {formErrors.gender && (
                  <span className="error">{formErrors.gender}</span>
                )}
              </div>

              <div className="form-group">
                <label>Hobbies:</label>
                <textarea
                  name="hobbies"
                  value={
                    isViewModalOpen ? selectedUser?.hobbies : formData?.hobbies
                  }
                  onChange={handleChange}
                  maxLength={100}
                  required
                  disabled={isViewModalOpen}
                />
                {formErrors.hobbies && (
                  <span className="error">{formErrors.hobbies}</span>
                )}
              </div>
            </div>
          </div>
          <div className="btn">
            {isViewModalOpen ? (
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            ) : (
              <>
                <button className="btn btn-primary" onClick={onClose}>
                  Cancel
                </button>

                <button className=" btn btn-secondary" type="submit">
                  Submit
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
