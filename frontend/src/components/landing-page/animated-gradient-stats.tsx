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
      className="relative h-full overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <AnimatedGradient colors={colors} speed={0.05} blur="medium" />
      <motion.div
        className="relative z-10 p-3 text-white backdrop-blur-sm sm:p-5 md:p-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h3
          className="text-sm text-white sm:text-base md:text-lg"
          variants={item}
        >
          {title}
        </motion.h3>
        <motion.p
          className="mb-4 text-2xl font-medium text-white sm:text-4xl md:text-5xl"
          variants={item}
        >
          {value}
        </motion.p>
        {subtitle && (
          <motion.p className="text-sm text-white/80" variants={item}>
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

const AnimatedGradientStats: React.FC = () => {
  return (
    <div className="h-full w-full bg-black">
      <div className="mx-auto max-w-7xl">
        <div className="grid h-full grow grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2">
            <BentoCard
              title="Total Revenue"
              value="$1,234,567"
              subtitle="15% increase from last month"
              colors={["#3B82F6", "#60A5FA", "#93C5FD"]}
              delay={0.2}
            />
          </div>
          <BentoCard
            title="New Users"
            value={1234}
            subtitle="Daily signups"
            colors={["#60A5FA", "#34D399", "#93C5FD"]}
            delay={0.4}
          />
          <BentoCard
            title="Conversion Rate"
            value="3.45%"
            subtitle="0.5% increase from last week"
            colors={["#F59E0B", "#A78BFA", "#FCD34D"]}
            delay={0.6}
          />
          <div className="md:col-span-2">
            <BentoCard
              title="Active Projects"
              value={42}
              subtitle="8 completed this month"
              colors={["#3B82F6", "#A78BFA", "#FBCFE8"]}
              delay={0.8}
            />
          </div>
          <div className="md:col-span-3">
            <BentoCard
              title="Customer Satisfaction"
              value="4.8/5"
              subtitle="Based on 1,000+ reviews from verified customers across all product categories"
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
