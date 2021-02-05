import Layout from "../components/layout";
import { getPagesObj } from "../lib/pages";
import CalcTable from "../components/calcTable";
import Pigging from "../components/pigging";
import fs from "fs";
import path from "path";
import parse from "csv-parse/lib/sync";

export async function getStaticProps() {
  const pagesData = getPagesObj();

  const journey_csv = fs.readFileSync(
    path.join(process.cwd(), "public", "./journey.csv"),
    "utf8"
  );

  const rows = parse(journey_csv);
  console.log(rows);
  return {
    props: {
      pagesData,
      journey: rows,
    },
  };
}

export default function Page({ pagesData, journey }) {
  return (
    <Layout pagesData={pagesData}>
      <CalcTable />
      <Pigging journey={journey} />
    </Layout>
  );
}
