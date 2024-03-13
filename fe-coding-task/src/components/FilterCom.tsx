
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Grid,
  InputLabel,
  Slider,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import { options, MAX_YEAR } from "../libs/util";
import { TFormData, TDataset } from "../libs/types";
import { useForm, Controller } from "react-hook-form";
import { createQuery } from "../libs/function";
import axios from "axios";
import { setChartDataAction } from "../store/action";

///////   Filter component ////////////////////////
const Filtercom: React.FC = () => {
  const dispatch = useDispatch();

  const formatResponseData = (quarters: String[], houseLabels: string[], values: number[]) => {
    const numQuarters = quarters.length
    const chartValues: TDataset[] = [];

    houseLabels.forEach(label => {
      chartValues.push({
        data: values.splice(0, numQuarters),
        name: label,
        id: `${label}ID`
      });
    });
    return chartValues;
  };

  const onSubmit = async (data: TFormData) => {
    if (data.quarters && data.houseType?.length) {
      localStorage.setItem("formData", JSON.stringify(data)); // save form data to local storage
      try {
        const quarters = filterQuarters(data.quarters[0], data.quarters[1]);
        axios.post(`${import.meta.env.VITE_API_BASE_URL}`, createQuery(quarters, data.houseType))
          .then((response) => {
            dispatch(setChartDataAction(quarters, formatResponseData(quarters, Object.values(response.data.dimension.Boligtype.category.label), response.data.value)));
          });
      } catch (error) {
        console.error('Error submitting form data:', error);
      } finally {
        // Disable CircularProgress regardless of success or failure
      }
    };
  };
  const generateQuarterRange = () => {
    const selections: { value: number, label: string }[] = [];
    let YEAR: number = Number(import.meta.env.VITE_MIN_YEAR);

    while (YEAR <= MAX_YEAR) {
      for (let i = 1; i < 5; i++) {
        selections.push({ value: parseInt(`${YEAR}${i}`), label: (i === 1 ? `${YEAR}` : '') }); // Don't show all quarter labels, only one at the start of a year
      };
      YEAR++;
    };
    return selections;
  };
  const filterQuarters = (quarterStart: number, quarterEnd: number) => {
    return QUARTERS.filter((quarter) => quarter.value >= quarterStart && quarter.value <= quarterEnd).map((item) => valuetext(item.value));
  };
  function valuetext(value: number) {
    return `${String(value).slice(0, 4)}K${String(value).slice(4)}`;
  }

  const QUARTERS = generateQuarterRange();
  const MIN_QUARTER = QUARTERS[0].value;
  const MAX_QUARTER = QUARTERS[QUARTERS.length - 1].value;

  const saved = localStorage.getItem("formData") ?? '[]';
  const parsed = JSON.parse(saved);
  const [initialValues] = useState<TFormData>({
    houseType: parsed.houseType ?? [],
    quarters: JSON.parse(saved).quarters ?? [MIN_QUARTER, MAX_QUARTER],
  });

  const { control, handleSubmit, formState: { errors }, } = useForm<TFormData>({
    defaultValues: initialValues
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid sx={{ mb: 4 }}>
          <Controller
            name="quarters"
            control={control}
            render={({ field }) => (
              <Slider
                {...field}
                getAriaLabel={() => 'Temperature range'}
                min={MIN_QUARTER}
                max={MAX_QUARTER}
                marks={generateQuarterRange()}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                valueLabelFormat={valuetext}
                step={null}
              />
            )}
          />
        </Grid>
        <Grid container>
          <Grid item lg={9} md={9} sm={8} xs={12}>
            <FormControl required error={!!errors.houseType} fullWidth>
              <InputLabel id="select-house-type-label">House Type:</InputLabel>
              <Controller
                name="houseType"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select
                    labelId="select-house-type-label"
                    id="select-house-type"
                    placeholder="House Type:"
                    label="House Type:"
                    {...field}
                    fullWidth
                    multiple>
                    {options.map((option: any) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))
                    }
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item lg={3} md={3} sm={4} xs={12} display={"flex"} px={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default Filtercom;