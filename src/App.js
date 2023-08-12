import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import About from "./pages/About";
import AgroAllied from "./pages/AgroAllied";
import BioPage from "./pages/BioPage";
import Contact from "./pages/Contact";
import Csr from "./pages/Csr";
import FinancialServices from "./pages/FinancialServices";
import Healthcare from "./pages/Healthcare";
import Hospitality from "./pages/Hospitality";
import Alumni from "./pages/joinUs/Alumni";
import Career from "./pages/joinUs/Career";
import Vendor from "./pages/joinUs/Vendor";
import Landing from "./pages/Landing";
import Portfolio from "./pages/Portfolio";
import RealEstate from "./pages/RealEstate";
import Renewable from "./pages/Renewable";
import Newsletter from "./pages/resources/Newsletter";
import StayUpdated from "./pages/resources/StayUpdated";
import StayUpdatedItem from "./pages/resources/StayUpdatedItem";
import Technology from "./pages/Technology";
import logo from "./assets/logos/paclogo.svg";
import Error from "./pages/Error";
import { Translator, Translate } from "react-auto-translate";

const cacheProvider = {
  get: (language, key) =>
    ((JSON.parse(localStorage.getItem("translations")) || {})[key] || {})[
      language
    ],
  set: (language, key, value) => {
    const existing = JSON.parse(localStorage.getItem("translations")) || {
      [key]: {},
    };
    existing[key] = { ...existing[key], [language]: value };
    localStorage.setItem("translations", JSON.stringify(existing));
  },
};

const App = () => {
  const [navlogo, setNavlogo] = useState(logo);
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <>
      <Translator
        cacheProvider={cacheProvider}
        from="en"
        to={`${language}`}
        googleApiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}
      >
        <h1></h1>
        <SharedLayout logo={navlogo} setLanguage={setLanguage}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/:personId" element={<BioPage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route
              path="/portfolio/financial-services"
              element={<FinancialServices />}
            />
            <Route path="/portfolio/hospitality" element={<Hospitality />} />
            <Route path="/portfolio/real-estate" element={<RealEstate />} />
            <Route path="/portfolio/agro-allied" element={<AgroAllied />} />
            <Route path="/portfolio/renewable" element={<Renewable />} />
            <Route path="/portfolio/technology" element={<Technology />} />
            <Route path="/portfolio/healthcare" element={<Healthcare />} />
            <Route path="/joinus/career" element={<Career />} />
            <Route
              path="/joinus/alumni"
              element={<Alumni setNavlogo={setNavlogo} />}
            />
            <Route path="/joinus/vendor" element={<Vendor />} />
            <Route path="/resources/stay-updated" element={<StayUpdated />} />
            <Route
              path="/resources/stay-updated/:id"
              element={<StayUpdatedItem />}
            />
            <Route path="/resources/newsletter" element={<Newsletter />} />
            <Route path="/csr" element={<Csr setNavlogo={setNavlogo} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </SharedLayout>
      </Translator>
    </>
  );
};

export default App;
