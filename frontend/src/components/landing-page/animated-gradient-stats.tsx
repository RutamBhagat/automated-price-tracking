"use client"
import React from "react";
import { motion } from "framer-motion";

import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";

interface BentoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  colors: string[];
  delay: number;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  value,
  subtitle,
  colors,
  delay,
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay + 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative h-full overflow-hidden bg-slate-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <AnimatedGradient colors={colors} speed={0.05} blur="medium" />
      <motion.div
        className="relative z-10 p-3 text-zinc-100 backdrop-blur-sm sm:p-5 md:p-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h3
          className="text-sm text-zinc-200 sm:text-base md:text-lg"
          variants={item}
        >
          {title}
        </motion.h3>
        <motion.p
          className="mb-4 text-2xl font-medium text-zinc-100 sm:text-4xl md:text-5xl"
          variants={item}
        >
          {value}
        </motion.p>
        {subtitle && (
          <motion.p className="text-sm text-zinc-300" variants={item}>
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

const AnimatedGradientStats: React.FC = () => {
  return (
    <div id="Stats" className="h-full w-full bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid h-full grow grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2">
            <BentoCard
              title="Tracked Prices"
              value="2,345"
              subtitle="Total items monitored across all users"
              colors={["#3B82F6", "#60A5FA", "#93C5FD"]}
              delay={0.2}
            />
          </div>
          <BentoCard
            title="Alerts Sent"
            value="12,456"
            subtitle="Notifications delivered this month"
            colors={["#60A5FA", "#34D399", "#93C5FD"]}
            delay={0.4}
          />
          <BentoCard
            title="User Engagement"
            value="78%"
            subtitle="Users actively engaging with notifications"
            colors={["#F59E0B", "#A78BFA", "#FCD34D"]}
            delay={0.6}
          />
          <div className="md:col-span-2">
            <BentoCard
              title="Favorite Categories"
              value="Electronics & Fashion"
              subtitle="Most tracked product categories"
              colors={["#3B82F6", "#A78BFA", "#FBCFE8"]}
              delay={0.8}
            />
          </div>
          <div className="md:col-span-3">
            <BentoCard
              title="Savings Achieved"
              value="$89,567"
              subtitle="Estimated savings by users this month"
              colors={["#EC4899", "#F472B6", "#3B82F6"]}
              delay={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { AnimatedGradientStats };
