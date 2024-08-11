import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import Logo from "./Logo";
import MainNav from "./MainNav";

const Styledaside = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
`;
export default function Sidebar() {
  return (
    <>
      <GlobalStyles />
      <Styledaside>
        <Logo />
        <MainNav />
      </Styledaside>
    </>
  );
}
