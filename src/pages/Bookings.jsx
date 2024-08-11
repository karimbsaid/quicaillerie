import { useQuery } from "@tanstack/react-query";
import Table from "../components/Table";
import { getCommands } from "../services/apiCommand";
import Spinner from "../components/Spinner";
import CommandsRow from "../features/commands/CommandsRow";
import CommandsTableOperation from "../features/commands/commandsTableOperation";
import { useSearchParams } from "react-router-dom";
// import ProductRow from "../features/product/ProductRow";
import { format } from "date-fns";

export default function Bookings() {
  const [searchParams] = useSearchParams();
  const today = new Date();
  const category = searchParams.get("category") || "all";
  const startDate = searchParams.get("start") || format(today, "dd/MM/yyyy");
  const endDate = searchParams.get("end") || format(today, "dd/MM/yyyy");
  const city = searchParams.get("city") || "";
  const filter = {
    city,
    category,
    endDate,
    startDate,
  };
  const { isLoading, data: commands } = useQuery({
    queryKey: ["commands", filter],
    queryFn: () => getCommands(filter),
  });

  if (isLoading) return <Spinner />;
  return (
    <>
      <CommandsTableOperation />
      <Table role="table" columns="1fr 0.7fr 0.6fr 0.6fr 0.2fr 1fr 1fr">
        <Table.Header role="row">
          <div>Reference</div>
          <div>Quantity</div>
          <div>Phone Number</div>
          <div>city</div>
          <div>Postal Cart</div>
          <div>Date</div>
        </Table.Header>
        <Table.Body
          data={commands}
          render={(commands) => (
            <CommandsRow commands={commands} key={commands.id} />
          )}
        />
      </Table>
    </>
  );
}
