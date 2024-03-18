import { Box } from '@mui/material';
import { FC, useState, forwardRef } from 'react';
import {
  esES,
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

// eslint-disable-next-line react/display-name
const DataTable = forwardRef<HTMLDivElement, DataGridProps>((props, ref) => {
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
    quickFilterValues: [''],
  });

  return (
    <DataGrid
      {...props}
      ref={ref}
      filterModel={filterModel}
      onFilterModelChange={setFilterModel}
      slots={{
        toolbar: CustomToolbar,
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[5, 10]}
      localeText={esES.components.MuiDataGrid.defaultProps.localeText}
    />
  );
});

export default DataTable;
