import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useBag } from "../context/BagContext";
import styled from "styled-components";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { DropDown, Open, Window } from "./DropDown";

// import { FaUser } from "react-icons/fa";
const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brand-600);
    /* background-color: var(--color-brand-600); */
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;
// const DropDownStyle = styled.div`
//   position: relative;
// `;

// const DropDownMenu = styled.div`
//   position: absolute;
//   top: 100%;
//   left: 0;
//   background-color: white;
//   border: 1px solid #ccc;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//   z-index: 1000;
// `;
const MenuItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

function PageNav() {
  const { bag, openBag } = useBag();
  const { user, logoutUser, userBelongsToGroup } = useContext(AuthContext);
  const navigate = useNavigate();
  const isMagazin = userBelongsToGroup("Magazin");

  const number = bag.length;
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <StyledNavLink to="/">Home</StyledNavLink>
        </li>
        {isMagazin && (
          <li>
            <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
          </li>
        )}
        {!user ? (
          <li>
            <StyledNavLink to="/login" className={styles.ctaLink}>
              Login
            </StyledNavLink>
          </li>
        ) : (
          <>
            <DropDown>
              <Open opens="menu1">
                <FaUser />
              </Open>
              <Window name="menu1">
                <MenuItem onClick={() => navigate("/users")}>
                  {user.username}
                </MenuItem>
                <MenuItem onClick={logoutUser}>Sign Out</MenuItem>
              </Window>
            </DropDown>
            <li className={styles.bagContent} onClick={openBag}>
              <FaShoppingCart className={styles.bagLogo}></FaShoppingCart>
              <span className={styles.numberProduct}>{number}</span>
            </li>
          </>
        )}

        {/* <li className={styles.bagContent} onClick={openBag}>
          <FaShoppingCart className={styles.bagLogo}></FaShoppingCart>
          <span className={styles.numberProduct}>{number}</span>
        </li>
        <li className={styles.bagContent}>
          <FaUser className={styles.bagLogo}></FaUser>
          <span className={styles.numberProduct}>{number}</span>
        </li> */}
      </ul>
    </nav>
  );
}

export default PageNav;
