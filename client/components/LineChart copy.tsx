import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';

const ProcessedDataChart = ({ data}: any) => { // @ts-ignore 
  const processedData = useMemo(() => {
    const nozzleTempData = data.map(({ nozzleTemp, createdAt }: any) => ({ // @ts-ignore 
      x: createdAt,
      y: nozzleTemp,
    }));

    const bedTempData = data.map(({ bedTemp, createdAt }: any) => ({ // @ts-ignore 
      x: createdAt,
      y: bedTemp,
    }));


    return [
      {
        id: 'nozzleTemp',
        data: nozzleTempData,
      },
      {
        id: 'bedTemp',
        data: bedTempData,
      },
    ];
  }, [data]);

  return (
    <div style={{ height: 400 }} className='text-[#272727] font-thin'>
     <ResponsiveLine
  data={processedData}
  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
  xScale={{ type: 'time', format: '%Y-%m-%dT%H:%M:%S.%LZ', precision: 'second' }}
  xFormat="time:%H:%M:%S"
  yScale={{ type: 'linear', min: 0, max: 300 }}
  axisTop={null}
  axisRight={null}
  axisBottom={{
    // orient: 'bottom',
    format: '%H:%M:%S',
    tickValues: 'every 2 seconds',
  }}
  axisLeft={{
    // orient: 'left',
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Temperature',
    legendOffset: -40,
    legendPosition: 'middle',
  }}
  enablePoints={false}
  colors={{ scheme: 'set2' }}
  pointSize={10}
  pointColor={{ theme: 'background' }}
  pointBorderWidth={2}
  pointBorderColor={{ from: 'serieColor' }}
  pointLabelYOffset={-12}
  enableArea={true}
  useMesh={true}
  legends={[
    {
      anchor: 'bottom-right',
      direction: 'column',
      justify: false,
      translateX: 100,
      translateY: 0,
      itemsSpacing: 0,
      itemDirection: 'left-to-right',
      itemWidth: 80,
      itemHeight: 20,
      itemOpacity: 0.75,
      symbolSize: 12,
      symbolShape: 'circle',
      symbolBorderColor: 'rgba(0, 0, 0, .5)',
  
    },
  ]}
/>

    </div>
  );
};

export default ProcessedDataChart;