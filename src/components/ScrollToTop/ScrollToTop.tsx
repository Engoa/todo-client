import React, { FC, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./ScrollToTop.scss";

const ScrollToTop: FC = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleVisibility = () => {
    if (window.scrollY > 400) setIsVisible(true);
    else setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <div className="go__to__top" onClick={handleClick}>
          <IconButton>
            <KeyboardArrowUpIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
