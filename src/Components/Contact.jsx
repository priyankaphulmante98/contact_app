import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../Redux/contact/contact.action";

function AddContact() {
  const dispatch = useDispatch();
  const { contact_data } = useSelector((store) => store.contact);
  const [updateId, setUpdateId] = useState(null);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    status: "",
  });
  const [create, setCreate] = useState(false);

  function handleChage(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://json-mock-ne19.onrender.com/products",
        data
      );
      alert("Contact added successfully");
      dispatch(getContacts());
      setCreate(false);
      setData({
        first_name: "",
        last_name: "",
        status: "",
      });
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  }

  async function handleEdit(id) {
    try {
      const contactToEdit = contact_data.find((contact) => contact.id === id);

      if (!contactToEdit) {
        console.error("Contact not found for editing");
        return;
      }

      setData({
        first_name: contactToEdit.first_name,
        last_name: contactToEdit.last_name,
        status: contactToEdit.status,
      });
      setUpdateId(id);
    } catch (error) {
      console.error("Error editing contact:", error);
    }
  }

  async function handleUpdate() {
    try {
      const response = await axios.patch(
        `https://json-mock-ne19.onrender.com/products/${updateId}`,
        data
      );
      alert("Contact updated successfully");
      dispatch(getContacts());
      setCreate(false);
      setUpdateId(null);
      setData({
        first_name: "",
        last_name: "",
        status: "",
      });
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`https://json-mock-ne19.onrender.com/products/${id}`);
      alert("Deleted");
      dispatch(getContacts());
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  }

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  return (
    <>
      {create ? (
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div
            className="logo"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <label>
            First Name
            <input
              type="text"
              placeholder="first_name"
              name="first_name"
              value={data.first_name}
              onChange={(e) => handleChage(e)}
              required={true}
            />
          </label>
          <br />
          <label>
            Last Name
            <input
              type="text"
              placeholder="last_name"
              name="last_name"
              value={data.last_name}
              onChange={(e) => handleChage(e)}
              required={true}
            />
          </label>
          <div>
            <label>
              Active &nbsp;&nbsp;&nbsp;
              <input
                type="radio"
                value="true"
                name="status"
                checked={data.status === "true"}
                onChange={(e) => handleChage(e)}
              />
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>
              Inactive &nbsp;&nbsp;&nbsp;
              <input
                type="radio"
                value="false"
                name="status"
                checked={data.status === "false"}
                onChange={(e) => handleChage(e)}
              />
            </label>
          </div>

          {updateId ? (
            <input
              id="form_update_btn"
              type="button"
              value="Update"
              onClick={handleUpdate}
            />
          ) : (
            <input type="submit" value="Submit" />
          )}
        </form>
      ) : (
        <div class="create_btn ">
          <button className="update_btn" onClick={() => setCreate(true)}>
            Create Contact{" "}
          </button>
        </div>
      )}

      <div id="container" style={{ margin: "auto" }}>
        {contact_data?.length === 0 ? (
          <div id="no-data-message">
            <i
              className="fa-regular fa-circle-xmark"
              style={{ fontSize: "50px", padding: "20px" }}
            ></i>
            <span>
              No contact found. Please add contact from the Create Contact
              Button.
            </span>
          </div>
        ) : (
          contact_data.map((e, i) => (
            <div id="box" key={i}>
              <h3>First Name - {e.first_name}</h3>
              <h3>Last Name - {e.last_name}</h3>
              <h3>Status - {e.status === "true" ? "active" : "Inactive"}</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "20px",
                }}
              >
                <button
                  type="button"
                  className="update_btn"
                  onClick={() => {
                    handleEdit(e.id);
                    setCreate(true);
                  }}
                >
                  <span className="fa fa-sign-in me-1"></span> UPDATE
                </button>
                <button
                  type="button"
                  className="delete_btn"
                  onClick={() => handleDelete(e.id)}
                >
                  <span className="fa fa-sign-in me-1"></span> DELETE
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default AddContact;
