import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import StatsBlock from "@components/StatsBlock";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>PCinator!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Prodigy Hackathon 2021!" />
        <StatsBlock />
      </main>

      <Footer />
    </div>
  );
}
