import { jsx } from "@emotion/react";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import "./Footer.scss";
const Footer: FC = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="footer__site-by">
        <a
          aria-label="Ido's Linkedin"
          target="_blank"
          rel="noopener"
          href="https://www.linkedin.com/in/idobenzaken/"
          data-text="Website by Ido"
          className="line-link"
        >
          <span>Website by Ido</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
