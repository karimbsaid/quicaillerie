/*eslint-disable*/
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import Input from "./Input";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  align-items: center;
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
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const StyledDatePicker = styled(DatePicker)`
  .react-datepicker__input-container input {
    width: 100%;
    padding: 0.44rem;
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-0);
    font-size: 1.4rem;
  }

  .react-datepicker__day--selected {
    background-color: black !important;
    color: red !important;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: red !important;
  }

  .react-datepicker__header {
    background-color: red !important;
    color: red !important;
  }

  .react-datepicker__current-month {
    color: red !important;
  }

  .react-datepicker__day--today {
    font-weight: bold;
    color: red !important;
  }
`;

function Filter({ filterField, options, children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [querySearch, setQuerySearch] = useState("");
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

  const searchElement = useRef(null);

  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (
        document.activeElement === searchElement.current &&
        e.code === "Enter"
      ) {
        searchParams.set("search", querySearch);
        setSearchParams(searchParams);
      }
      if (e.code === "Enter") {
        searchElement.current.focus();
        setQuerySearch("");
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [querySearch, searchParams, setSearchParams]);

  const today = new Date();
  const handleDateEndChange = (date) => {
    if (date < dateStart) {
      setDateEnd(today); // Set endDate to today if it is less than startDate
    } else {
      setDateEnd(date);
    }
  };

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
      {children}
      {/* <Input
        type="text"
        id="name"
        value={querySearch}
        ref={searchElement}
        onChange={(e) => setQuerySearch(e.target.value)}
      />
      <StyledDatePicker
        selected={dateStart}
        maxDate={today}
        onChange={(date) => setDateStart(date)}
      />
      <StyledDatePicker
        selected={dateEnd}
        maxDate={today}
        onChange={handleDateEndChange}
      /> */}
    </StyledFilter>
  );
}

export default Filter;
