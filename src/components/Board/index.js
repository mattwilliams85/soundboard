import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';

import Effect from 'components/Effect';
import Group from 'components/Group';
import EditEffect from 'components/Forms/EditEffect';
import EditGroup from 'components/Forms/EditGroup';
import Modal from 'components/Modal';
import DurationList from 'components/DurationList';

import { getAudioPath } from 'helpers.js';
import { defaultEffects, qwerty } from 'constants.js';
import { BoardContext } from 'context/BoardContext';

import { ReactComponent as IconEdit } from 'icons/edit-icon.svg';
import { ReactComponent as IconClose } from 'icons/close-icon.svg';
import styles from './styles.module.scss';

const Board = () => {
  const [activeKey, setActiveKey] = useState();
  const [activeModal, setActiveModal] = useState();
  const [activeEffects, setActiveEffects] = useState({});
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
    if (isEditMode || activeModal) return;

    if (!isNaN(e.key) && e.key) {
      setActiveGroup(e.key);
    } else {
      playEffect(e.key);
      setActiveKey(e.key);
    }
  }

  function playEffect(keymap) {
    const effect = effects[activeGroup][keymap];

    if (effect) {
      const path = getAudioPath(effect);
      const sound = new Howl({
        src: [path]
      });

      const timestamp = Date.now();
      setActiveEffects({
        ...activeEffects,
        [timestamp]: { ...effect, timestamp }
      });
      sound.play();
    }
  }

  return (
    <BoardContext.Provider
      value={{
        activeKey,
        setActiveKey,
        activeModal,
        setActiveModal,
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
      </div>
      <DurationList
        activeEffects={activeEffects}
        setActiveEffects={setActiveEffects}
      />
      {activeModal && isNaN(activeModal) && (
        <Modal onOverlayClick={() => setActiveModal()}>
          <EditEffect />
        </Modal>
      )}
      {activeModal && !isNaN(activeModal) && (
        <Modal onOverlayClick={() => setActiveModal()}>
          <EditGroup />
        </Modal>
      )}
    </BoardContext.Provider>
  );
};

export default Board;
