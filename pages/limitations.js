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
      <h2 className="text-xl">Limitations of this model</h2>
      <div className="unreset max-w-prose">
        <ol>
          <li>SW gas flowates are suitable between 16-73 MMscfd.</li>
          <li>BY gas flowate are suitable between 35-120 MMscfd</li>
          <li>
            Due to this model being based on 10 cases modelled with OLGA, some
            combinations of BY and SW flowrates produced are not as accurate as
            others. This follows the following recomendations:
            <ul>
              <li>
                Most accurate SW gas flowrates are acheived below 35 MMscfd
              </li>
              <li>
                Most accurate BY gas flowrates are acheived above 70 MMscfd
              </li>
            </ul>
          </li>
          <li>
            Back pressure for SW is dependent on both condensate rates from SW
            and BY, as due to the very low condensate flow rate range at SW
            compared to BY condensate flow rate the model is limited to a
            discrete range based on number of pigged spheres
          </li>
        </ol>
      </div>
    </Layout>
  );
}
