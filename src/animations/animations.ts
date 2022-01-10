import { gsap } from "gsap";

export const tasksAnimations = (ref: any) => {
  if (ref.current.length) {
    gsap.to(ref.current, { autoAlpha: 1, x: 0, filter: "blur(0px)", opacity: 1, stagger: 0.3 }).totalDuration(0.9);
  }
};

export const profilePageAnimation = (ref: any) => {
  if (ref.current) {
    gsap.fromTo(
      ref.current,
      { autoAlpha: 0, scale: 0, filter: "blur(2px)", opacity: 0 },
      { autoAlpha: 1, scale: 1, filter: "blur(0px)", opacity: 1, ease: "power3.inOut" }
    );
  }
};

export const authPageAnimation = (ref: any) => {
  if (ref.current) {
    gsap
      .fromTo(
        ref.current,
        { autoAlpha: 0, y: 100, filter: "blur(2px)", opacity: 0 },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", opacity: 1, ease: "power3.Out" }
      )
      .totalDuration(0.45);
  }
};
