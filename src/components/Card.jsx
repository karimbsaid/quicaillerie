import styled from "styled-components";
import Button from "./Button";
import { useBag } from "../context/BagContext";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const StyledCard = styled.div`
  background-color: var(--color-dark--0);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center; // Center content horizontally
  padding: 1rem; // Add padding inside the card
  border-radius: 8px; // Rounded corners for a nicer look
`;

const Img = styled.img`
  width: 40%; // Adjust the width of the image
  height: auto; // Maintain aspect ratio
  margin: auto; // Center the image
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; // Take the full width of the card
  padding: 0.5rem 0; // Add padding between the image and text
`;

const Title = styled.h3`
  font-size: 1.2rem; // Adjust font size
  margin: 0; // Remove default margin
`;

const Price = styled.h3`
  font-size: 1.2rem; // Adjust font size
  margin: 0; // Remove default margin
  color: var(--color-accent); // Optional: Add color for price
`;

const StockStatus = styled.p`
  font-size: 1rem; // Adjust font size
  margin-top: 0.5rem; // Add space above the stock status
  color: var(--color-success); // Optional: Add color for stock status
`;

export default function Card({ photo, name, price, id }) {
  const { bag, setBag } = useBag();
  const { user } = useContext(AuthContext);

  const addToBag = () => {
    if (!bag.some((item) => item.id === id)) {
      setBag((prevBag) => [
        ...prevBag,
        { id, name, price, photo, quantity: 1 },
      ]);
    }
  };
  return (
    <StyledCard>
      <Img src={photo} alt={name} />
      <ContentRow>
        <Title>{name}</Title>
        <Price>{price} $</Price>
      </ContentRow>
      <ContentRow>
        <StockStatus>en stock</StockStatus>
        <Button disabled={!user} onClick={addToBag}>
          ADD
        </Button>
      </ContentRow>
    </StyledCard>
  );
}
