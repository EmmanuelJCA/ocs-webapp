import { merge } from 'lodash';
import { Box } from '@mui/material';
import { esES } from '@mui/x-data-grid/locales';
import { FC, useState, forwardRef } from 'react';
import {
  DataGrid,
  DataGridProps,
  GridFilterModel,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarContainerProps,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

// ----------------------------------------------------------------------

const CustomToolbar: FC<GridToolbarContainerProps> = (props) => {
  return (
    <GridToolbarContainer sx={{ justifyContent: 'space-between' }} {...props}>
      <Box>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </Box>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

const DataTable = forwardRef<HTMLDivElement, DataGridProps>((props, ref) => {
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
    quickFilterValues: [''],
  });

  const mergedProps = merge({}, props, {
    filterModel,
    onFilterModelChange: setFilterModel,
    slots: {
      toolbar: CustomToolbar,
    },
    initialState: {
      pagination: {
        paginationModel: {
          pageSize: 10,
        },
      },
    },
    pageSizeOptions: [5, 10],
    localeText: esES.components.MuiDataGrid.defaultProps.localeText,
  });

  return <DataGrid {...mergedProps} ref={ref} />;
});

DataTable.displayName = 'DataTable';

export { DataTable };
