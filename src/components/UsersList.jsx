import axios from "axios";
import React from "react";

const UsersList = ({ user, getAllUsers, setUpdateInfo, handleOpenForm }) => {
  /* Eliminar usuario */
  const deleteUser = () => {
    const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`;

    axios
      .delete(URL)
      .then((res) => {
        console.log(res.data);
        getAllUsers();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateClick = () => {
    /* envia inf al padre "App.jsx" */
    setUpdateInfo(user);
    handleOpenForm();
  };

  return (
    <article className="card__user">
      <h1>{`${user["first_name"]} ${user["last_name"]}`}</h1>
      <hr />
      <ul className="card__ul">
        <li className="card__item">Email: </li>
        <li className="card__item">
          <span className="card__span">{user.email}</span>
        </li>
        <li className="card__item">Birthday: </li>
        <li className="card__item">
          <span className="card__span">{user.birthday}</span>
        </li>
      </ul>
      <hr />
      <footer className="card__footer">
        <button onClick={handleUpdateClick} className="card__btn">
          Update
        </button>
        <button onClick={deleteUser} className="card__btn">
          Delete
        </button>
      </footer>
    </article>
  );
};

export default UsersList;
