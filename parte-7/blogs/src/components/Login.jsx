import { useNavigate } from "react-router";
import { UseLoginUser } from "../hooks/useCreate";
import { useUserStorage } from "../store/userStorage";

export const KEY_LOCALSTORAGE = "BlogsFullstackOpen";

const Login = () => {
  const { userLogin } = UseLoginUser();
  const { handleLogin } = useUserStorage();
  const router = useNavigate();

  async function handlerSubmit(e) {
    e.preventDefault();
    const data = e.target;
    const value = new FormData(data);
    const values = Object.fromEntries(value.entries());

    try {
      const user = await userLogin.mutateAsync({
        userName: values.username,
        password: values.password,
      });

      handleLogin(user);
      router("/");
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="px-8 py-6 rounded-lg bg-gray-800 w-90 aspect-square scale-110">
      <h1 className="text-center font-bold text-3xl text-white">Login</h1>
      <form onSubmit={handlerSubmit} className="my-6">
        <input
          className="p-2 my-2 rounded w-[100%] bg-white focus:outline-blue-600"
          placeholder="username"
          type="text"
          name="username"
        />
        <input
          className="p-2 my-2 rounded w-[100%] bg-white focus:outline-blue-600"
          placeholder="Password"
          type="password"
          name="password"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold p-2 mt-3 rounded w-[100%]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
