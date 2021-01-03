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
      if (!effect.looping) {
        setActiveEffects({ ...activeEffects, [timestamp]: undefined });
      }
    }
  }, [progress]);

  const IconLoop = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 40">
        <g>
          <path
            style={{ fill: effect.color.hex }}
            d="m 12.52344,6.0000887 c -0.51444,0.01 -0.98633,0.422 -0.98633,1 V 10.000089 H 10 c -4.4147001,0 -8.0000001,3.5853 -8.0000001,8.000001 0,4.41471 3.5853,8 8.0000001,8 h 12 c 4.4147,0 8,-3.58529 8,-8 0,-4.414701 -3.5853,-8.000001 -8,-8.000001 H 19.73437 L 13.03516,6.1329087 c -0.16472,-0.0951 -0.34024,-0.13607 -0.51172,-0.13282 z M 10,12.000089 h 1.53711 v 3 c 7.4e-4,0.76928 0.83183,1.249761 1.49805,0.86524 l 6.69531,-3.86524 H 22 c 3.3413,0 6,2.65871 6,6.000001 0,3.3413 -2.6587,6 -6,6 H 10 c -3.3413,0 -6.0000001,-2.6587 -6.0000001,-6 0,-3.341291 2.6587001,-6.000001 6.0000001,-6.000001 z"
          />
        </g>
      </svg>
    );
  };

  return (
    <div className={styles.item}>
      <div className={styles.label}>
        {effect.label} {effect.sublabel}
      </div>
      {effect.looping ? (
        <div className={styles.loopIcon}>
          <IconLoop />
        </div>
      ) : (
        <div className={styles.barWrap}>
          <div
            className={styles.bar}
            style={{
              width: `calc(${(progress / effect.duration) * 100}%)`,
              backgroundColor: effect.color.hex
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Bar;
