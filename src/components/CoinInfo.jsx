import { Flex, Typography } from 'antd';
import React from 'react';

const CoinInfo = ({coin, withSymbol}) => {
    return (
        <Flex align='center' justify='center'>
            <img src={coin.icon} alt={coin.name} style={{ width: '40px', marginRight: '10px' }}/>
            <Typography.Title
            level={2}
            style={{ margin: 0 }}
            >
            {withSymbol && <span>({coin.symbol})</span>}  {coin.name}
            </Typography.Title>
        </Flex>
    );
};

export default CoinInfo;