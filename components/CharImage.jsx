import { useContext } from "react";
import AppContext from "../context/AppContext";

const CharImage = () => {
  const { charImage } = useContext(AppContext);

  if (!charImage) return null;

  return <img src={charImage} height="250px" />;
};

export default CharImage;
