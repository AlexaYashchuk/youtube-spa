import { useForm, Controller } from "react-hook-form";
import { Input, Button } from "antd";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { notification } from "antd";

import { loginUser } from "../features/login/loginSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { Loader } from "../loader/Loader";

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Поле обязательно для заполнения")
    .email("Введите корректный email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Email введен некорректно"
    ),
  password: yup
    .string()
    .required("Поле обязательно для заполнения")
    .min(6, "Пароль должен быть больше 5 символов"),
});

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(schema) });

  //   const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.login.isLoading);
  const errorMessage = useAppSelector((state) => state.login.error);

  const loginAxios = async (data: LoginFormInputs) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      // navigate("/todo-list/addTodo");
    } catch (error: any) {
      console.error("Login failed:", error);
      console.log("Try to show notification");
      notification.error({
        message: "Ошибка входа",
        description: error?.message || "Неверный логин или пароль",
        placement: "topRight",
        duration: 3,
      });
    }
  };

  useEffect(() => {
    notification.error({
      message: "Test Notification",
      description: "Это тестовое уведомление",
      placement: "topRight",
    });
  }, []);

  return (
    <>
      <div className="mainDiv">
        <form onSubmit={handleSubmit(loginAxios)}>
          <div className="registration_form_el_block">
            <label className="registration_form_el">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  className="registration_form_el"
                />
              )}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="registration_form_el_block">
            <label className="registration_form_el">Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password {...field} className="registration_form_el" />
              )}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <Button
            htmlType="submit"
            className="registration_form_el"
            loading={isLoading}
          >
            Log In
          </Button>
        </form>
      </div>

      <p>Don't have an account?</p>
      {/* <Link to="/todo-list/"> */}
      <Button type="primary">Sign Up</Button>
      {/* </Link> */}

      {/* {isLoading && <Loader />} */}
    </>
  );
};

export { Login };
