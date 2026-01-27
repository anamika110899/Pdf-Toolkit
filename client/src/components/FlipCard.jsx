import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

export default function FlipCard({ frontIcon, frontText, backText, onClick }) {
  return (
    <motion.div
      className="flip-card"
      style={{ perspective: 1000, cursor: "pointer" }}
      onClick={onClick}
    >
      <motion.div
        className="inner"
        initial={false}
        whileHover="hover"
        variants={{
          hover: {
            rotateY: 180,
            transition: { duration: 0.6 },
          },
        }}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {/* Front Side */}
        <motion.div
          className="face front"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {frontIcon}
          <Typography variant="h6" mt={1}>
            {frontText}
          </Typography>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="face back"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            background: "#1976d2",
            color: "#fff",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            transform: "rotateY(180deg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Typography variant="body1">{backText}</Typography>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
