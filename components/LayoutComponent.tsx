import React, { useEffect, useState } from "react";
import MenuComponent from "./MenuComponent";
import { Globals2026 } from "@/models/globals2026";
import Globals from "@/modules/Globals";
import FooterComponent from "./FooterComponent";

export default function LayoutComponent({ children }: any) {
  const [pageData, setPageData] = useState<Globals2026 | null>(null);
  useEffect(() => {
    const codename = "globals2026";

    Globals.KontentClient.item(codename)
      .withParameter("depth", "3")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, []);
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Header */}
      {pageData && <MenuComponent pageData={pageData} />}

      {/* Main content */}
      <main className="flex-1 ">{children}</main>

      {/* Footer */}
      {pageData && <FooterComponent pageData={pageData} />}
    </div>
  );
}
