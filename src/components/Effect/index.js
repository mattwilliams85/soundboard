import React, { useEffect, useRef, useContext, useState } from 'react';
import classnames from 'classnames';

import { BoardContext } from 'context/BoardContext';

import styles from './styles.module.scss';

const Effect = props => {
  const soundTimeout = useRef();
  const { keymap, loopActive } = props;
  const [isLocked, setIsLocked] = useState(null);
  const {
    activeGroup,
    effects,
    isEditMode,
    activeKey,
    setActiveModal,
    setActiveKey,
    playEffect
  } = useContext(BoardContext);
  const effect = effects[activeGroup][keymap] || {
    keymap,
    color: { hex: '#353b4c' },
    label: '',
    id: '='
  };

  useEffect(() => {
    if (`${activeGroup}_${activeKey}` === effect.id) {
      if (loopActive) setIsLocked(isLocked ? null : activeGroup);
      clearTimeout(soundTimeout.current);
      soundTimeout.current = setTimeout(() => {
        setActiveKey();
      }, 300);
    } else {
      clearTimeout(soundTimeout.current);
    }
  }, [activeKey]);

  function handleOnClick() {
    if (isEditMode) {
      setActiveModal(keymap);
    } else if (effect.file) {
      playEffect(keymap);
    } else {
      setActiveModal(keymap);
    }
  }

  function formatKey(key) {
    switch (key) {
      case ',':
        return '<';
      case '.':
        return '>';
      case '/':
        return '?';
      default:
        return key.toUpperCase();
    }
  }

  return (
    <div
      className={classnames(styles.effectButton, {
        [styles.editMode]: isEditMode,
        [styles.isActive]:
          `${activeGroup}_${activeKey}` === effect.id ||
          isLocked === activeGroup
      })}
      style={{
        border: `2px solid ${effect.color.hex}`
      }}
      onClick={handleOnClick}
    >
      <div className={styles.key}>{formatKey(effect.keymap)}</div>
      <div className={styles.name}>{effect.label}</div>
      <div className={styles.name}>{effect.sublabel}</div>
    </div>
  );
};

export default Effect;
