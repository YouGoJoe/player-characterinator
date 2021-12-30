import { useContext, useEffect } from "react";
import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import StatsBlock from "@components/StatsBlock";
import CharOptions from "@components/CharOptions";
import AppContext from "../../context/AppContext";

export default function Random() {
  const { actions } = useContext(AppContext);

  useEffect(() => {
    actions.reRoll();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>PCinator!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Prodigy Hackathon 2021!" />
        <CharOptions />
        <StatsBlock />
      </main>

      <Footer />
    </div>
  );
}
