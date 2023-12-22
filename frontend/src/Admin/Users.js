/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ALLUSERS, UPDATEUSER } from "../Redux/ActionType";
import './User.css'

const Users = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const allUsers = useSelector((state) => state.allUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setIsModalOpen(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstname,
          last_name: lastname,
          email,
          phone,
          password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("success");
        setIsModalOpen(false);
        const response = await fetch("http://127.0.0.1:8000/cadmin/users/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

        dispatch({
          type: ALLUSERS,
          data: data,
        });
        console.log(firstname);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Error occurred during fetch request:", error);
    }
  };

  const handleEditUser = (e, user) => {
    console.log("sasas");
    console.log(user);
    setSelectedUser(user);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log("asasasasasasasasasasasas", selectedUser);
    console.log(`http://127.0.0.1:8000/cadmin/user-update/${selectedUser.id}/`);
    setIsModalOpen(true);
    await fetch(
      `http://127.0.0.1:8000/cadmin/user-update/${selectedUser.id}/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          first_name: selectedUser.first_name,
          last_name: selectedUser.last_name,
          email: selectedUser.email,
          phone: selectedUser.phone,
        }),
      }
    )
      .then((res) => {
        const payload = {
          id: selectedUser.id,
          first_name: selectedUser.first_name,
          last_name: selectedUser.last_name,
          email: selectedUser.email,
          phone: selectedUser.phone,
        };
        dispatch({
          type: UPDATEUSER,
          data: payload,
        });
        console.log("success");
        setIsModalOpen(false);
      })
      .catch((error) => {
        // Handle any errors that might occur during the fetch request
        console.error("Error occurred during fetch request:", error);
      });
  };

  const handleSearchUser = async (e) => {
    e.preventDefault();
    console.log(search);
    console.log(`http://localhost:8000/cadmin/user-search/?name=${search}`);
    const response = await fetch(
      `http://localhost:8000/cadmin/user-search/?name=${search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    dispatch({
      type: ALLUSERS,
      data: data,
    });
  };

  const handleDeleteUser = (e, user) => {
    console.log(user);
    console.log(user.id);
    setDeleteUser(user);
  };

  const handledeleteSubmit = async (e) => {
    e.preventDefault();
    console.log(deleteUser);
    console.log(deleteUser.id);
    setIsModalOpen(true);
    console.log(`http://localhost:8000/cadmin/user-delete/${deleteUser.id}/`);

    await fetch(`http://127.0.0.1:8000/cadmin/user-delete/${deleteUser.id}/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      console.log(res);
      console.log("success");
      setIsModalOpen(false);
      const response = await fetch("http://127.0.0.1:8000/cadmin/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      dispatch({
        type: "ALLUSERS",
        data: data,
      });
    });
  };

  return (
    <>
    
      <div className="container-fluid pt-4 px-4">
      <div className="bg-white text-center rounded my-4 p-4">
        <form onSubmit={(e) => handleSearchUser(e)} className="search-form">
      <div className="d-flex align-items-center justify-content-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search User"
          name="search_users"
          className="form-control me-2"
        />
        <button className="searchButton btn-primary" type="submit">
          Search
        </button>
      </div>
    </form>
         
          <div
            style={{ textAlign: "end", marginRight: "2%", marginBottom: "1%" }}>
            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#addcouponmodal">
              Add User
            </button>
          </div>

          <div className="table-responsive">
            <table className="table text-start align-middle table-bordered table-hover mb-0">
              <thead>
                <tr className="text-dark">
                  <th scope="col">ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* Iterate over coupons */}
                {/* Use props.Coupons.map((coupon) => {...}) here */}
                {allUsers &&
                  allUsers.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#editCouponModal"
                            onClick={(e) => handleEditUser(e, user)}
                          >
                            Edit
                          </button>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteProductModal"
                            onClick={(e) => handleDeleteUser(e, user)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        id="addcouponmodal"
        tabIndex="-1"
        aria-labelledby="addcouponmodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addcouponmodalLabel">
                Add User
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Add modal body content here */}

              <form onSubmit={(e) => handleAddSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    type="text"
                    name="firstname"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    type="text"
                    name="lastname"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    name="phone"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    required
                  />
                </div>

                {error && <div className="error">{error}</div>}
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>

              {/*  */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {/* Additional buttons or actions */}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Coupon Modals */}
      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        id="editCouponModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editCouponModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editCouponModalLabel">
                Edit User
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => handleEditSubmit(e)}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      name="firstname"
                      type="text"
                      className="form-control"
                      required
                      value={selectedUser ? selectedUser.first_name : ""}
                      onChange={(e) =>
                        setSelectedUser((prevState) => ({
                          ...prevState,
                          first_name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      name="lastname"
                      type="text"
                      className="form-control"
                      required
                      value={selectedUser ? selectedUser.last_name : ""}
                      onChange={(e) =>
                        setSelectedUser((prevState) => ({
                          ...prevState,
                          last_name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      required
                      value={selectedUser ? selectedUser.email : ""}
                      onChange={(e) =>
                        setSelectedUser((prevState) => ({
                          ...prevState,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      name="phone"
                      type="phone"
                      className="form-control"
                      required
                      value={selectedUser ? selectedUser.phone : ""}
                      onChange={(e) =>
                        setSelectedUser((prevState) => ({
                          ...prevState,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    className="btn btn-default"
                    data-bs-dismiss="modal"
                    value="Close"
                  />

                  <input
                    type="submit"
                    className="btn btn-success"
                    value="update"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Iterate over coupons and create Edit Coupon Modals here */}

      {/* Delete Coupon Modals */}
      {/* Iterate over coupons and create Delete Coupon Modals here */}
      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        id="deleteProductModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteProductModal"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={(e) => handledeleteSubmit(e)}>
              <div className="modal-header">
                <h5 className="modal-title" id="deleteProductModal">
                  Detele User
                </h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete{" "}
                <span style={{ color: "red" }}></span>
                the user
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-dark">
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Users);
