import React from "react";

import styles from "./styles.module.scss";

const AnimationBox = () => {
  return (
    <div className="animation-box">
      <ul className={styles.items}>
        {Array(10)
          .fill("")
          .map((_, idx) => {
            return <li key={idx} />;
          })}
      </ul>
    </div>
  );
};

export default AnimationBox;
