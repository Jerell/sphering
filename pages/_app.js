import "../styles/global.scss";
import { Provider } from "next-auth/client";

Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.end = function (day = 5) {
  let date = new Date(this.valueOf());
  while (date.getDay() !== day) {
    date = date.addDays(1);
  }
  return date;
};

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <div className="flex flex-col min-h-screen">
        <Component {...pageProps} />
        <footer className="bg-gray-100 w-full text-center p-4">
          <p>&copy; Pace Flow Assurance</p>
        </footer>
      </div>
    </Provider>
  );
}
