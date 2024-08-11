import { useContext, useState } from "react";
import Button from "../../components/Button";
import Form from "../../components/Form";
import FormRowVertical from "../../components/FormRowVertical";
import Input from "../../components/Input";
import AuthContext from "../../context/AuthContext";
import styled from "styled-components";

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  let { registerUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await registerUser({ username, password });

      setValidationMessage(data);
      // Handle success (e.g., navigate to another page or show a success message)
      console.log("Registration successful:", data);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

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
      {validationMessage?.username != username && (
        <Error>username existe</Error>
      )}
      <FormRowVertical label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      {validationMessage?.password && (
        <Error>password must contain at least 8 characters</Error>
      )}
      <FormRowVertical orientation="vertical">
        <Button size="large">Login</Button>
      </FormRowVertical>
    </Form>
  );
}

export default RegisterForm;
