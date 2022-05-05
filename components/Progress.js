import { motion } from "framer-motion";
const Progress = ({ percentage }) => {
  return (
    <div
      style={{
        backgroundColor: "#00000011",
        borderRadius: 10000,
        height: 10,
        width: "100%",
      }}
    >
      <motion.div
        style={{
          backgroundColor: "red",
          borderRadius: 10000,
          opacity: 1,
          height: 10,
          width: 0,
        }}
        animate={{
          width: percentage + "%",
        }}
      />
    </div>
  );
};
export default Progress;
