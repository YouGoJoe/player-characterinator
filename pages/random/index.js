import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import StatsBlock from "@components/StatsBlock";
import CharOptions from "@components/CharOptions";

export default function Home() {
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
