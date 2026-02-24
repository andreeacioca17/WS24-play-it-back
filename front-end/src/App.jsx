// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
// import Content from "./components/Content.jsx";
import Navbar from "./components/navbar.jsx";
import Home from "./Header-pages/Home.jsx";
import About from "./Header-pages/About.jsx";
import Name from "./Navbar-pages/Name.jsx";
import Genre from "./Navbar-pages/Genre.jsx";
import Platform from "./Navbar-pages/Platform.jsx";
import Year from "./Navbar-pages/Year.jsx";
import Country from "./Navbar-pages/Country.jsx";
import Newgames from "./Navbar-pages/Newgames.jsx";
import Contact from "./Footer-pages/Contact.jsx";
import FAQ from "./Footer-pages/FAQ.jsx";
import Terms from "./Footer-pages/Terms.jsx";
import LogIn from "./Header-pages/Login.jsx";
import { Game } from "./components/pages/GamesDetailPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/name" element={<Name />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/year" element={<Year />} />
        <Route path="/country" element={<Country />} />
        <Route path="/newgames" element={<Newgames />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/games/:id" element={<Game />} />
      </Routes>
      {/* <Content /> */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
