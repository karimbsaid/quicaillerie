import { createContext, useContext, useState } from "react";

const BagContext = createContext();

function BagProvider({ children }) {
  const [bag, setBag] = useState([]);
  const [isBagOpen, setIsBagOpen] = useState(false);

  const openBag = () => setIsBagOpen(true);
  const closeBag = () => setIsBagOpen(false);
  const toggleBag = () => setIsBagOpen((prev) => !prev);

  return (
    <BagContext.Provider
      value={{ bag, setBag, isBagOpen, openBag, closeBag, toggleBag }}
    >
      {children}
    </BagContext.Provider>
  );
}

function useBag() {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error("useBag must be used within a BagProvider");
  }
  return context;
}

export { BagProvider, useBag };
