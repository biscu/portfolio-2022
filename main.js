window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

var windowHeight =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

barba.hooks.enter(() => {
  window.scrollTo(0, 0);
});

barba.init({
  debug: true,
  transitions: [
    {
      name: "general-transition",
      once: ({ next }) => {
        onceLoader();
        gsap.delayedCall(3, fireAll);
      },
      async leave(data) {
        const done = this.async();
        leaveLoader();
        await gsap.delayedCall(1.5, leaveLoader);
        done();
      },
      beforeEnter: ({ next }) => {
        gsap.set(".loader-text", {
          autoAlpha: 1,
        });
      },
      enter: ({ next }) => {
        enterLoader();
        gsap.from(".loader", {
          duration: 1,
          onComplete: () => fireAll(next.container),
        });
      },
    },
  ],
});

function fireAll() {
  // smooth();
  backSplit();
  upSplit();
  runBrush();
  // gsap.delayedCall(0.2, davide);
  // gsap.delayedCall(0.6, showNav);
  // gsap.delayedCall(0.8, setupImages);
  // gsap.delayedCall(0.8, setupSplitsTitle);
  // gsap.delayedCall(0.8, setupSplitsParagraph);
  setupProjectCard();
  console.log("fireAll");
}

function cleanUp() {
  allowBodyScroll();
  hideLoader();
  console.log("cleaned up!");
}

function allowBodyScroll() {
  var body = document.getElementsByTagName("body")[0];
  body.classList.add("canScroll");
}
function hideLoader() {
  var loader = document.getElementById("loader");
  loader.classList.add("hide");
}
function showLoader() {
  var loader = document.getElementById("loader");
  loader.classList.remove("hide");
}

function enterLoader() {
  hideLoader();
  gsap.set(".loader", { height: windowHeight });
  const tl = gsap.timeline({ delay: 0.5 });
  // let SplitClient = new SplitText('.loader-text', { type: 'words', wordsClass: "loaderParent" });
  //   let SplitParent = new SplitText('.loader-text', { type: 'words', wordsClass: "loaderChild" });
  //   let words = SplitParent.words; //an array of all the divs that wrap each character
  let SplitClient = new SplitText(".loader-text", {
    type: "chars",
    charsClass: "loaderParent",
  });
  let SplitParent = new SplitText(".loader-text", {
    type: "chars",
    charsClass: "loaderChild",
  });
  let words = SplitParent.chars;
  tl.to(words, {
    duration: 1.1,
    y: 180,
    ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
    stagger: 0.01,
  });
  tl.to(
    ".loader",
    {
      duration: 1,
      height: 0,
      delay: 0.2,
      ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
      onComplete: cleanUp,
    },
    "-=1.2"
  );

  console.log("enterLoader");
}

function leaveLoader() {
  showLoader();
  gsap.to(".loader", {
    duration: 1,
    height: windowHeight,
    ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
  });
  const targets = gsap.utils.toArray(".loaderChild");
  gsap.to(targets, {
    duration: 1,
    y: 0,
    delay: 0.3,
    ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
    stagger: 0.02,
    rotation: 0,
  });
  gsap.to(".lift-animation", {
    y: -50,
    ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
    duration: 0.8,
  });
  gsap.to(".navbar", {
    y: -50,
    ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
    duration: 0.8,
  });
  console.log("leaveLoader");
}

// Animate loader

function onceLoader() {
  // let SplitClient = new SplitText('.loader-text', { type: 'words', wordsClass: "loaderParent" });
  // let SplitParent = new SplitText('.loader-text', { type: 'words', wordsClass: "loaderChild" });
  // let words = SplitParent.words; //an array of all the divs that wrap each character
  let SplitClient = new SplitText(".loader-text", {
    type: "chars",
    charsClass: "loaderParent",
  });
  let SplitParent = new SplitText(".loader-text", {
    type: "chars",
    charsClass: "loaderChild",
  });
  let words = SplitParent.chars;
  const tl = gsap.timeline();
  tl.fromTo(".loader-text", { autoAlpha: 0 }, { autoAlpha: 1 });
  tl.from(words, {
    duration: 1.2,
    y: 180,
    delay: 0,
    ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
    stagger: 0.04,
    rotation: 0,
    skewX: -20,
    // rotation: 5,
  });
  tl.to(words, {
    duration: 1.2,
    y: 180,
    stagger: 0.01,
    delay: 0.3,
    skewX: 0,
    // stagger: -0.02,
    ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
  });
  tl.to(
    ".loader",
    {
      duration: 1,
      height: 0,
      // yPercent: -100,
      ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
      onComplete: cleanUp,
    },
    "-=1.1"
  );

  console.log("onceLoader");
}

