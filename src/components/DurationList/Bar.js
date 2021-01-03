import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';

const Bar = props => {
  const { activeEffects, setActiveEffects, timestamp } = props;
  const effect = activeEffects[timestamp];
  const [progress, setProgress] = useState(effect.duration);

  useEffect(() => {
    progress > -0.2 &&
      setTimeout(() => {
        setProgress(progress - 0.01);
      }, 10);
    if (progress <= -0.2) {
      setActiveEffects({ ...activeEffects, [timestamp]: undefined });
    }
  }, [progress]);

  return (
    <div className={styles.item}>
      <div
        className={styles.label}
        style={
          {
            // color: effect.color.hex
          }
        }
      >
        {effect.label} {effect.sublabel}
      </div>
      <div className={styles.barWrap}>
        <div
          className={styles.bar}
          style={{
            width: `calc(${(progress / effect.duration) * 100}%)`,
            backgroundColor: effect.color.hex
          }}
        />
      </div>
    </div>
  );
};

export default Bar;
