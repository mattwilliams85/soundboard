import React, { useContext } from 'react';
import classnames from 'classnames';

import { BoardContext } from 'context/BoardContext';

import styles from './styles.module.scss';

const Effect = props => {
  const { keymap } = props;
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
        [styles.editMode]: isEditMode
      })}
      style={{ backgroundColor: effect.color.hex }}
      onClick={handleOnClick}
    >
      <div className={styles.key}>{effect.keymap.toUpperCase()}</div>
      <div className={styles.name}>{effect.label}</div>
    </div>
  );
};

export default Effect;
