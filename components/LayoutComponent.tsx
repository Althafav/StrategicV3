import React from "react";
import MenuComponent from "./MenuComponent";


export default function LayoutComponent({ children }: any) {
  return (
    <React.Fragment>
      <MenuComponent />
      {children}
    </React.Fragment>
  );
}
