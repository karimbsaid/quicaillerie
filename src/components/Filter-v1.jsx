import styled, { css } from "styled-components";
// import { useSearchParams } from "react-router-dom";
import Input from "./Input";
import { useEffect, useRef, useState } from "react";
import { useFilter } from "../context/FiltreContext";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
/*eslint-disable*/
export default function Filter({ options }) {
  const [querySearch, setQuerySearch] = useState("");
  const { filters, setFilters } = useFilter();
  const searchElement = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (
          document.activeElement === searchElement.current &&
          e.code === "Enter"
        ) {
          setFilters((prevFilters) => ({
            ...prevFilters,
            name: querySearch, // Set the name filter to the clicked value
          }));
        }
        if (e.code === "Enter") {
          searchElement.current.focus();
          setQuerySearch("");
        }
      }
      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", callback);
    },
    [querySearch, setFilters]
  );
  function handleClick(value) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: value, // Set the name filter to the clicked value
    }));
  }
  const currentFilterValue = filters.category;

  return (
    <StyledFilter>
      {options.map((options) => (
        <FilterButton
          key={options.value}
          onClick={() => handleClick(options.value)}
        >
          {options.label}
        </FilterButton>
      ))}
      <Input
        type="text"
        id="name"
        value={querySearch}
        ref={searchElement}
        onChange={(e) => setQuerySearch(e.target.value)}
      />
    </StyledFilter>
  );
}
