import CardSwiper from "@/components/test/swipers/CardSwiper";
import SpinnerComponent from "@/components/UI/SpinnerComponent";

import { Homev3 } from "@/models/homev3";
import { Upcomingeventitem } from "@/models/upcomingeventitem";

import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import InteractiveWorldMap2 from "@/components/map/InteractiveWorldMap2";
import UpcomingCarousel from "@/components/Home/upcoming/UpcomingCarousel";
import ServicesSection from "@/components/Home/service/ServiceSection";
import ServicesRibbon from "@/components/Home/service/ServicesRibbon";
import ContactSection from "@/components/Home/contact/ContactSection";

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
            <h3 className="text-black mb-10 font-bold text-2xl sm:text-3xl tracking-tight  text-left max-w-[600px]">
              {pageData.eventhighlightsheading.value}
            </h3>

            <div className="">
              <UpcomingCarousel items={pageData.upcomingeventsitems.value} />
            </div>
          </div>
        </div>

        <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 py-10 ">
          {/* Decorative blurred shape */}
         
          <div className="container mx-auto  max-w-5xl">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight"
            >
              The&nbsp;
              <span className="text-primary">Strategic</span> Difference
            </motion.h2>

            {/* Body */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 space-y-6 text-lg leading-relaxed text-slate-700"
            >
              <p>
                From dunes and desert palms to soaring high-rises and a buzzing
                business hub, the&nbsp;
                <strong className="font-semibold">
                  United Arab Emirates
                </strong>{" "}
                continues to grow radically, driven by a vision of sustained
                success.
              </p>

              <p>
                Founded in this very land&nbsp;
                <strong className="font-semibold">25 years ago</strong>,{" "}
                <em>Strategic Exhibitions & Conferences</em>&nbsp;— under
                Strategic Holding — follows that same philosophy: creating
                opportunity by bringing the best the world has to offer onto one
                common ground.
              </p>

              <p>
                Our specialty lies in organising{" "}
                <strong className="font-semibold">large-scale events</strong>{" "}
                with crystal-clear objectives across multiple industries. Every
                edition is more innovative than the last, leaving a lasting
                impression through knowledge transfer, powerful connections, new
                geographies, and tangible economic value.
              </p>

              <p>
                A record of{" "}
                <strong className="font-semibold">strategic alliances</strong>{" "}
                with renowned international organisations and esteemed local
                institutions cements our reputation as a trusted partner.
              </p>

              <p>
                With offices spread across{" "}
                <span className="whitespace-nowrap">
                  KSA, Egypt, China, India, Latin America
                </span>{" "}
                and beyond, our{" "}
                <strong className="font-semibold">global footprint</strong>{" "}
                enables truly localised service — empowering industries{" "}
                <em>and</em> individuals worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        <section>
          <InteractiveWorldMap2 />
        </section>
      
        <ServicesRibbon />

        <ContactSection/>
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
