import React from "react";
import "src/view/pages/PC/pcTheme.css";
import PCHeader from "./PCHeader";
import PCFooter from "./PCFooter";

function PCLayout(props: { children: React.ReactNode }) {
  return (
    <div className="pc-page">
      <PCHeader />
      {props.children}
      <PCFooter />
    </div>
  );
}

export default PCLayout;
