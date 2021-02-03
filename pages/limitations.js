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
          <li>Southwark gas flowates are suitable between 16-73 MMscfd.</li>
          <li>Blythe gas flowate are suitable between 35-120 MMscfd</li>
          <li>
            Due to this model being based on 10 cases modelled with OLGA, some
            combinations of Blythe and Southwark flowrates produced are not as
            accurate as others. This follows the following recomendations:
            <ul>
              <li>
                Most accurate Southwark gas flowrates are acheived below 35
                MMscfd
              </li>
              <li>
                Most accurate Blythe gas flowrates are acheived above 70 MMscfd
              </li>
            </ul>
          </li>
          <li>
            Back pressure for Southwark is dependent on both condensate rates
            from Southwark and Blythe, as due to the very low condensate flow
            rate range at Southwark compared to Blythe condensate flow rate the
            model is limited to a discrete range based on number of pigged
            spheres
          </li>
        </ol>
      </div>
    </Layout>
  );
}
