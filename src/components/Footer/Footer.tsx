import React, { FC } from "react";
import "./Footer.scss";
const Footer: FC = (): JSX.Element => {
  return (
    <footer className="footer__site-by footer">
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
