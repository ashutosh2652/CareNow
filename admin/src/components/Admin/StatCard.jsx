import React, { useEffect, useRef } from "react";
import { animate, motion } from "framer-motion";
import { Button } from "../ui/button";

function Counter({ to }) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;
    const controls = animate(0, to, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = value.toFixed(0);
      },
    });
    return () => controls.stop();
  }, [to]);

  return <span ref={nodeRef} className="text-3xl font-bold text-slate-700" />;
}

export function StatCard({ title, value, Icon, color }) {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className="flex items-center justify-between p-5 bg-white border rounded-lg shadow-sm"
    >
      <div className="flex items-center gap-4">
        {/* Animated Side Bar */}
        <motion.div
          style={{ backgroundColor: color, width: "6px", borderRadius: "3px" }}
          initial={{ height: 0 }}
          animate={{ height: "50px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        />
        {/* Text Content */}
        <div className="flex flex-col">
          <Counter to={value} />
          <div className="text-sm font-medium text-slate-500">{title}</div>
        </div>
      </div>
      {/* Icon Button */}
      <Button
        variant="ghost"
        size="icon"
        className="text-slate-400 hover:bg-slate-100"
      >
        <Icon className="w-6 h-6" />
      </Button>
    </motion.div>
  );
}
