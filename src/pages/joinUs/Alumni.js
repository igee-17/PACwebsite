import React from "react";
import SectionOne from "../../components/about/SectionOne";
import alumni from "../../assets/images/pacAlumni.png";
import mapalumni from "../../assets/images/mapalumni.png";
import { alumniData } from "../../utils/joinusData";

const Alumni = () => {
  return (
    <div className="alumni">
      <SectionOne
        color="#38B6FF"
        text="Welcome to the PAC Alumni Network"
        img={alumni}
      />
      <div className="section-two">
        <div className="left">
          <h3>
            Encouraging Relationships that transcend workplace. Be an icon today
          </h3>
          <p>
            We are a band of ex-PanAfrican Capital Group staff with a shared
            goal of staying connected while cheering each other on the journey
            of life towards making positive impact where it matters most.
          </p>
          <button>Discover more</button>
        </div>
        <div className="right">
          <img src={mapalumni} alt="mapalumni" />
        </div>
      </div>
      <div className="section-three">
        <div className="form-container">
          <h2>Getting Started</h2>
          <span></span>
          <p>
            Kindly fill this form. You can manually send us email on
            info@panafricancapitalholdings.com
          </p>
          <form>
            <div className="details">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
              <input type="text" placeholder="Email Address" />
              <input type="text" placeholder="Office or Home Address" />
            </div>
            <input type="text" className="phone" placeholder="Phone No" />
            <textarea
              name="message"
              id="message"
              placeholder="Enter Message"
            ></textarea>
            <button type="button">submit</button>
          </form>
        </div>
      </div>
      <div className="section-four">
        <div className="section-center">
          {alumniData.map((item, index) => {
            const { heading, text, image } = item;

            if (index % 2 !== 0) {
              return (
                <div className="item" key={index}>
                  <div className="right">
                    <img src={image} alt={heading} />
                  </div>
                  <div className="left">
                    <h2>{heading}</h2>
                    <p>{text}</p>
                  </div>
                </div>
              );
            }
            return (
              <div className="item" key={index}>
                <div className="left">
                  <h2>{heading}</h2>
                  <p>{text}</p>
                </div>
                <div className="right">
                  <img src={image} alt={heading} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="section-five">
        <div className="content">
          <h1>Join Our Community Today</h1>
          <p>Become an icon</p>
          <button>Get started</button>
        </div>
      </div>
    </div>
  );
};

export default Alumni;