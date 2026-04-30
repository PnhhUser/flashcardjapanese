import { useLocation } from "react-router";
import Header from "../../components/header/header";

function Vocabulary() {
  const location = useLocation();
  const title = location.pathname.split("/")[1];

  return (
    <div>
      <Header title={"Từ vựng " + title} />
    </div>
  );
}

export default Vocabulary;
