import { Button, Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { startOfToday, startOfYesterday, sub } from "date-fns";
import * as React from "react";

import { ChartDataItem } from '../models';

import Graph from './graph';

const ChartWrapper = styled(Container)(() => ({
  height: '100vh',
  paddingTop: '10vh'
}));

const TotalViews = styled(Typography)(() => ({
  color: '#BCC5CC',
  fontWeight: 'bold',
}))

const ViewsNumber = styled('span')(() => ({
  color: '#000000',
  fontWeight: 'bold',
})) 

const PeriodButton = styled(Button)(({ active }: { active: boolean }) => ({
  color: active ? '#FFFFFF' : '#000000',
  fontWeight: 'bold',
  backgroundColor: active ? '#000000' : 'transparent',
  borderRadius: 12,
  marginRight: 20,
  '&:hover': {
    backgroundColor: '#EEEEEE',
    color: '#000000'
  }
}))
​
enum ButtonsType {
  D = 'D', 
  W = 'W', 
  M = 'M',
  Y = 'Y', 
  ALL = "All"
}

interface ChartProps {
  data: ChartDataItem[];
  changePeriod: (startDate: Date | null) => void;
}
​
const Chart = ({ data, changePeriod }: ChartProps) => {

const [button, setButton] = React.useState<ButtonsType>(ButtonsType.ALL);

const today = startOfToday();

const getPeriodStartDate = (buttonType: ButtonsType): Date | null => {
  switch (buttonType) {
    case ButtonsType.D:
      return startOfYesterday();
    case ButtonsType.W:
      return sub(today, { weeks: 1 });
    case ButtonsType.M:
      return sub(today, { months: 1 });
    case ButtonsType.Y:
      return sub(today, { years: 1 });
    case ButtonsType.ALL:
    default:
      return null;
  }
};
  
const clickHandler = (buttonType: ButtonsType) => {
setButton(buttonType);
const time = getPeriodStartDate(buttonType)
changePeriod(time);
}
​
const totalViews = data.reduce((acc, datum) => acc += datum.views, 0);
​
  return (
    <ChartWrapper>
      <TotalViews>
        <ViewsNumber>{totalViews}</ViewsNumber> page views
      </TotalViews>
      <Graph data={data} />
      <Box>
        <PeriodButton active={button === ButtonsType.D} onClick={() => clickHandler(ButtonsType.D)}>
          1D
        </PeriodButton>
        <PeriodButton active={button === ButtonsType.W} onClick={() => clickHandler(ButtonsType.W)}>
          1W
        </PeriodButton>
        <PeriodButton active={button === ButtonsType.M} onClick={() => clickHandler(ButtonsType.M)}>
          1M
        </PeriodButton>
        <PeriodButton active={button === ButtonsType.Y} onClick={() => clickHandler(ButtonsType.Y)}>
          1Y
        </PeriodButton>
        <PeriodButton active={button === ButtonsType.ALL} onClick={() => clickHandler(ButtonsType.ALL)}>
          ALL
        </PeriodButton>
      </Box>
    </ChartWrapper>
  );
};
​
export default Chart;
