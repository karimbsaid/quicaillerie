import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";
import { BagProvider } from "../context/BagContext";

export function HomePageLayout() {
  return (
    <BagProvider>
      <div>
        <PageNav />
        <main>
          <Outlet />
        </main>
      </div>
    </BagProvider>
  );
}
