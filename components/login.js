import { getCookieValueURI } from "../public/utils";
import { useState, useEffect } from "react";

export default function Login() {
  const url_login = "http://localhost:8080/api/v2/auth/google";
  const url_logout = "http://localhost:8080/api/v2/logout";

  const [name, setName] = useState(false);

  useEffect(() => {
    setName(getCookieValueURI("displayName"));
  }, []);

  return (
    <a
      href={name ? url_logout : url_login}
      className="m-2 p-2 border-gray-100 border rounded-md text-white ml-auto"
    >
      <p>{name ? `Log out` : `Log in`}</p>
    </a>
  );
}
