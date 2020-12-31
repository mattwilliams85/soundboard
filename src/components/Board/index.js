import React, { useEffect, useState } from 'react';

import Effect from 'components/Effect';
import Group from 'components/Group';
import EditEffect from 'components/Forms/EditEffect';
import EditGroup from 'components/Forms/EditGroup';
import Modal from 'components/Modal';

import { defaultEffects, qwerty } from 'constants.js';
import { BoardContext } from 'context/BoardContext';

import { ReactComponent as IconEdit } from 'icons/edit-icon.svg';
import { ReactComponent as IconClose } from 'icons/close-icon.svg';
import styles from './styles.module.scss';

const Board = () => {
  const [activeKey, setActiveKey] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeGroup, setActiveGroup] = useState('1');
  const [effects, setEffects] = useState(
    JSON.parse(localStorage.getItem('effects')) || defaultEffects
  );

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  });

  function handleKeyPress(e) {
    if (isEditMode || activeKey) return;

    if (!isNaN(e.key) && e.key) {
      setActiveGroup(e.key);
    } else {
      playEffect(e.key);
    }
  }

  function playEffect(keymap) {
    const effect = effects[activeGroup][keymap];

    if (effect) {
      const path = effect.file.replace(
        'C:\\fakepath\\',
        `${process.env.PUBLIC_URL}/audio/`
      );
      new Audio(path).play();
    }
  }

  return (
    <BoardContext.Provider
      value={{
        activeKey,
        setActiveKey,
        activeGroup,
        setActiveGroup,
        effects,
        setEffects,
        isEditMode,
        setIsEditMode,
        playEffect
      }}
    >
      {isEditMode ? (
        <IconClose
          className={styles.editToggle}
          onClick={() => setIsEditMode(false)}
        />
      ) : (
        <IconEdit
          className={styles.editToggle}
          onClick={() => setIsEditMode(true)}
        />
      )}
      <div className={styles.board}>
        <div>
          <div className={styles.row}>
            {qwerty[0].map(keymap => {
              return <Group key={keymap} keymap={keymap} />;
            })}
          </div>
          {qwerty.slice(1, 4).map((row, index) => {
            return (
              <div className={styles.row} key={index}>
                {row.map(keymap => {
                  return <Effect keymap={keymap} key={keymap} />;
                })}
              </div>
            );
          })}
        </div>

        {activeKey && isNaN(activeKey) && (
          <Modal onOverlayClick={() => setActiveKey()}>
            <EditEffect />
          </Modal>
        )}
        {activeKey && !isNaN(activeKey) && (
          <Modal onOverlayClick={() => setActiveKey()}>
            <EditGroup />
          </Modal>
        )}
      </div>
    </BoardContext.Provider>
  );
};

export default Board;
