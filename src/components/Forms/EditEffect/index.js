import React, { useContext, useState } from 'react';
import { SketchPicker } from 'react-color';

import { BoardContext } from 'context/BoardContext';

import { ReactComponent as IconTrash } from 'icons/trash-icon.svg';
import styles from './styles.module.scss';

const EditEffect = () => {
  const {
    activeGroup,
    activeKey,
    setActiveKey,
    setEffects,
    effects,
    setIsEditMode
  } = useContext(BoardContext);
  const effect = effects[activeGroup][activeKey] || {};
  const initialValues = {
    label: '',
    keymap: '',
    color: { hex: '#70335C' }
  };
  const [values, setValues] = useState(effect.label ? effect : initialValues);

  function handleChange(e) {
    const { target } = e;
    const { name, value } = target;
    e.persist();
    setValues({ ...values, [name]: value, keymap: activeKey });
  }

  function handleColorChange(e) {
    setValues({ ...values, color: e });
  }

  function addEffect(e) {
    e.preventDefault();
    effects[activeGroup][activeKey] = values;
    updateEffects(effects);
  }

  function removeEffect() {
    effects[activeGroup][activeKey] = undefined;
    updateEffects(effects);
  }

  function updateEffects(effects) {
    localStorage.setItem('effects', JSON.stringify(effects));
    setValues(initialValues);
    setActiveKey();
    setEffects(effects);
    setIsEditMode(false);
  }

  return (
    <>
      {effect.label && (
        <IconTrash className={styles.trashIcon} onClick={removeEffect} />
      )}
      <h2>Edit {activeKey.toUpperCase()} Button</h2>
      <form onSubmit={addEffect}>
        <div className={styles.input}>
          <label>Label</label>
          <input
            name="label"
            value={values.label}
            onChange={value => handleChange(value)}
            required
          />
        </div>
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
          <label>Color</label>
          <SketchPicker
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
