import { useEffect, useRef, useState } from "react";
import Filter from "../../components/Filter";
import TableOperations from "../../components/TableOperations";
import Input from "../../components/Input";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { generateFacture } from "../../services/apiFacture";
export default function CommandsTableOperation() {
  const searchElement = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const today = new Date();
  const handleDateEndChange = (date) => {
    if (date < dateStart) {
      setDateEnd(today); // Set endDate to today if it is less than startDate
    } else {
      setDateEnd(date);
    }
    searchParams.set("end", format(date, "dd/MM/yyyy"));
    setSearchParams(searchParams);
  };
  const handleDateStartChange = (date) => {
    setDateStart(date);

    searchParams.set("start", format(date, "dd/MM/yyyy"));
    setSearchParams(searchParams);
  };
  const [querySearch, setQuerySearch] = useState("");

  useEffect(() => {
    function handleKeyDown(e) {
      if (
        document.activeElement === searchElement.current &&
        e.code === "Enter"
      ) {
        searchParams.set("city", querySearch);
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

  return (
    <TableOperations>
      <Filter
        filterField="category"
        options={[
          { value: "all", label: "all" },
          { value: "mecanique", label: "Mecanique" },
          { value: "electric", label: "Electrique" },
        ]}
      >
        <Input
          placeholder="search by name"
          type="text"
          id="name"
          value={querySearch}
          ref={searchElement}
          onChange={(e) => setQuerySearch(e.target.value)}
        />
        <DatePicker
          selected={dateStart}
          maxDate={today}
          onChange={handleDateStartChange}
        />
        <DatePicker
          selected={dateEnd}
          maxDate={today}
          onChange={handleDateEndChange}
        />
      </Filter>
      <Button onClick={generateFacture}>Facture</Button>
    </TableOperations>
  );
}
