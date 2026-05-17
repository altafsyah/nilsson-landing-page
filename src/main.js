import "./css/main.css"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function initDesktopImageReveals(scrollTween) {
  gsap.utils.toArray(".reveal-image").forEach((el) => {
    gsap.to(el, {
      scale: 1,
      duration: 1,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: el,
        containerAnimation: scrollTween,
        start: "left 90%",
        end: "left 20%",
        scrub: 0.5,
      },
    })
  })
}

function initMobileImageReveals() {
  gsap.utils.toArray(".reveal-image").forEach((el) => {
    gsap.to(el, {
      scale: 1,
      duration: 1,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        end: "top 20%",
        scrub: true,
      },
    })
  })
}

function initHeroScale() {
  const heroImage = document.querySelector(".hero__image img")
  if (!heroImage) return

  gsap.fromTo(
    heroImage,
    { scale: 1 },
    {
      scale: 1.3,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    }
  )
}

function initHorizontalScroll() {
  const mm = gsap.matchMedia()

  mm.add("(min-width: 1025px)", () => {
    const wrapper = document.querySelector("#sections-wrapper")
    const totalScrollWidth = wrapper.scrollWidth - window.innerWidth

    const scrollTween = gsap.to(wrapper, {
      x: -totalScrollWidth,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#scroll-container",
        pin: true,
        scrub: 2,
        end: () => "+=" + totalScrollWidth * 1.5,
        invalidateOnRefresh: true,
      },
    })

    initDesktopImageReveals(scrollTween)
  })

  mm.add("(max-width: 1024px)", () => {
    initMobileImageReveals()
  })
}

function initPreloader() {
  const preloader = document.getElementById("preloader")
  const bar = document.getElementById("preloader-bar")
  const text = document.querySelector(".preloader__text")

  document.body.classList.add("is-loading")

  const tl = gsap.timeline({
    onComplete: () => {
      preloader.style.display = "none"
      document.body.classList.remove("is-loading")
      initHeroScale()
      initHorizontalScroll()
    },
  })

  tl.to(text, {
    y: "0%",
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  })
    .to(
      bar,
      {
        width: "100%",
        duration: 1.6,
        ease: "power1.inOut",
      },
      0.2
    )
    .to([text, bar], {
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
    })
    .to(
      preloader,
      {
        opacity: 0,
        duration: 0.8,
        ease: "power4.inOut",
      },
      "-=0.2"
    )
}

window.addEventListener("load", () => {
  initPreloader()
})
