import React from 'react';

import Bar from './Bar';

import styles from './styles.module.scss';

const DurationList = props => {
  const { activeEffects, setActiveEffects } = props;

  return (
    <div className={styles.list}>
      {Object.keys(activeEffects).map((key, index) => {
        return activeEffects[key] ? (
          <Bar
            key={index}
            timestamp={key}
            activeEffects={activeEffects}
            setActiveEffects={setActiveEffects}
          />
        ) : null;
      })}
    </div>
  );
};

export default DurationList;
