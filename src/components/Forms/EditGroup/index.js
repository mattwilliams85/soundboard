import React, { useContext, useState } from 'react';

import { BoardContext } from 'context/BoardContext';

import { ReactComponent as IconTrash } from 'icons/trash-icon.svg';
import styles from './styles.module.scss';

const EditGroup = () => {
  const { activeKey, setActiveKey, effects, setIsEditMode } = useContext(
    BoardContext
  );
  const effect = effects[activeKey] || {};

  const [values, setValues] = useState(effects[activeKey].label || '');

  function handleChange(e) {
    const { target } = e;
    const { value } = target;
    e.persist();
    setValues(value);
  }

  function addMode(e) {
    e.preventDefault();
    effects[activeKey].label = values;
    updateEffects(effects);
  }

  function removeMode() {
    effects[activeKey].label = undefined;
    updateEffects(effects);
  }

  function updateEffects(effects) {
    localStorage.setItem('effects', JSON.stringify(effects));
    setActiveKey();
    setIsEditMode(false);
  }

  return (
    <>
      {effect.label && (
        <IconTrash className={styles.trashIcon} onClick={removeMode} />
      )}
      <h2>Edit Mode Button</h2>
      <form onSubmit={addMode}>
        <div className={styles.input}>
          <label>Label</label>
          <input
            name="label"
            value={values}
            onChange={value => handleChange(value)}
            required
          />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default EditGroup;
