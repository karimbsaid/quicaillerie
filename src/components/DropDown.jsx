import { cloneElement, createContext, useContext, useState } from "react";
import styled from "styled-components";

const DropDownStyle = styled.div`
  position: relative;
`;

const DropDownMenu = styled.div`
  position: absolute;
  width: 120px;
  top: 100%;
  left: -50px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const DropDownContext = createContext();

function DropDown({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = (name) => setOpenName(name);

  return (
    <DropDownContext.Provider value={{ openName, close, open }}>
      <DropDownStyle>{children}</DropDownStyle>
    </DropDownContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(DropDownContext);

  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(DropDownContext);

  if (name !== openName) return null;

  return <DropDownMenu onMouseLeave={close}>{children}</DropDownMenu>;
}

export { DropDown, Open, Window };
