import { useContext } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import AppContext from "../context/AppContext";

const WeakAlert = () => {
  const { isWeak } = useContext(AppContext);
  if (!isWeak) return null;

  return <div>Weak char alert!</div>;
};

const BoringAlert = () => {
  const { isBoring } = useContext(AppContext);

  if (!isBoring) return null;

  return <div>All-rounder alert!</div>;
};

const CharTools = () => {
  const { stats, race, recommendedClass, armourClass, charImage, actions } =
    useContext(AppContext);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "16px",
      }}
    >
      <WeakAlert />
      <BoringAlert />

      <div>
        <Button
          variant="contained"
          onClick={() => actions.reRoll()}
          style={{ marginRight: "16px" }}
        >
          Re-roll stats
        </Button>
        <Link href="/character">
          <Button variant="contained">Lock-in</Button>
        </Link>
      </div>
    </div>
  );
};

export default CharTools;
