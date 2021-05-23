import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Graph = (props) => {
  let hours = []
  for(let i=0; i<13; i++){
    hours.push(new Date());
  }
  for(let i=0; i<13; i++){
    hours[i].setHours(hours[i].getHours()+i);
    hours[i] = hours[i].getHours();
  }
  const kelvinToCelsius = (num) => {
    return Math.floor((num - 273.15)*100)/100;
  }

  let data = [];
    for(let i = 0; i < 13; i++) {
      data.push({
        name: hours[0]+'時',
        temp: kelvinToCelsius(props.tempsPerHour[i])
      })
    }
  
  return(
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Graph;