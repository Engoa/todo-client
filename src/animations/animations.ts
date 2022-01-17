import { gsap } from "gsap";
import { RefObject } from "react";

const scaleAnim = (ref: RefObject<HTMLDivElement>) => {
  gsap.fromTo(
    ref.current,
    { autoAlpha: 0, scale: 0, filter: "blur(2px)", opacity: 0 },
    { autoAlpha: 1, scale: 1, filter: "blur(0px)", opacity: 1, ease: "power3.inOut" }
  );
};

export const tasksAnimations = (ref: RefObject<any>) => {
  if (ref.current.length) {
    gsap.to(ref.current, { autoAlpha: 1, x: 0, filter: "blur(0px)", opacity: 1, stagger: 1 }).totalDuration(0.7);
  }
};
export const userAvatarAnimation = (ref: RefObject<HTMLDivElement>) => {
  if (ref.current) {
    scaleAnim(ref);
  }
};

export const profilePageAnimation = (ref: RefObject<HTMLDivElement>) => {
  if (ref.current) {
    scaleAnim(ref);
  }
};

export const authPageAnimation = (ref: RefObject<HTMLDivElement>) => {
  if (ref.current) {
    gsap
      .fromTo(
        ref.current,
        { autoAlpha: 0, y: 100, filter: "blur(2px)", opacity: 0 },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", opacity: 1, ease: "power3.Out" }
      )
      .totalDuration(0.4);
  }
};
