import Layout from "../layout/Layout";
import TenderTaskPage from "../pages/TenderTaskPage/TenderTaskPage";

const routes = [
  {
    routeId: 1,
    path: "/",
    component: (
      <Layout>
        <TenderTaskPage />
      </Layout>
    ),
  },
];
export default routes;
