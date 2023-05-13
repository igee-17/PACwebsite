import React from "react";
import SectionOne from "../components/about/SectionOne";
import PortfolioLeft from "../components/portfolio/PortfolioLeft";
import PortfolioRight from "../components/portfolio/PortfolioRight";
import { healthcare } from "../utils/data";
import healthcareBg from "../assets/images/healthcareBg.png";

const Healthcare = () => {
  return (
    <div>
      <SectionOne color="#38B6FF" text="Healthcare" img={healthcareBg} />

      <div className="bottom portfolio">
        {healthcare.map((item, index) => {
          if (index % 2 !== 0 || index === 1) {
            return <PortfolioRight {...item} index={index} />;
          }
          return <PortfolioLeft {...item} index={index} />;
        })}
      </div>
    </div>
  );
};

export default Healthcare;
