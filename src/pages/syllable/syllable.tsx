import { useLocation } from "react-router";
import Header from "../../components/header/header";
// import Slide from "../../components/slide/slide";

import "./syllable.css";
import Slide from "../../components/slide/slide";

function Syllable() {
  const location = useLocation();
  const title = location.pathname.split("/")[1];

  return (
    <div className="syllable">
      <Header title={"Âm tiết " + title} />
      <div className="content">
        <div className="wrapper">
          <Slide />
        </div>
      </div>
    </div>
  );
}

export default Syllable;
