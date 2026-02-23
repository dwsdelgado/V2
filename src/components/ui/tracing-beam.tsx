"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
} from "motion/react";

export const TracingBeam = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const updateSvgHeight = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight + 5);
      }
    };

    // Set initial height
    updateSvgHeight();

    // Update height on window resize
    const handleResize = () => {
      updateSvgHeight();
    };

    window.addEventListener('resize', handleResize);

    // Use ResizeObserver to detect content size changes
    const resizeObserver = new ResizeObserver(() => {
      updateSvgHeight();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    },
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
    },
  );

  return (
    <motion.div
      ref={ref}
      className={"relative mx-auto h-full w-full"}
    >
      <div className="absolute top-3 -left-4 md:-left-28 invisible md:visible">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="border-netural-200 ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-xs"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor: scrollYProgress.get() > 0 ? "white" : "#a8a29e",
              borderColor: scrollYProgress.get() > 0 ? "white" : "#78716c",
            }}
            className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight} // Set the SVG height
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
          fill="none"
          stroke="#9091A0"
          strokeOpacity="0.16"
          transition={{
            duration: 10,
          }} />
          <motion.path d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="1.25"
          className="motion-reduce:hidden"
          transition={{
            duration: 10,
          }} />
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1} // set y1 for gradient
              y2={y2} // set y2 for gradient
            >
              <stop stopColor="#a8a29e" stopOpacity="0" />
              <stop stopColor="#a8a29e" />
              <stop offset="0.325" stopColor="#78716c" />
              <stop offset="1" stopColor="#78716c" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
