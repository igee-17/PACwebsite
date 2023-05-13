import React from "react";
import businessMan from "../../assets/images/businessMan.png";

import { Link } from "react-router-dom";
import { directors } from "../../utils/teamData";

const SectionFour = () => {
  return (
    <section className="about-section-four">
      <div className="section-center">
        <h1>Our Leadership</h1>

        <div className="bottom">
          <p>board of directors</p>
          <div className="items">
            {directors.map((item) => {
              const { name, position, bioLink, imageSrc } = item;

              return (
                <div className="item">
                  <img src={imageSrc} alt="businessMan" />
                  <div className="text">
                    <h2>{name}</h2>
                    <p>{position}</p>
                    <Link to={`${bioLink}`}>read bio</Link>
                  </div>
                </div>
              );
            })}
            {/* <div className="item">
              <img src={placeholder} alt="businessMan" />
              <div className="text">
                <h2>Dolapo Atekoja</h2>
                <p>Chairman</p>
                <Link to="/about/dolapo">read bio</Link>
              </div>
            </div>
            <div className="item">
              <img src={team1} alt="businessMan" />
              <div className="text">
                <h2>Chris Oshiafi</h2>
                <p>Chief Executive Officer</p>
                <button>read bio</button>
              </div>
            </div>
            <div className="item">
              <img src={team2} alt="businessMan" />
              <div className="text">
                <h2>Sina Alimi</h2>
                <p>Deputy Chief Executive Officer</p>
                <button>read bio</button>
              </div>
            </div>
            <div className="item">
              <img src={team3} alt="placeholder" />
              <div className="text">
                <h2>Eric Okoruwa</h2>
                <p>Director</p>
                <button>read bio</button>
              </div>
            </div>
            <div className="item">
              <img src={placeholder} alt="placeholder" />
              <div className="text">
                <h2>Tessa Egbe Ikimi</h2>
                <p>Director</p>
                <button>read bio</button>
              </div>
            </div>
            <div className="item">
              <img src={placeholder} alt="placeholder" />
              <div className="text">
                <h2>Garba Ahmed</h2>
                <p>Director</p>
                <button>read bio</button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFour;
