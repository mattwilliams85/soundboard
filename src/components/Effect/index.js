import React, { useEffect, useRef, useContext, useState } from 'react';
import classnames from 'classnames';

import { BoardContext } from 'context/BoardContext';

import styles from './styles.module.scss';

const Effect = props => {
  const soundTimeout = useRef();
  const { activeEffect, keymap } = props;
  const [isActive, setIsActive] = useState(false);
  const {
    activeGroup,
    effects,
    isEditMode,
    setActiveKey,
    playEffect
  } = useContext(BoardContext);
  const effect = effects[activeGroup][keymap] || {
    keymap,
    color: { hex: '#888' },
    label: ''
  };

  useEffect(() => {
    if (activeEffect === keymap) {
      setIsActive(true);
      clearTimeout(soundTimeout.current);
      soundTimeout.current = setTimeout(() => {
        setIsActive(false);
      }, effect.duration * 1000);
    }
  }, [activeEffect]);

  function handleOnClick() {
    if (isEditMode) {
      setActiveKey(keymap);
    } else if (effect.file) {
      playEffect(keymap);
    } else {
      setActiveKey(keymap);
    }
  }

  return (
    <div
      className={classnames(styles.effectButton, {
        [styles.editMode]: isEditMode,
        [styles.isActive]: isActive
      })}
      style={{
        backgroundColor: effect.color.hex,
        border: `2px solid ${effect.color.hex}`
      }}
      onClick={handleOnClick}
    >
      <div className={styles.key}>{effect.keymap.toUpperCase()}</div>
      <div className={styles.name}>{effect.label}</div>
    </div>
  );
};

export default Effect;
