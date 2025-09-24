import { useForm, Controller } from "react-hook-form";
import { Input, Button } from "antd";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/login/loginSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "../../pages/Home/Home.css";

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

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.login.isLoading);

  const loginAxios = async (data: LoginFormInputs) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate("/search");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <form className="card" onSubmit={handleSubmit(loginAxios)}>
        <img src="./video_player.svg" alt="logo" className={"logo"} />

        <div className="input">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} type="email" placeholder="Введите email" />
            )}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="input">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Введите пароль" />
            )}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <Button htmlType="submit" className="button" loading={isLoading}>
          Вход
        </Button>
      </form>
    </div>
  );
};

export { Login };
