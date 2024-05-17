import { useMemo, SyntheticEvent } from 'react';
import { GridFilterInputValueProps } from '@mui/x-data-grid';
import { Checkbox, TextField, Autocomplete } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

import { OncologyCenter } from '@/types';
import { useGetOncologyCentersQuery } from '@/redux/features';

export const OncologyCenterFilterInput = (props: GridFilterInputValueProps) => {
  const { item, applyValue } = props;

  const { data = [] } = useGetOncologyCentersQuery();

  const handleChange = (_event: SyntheticEvent, value: OncologyCenter[]) => {
    applyValue({ ...item, value: value.map((v) => v.id) });
  };

  const value = useMemo(
    () => item.value?.map((v: string) => data.find((o) => o.id === v)) || [],
    [item.value]
  );

  return (
    <Autocomplete
      multiple
      limitTags={1}
      options={data}
      value={value}
      onChange={handleChange}
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