// Project Title in Homepage
function setupProjectCard() {
  const targets = gsap.utils.toArray(".project-title");

  targets.forEach((target) => {
    let SplitClient = new SplitText(target, {
      type: "words",
      wordsClass: "lineParent",
    });
    let SplitParent = new SplitText(target, {
      type: "words",
      wordsClass: "lineChild",
    });
    let words = SplitParent.words; //an array of all the divs that wrap each character
    gsap.from(words, {
      duration: 1,
      y: 50,
      ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
      stagger: 0.07,
      scrollTrigger: {
        trigger: target,
        markers: false,
        start: "top 90%",
        scrub: false,
      },
    });
  });

  const images = gsap.utils.toArray(".preview-img");
  images.forEach((target) => {
    gsap.fromTo(
      target,
      {
        scale: "1.04",
        // rotate: 1,
      },
      {
        scale: "1",
        duration: 3,
        // rotate: 0,
        ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
        stagger: 0.5,
        scrollTrigger: {
          trigger: target,
          end: "bottom 50%",
          scrub: 0.8,
        },
      }
    );
    gsap.fromTo(
      target,
      {
        autoAlpha: 0,
        // rotate: 1,
      },
      {
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.4,
        ease: Power0.easeNone,
        scrollTrigger: {
          trigger: target,
          end: "bottom 90%",
          scrub: 0.8,
        },
      }
    );
  });
}
function setupImages() {
  ScrollTrigger.batch(".i-animated", {
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        opacity: 1,
        duration: 1.6,
        scale: "1",
        stagger: 0.08,
        ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
        delay: 0.2,
      });
    },
  });
}

// Images animated not batch

// function setupImages() {
//   const images = gsap.utils.toArray('.i-animated');
//   images.forEach(img => {
//     gsap.fromTo(img, {
//       y: 30,
//       autoAlpha:0,
//       // scale:"1.05",
//     }, {
//       y: 0,
//       autoAlpha:1,
//       duration: 1.1,
//       scale:"1",
//       ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
//       delay: 0.6,
//       scrollTrigger: {
//         trigger: img,
//         start: "",
//         scrub: false,
//     }
//     });
//   });
//   }

// Multiple Split Text Paragraph

function setupSplitsParagraph() {
  const targets = gsap.utils.toArray(".p-animated");
  targets.forEach((target) => {
    let SplitClient = new SplitText(target, {
      type: "lines",
      linesClass: "lineChild",
    });
    let SplitParent = new SplitText(target, {
      type: "lines",
      linesClass: "lineParent",
    });
    let words = SplitClient.lines; //an array of all the divs that wrap each character
    gsap.fromTo(".p-animated", { autoAlpha: 0 }, { autoAlpha: 1 });
    gsap.from(words, {
      duration: 1.4,
      y: 80,
      delay: 0.3,
      ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
      stagger: 0.1,
      scrollTrigger: {
        trigger: target,
        markers: false,
        start: "top 100%",
        scrub: false,
      },
    });
  });
}

function setupSplitsTitle() {
  const targets = gsap.utils.toArray(".t-animated");
  targets.forEach((target) => {
    let SplitParent = new SplitText(target, {
      type: "words",
      wordsClass: "wordParent",
    });
    let SplitClient = new SplitText(target, {
      type: "words",
      wordsClass: "wordChild",
    });
    let words = SplitClient.words; //an array of all the divs that wrap each character
    gsap.to(".t-animated", { opacity: 1, autoAlpha: 1 });
    gsap.from(words, {
      duration: 1.2,
      y: 120,
      ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
      stagger: 0.04,
      scrollTrigger: {
        trigger: target,
        markers: false,
        start: "top 100%",
        scrub: false,
      },
    });
  });
}

