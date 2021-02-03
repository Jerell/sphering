import Link from "next/link";
import { useRouter } from "next/router";

function PageLink({ text, href }) {
  const router = useRouter();

  const active_li = "border-red-500 bg-gray-100 hover:border-red-600";
  const active_a = "font-bold";

  let class_li = "border-l-4 cursor-pointer hover:border-red-300 ";
  let class_a = "pl-2 text-red-900 ";

  if (router.pathname === href) {
    class_li += active_li;
    class_a += active_a;
  }

  const titleCaseText = text
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substr(1))
    .join(" ");

  return (
    <Link href={href}>
      <li className={class_li}>
        <a className={class_a}>{titleCaseText}</a>
      </li>
    </Link>
  );
}

export default function Nav({ pagesData }) {
  return (
    <>
      <aside>
        <nav className="mt-2">
          <ul>
            {pagesData ? (
              Object.keys(pagesData).map((page_url, i) => (
                <PageLink
                  href={`/${page_url}`}
                  text={pagesData[page_url].split("-").join(" ")}
                  key={i}
                />
              ))
            ) : (
              <>
                <PageLink href="/" text="Dashboard" />
                <PageLink href="/projects" text="Projects" />
                <PageLink href="/approval" text="Approval" />
              </>
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
}
