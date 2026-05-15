import "./css/main.css"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function initHorizontalScroll() {
  const mm = gsap.matchMedia()

  mm.add("(min-width: 769px)", () => {
    const wrapper = document.querySelector("#sections-wrapper")
    const sections = gsap.utils.toArray("#sections-wrapper > section")
    const totalScrollWidth = wrapper.scrollWidth - window.innerWidth

    const snapPoints = sections.map(
      (section) => section.offsetLeft / totalScrollWidth
    )

    gsap.to(wrapper, {
      x: -totalScrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: "#scroll-container",
        pin: true,
        scrub: 0.5,
        snap: {
          snapTo: snapPoints,
          duration: { min: 0.2, max: 0.6 },
          ease: "power1.inOut",
        },
        end: () => "+=" + totalScrollWidth,
        invalidateOnRefresh: true,
      },
    })
  })
}

window.addEventListener("load", initHorizontalScroll)
