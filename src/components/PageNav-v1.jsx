import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { useBag } from "../context/BagContext";
import { FaUser } from "react-icons/fa";

function PageNav({ openBag }) {
  const { bag } = useBag();
  const number = bag.length;
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
        <li className={styles.bagContent} onClick={openBag}>
          <FaShoppingCart className={styles.bagLogo}></FaShoppingCart>
          <span className={styles.numberProduct}>{number}</span>
        </li>
        <li className={styles.bagContent}>
          <FaUser className={styles.bagLogo}></FaUser>
          <span className={styles.numberProduct}>{number}</span>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
