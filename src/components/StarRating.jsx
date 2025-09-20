import { useState } from "react";
import Star from "./icons/Star";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const StarRating = ({
  messages = [],
  maxRating = 5,
  color = "#fcc419",
  size = "25",
  className,

  setUserRating,
}) => {
  const textStyle = {
    lineHeight: "0",
    margin: "0",
    fontSize: `${size / 1.5}px`,
    color,
  };

  const [selectedRating, setSelectedRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);

  const onStarClick = (idx) => {
    if (selectedRating === idx + 1) {
      setSelectedRating(null);
      setUserRating(null);
    } else {
      setSelectedRating(idx + 1);
      setUserRating(idx + 1);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle} className={className}>
        {Array.from({ length: maxRating }, (_, idx) => {
          return (
            <Star
              key={idx}
              starNum={idx + 1}
              selectedRating={selectedRating}
              onClick={() => onStarClick(idx)}
              hoverRating={hoverRating}
              setHoverRating={setHoverRating}
              color={color}
              size={size}
            />
          );
        })}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? hoverRating
            ? messages[hoverRating - 1]
            : messages[selectedRating - 1]
          : hoverRating
          ? hoverRating
          : selectedRating}
      </p>
    </div>
  );
};

StarRating.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string),
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};

export default StarRating;