function davide() {
  const targets = gsap.utils.toArray(".davide-animated");
  targets.forEach((target) => {
    let SplitParent = new SplitText(target, {
      type: "words",
      wordsClass: "wordParent",
    });
    let SplitClient2 = new SplitText(target, {
      type: "words",
      wordsClass: "wordChild",
    });
    let words = SplitClient2.words; //an array of all the divs that wrap each character
    gsap.to(".davide-animated", { autoAlpha: 1 });
    gsap.from(words, {
      duration: 1.5,
      y: 100,
      ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
      stagger: 0.03,
      scrollTrigger: {
        trigger: target,
        scrub: false,
      },
    });
  });
}

function showNav() {
  let SplitParent = new SplitText(".nav-link", {
    type: "words",
    wordsClass: "wordParent",
  });
  let SplitClient = new SplitText(".nav-link", {
    type: "words",
    wordsClass: "wordChild",
  });
  let words = SplitClient.words; //an array of all the divs that wrap each character
  gsap.to(".nav-link", { opacity: 1, autoAlpha: 1 });
  gsap.from(words, {
    duration: 1,
    y: 110,
    ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
    stagger: 0.09,
  });
}

gsap.config({
  force3D: false,
  nullTargetWarn: false,
  trialWarn: false,
});

// function smooth() {
//   const pageContainer = document.querySelector("[data-scroll-container]");
//   const scroll = new LoconativeScroll({
//   el: pageContainer,
//   smooth: true,
//   lerp: 0.3
//   });
//   // each time locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
//   scroll.on(pageContainer, ScrollTrigger.update);

//   // tell ScrollTrigger to use these proxy methods for the ".data-scroll-container" element since Locomotive Scroll is hijacking things
//   ScrollTrigger.scrollerProxy(pageContainer, {
//   scrollTop(value) {
//     return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
//   }, // we don't have to define a scrollLeft because we're only scrolling vertically.
//   getBoundingClientRect() {
//     return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
//   }
//   });

//   window.addEventListener("load", function (event) {
//   ScrollTrigger.refresh();
//   });

//   ScrollTrigger.addEventListener("refresh", () => scroll.update());
//   ScrollTrigger.refresh();
//   console.log('smoothscroll');
// };

function backSplit() {
  const targets = gsap.utils.toArray(".back-split");
  targets.forEach((target) => {
    let SplitParent = new SplitText(target, { type: "lines", linesClass: "" });
    let SplitClient2 = new SplitText(target, { type: "lines", linesClass: "" });
    let words = SplitClient2.lines; //an array of all the divs that wrap each character
    gsap.to(".back-split", { opacity: 1, duration: 1 });
    gsap.from(words, {
      duration: 2,
      y: 100,
      ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
      stagger: 0.03,
    });
  });
}

function upSplit() {
  const targets = gsap.utils.toArray(".up-split");
  targets.forEach((target) => {
    let SplitParent = new SplitText(target, {
      type: "lines",
      linesClass: "brushChild",
    });
    let SplitClient2 = new SplitText(target, {
      type: "lines",
      linesClass: "brushParent",
    });
    let words = SplitClient2.lines; //an array of all the divs that wrap each character
    gsap.to(".up-split", { opacity: 1 });
    gsap.from(words, {
      duration: 2,
      y: 100,
      ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
      stagger: 0.03,
    });
  });
}

function runBrush() {
  const targets = gsap.utils.toArray(".brushParent");

  targets.forEach((targets) => {
    gsap.from(targets, {
      duration: 1,
      xPercent: -100,
      ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
      scrollTrigger: {
        trigger: targets,
        start: "top 75%",
        end: "top 50%",
        scrub: 0.95,
      },
    });
  });

  const targets2 = gsap.utils.toArray(".brushChild");

  targets2.forEach((targets) => {
    gsap.from(targets, {
      duration: 0.6,
      xPercent: 100,
      ease: CustomEase.create("custom", "M0,0,C0.496,0.298,0,1,1,1"),
      scrollTrigger: {
        trigger: targets,
        start: "top 75%",
        end: "top 50%",
        // end: "top 10%",
        scrub: 0.95,
      },
    });
  });
}

// const lenis = new Lenis({
//   duration: 1.2,
//   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
//   direction: "vertical", // vertical, horizontal
//   gestureDirection: "vertical", // vertical, horizontal, both
//   smooth: true,
//   mouseMultiplier: 1,
//   smoothTouch: false,
//   touchMultiplier: 2,
//   infinite: false,
// });

// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);
