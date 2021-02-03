import Layout from "../components/layout";
import { getPagesObj } from "../lib/pages";
import CalcTable from "../components/calcTable";
import XY from "../components/xy";
import Pigging from "../components/pigging";

export async function getStaticProps() {
  const pagesData = getPagesObj();
  return {
    props: {
      pagesData,
    },
  };
}

export default function Page({ pagesData }) {
  return (
    <Layout pagesData={pagesData}>
      <CalcTable />
      <Pigging />
      <XY />
    </Layout>
  );
}
