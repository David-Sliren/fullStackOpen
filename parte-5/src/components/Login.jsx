import { login } from "../services/login";
import { setToken } from "../services/blogs";

export const KEY_LOCALSTORAGE = `BlogsFullstackOpen`;

const Login = ({ handler, handlerMessage }) => {
  async function handlerSubmit(e) {
    e.preventDefault();
    const data = e.target;
    const value = new FormData(data);
    const values = Object.fromEntries(value.entries());
    console.log("value: ", values);

    try {
      const user = await login({
        userName: values.username,
        password: values.password,
      });

      localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(user));
      setToken(user.token);
      user.nameStorage = KEY_LOCALSTORAGE;
      handler(user);
      console.log("si se completo: ", user);
    } catch (error) {
      console.log(error.message);
      handlerMessage({
        info: "Error Username or Password incorrect",
        ishidden: false,
        isCorrect: false,
      });
    }
  }
  return (
    <form onSubmit={handlerSubmit}>
      <h2>Login</h2>
      <label>Username</label>
      <input type="text" name="username" />
      <br />
      <br />
      <label>Password</label>
      <input type="password" name="password" />
      <br />
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Login;
