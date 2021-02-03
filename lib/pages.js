import fs from "fs";
import path from "path";

const pagesDirectory = path.join(process.cwd(), "pages");

export function getPagesObj() {
  const fileNames = fs
    .readdirSync(pagesDirectory)
    .filter((fileName) => !fileName.startsWith("_"));
  const linkData = fileNames.reduce(
    (obj, fileName) => {
      let fn = fileName.replace(".js", "");

      if (fn === "index") {
        return obj;
      }

      obj[fn] = fn;
      return obj;
    },
    { "": "Cases" }
  );
  return linkData;
}
