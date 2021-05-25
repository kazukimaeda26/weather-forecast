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
  
  let data = [];
    for(let i = 0; i < 8; i++) {
      data.push({
        name: hours[i]+'時',
        temp: props.tempsPerHour[i]
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
        <XAxis dataKey="name" label={{value: "時刻", position: "insideBottom", offset: 0}} />
        <YAxis label={{value: "気温"}}/>
        <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Graph;