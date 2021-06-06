import Layout from "../components/layout";
import { getPagesObj } from "../lib/pages";
import CalcTable from "../components/calcTable";
import Pigging from "../components/pigging";
import fs from "fs";
import path from "path";
import parse from "csv-parse/lib/sync";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import Loading from "../components/loading";
import Link from "next/link";

export async function getStaticProps() {
  const pagesData = getPagesObj();

  const journey_csv = fs.readFileSync(
    path.join(process.cwd(), "public", "./journey.csv"),
    "utf8"
  );

  const rows = parse(journey_csv);
  return {
    props: {
      pagesData,
      journey: rows,
    },
  };
}

export default function Page({ pagesData, journey }) {
  const [session, loading] = useSession();
  const [pig_period, setPigPeriod] = useState(0);
  const [pig_transit, setTransit] = useState(70);

  if (session) {
    return (
      <Layout pagesData={pagesData}>
        <CalcTable setPeriod={setPigPeriod} setTransit={setTransit} />
        <Pigging
          journey={journey}
          period={pig_period}
          transitTime={pig_transit}
        />
      </Layout>
    );
  }
  return (
    <>
      <div className="flex flex-col p-10 items-center">
        <Loading />
        <button
          className="w-20 h-15 mt-5 text-white bg-red-900 text-center"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </>
  );
}
