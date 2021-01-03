import React, { useContext, useState } from 'react';
import { TwitterPicker } from 'react-color';
import { Howl } from 'howler';

import { getAudioPath } from 'helpers.js';
import { colors } from 'constants.js';
import { BoardContext } from 'context/BoardContext';

import { ReactComponent as IconTrash } from 'icons/trash-icon.svg';
import styles from './styles.module.scss';

const EditEffect = () => {
  const {
    activeGroup,
    activeModal,
    setActiveModal,
    setEffects,
    effects,
    setIsEditMode
  } = useContext(BoardContext);
  const effect = effects[activeGroup][activeModal] || {};
  const initialValues = {
    label: '',
    keymap: '',
    color: { hex: '#de1bab' }
  };
  const [values, setValues] = useState(effect.label ? effect : initialValues);

  function handleChange(e) {
    const { target } = e;
    const { name, value } = target;
    e.persist();
    setValues({ ...values, [name]: value, keymap: activeModal });
  }

  function handleColorChange(e) {
    setValues({ ...values, color: e });
  }

  function addEffect(e) {
    e.preventDefault();

    const path = getAudioPath(values);
    const sound = new Howl({
      src: [path],
      preload: 'metadata',
      onload: e => {
        const duration = sound.duration();
        effects[activeGroup][activeModal] = {
          ...values,
          duration,
          id: `${activeGroup}_${activeModal}`
        };
        updateEffects(effects);
      }
    });
  }

  function removeEffect() {
    effects[activeGroup][activeModal] = undefined;
    updateEffects(effects);
  }

  function updateEffects(effects) {
    localStorage.setItem('effects', JSON.stringify(effects));
    setValues(initialValues);
    setActiveModal();
    setEffects(effects);
    setIsEditMode(false);
  }

  return (
    <>
      {effect.label && (
        <IconTrash className={styles.trashIcon} onClick={removeEffect} />
      )}
      <h2>Edit {activeModal.toUpperCase()} Button</h2>
      <form onSubmit={addEffect}>
        <div className={styles.input}>
          <label>Music File</label>
          <input
            name="file"
            type="file"
            onChange={value => handleChange(value)}
            required={!values.file}
          />
        </div>
        <div className={styles.input}>
          <label>Label</label>
          <input
            maxLength={9}
            name="label"
            value={values.label}
            onChange={value => handleChange(value)}
            required
          />
        </div>
        <div className={styles.input}>
          <label>Sublabel</label>
          <input
            maxLength={9}
            name="sublabel"
            value={values.sublabel}
            onChange={value => handleChange(value)}
          />
        </div>
        <div className={styles.input}>
          <label>Color</label>
          <TwitterPicker
            triangle={'hide'}
            colors={colors}
            color={values.color}
            value={values.color}
            onChange={handleColorChange}
          />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default EditEffect;
