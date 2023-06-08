import { Fragment } from "react";
import MainHeader from "./main-header";

function Layout(props) {
  return (
    <Fragment className="m-0 p-0 min-h-screen">
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
