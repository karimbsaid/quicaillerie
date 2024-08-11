import { useQuery } from "@tanstack/react-query";
import ProductRow from "../features/product/ProductRow";
import Spinner from "../components/Spinner";
import AddProduct from "../features/product/AddProduct";
import Table from "../components/Table";
import ProductTableOperation from "../features/product/ProductTableOperation";
import { getProduct } from "../services/apiProduct";
import { FiltreProvider, useFilter } from "../context/FiltreContext";

function DashboardContent() {
  const { filters } = useFilter();
  const { isLoading, data: products } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProduct(filters),
  });

  if (isLoading) return <Spinner />;
  // const searchFilter = searchParams.get("filter") || "all";
  // let filteredProduct;
  // if (searchFilter === "all") filteredProduct = product;
  // if (searchFilter === "Elec")
  //   filteredProduct = product.filter(
  //     (product) => product.category === "Electrical"
  //   );
  // if (searchFilter === "Mec")
  //   filteredProduct = product.filter(
  //     (product) => product.category === "Mechanical"
  //   );
  // if (loading) return <Spinner />;

  return (
    <>
      <ProductTableOperation />
      <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Name</div>
          <div>reference</div>
          <div>Price</div>
          <div>Category</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={products}
          render={(product) => (
            <ProductRow product={product} key={product.id} />
          )}
        />
      </Table>
      <AddProduct />
    </>
  );
}

function Dashboard() {
  return (
    <FiltreProvider>
      <DashboardContent />
    </FiltreProvider>
  );
}

export default Dashboard;
