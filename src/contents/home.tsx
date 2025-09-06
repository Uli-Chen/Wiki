import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { AmbientLightBg } from "../../public/js/AmbientLightBg.module";

gsap.registerPlugin(useGSAP, ScrollSmoother);

gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.registerPlugin(useGSAP, SplitText);
gsap.registerPlugin(useGSAP, TextPlugin);

const animateCounter = (
  targetRef: React.RefObject<HTMLElement>,
  endValue: number
) => {
  if (targetRef.current) {
    const obj = { count: 0 };
    gsap.to(obj, {
      duration: 3,
      count: endValue,
      ease: "power4.out", // 更强的末端减速
      scrollTrigger: {
        trigger: targetRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      onUpdate: () => {
        if (targetRef.current) {
          targetRef.current.textContent = Math.round(obj.count).toString();
        }
      },
    });
  }
};

export function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const lightRef = useRef<HTMLSpanElement>(null);
  const ninetyRef = useRef<HTMLSpanElement>(null);
  const thirtySevenRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    new AmbientLightBg({
      dom: "box", // 对应 div 的 id
      colors: [
        "#9FE3EE",
        "#1E5880",
        "#103E62",
        "#002848",
        "#051124",
        "#9FE3EE",
      ],
      loop: true,
      speed: 0.1,
    });

    // 打字机标题效果
    if (titleRef.current) {
      const tl = gsap.timeline();
      tl.to(titleRef.current, {
        duration: 1.2,
        text: "Tuneable Dream Drive",
        ease: "power1.inOut",
      });
      tl.to(
        subtitleRef.current,
        {
          duration: 1.2,
          opacity: 1,
          text: "Tuning Microbes, Driving Dreams",
          ease: "power1.inOut",
        },
        "+=1.2"
      );
    }

    // Section 动画 - Masked Line + 图片左滑
    sectionsRef.current.forEach((el) => {
      const img = el.querySelector("img");
      const text = el.querySelector(".section-text");

      if (text) {
        const split = new SplitText(text, { type: "lines" });
        gsap.set(text, { perspective: 400 });
        gsap.set(split.lines, { overflow: "hidden" });

        gsap.from(split.lines, {
          yPercent: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (img) {
        gsap.fromTo(
          img,
          { x: -120, opacity: 0, filter: "blur(6px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    if (lightRef.current) {
      gsap.fromTo(
        lightRef.current,
        { color: "#ffffff", textShadow: "0px 0px 0px transparent", scale: 1 },
        {
          color: "#ffd700", // 金黄色
          textShadow: "0px 0px 10px #ffd700, 0px 0px 20px #ffec8b",
          duration: 0.4,
          repeat: 10, // 闪烁次数
          yoyo: true, // 往返闪烁
          onComplete: () => {
            gsap.to(lightRef.current, {
              color: "#ffd700",
              duration: 0.6,
              ease: "power2.out",
            });
          },
        }
      );
    }

    // Run the number counting animations
    animateCounter(ninetyRef, 90);
    animateCounter(thirtySevenRef, 37);
  }, []);

  return (
    <div className="homepage">
      {/* 顶部背景图和标题 */}
      <div className="hero-section">
        <h1 className="hero-title sparkle" ref={titleRef}></h1>
        <p ref={subtitleRef} className="subtitle" style={{ opacity: 0 }}></p>
        <div id="box" className="video-background"></div>
      </div>

      <div className="content">
        {/* Section 1 */}
        <div
          className="section-reverse"
          ref={(el) => {
            if (el) sectionsRef.current[0] = el;
          }}
        >
          <img
            src={"public/OnEarth.jpeg"}
            alt="intro"
            className="section-img"
          />
          <p className="section-text">
            <span className="highlight-word" ref={lightRef}>
              Light
            </span>{" "}
            is the primary controller of our body's internal clock. <br />
            Humans havelived in harmony with the Earth's rhythm,
            <br />
            rising with the sun and resting with its setting.
          </p>
        </div>
        <div
          className="section"
          ref={(el) => {
            if (el) sectionsRef.current[1] = el;
          }}
        >
          <img
            src={"public/OnSpace.jpeg"}
            alt="intro"
            className="section-img"
          />
          <p className="section-text">
            In space, however, <br /> the day-night rhythm is completely
            different.
          </p>
        </div>

        <div
          className="section"
          ref={(el) => {
            if (el) sectionsRef.current[2] = el;
          }}
        >
          <div className="text-box">
            <p className="section-text">
              A spacecraft in orbit experiences a sunrise and sunset every
              <br />
              <span className="number" ref={ninetyRef}>
                90
              </span>{" "}
              minutes,
              <br />
              with nights lasting up to
              <br />
              <span className="number" ref={thirtySevenRef}>
                37
              </span>{" "}
              minutes.
              <br />
              <br />
              This disruption of the day-night cycle severely affects the body's
              circadian rhythm, impacting astronauts' sleep and health
            </p>
          </div>

          <div className="p1image-wrapper">
            <img
              src={"public/Sleep.png"}
              alt="Rotating graphic"
              className="rotating-image"
            />
          </div>
        </div>
        <div
          className="section"
          ref={(el) => {
            if (el) sectionsRef.current[3] = el;
          }}
        >
          <img
            src={"public/Melatonine.png"}
            alt="intro"
            className="section-img"
          />
          <p className="section-text">
            Melatonin (MT) is the primary indole hormone secreted by the pineal
            gland, chemically N-acetyl-5-methoxytryptamine, also known as pineal
            hormone or melatonin.
          </p>
        </div>
      </div>
    </div>
  );
}
