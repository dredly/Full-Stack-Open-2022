import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../mutations";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (err) => {
      console.log("ERROR LOGGING IN");
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("library-user-token", token);
      props.setPage("authors");
    }
  }, [result.data]); // eslint-disable-line

  if (!props.show) {
    return null;
  }

  const submit = async (evt) => {
    evt.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
