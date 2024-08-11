/* eslint-disable */

import styled from "styled-components";
import { CartElement } from "./Cart-element";
import { useBag } from "../context/BagContext";
import { useContext, useEffect, useRef } from "react";
import { createCommand } from "../services/apiCommand";
import AuthContext from "../context/AuthContext";

const StyledAsideCart = styled.aside`
  background-color: gray;
  bottom: 0;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  z-index: 100;
  min-width: 25%;
`;

const ButtonClose = styled.button`
  position: absolute;
  top: 0;
  right: 0%;
  border: none;
  background-color: transparent;
  height: 45px; // Increased height
  width: 45px; // Increased width
  color: #353232; // White text color
  font-size: 1.6rem; // Increased font size
  border-radius: 50%; // Rounded button
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease; // Smooth transition for background color

  &:hover {
    background-color: #d32f2f; // Darker red on hover
  }
`;

const Footer = styled.div`
  position: sticky;
  display: flex;
  justify-content: space-between; // Space out total and button
  align-items: center;
  padding: 1rem;
  width: 100%;
  bottom: 0;
  box-sizing: border-box;
  background-color: #e0e0e0; // Background color for the footer
`;

const Total = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #353232;
`;

const ConfirmButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #388e3c;
  }
`;

export default function ShoppingCart({ bagContent, setOpen }) {
  const sideBarBag = useRef(null);
  const { bag } = useBag();
  const { authTokens } = useContext(AuthContext);
  // console.log(authTokens);
  const { access } = authTokens;
  const bagItems = bag.map((item) => ({
    product: item.id,
    quantity: item.quantity,
  }));
  const handleConfirmEvent = () => {
    createCommand({ bagItems, access });
  };
  useEffect(
    function () {
      function callback(e) {
        if (sideBarBag.current && !sideBarBag.current.contains(e.target)) {
          setOpen(false);
        }
      }
      document.addEventListener("click", callback, true);
      return () => document.removeEventListener("click", callback);
    },
    [setOpen]
  );
  const total = bag.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  return (
    <StyledAsideCart ref={sideBarBag}>
      <ButtonClose onClick={setOpen}>&times;</ButtonClose>
      {bagContent.map((bag) => (
        <CartElement
          photo={bag.photo}
          title={bag.name}
          id={bag.id}
          price={bag.price}
          key={bag.id}
          quantity={bag.quantity}
        />
      ))}
      {bag.length > 0 ? (
        <Footer>
          <Total>Total: ${total.toFixed(2)}</Total>
          <ConfirmButton onClick={handleConfirmEvent}>Confirm</ConfirmButton>
        </Footer>
      ) : (
        <Total>you have no product in bag </Total>
      )}
    </StyledAsideCart>
  );
}
