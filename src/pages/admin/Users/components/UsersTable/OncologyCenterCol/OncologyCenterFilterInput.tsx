import { SyntheticEvent } from 'react';
import { GridFilterInputValueProps } from '@mui/x-data-grid';
import { Checkbox, TextField, Autocomplete } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

import { OncologyCenter } from '@/types';

const options: { id: string; name: string }[] = [
  { id: '677ff2a1-dc73-4e47-922b-c60027b9f347', name: 'San Lucas' },
  { id: '81307e16-dbf4-4916-acb8-d5f7a32c4c30', name: 'Madrera Fols' },
];

export const OncologyCenterFilterInput = (props: GridFilterInputValueProps) => {
  const { item, applyValue } = props;

  return (
    <Autocomplete
      multiple
      limitTags={1}
      options={options}
      value={item.value?.map((v: string) => options.find((o) => o.id === v))}
      onChange={(_event: SyntheticEvent, value: OncologyCenter[]) => {
        applyValue({ ...item, value: value.map((v) => v.id) });
      }}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlank fontSize="small" />}
            checkedIcon={<CheckBox fontSize="small" />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => <TextField {...params} variant="standard" label="Opciones" />}
    />
  );
};
