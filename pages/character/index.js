import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { Button } from "@mui/material";
import Header from "@components/Header";
import Footer from "@components/Footer";
import SkillsView from "@components/SkillsView";
import CombatView from "@components/CombatView";
import CharImage from "@components/CharImage";
import AppContext from "../../context/AppContext";

export default function Character() {
  const { actions, recommendedClass, race } = useContext(AppContext);
  const [view, updateView] = useState("combat"); // combat, non-combat, resting

    // REMOVE ME
    useEffect(() => {
      actions.reRoll();
    }, []);
    // REMOVE ME

  return (
    <div className="container">
      <Head>
        <title>PCinator!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Prodigy Hackathon 2021!" />
        <CharImage />
        <h3>I am a Level 1 {race} {recommendedClass}</h3>

        <div
          style={{ display: "flex", alignItems: "center", marginTop: "16px" }}
        >
          <strong style={{ marginRight: "16px" }}>I am:</strong>
          <Button
            variant={view === "combat" ? "contained" : "outlined"}
            onClick={() => updateView("combat")}
          >
            In Combat
          </Button>
          <Button
            variant={view === "non-combat" ? "contained" : "outlined"}
            onClick={() => updateView("non-combat")}
          >
            Not in Combat
          </Button>
          <Button
            disabled
            variant={view === "resting" ? "contained" : "outlined"}
            onClick={() => updateView("resting")}
          >
            Resting
          </Button>
        </div>
        {view === "combat" && <CombatView />}
        {view === "non-combat" && <SkillsView />}
        {view === "resting" && <span>resting view</span>}
      </main>

      <Footer />
    </div>
  );
}
