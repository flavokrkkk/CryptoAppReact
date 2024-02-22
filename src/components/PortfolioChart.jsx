import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useCrypto } from '../context/cryptoContext';

ChartJS.register(ArcElement, Tooltip, Legend);


const PortfolioChart = () => {

    const { assets } = useCrypto()
    


    // const assetName = () => {
    //     assets.map(asset => {
    //         return asset.id
    //     })
    // }


    const data = {
        labels: assets.map(asset => {
            return asset.name
        }),
        datasets: [
          {
            label: '$',
            data: assets.map(asset => asset.totalAmount) ,
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
          },
        ],
      }; 
      
    return (
       <div style={{display: 'flex', marginBottom: '1rem', justifyContent: 'center', height: '400px'}}>
          <Pie data={data}/>
       </div> 
    );
};

export default PortfolioChart;