import { useContext } from "react";
import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import {
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AppContext from "../../context/AppContext";

export default function Home() {
  const { classBiases, actions } = useContext(AppContext);

  const handleClassChange = ({ target }) => {
    if (target.checked) {
      actions.addClassBias(target.name);
    } else {
      actions.removeClassBias(target.name);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>PCinator!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Prodigy Hackathon 2021!" />
        <FormLabel component="legend">
          In battle, what abilities does your character prefer to rely on?
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={classBiases.includes("martial")}
                onChange={handleClassChange}
                name="martial"
              />
            }
            label="Weapons and might (a warrior)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={classBiases.includes("spells")}
                onChange={handleClassChange}
                name="spells"
              />
            }
            label="Spellcasting"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={classBiases.includes("stealth")}
                onChange={handleClassChange}
                name="stealth"
              />
            }
            label="Stealth and cunning (like a burglar or thief)"
          />
        </FormGroup>
      </main>

      <Footer />
    </div>
  );
}
