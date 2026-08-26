import * as React from 'react';
import { Combobox } from '@base-ui/react/combobox';
import styles from '../css/Autocomplete.module.css';
import { useCharacterDirectory } from '@/hooks/useCharacters';
import { useState } from 'react';
import { Avatar } from './avatar';

export function Autocomplete({
  onSelect,
  disabled = false,
  excludedNames = [],
}: {
  onSelect: (value: string) => void;
  disabled?: boolean;
  excludedNames?: string[];
}) {
  const { names, imageByName } = useCharacterDirectory();
  const [inputValue, setInputValue] = useState('');
  const filteredNames = names.filter((name) => !excludedNames.includes(name));

  const id = React.useId();
  return (
    <Combobox.Root
      items={filteredNames}
      disabled={disabled}
      openOnInputClick={false}
      onValueChange={() => setInputValue('')}
      onInputValueChange={(value, eventDetails) => {
        // Only update from actual typing; ignore internal updates
        // triggered by item selection, highlighting, etc.
        if (eventDetails.reason === 'input-change') {
          setInputValue(value);
        }
      }}
      inputValue={inputValue}
    >
      <div className={styles.Label}>
        <Combobox.InputGroup className={styles.InputGroup}>
          <Combobox.Input
            placeholder="Ingresa un venezolano..."
            id={id}
            className={styles.Input}
            disabled={disabled}
          />
        </Combobox.InputGroup>
      </div>

      <Combobox.Portal>
        <Combobox.Positioner className={styles.Positioner} sideOffset={8}>
          <Combobox.Popup className={styles.Popup}>
            <Combobox.Empty>
              <div className={styles.Empty}>No encontramos a esa persona.</div>
            </Combobox.Empty>
            <Combobox.List className={styles.List}>
              {(item: string) => (
                <Combobox.Item
                  key={item}
                  value={item}
                  className={styles.Item}
                  onClick={() => onSelect(item)}
                >
                  <Avatar
                    name={item}
                    src={imageByName.get(item)}
                    className="size-7 rounded-full text-[10px]"
                  />
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
