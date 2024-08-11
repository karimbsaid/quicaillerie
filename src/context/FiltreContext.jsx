import { createContext, useContext, useState } from "react";

const FiltreContext = createContext();
const dateToday = Date.now();

function FiltreProvider({ children }) {
  const [filters, setFilters] = useState({
    category: "all",
    name: "",
    startDate: dateToday,
    endDate: dateToday,
  });
  return (
    <FiltreContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltreContext.Provider>
  );
}
function useFilter() {
  const context = useContext(FiltreContext);
  return context;
}
/*eslint-disable*/
export { FiltreProvider, useFilter };
