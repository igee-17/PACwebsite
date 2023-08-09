import React, { useEffect } from "react";
import SectionOne from "../../components/about/SectionOne";
import vendorbg from "../../assets/images/vendorbg.png";
import { foundations } from "../../utils/data";
import Pagination from "../../components/resources/Pagination";
import { Link } from "react-router-dom";
import LiquidBackground from "../../components/LiquidBackground";

const StayUpdated = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <section className="stay-updated">
      <SectionOne color="#38B6FF" text="Stay Updated" img={vendorbg} />
      <div className="animation animate-left">
        <LiquidBackground />
      </div>
      <div className="section-two">
        <div className="foundations-container">
          <div className="foundations">
            {foundations.map((item, index) => {
              const { text, image } = item;
              return (
                <div
                  className="item"
                  key={index}
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <div className="text">
                    <span></span>
                    <p>{text}</p>
                    <Link to={`/resources/stay-updated/${text}`}>
                      Read more
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination />
        </div>
      </div>
    </section>
  );
};

export default StayUpdated;