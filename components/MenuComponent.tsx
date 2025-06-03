import { Menu } from "@/models/menu";
import { Menuitem } from "@/models/menuitem";

import Globals from "@/modules/Globals";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdKeyboardArrowDown, MdOutlineMenu } from "react-icons/md";

export default function MenuComponent() {
  const router = useRouter();
  const [pageData, setPageData] = useState<Menu | null>(null);
  const [menuToggle, setIsMenuToggle] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const toggleMobileItem = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  useEffect(() => {
    const codename = "menu_2026";

    Globals.KontentClient.item(codename)
      .withParameter("depth", "3")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });

    const handleRouteChange = () => setIsMenuToggle(false);
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  if (!pageData) {
    return null;
  }

  const handleMenuToggle = () => {
    setIsMenuToggle((prev) => !prev);
  };

  return (
    <div className="menu-component-wrapper relative bg-black">
      <div className="menu-head bg-primary py-3">
        <div className="container mx-auto">
          <div className="flex justify-end">
            <div className="flex items-center gap-2 ">
              <Link href={pageData.linkedinurl.value} target="_blank">
                <FaLinkedinIn
                  size={34}
                  className="bg-white text-primary p-[8px] rounded-full"
                />
              </Link>
              <Link href={pageData.facebookurl.value} target="_blank">
                <FaFacebook
                  size={34}
                  className="bg-white text-primary p-[8px] rounded-full"
                />
              </Link>

              <Link href={pageData.instagramurl.value} target="_blank">
                <FaInstagram
                  size={34}
                  className="bg-white text-primary p-[8px] rounded-full"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-auto container py-5">
        <div className="mobile-menu  justify-between items-center lg:hidden flex ">
          <Link href="/">
            <Image
              width={450}
              height={400}
              src={pageData.whitelogo.value[0]?.url}
              alt="logo"
              priority
              className="w-[200px] h-auto object-contain"
            />
          </Link>

          <MdOutlineMenu
            size={32}
            className="cursor-pointer"
            onClick={handleMenuToggle}
          />

          {menuToggle && (
            <div className="mobile-menu-container absolute left-0 right-0 top-[100px] bg-secondary z-10 h-[600px] w-full ">
              <div className="py-5 px-10">
                <ul className="menu-items flex flex-col  gap-5 mb-10">
                  {pageData.menuitems.value.map((item: any, i: number) => (
                    <li key={i}>
                      <div className="flex justify-between items-center">
                        {item.items?.value?.length > 0 ? (
                          // if there ARE sub-items, use a button to toggle submenu
                          <button
                            onClick={() => toggleMobileItem(i)}
                            className="w-full text-left flex items-center justify-between font-medium text-tertiary"
                          >
                            {item.name.value}
                            <MdKeyboardArrowDown
                              className={`ml-2 transform transition-transform duration-200 ${
                                expandedIndex === i ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        ) : (
                          // if NO sub-items, just a normal link
                          <Link
                            href={item.link.value}
                            className="font-medium text-tertiary"
                          >
                            {item.name.value}
                          </Link>
                        )}
                      </div>

                      {/* the collapsed submenu */}
                      {expandedIndex === i &&
                        item.subitems?.value?.length > 0 && (
                          <ul className="mt-2 pl-5 flex flex-col gap-2">
                            {item.subitems.value.map(
                              (child: any, j: number) => (
                                <li key={j}>
                                  <Link
                                    href={child.link.value}
                                    className="font-medium text-tertiary hover:text-primary transition"
                                  >
                                    {child.name.value}
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="hidden lg:flex justify-between   items-center bg-mid  ">
          <Link href="/">
            <Image
              width={150}
              height={100}
              src={pageData.whitelogo.value[0]?.url}
              alt="logo"
              priority
              className="w-[200px] h-auto object-contain"
            />
          </Link>

          <ul className="menu-items lg:flex hidden gap-5">
            {pageData.menuitems.value.map((m: any, index: number) => {
              const item: Menuitem = m;
              return (
                <li key={`menuitem-${index}`} className="relative group">
                  <Link
                    href={item.link.value}
                    className="inline-flex items-center font-medium text-white text-white/50 group-hover:text-white transition duration-300"
                  >
                    {item.name.value}
                    {/* only show arrow if there are sub-items */}
                    {item.items?.value?.length > 0 && (
                      <MdKeyboardArrowDown
                        className="
              ml-1 
              transform 
              transition-transform 
              duration-300 
              group-hover:rotate-180
            "
                      />
                    )}
                  </Link>

                  {item.subitems.value.length > 0 && (
                    <div className="absolute z-10 bg-white hidden group-hover:block top-full rounded-xl">
                      <ul>
                        {item.subitems.value.map((child: any, j: number) => (
                          <li key={j} className="px-4 py-2 whitespace-nowrap">
                            <Link href={child.link.value}>
                              <span className="font-medium text-black hover:text-primary transition duration-300">
                                {child.name.value}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
