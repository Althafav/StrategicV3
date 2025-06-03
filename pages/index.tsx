import CardSwiper from "@/components/test/swipers/CardSwiper";
import SpinnerComponent from "@/components/UI/SpinnerComponent";

import { Homev3 } from "@/models/homev3";
import { Upcomingeventitem } from "@/models/upcomingeventitem";

import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

type PageProps = {
  pageData: Homev3 | null;
};

export default function Page({ pageData }: PageProps) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <Head>
        <title>{pageData.metadataPagetitle.value}</title>
        <meta name="title" content={pageData.metadataMetatitle.value} />
        <meta
          name="description"
          content={pageData.metadataMetadescription.value}
        />
        <link rel="canonical" href="https://arosarealestate.com/" />

        <meta property="og:title" content={pageData.metadataPagetitle.value} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta property="og:url" content="https://arosarealestate.com/" />
        <meta property="og:site_name" content={Globals.SITE_NAME} />
        <meta
          property="og:image"
          content="https://arosarealestate.com/assets/logos/ArosaLogo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.metadataPagetitle.value} />
        <meta
          name="twitter:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta
          name="twitter:image"
          content="https://arosarealestate.com/assets/logos/ArosaLogo.png"
        />
        <meta
          name="twitter:image:alt"
          content={pageData.metadataPagetitle.value}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="home-page-wrapper ">
        {/* banner */}
        <div className="banner-wrapper py-20 h-[80svh]  relative ">
          <Image
            width={800}
            height={600}
            src={pageData.bannerimage.value[0]?.url}
            alt=""
            className="inset-0 w-full object-cover h-full absolute -z-10"
          />
          <div className="container mx-auto flex items-start justify-center h-full flex-col">
            <div className="pb-10">
              <h1 className="lg:text-7xl text-3xl text-white font-bold text-left mb-3 max-w-[800px] tracking-tighter">
                {pageData.bannerheading.value}
              </h1>
              <h3 className="text-white lg:text-2xl  text-left max-w-[600px]">
                {pageData.bannersubheading.value}
              </h3>
            </div>
          </div>
        </div>

        <div className="upcomming-section py-10">
          <div className="container mx-auto">
            <h3 className="text-black mb-10 font-bold lg:text-3xl tracking-tight  text-left max-w-[600px]">
              {pageData.eventhighlightsheading.value}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-5">
              {pageData.upcomingeventsitems.value.map(
                (m: any, index: number) => {
                  const item: Upcomingeventitem = m;
                  return (
                    <div
                      key={index}
                      className="bg-white p-5 rounded-2xl flex flex-col"
                    >
                      <div>
                        <Image
                          width={600}
                          height={600}
                          quality={100}
                          src={item.image.value[0]?.url}
                          alt={item.name.value}
                          className="h-40 w-full  object-contain bg-primarylight rounded-md mb-3"
                        />
                      </div>
                      <h4 className="text-lg font-semibold mb-1">
                        {item.name.value}
                      </h4>
                      <p className="text-gray-600 mb-1 font-medium">
                        {item.date.value}
                      </p>
                      <p className="text-gray-600 mb-3 text-sm">
                        {item.venue.value}
                      </p>
                      <Link
                        href={item.link.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="more-info-btn font-sm font-medium py-3"
                      >
                        Learn more
                      </Link>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item("home_page_2026")
      .withParameter("depth", "4")
      .toPromise();

    const pageData = JSON.parse(JSON.stringify(response.item));

    return {
      props: {
        pageData,
      },
    };
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return {
      props: {
        pageData: null,
      },
    };
  }
};
