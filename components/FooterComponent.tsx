import { Globals2026 } from "@/models/globals2026";
import { Menuitem } from "@/models/menuitem";
import Link from "next/link";
import React from "react";

interface Props {
  pageData: Globals2026;
}

export default function FooterComponent({ pageData }: Props) {
  if (!pageData) {
    return null;
  }
  return (
    <div className="footer-component-wrapper bg-black text-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Link href="/">
            <img
              src={pageData.whitelogo.value[0]?.url}
              alt=""
              className="w-[200px] object-contain"
            />
          </Link>

          <ul className="quick-links flex flex-col gap-2">
            <h4>Quick Links</h4>
            {pageData.menuitems.value.map((m: any, index: number) => {
              const item: Menuitem = m;
              return (
                <li key={`menuitem-${index}`} className="relative group">
                  <Link
                    href={item.link.value}
                    className="inline-flex items-center font-medium text-white text-white/50 group-hover:text-white transition duration-300"
                  >
                    {item.name.value}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="contact flex flex-col gap-2">
            <h4>Contact Us</h4>

            <p className="text-sm">
              Email:{" "}
              <Link
                href={`mailto:${pageData.email.value}`}
                className="text-white hover:text-primary transition duration-200"
              >
                {pageData.email.value}
              </Link>
            </p>
            <p className="text-sm">
              Phone:{" "}
              <Link
                href={`tel:${pageData.phone.value}`}
                className="text-white hover:text-primary transition duration-200"
              >
                {pageData.phone.value}
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="text-left mb-4 md:mb-0">
            <p className="text-sm">
              © Strategic Exhibitions & Conferences 
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href={pageData.sociallinksFacebookurl.value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary"
            >
              Facebook
            </Link>
            <Link
              href={pageData.sociallinksLinkedinurl.value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary"
            >
              LinkedIn
            </Link>
            <Link
              href={pageData.sociallinksInstagramurl.value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
