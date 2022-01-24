import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { checkRoute, isMobile } from "../../helpers/utils";
import "./Footer.scss";

const Footer: FC = (): JSX.Element => {
  let { pathname } = useLocation();
  return (
    <footer className="footer__site-by footer" style={checkRoute(pathname) && isMobile ? { background: "#0a0a0c" } : { background: "unset" }}>
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
    </footer>
  );
};

export default Footer;
