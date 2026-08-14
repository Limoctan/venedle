import * as React from 'react';
import { Combobox } from '@base-ui/react/combobox';
import styles from '../css/Autocomplete.module.css';
import { useCharacterNames } from '@/hooks/useCharacters';

export function Autocomplete({
  onSelect,
  disabled = false,
  excludedNames = [],
}: {
  onSelect: (value: string) => void;
  disabled?: boolean;
  excludedNames?: string[];
}) {
  const { names } = useCharacterNames();

  const filteredNames = names.filter((name) => !excludedNames.includes(name));

  const id = React.useId();
  return (
    <Combobox.Root
      items={filteredNames}
      disabled={disabled}
      openOnInputClick={false}
    >
      <div className={styles.Label}>
        <label htmlFor={id}>Eligue una persona</label>
        <Combobox.InputGroup className={styles.InputGroup}>
          <Combobox.Input
            placeholder="e.g. Apple"
            id={id}
            className={styles.Input}
            disabled={disabled}
          />
        </Combobox.InputGroup>
      </div>

      <Combobox.Portal>
        <Combobox.Positioner className={styles.Positioner} sideOffset={4}>
          <Combobox.Popup className={styles.Popup}>
            <Combobox.Empty>
              <div className={styles.Empty}>Persona no encontrada.</div>
            </Combobox.Empty>
            <Combobox.List className={styles.List}>
              {(item: string) => (
                <Combobox.Item
                  key={item}
                  value={item}
                  className={styles.Item}
                  onClick={() => onSelect(item)}
                >
                  <span className={styles.ItemText}>{item}</span>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}
