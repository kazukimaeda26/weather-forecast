import { ContactSupportOutlined } from '@material-ui/icons';
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
    return Math.floor((num - 273.15)*10)/10;
  }

  let data = [];
     data.push({
      name: hours[0]+'時',
      temp: kelvinToCelsius(props.hoursTempature.zero)
    })
    data.push({
      name: hours[1]+'時',
      temp: kelvinToCelsius(props.hoursTempature.one)
    })
    data.push({
      name: hours[2]+'時',
      temp: kelvinToCelsius(props.hoursTempature.two)
    })
    data.push({
      name: hours[3]+'時',
      temp: kelvinToCelsius(props.hoursTempature.three)
    })
    data.push({
      name: hours[4]+'時',
      temp: kelvinToCelsius(props.hoursTempature.four)
    })
    data.push({
      name: hours[5]+'時',
      temp: kelvinToCelsius(props.hoursTempature.five)
    })
    data.push({
      name: hours[6]+'時',
      temp: kelvinToCelsius(props.hoursTempature.six)
    })
    data.push({
      name: hours[7]+'時',
      temp: kelvinToCelsius(props.hoursTempature.seven)
    })
    data.push({
      name: hours[8]+'時',
      temp: kelvinToCelsius(props.hoursTempature.eight)
    })
    data.push({
      name: hours[9]+'時',
      temp: kelvinToCelsius(props.hoursTempature.nine)
    })
    data.push({
      name: hours[10]+'時',
      temp: kelvinToCelsius(props.hoursTempature.ten)
    })
    data.push({
      name: hours[11]+'時',
      temp: kelvinToCelsius(props.hoursTempature.eleven)
    })
    data.push({
      name: hours[12]+'時',
      temp: kelvinToCelsius(props.hoursTempature.twelve)
    })
    console.log(props.hoursTempature);
    console.log(data);
  
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