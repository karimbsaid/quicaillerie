import { useQuery } from "@tanstack/react-query";
import ProductRow from "../features/product/ProductRow";
import Spinner from "../components/Spinner";
import AddProduct from "../features/product/AddProduct";
import Table from "../components/Table";
import ProductTableOperation from "../features/product/ProductTableOperation";
import { getProduct } from "../services/apiProduct";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

function DashboardContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || 1, 10);
  const perPage = 10;

  const { isLoading, data } = useQuery({
    queryKey: ["products", category, search, page],
    queryFn: () => getProduct({ category, search, page }),
  });

  if (isLoading) return <Spinner />;

  const {
    results: products,
    count: totalCount,
    total_pages: totalPages,
  } = data;

  const handlePageChange = (newPage) => {
    setSearchParams({ category, search, page: newPage });
  };

  return (
    <>
      <ProductTableOperation />
      <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Name</div>
          <div>Reference</div>
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
        <Table.Footer>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalCount={totalCount}
            perPage={perPage}
            onPageChange={handlePageChange}
          />
        </Table.Footer>
      </Table>
      <AddProduct />
    </>
  );
}

function Dashboard() {
  return <DashboardContent />;
}

export default Dashboard;
