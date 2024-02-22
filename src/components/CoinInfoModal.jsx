//Работа с модальным окном каждой валюты в select
import React from 'react';
import { useCrypto } from '../context/cryptoContext';
import { Divider, Flex, Tag, Typography } from 'antd';
import CoinInfo from './CoinInfo';


const CoinInfoModal = ({coin}) => {

const { crypto } = useCrypto()
    
    return (
        <>
       <CoinInfo
        coin={coin}
        withSymbol
       />
        <Divider/>
        <Typography.Paragraph style={{display: 'flex', justifyContent: 'center'}}>
                <Typography.Text strong style={{marginRight: '10px'}}>
                    1 hour: 
                </Typography.Text>
                <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>
                    {coin.priceChange1h} %
                </Tag>

                <Typography.Text strong style={{marginRight: '10px'}}>
                    1 day: 
                </Typography.Text>
                <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>
                    {coin.priceChange1d} %
                </Tag>

                <Typography.Text strong style={{marginRight: '10px'}}>
                    1 week: 
                </Typography.Text>
                <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>
                    {coin.priceChange1w} %
                </Tag>
        </Typography.Paragraph>
        <div style={{marginLeft: '65px'}}>
        <Typography.Paragraph style={{display: 'flex'}}>
                <Typography.Text strong style={{marginRight: '10px'}}>
                    <span style={{fontSize: 24}}>Price: </span>
                </Typography.Text>
                <span style={{marginTop: '5px', fontSize: '18px'}}>{coin.price.toFixed(2)} $</span>
        </Typography.Paragraph>

        <Typography.Paragraph style={{display: 'flex'}}>
                <Typography.Text strong style={{marginRight: '10px'}}>
                    <span style={{fontSize: 24}}>Price BTC: </span>
                </Typography.Text>
                <span style={{marginTop: '5px', fontSize: '18px'}}>{coin.priceBtc} </span> 
        </Typography.Paragraph>

        <Typography.Paragraph style={{display: 'flex'}}>
                <Typography.Text strong style={{marginRight: '10px'}}>
                   <span style={{fontSize: 24}}>Market Cap: </span> 
                </Typography.Text>
                <span style={{marginTop: '5px', fontSize: '18px'}}>{coin.marketCap}</span>
        </Typography.Paragraph>

        <Typography.Paragraph style={{display: 'flex'}}>
                <Typography.Text strong style={{marginRight: '10px'}}>
                    <span style={{fontSize: 24}}>Contract Address: </span>
                </Typography.Text>
                <span style={{marginTop: '5px', fontSize: '18px'}}>{coin.symbol}</span>
        </Typography.Paragraph>
        </div>
        
        </>
        
    );
};

export default CoinInfoModal;