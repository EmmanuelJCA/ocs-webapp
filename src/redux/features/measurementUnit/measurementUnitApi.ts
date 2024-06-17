import { api } from '@/redux/services';
import { MeasurementUnit } from '@/types';

// ----------------------------------------------------------------------

const ENDPOINT = '/measurement-units';

const measurementUnitsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getMeasurementUnits: builder.query<MeasurementUnit[], void>({
      query: () => ({
        url: ENDPOINT,
        method: 'GET',
      }),
    }),
    getMeasurementUnit: builder.query<MeasurementUnit, string>({
      query: (measurementUnitId) => ({
        url: `${ENDPOINT}/${measurementUnitId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetMeasurementUnitQuery, useGetMeasurementUnitsQuery } = measurementUnitsApiSlice;
