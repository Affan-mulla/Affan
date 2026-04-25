"use client";

import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";

export default function HoverProfileCard({
  smothX,
  smothY,
} : {
  smothX: ReturnType<typeof useMotionValue>;
  smothY: ReturnType<typeof useMotionValue>;
}) {
  

  return (
      <motion.div
        style={{
          x: smothX,
          y: smothY,
          position: "fixed",
        }}
        className="pointer-events-none z-40"
      >
        <div className="w-[320px] rounded-2xl overflow-hidden bg-background text-white shadow-xl border border-border">
          {/* Banner */}
         <div className=" relative">
          <Image
            src="https://pbs.twimg.com/profile_banners/1794432856040599552/1769402162/1080x360"
            alt="Banner"
            width={500}
            height={50}
            className="w-full h-20 object-cover"
          />
          <Image
            src="https://pbs.twimg.com/profile_images/2015644864675737601/m8438SjA_400x400.jpg"
            alt="Profile Picture"
            width={64}
            height={64}
            className="w-18 h-18 rounded-full border-4 border-background absolute object-cover top-10 left-4"
          />
         </div>

          {/* Profile */}
          <div className="px-6 mt-10 space-y-1 capitalize">
            <h2 className=" font-mono font-semibold text-sm">
              Aff4n ✨
            </h2>
            <p className="text-xs text-muted font-mono">@_aff4n_</p>
            <div className="flex gap-4 mt-1 text-xs mb-4">
              <span>
                <b>241</b> Following
              </span>
              <span>
                <b>423</b> Followers
              </span>
            </div>
          </div>
        </div>
      </motion.div>
  );
}
