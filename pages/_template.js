import Layout from "../components/layout";
import { getPagesObj } from "../lib/pages";

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
      <div>
        <p>Content</p>
      </div>
    </Layout>
  );
}
