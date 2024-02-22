import React from 'react';
import { Layout, Typography } from 'antd';
import {useCrypto} from '../../context/cryptoContext.jsx'
import PortfolioChart from '../PortfolioChart.jsx';
import AssetsTable from '../AssetsTable.jsx';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
  };
  
const AppContent = () => {
    const { assets, crypto } = useCrypto()

    const cryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price
        return acc
    }, {})

    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{textAlign: 'left', color: '#fff', marginLeft: '20px'}}>
                Portfolio: {assets.map(asset => asset.amount * cryptoPriceMap[asset.id])
                .reduce((acc, v) => acc += v, 0)
                .toFixed(2)}
                    $
            </Typography.Title>
            <PortfolioChart/>
            <AssetsTable/>
        </Layout.Content>
    );
};

export default AppContent;