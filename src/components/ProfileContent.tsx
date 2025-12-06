import React from 'react';
import img17252891567881 from "figma:asset/6f425ab7a2319fc065c66c69e67abde5cdbaf375.png";

function HeaderMenu() {
  return (
    <div className="content-stretch flex font-['SF_UI_Display:Medium',sans-serif] gap-[12px] items-center justify-end leading-[1.5] not-italic relative shrink-0 text-[15px] text-nowrap text-right text-zinc-400 tracking-[0.45px] whitespace-pre">
      <p className="relative shrink-0 cursor-pointer hover:text-black transition-colors">Resume</p>
      <p className="relative shrink-0 cursor-pointer hover:text-black transition-colors">Thoughts</p>
      <p className="relative shrink-0 cursor-pointer hover:text-black transition-colors">Playground</p>
      <p className="relative shrink-0 cursor-pointer hover:text-black transition-colors">Linkedin</p>
    </div>
  );
}

function HeaderTitle() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 text-nowrap w-full">
      <div className="flex flex-col font-['SF_UI_Display:Semibold',sans-serif] justify-center relative shrink-0 text-[24px] text-black tracking-[0.48px]">
        <p className="leading-none text-nowrap whitespace-pre">Tính (Aaron)</p>
      </div>
      <div className="flex flex-col font-['SF_UI_Display:Medium',sans-serif] justify-center relative shrink-0 text-[15px] text-zinc-400 tracking-[0.45px]">
        <p className="leading-[1.5] text-nowrap whitespace-pre">Sr. Product Designer - AI</p>
      </div>
    </div>
  );
}

interface ProfileContentProps {
  isChatOpen: boolean;
}

export function ProfileContent({ isChatOpen }: ProfileContentProps) {
  // Adjust padding based on state. 
  // Frame202 (closed): px-[500px]
  // Frame203 (open): px-[250px]
  // We can use a transition for this.

  const paddingClass = isChatOpen ? "max-md:px-[32px] md:px-[350px]" : "max-md:px-[32px] md:px-[400px]";

  return (
    <div className="relative shrink-0 w-full h-full overflow-y-auto no-scrollbar">
      <div className={`box-border content-stretch flex flex-col gap-[46px] min-h-full items-start pb-[200px] pt-[160px] ${paddingClass} transition-all duration-500 ease-in-out relative w-full`}>
        <div className="relative rounded-[99px] shrink-0 size-[37px]" data-name="1725289156788 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[99px] size-full" src={img17252891567881} />
        </div>
        <HeaderMenu />
        <HeaderTitle />
        <div className="flex flex-col font-['SF_UI_Display:Medium',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[15px] text-black tracking-[0.45px] w-[min-content]">
          <p className="leading-[1.5]">The builder, human-first designer. I’m buidling @explow to predict possible future self to for human’s self-continuety. And more AI products in the future.</p>
        </div>
        <div className="flex flex-col font-['SF_UI_Display:Medium',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[15px] text-black tracking-[0.45px] w-[min-content]">
          <p className="leading-[1.5]">My mission is to build a world of AI that is responsible, ethical, and free of side effects. AI that does not reduce human value or leave people behind, but makes human life brighter.</p>
        </div>
        <div className="flex flex-col font-['SF_UI_Display:Medium',sans-serif] h-[46px] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-black tracking-[0.45px] w-full">
          <p className="leading-[1.5]">Currently dedicated to developing immersive products within the artificial intelligence space.</p>
        </div>
        <div className="flex flex-col font-['SF_UI_Display:Medium',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[15px] text-zinc-400 tracking-[0.45px] w-[min-content]">
          <p className="leading-[1.5]">/ Work</p>
        </div>
        <div className="flex flex-col font-['SF_UI_Display:Medium',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[15px] text-black tracking-[0.45px] w-[min-content]">
          <p className="leading-[1.5]">My most recent chapter began in 2023, when I joined the Murror AI with a mission to help young people through self-discovery and depression prevention. I lead AI behavior design, shaping how the AI thinks, speaks, and interacts as a supportive companion. This work now powers the entire product and has contributed to strong early PMF signals.</p>
        </div>
        <p className="font-['SF_UI_Display:Medium',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[15px] text-black tracking-[0.45px] w-[min-content]">Before that, I worked at One Mount, where I owned the Voucher domain in the VinID (now OneU) app, serving millions of users. I contributed across the full product cycle—research, usability testing, interviews, UI, and measurement. I also led the Loyalty Operation project between Techcombank and VinID and built cross-team design processes for squads in both the North and South.</p>
        <p className="font-['SF_UI_Display:Medium',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[15px] text-black tracking-[0.45px] w-[min-content]">Earlier in my career, at age 20, I became a Product Designer at Pixie, where I built a mentoring platform that connected learners with industry mentors.</p>
        <p className="font-['SF_UI_Display:Medium',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[15px] text-black tracking-[0.45px] w-[min-content]">At 19, I started as a Visual Designer, my first professional design role.</p>
        <p className="font-['SF_UI_Display:Medium',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[15px] text-black tracking-[0.45px] w-[min-content]">And my journey began even earlier with aesthetics. As a high school student, I earned my first income as a mobile photographer, discovering my passion for visual storytelling.</p>
        <p className="font-['SF_UI_Display:Medium',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[15px] text-zinc-400 tracking-[0.45px] w-[min-content]">/ Life</p>
        <p className="font-['SF_UI_Display:Medium',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[15px] text-black tracking-[0.45px] w-[min-content]">I average 4km of swimming, 10km of running, and 20km of cycling per week. I’ve been slowing down so I can stay focused in a world full of noise. Tech moves crazy fast, focus is the only way to see what really matters.</p>
      </div>
    </div>
  );
}
