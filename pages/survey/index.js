import { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@components/Header";
import Footer from "@components/Footer";
import {
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import AppContext from "../../context/AppContext";

const classBoxes = [
  {
    name: "martial",
    label: "Weapons and might (a warrior)",
  },
  {
    name: "spells",
    label: "Spellcasting",
  },
  {
    name: "stealth",
    label: "Stealth and cunning (like a burglar or thief)",
  },
];
const raceBoxes = [
  {
    name: "human",
    label: "Aragorn, Eowyn, or Bard (Human)",
  },
  {
    name: "dwarf",
    label: "Thorin or Gimli",
  },
  {
    name: "elf",
    label: "Legolas, Galadriel, Arwen, or Elrond",
  },
  {
    name: "halfling",
    label: "Bilbo, Mrs. Proudfoot, or Frodo",
  },
  {
    name: "half-orc",
    label: "An orc",
  },
  {
    name: "dragonborn",
    label: "Smaug",
  },
  {
    name: "tiefling",
    label: "Sauron",
  },
];

export default function Survey() {
  const { classBiases, raceBiases, actions } = useContext(AppContext);

  const handleClassChange = ({ target }) => {
    if (target.checked) {
      actions.addClassBias(target.name);
    } else {
      actions.removeClassBias(target.name);
    }
  };

  const handleRaceChange = ({ target }) => {
    if (target.checked) {
      actions.addRaceBias(target.name);
    } else {
      actions.removeRaceBias(target.name);
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
        <h2>
          Select all options below that sound fun to you, and we will <br />{" "}
          generate a character that matches <i>some</i> of those choices
        </h2>
        <FormLabel component="legend">
          In battle, what abilities does your character prefer to rely on?
        </FormLabel>
        <FormGroup>
          {classBoxes.map(({ name, label }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={classBiases.includes(name)}
                  onChange={handleClassChange}
                  name={name}
                />
              }
              label={label}
              key={label}
            />
          ))}
        </FormGroup>

        <hr />

        <FormLabel component="legend">
          As far as race goes, which Lord of the Rings character is your
          character most like?
        </FormLabel>
        <FormGroup>
          {raceBoxes.map(({ name, label }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={raceBiases.includes(name)}
                  onChange={handleRaceChange}
                  name={name}
                />
              }
              label={label}
              key={label}
            />
          ))}
        </FormGroup>

        <hr />

        <Link href="/survey/generate">
          <Button variant="contained" style={{ marginBottom: "8px" }}>
            Generate character!
          </Button>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
