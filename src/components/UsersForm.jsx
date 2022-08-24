import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const defaultValue = {
  birthday: "",
  email: "",
  first_name: "",
  last_name: "",
  password: "",
};

const UsersForm = ({
  getAllUsers,
  updateInfo,
  setUpdateInfo,
  handleCloseForm,
}) => {
  /* Comprobar que llega la inf para capturar inf el en el formulario */
  // console.log(updateInfo);

  /* Solo actualiza o renderize cuando cambie updateInfo */
  useEffect(() => {
    if (updateInfo) {
      /* updateInfo guarda toda la inf y por lo cual captura la inf y la lleva al inf */
      reset(updateInfo);
    }
  }, [updateInfo]);

  const { handleSubmit, register, reset } = useForm();
  const createNewUser = (data) => {
    const URL = "https://users-crud1.herokuapp.com/users/";
    axios
      .post(URL, data)
      .then((res) => {
        console.log(res.data);
        getAllUsers();
      })
      .catch((err) => console.log(err));
  };

  const updateUser = (data) => {
    const URL = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`;
    axios
      .patch(URL, data)
      .then((res) => {
        console.log(res.data);
        getAllUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submit = (data) => {
    if (updateInfo) {
      //update user
      updateUser(data);
      setUpdateInfo();
    } else {
      //Create users
      createNewUser(data);
    }
    handleCloseForm();
    reset(defaultValue);
  };
  return (
    <form onSubmit={handleSubmit(submit)} className="form">
      <div onClick={handleCloseForm} className="form__equis">
        x
      </div>
      <h2 className="form__title2">
        {updateInfo ? "Update user" : "Create user "}
      </h2>
      <ul className="form__list">
        <li className="form__item">
          <label htmlFor="name"></label>
          <input
            {...register("first_name")}
            type="text"
            id="name"
            placeholder="First name"
          />
        </li>
        <li className="form__item">
          <label htmlFor="last"></label>
          <input
            {...register("last_name")}
            type="text"
            id="last"
            placeholder="Last name"
          />
        </li>
        <li className="form__item">
          <label htmlFor="email"></label>
          <input
            {...register("email")}
            type="text"
            id="email"
            placeholder="Email"
          />
        </li>
        <li className="form__item">
          <label htmlFor="pass"></label>
          <input
            {...register("password")}
            type="password"
            id="pass"
            placeholder="Password"
          />
        </li>
        <li className="form__item">
          <label htmlFor="birthday"></label>
          <input
            {...register("birthday")}
            type="date"
            id="birthday"
            placeholder="Birthday"
          />
        </li>
      </ul>
      <button className="form__btn">
        {updateInfo ? "Update user" : "Add new user"}
      </button>
    </form>
  );
};

export default UsersForm;
