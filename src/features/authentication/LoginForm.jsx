import { useContext, useState } from "react";
import Button from "../../components/Button";
import Form from "../../components/Form";
import FormRowVertical from "../../components/FormRowVertical";
import Input from "../../components/Input";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let { loginUser } = useContext(AuthContext);
  function handleSubmit(e) {
    e.preventDefault();
    loginUser({ username, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address" orientation="vertical">
        <Input
          type="text"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <Link to="/register">
        <span>register now</span>
      </Link>
      <FormRowVertical orientation="vertical">
        <Button size="large">Login</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
