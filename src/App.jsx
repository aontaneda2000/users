import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import UsersList from "./components/UsersList";
import axios from "axios";
import UsersForm from "./components/UsersForm";

function App() {
  const [isUsers, setIsUsers] = useState();
  const [updateInfo, setUpdateInfo] = useState();

  /* modal */
  const [isFormOpen, setIsFormOpen] = useState();

  console.log(updateInfo);
  const getAllUsers = () => {
    const URL = "https://users-crud1.herokuapp.com/users/";

    axios
      .get(URL)
      .then((res) => setIsUsers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  /*  console.log(isUsers); */

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="App">
      <header className="header">
        <h2>Users</h2>
        <button className="header__btn" onClick={handleOpenForm}>
          <span className="header__span">+</span>Create new user
        </button>
      </header>

      <div className={isFormOpen ? "form-container" : "form-none"}>
        <UsersForm
          getAllUsers={getAllUsers}
          updateInfo={updateInfo}
          setUpdateInfo={setUpdateInfo}
          handleCloseForm={handleCloseForm}
        />
      </div>
      <div className="card-container">
        {isUsers?.map((user) => (
          <UsersList
            key={user.id}
            user={user}
            getAllUsers={getAllUsers}
            setUpdateInfo={setUpdateInfo}
            handleOpenForm={handleOpenForm}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
