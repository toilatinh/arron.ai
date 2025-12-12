import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import imgAvatar from "figma:asset/6f425ab7a2319fc065c66c69e67abde5cdbaf375.png";
import imgOrb from "figma:asset/1c6b60c5e899670684e5f26b434d59133c0d5284.png";
import imgCardBg from "figma:asset/cc6c0585d3f6c405ebfd49bbdaf2cb1ac8ec8487.png";
import imgBottomBlur from "figma:asset/1f1e4f3cca011f7789041243f5bad6d947a2312d.png";

interface MainCardProps {
  isSidebarOpen: boolean;
  onOpenSidebar: () => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

export function MainCard({ isSidebarOpen, onOpenSidebar, inputValue, setInputValue }: MainCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const rotatingPhrases = [
    "anything…",
    "about my work…",
    "about my skills…"
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    console.log('Initial phrase:', rotatingPhrases[currentPhraseIndex]);

    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => {
        const next = (prev + 1) % rotatingPhrases.length;
        console.log('Rotating phrase:', rotatingPhrases[next]);
        return next;
      });
    }, 3000); // 700ms animation + 2300ms pause

    return () => clearInterval(interval);
  }, [rotatingPhrases.length]);
  return (
    <motion.div
      layout
      className="relative grow shrink-0 basis-0 min-w-0 h-full rounded-[32px] overflow-hidden flex flex-col items-center"
    >
      {/* Background Image */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-white inset-0" />
        <img
          alt=""
          className="absolute max-w-none object-center object-cover w-full h-full"
          src={imgCardBg}
        />
      </div>

      {/* Content Scroll Area */}
      <div className="relative w-full h-full overflow-y-auto no-scrollbar">
        <motion.div
          animate={{
            paddingLeft: isMobile ? "32px" : (isSidebarOpen ? "350px" : "400px"),
            paddingRight: isMobile ? "32px" : (isSidebarOpen ? "350px" : "400px"),
            paddingTop: "160px",
            paddingBottom: "200px",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="box-border flex flex-col gap-[46px] items-start relative w-full max-w-7xl mx-auto"
        >
          {/* Avatar */}
          <div className="relative rounded-[99px] shrink-0 size-[49px]">
            <img
              alt="Avatar"
              className="absolute inset-0 max-w-none object-cover rounded-[99px] size-full"
              src={imgAvatar}
            />
          </div>

          {/* Menu */}
          <div className="flex w-full main-card-menu gap-[12px] items-center justify-start leading-[1.5] text-[15px] text-left text-zinc-400 tracking-[0.45px] font-['SF_UI_Display']">
            <a href="https://drive.google.com/file/d/1TQTxxMW8_lqE0LchtteMCSL95fnxhSIA/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-black transition-colors">Resume</a>
            <a href="https://medium.com/@aarontn" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-black transition-colors">Thoughts</a>
            <a href="https://dribbble.com/toilatinhs" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-black transition-colors">Playground</a>
            <a href="https://www.linkedin.com/in/aarontinh/" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-black transition-colors">Linkedin</a>
          </div>

          {/* Name & Title */}
          <div className="flex flex-col gap-[8px] items-start w-full">
            <div className="main-card-title">
              Tính (Aaron)
            </div>
            <div className="main-card-subtitle">
              Sr. Product Designer - AI
            </div>
          </div>

          {/* Text Blocks */}
          <div className="space-y-[46px] w-full pb-[150px]">
            <p>
              The builder, human-first designer. I’m buidling @explow to predict
              possible future self to for human’s self-continuety. And more AI
              products in the future.
            </p>
            <p>
              My mission is to build a world of AI that is responsible, ethical,
              and free of side effects. AI that does not reduce human value or
              leave people behind, but makes human life brighter.
            </p>
            <p>
              Currently dedicated to developing immersive products within the
              artificial intelligence space.
            </p>

            <p>
              / Work
            </p>

            <p>
              My most recent chapter began in 2023, when I joined the <a href="https://aaron-ng.framer.ai/murror" target="_blank" rel="noopener noreferrer" style={{ color: "#FF7300" }}>Murror AI </a>
              with a mission to help young people through self-discovery and
              depression prevention. I lead AI behavior design, shaping how the
              AI thinks, speaks, and interacts as a supportive companion. This
              work now powers the entire product and has contributed to strong
              early PMF signals.
            </p>
            <p>
              Before that, I worked at One Mount, where I owned the <a href="https://aaron-ng.framer.ai/voucher" target="_blank" rel="noopener noreferrer" style={{ color: "#0077FF" }}>Voucher </a>
              domain in the VinID (now OneU) app, serving millions of users. I
              contributed across the full product cycle—research, usability
              testing, interviews, UI, and measurement. I also led the <a href="https://aaron-ng.framer.ai/om_portal" target="_blank" rel="noopener noreferrer" style={{ color: "#FF006F" }}>Loyalty Operation</a> project between Techcombank and VinID and built
              cross-team design processes for squads in both the North and
              South.
            </p>
            <p>
              Earlier in my career, at age 20, I became a Product Designer at
              <a href="https://www.linkedin.com/company/pixiegroup/posts/?feedView=all" target="_blank" rel="noopener noreferrer" style={{ color: "#08B119" }}> Pixie</a>, where I built a mentoring platform that connected learners
              with industry mentors.
            </p>
            <p>
              At 19, I started as a Visual Designer, my first professional
              design role.
            </p>
            <p>
              And my journey began even earlier with aesthetics. As a high
              school student, I earned my first income as a mobile photographer,
              discovering my passion for visual storytelling.
            </p>

            <p>
              / Life
            </p>

            <p>
              I average 4km of swimming, 10km of running, and 20km of cycling
              per week. I’ve been slowing down so I can stay focused in a world
              full of noise. Tech moves crazy fast, focus is the only way to see
              what really matters.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Blur */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none h-[40%] overflow-hidden rounded-b-[32px]">
        <img
          alt=""
          className="absolute w-full max-w-none bottom-0"
          style={{ transform: "translateY(20%) scale(1.2)" }}
          src={imgBottomBlur}
        />
        {/* Add a gradient fade to white at the very bottom if needed, but the image is blurry */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-transparent" />
      </div>

      {/* Floating Input Trigger */}
      <motion.div
        animate={{
          opacity: isSidebarOpen ? 0 : 1,
          y: isSidebarOpen ? 20 : 0,
          pointerEvents: isSidebarOpen ? "none" : "auto",
        }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-[50px] bg-white box-border flex h-[63px] items-center justify-between pl-[24px] pr-[16px] py-[16px] rounded-[999px] border border-white/40 backdrop-blur-sm w-[334px] z-10 transition-transform"
      >
        <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.3)] border-solid inset-[-2px] pointer-events-none rounded-[1001px]" />

        <div className="relative w-full mr-2 h-full flex items-center overflow-hidden">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder=""
            className="bg-transparent border-none outline-none w-full text-[15px] font-semibold leading-[1.5] tracking-[0.45px] relative z-10"
            style={{ fontFamily: 'var(--font-sf-ui-display)' }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue.trim()) {
                e.preventDefault();
                onOpenSidebar();
              }
            }}
          />

          {/* Animated Placeholder - only show when input is empty */}
          {!inputValue && (
            <div
              className="absolute inset-0 flex items-center pointer-events-none text-[15px] font-semibold leading-[1.5] tracking-[0.45px] text-black/50"
              style={{ fontFamily: 'var(--font-sf-ui-display)' }}
            >
              <span>Ask me&nbsp;</span>
              <div className="relative h-[1.5em] overflow-hidden inline-block min-w-[200px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentPhraseIndex}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{
                      y: "0%",
                      opacity: 1
                    }}
                    exit={{
                      y: "-100%",
                      opacity: 0
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="block whitespace-nowrap"
                  >
                    {rotatingPhrases[currentPhraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        <div
          onClick={onOpenSidebar}
          className="relative shrink-0 size-[31px] cursor-pointer hover:scale-110 transition-transform"
        >
          <div className="blur-[1px] filter relative rounded-[9999px] size-[31px] overflow-hidden bg-blue-400">
            <img
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWgwM3dyMjNjc216aHl4MDRyZXJiOXU2YjZhMXdubWUzZmRhM2hkZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ztMaIbzFqMD5z2mzIF/giphy.gif"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
