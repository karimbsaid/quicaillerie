import { useEffect, useRef, useState } from "react";
import Filter from "../../components/Filter";
import TableOperations from "../../components/TableOperations";
import Input from "../../components/Input";
import { useSearchParams } from "react-router-dom";

export default function ProductTableOperation() {
  const searchElement = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [querySearch, setQuerySearch] = useState("");

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
      </Filter>
    </TableOperations>
  );
}
