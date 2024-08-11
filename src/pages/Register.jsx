import styled from "styled-components";
import RegisterForm from "../features/authentication/RegistrationForm";
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Register() {
  return (
    <LoginLayout>
      <RegisterForm />
    </LoginLayout>
  );
}

export default Register;
