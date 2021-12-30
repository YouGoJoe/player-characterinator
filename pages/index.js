import Head from "next/head";
import Link from "next/link";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>PCinator!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Prodigy Hackathon 2021!" />
        <Link href="/random">
          <Button variant="contained" style={{ marginBottom: "8px" }}>
            Get a random character!
          </Button>
        </Link>
        <Link href="/survey">
          <Button variant="contained">
            Answer 3 quick questions to get a personalized character!
          </Button>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
