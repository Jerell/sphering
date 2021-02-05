import Head from "next/head";
import Link from "next/link";
import styles from "../styles/layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Nav from "./nav";

export const title = "sphering";

export default function Layout({ children, pagesData }) {
  return (
    <>
      <Head>
        <link rel="icon" href="./favicon.ico" />
        <meta name="description" content="Sphering demo" />
        <meta property="og:image" content="./Pace_Brand.png" />
        <meta name="og:title" content={title} />
        <meta name="twitter:card" content="summary-large_image" />
        <title>{title}</title>
      </Head>
      <header className={styles.header}>
        <Link href="/">
          <a>
            <img src="./Pace_White.png" className="h-16" />
          </a>
        </Link>
        <h1 className={utilStyles.headingLg}>
          <Link href="/">
            <a className="text-white font-medium ">{title}</a>
          </Link>
        </h1>
      </header>
      <div className="grid grid-cols-12 gap-4 p-4 mb-auto">
        <div className="col-span-full 2xl:col-span-1">
          <Nav pagesData={pagesData}></Nav>
        </div>
        <main className="col-span-full 2xl:col-span-11">{children}</main>
      </div>
    </>
  );
}
