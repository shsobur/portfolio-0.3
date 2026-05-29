import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Background from "./Components/Background/Background";

const App = () => {
  return (
    <Background>
      <Navbar />
      <Home />
      {/* When you add About, Project, etc., just put them here */}
    </Background>
  );
};

export default App;