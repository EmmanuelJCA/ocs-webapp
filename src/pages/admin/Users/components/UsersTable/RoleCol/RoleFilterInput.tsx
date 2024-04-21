import { SyntheticEvent } from 'react';
import { GridFilterInputValueProps } from '@mui/x-data-grid';
import { Checkbox, TextField, Autocomplete } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

import { Role, RoleInSpanish } from '@/types';

const options = Object.values(Role);

export const RoleFilterInput = (props: GridFilterInputValueProps) => {
  const { item, applyValue } = props;

  return (
    <Autocomplete
      multiple
      limitTags={1}
      options={options}
      value={item.value?.map((v: string) => options.find((o) => o === v))}
      onChange={(_event: SyntheticEvent, value: Role[]) => {
        applyValue({ ...item, value: value });
      }}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option: Role, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlank fontSize="small" />}
            checkedIcon={<CheckBox fontSize="small" />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {RoleInSpanish[option]}
        </li>
      )}
      renderInput={(params) => <TextField {...params} variant="standard" label="Opciones" />}
    />
  );
};
