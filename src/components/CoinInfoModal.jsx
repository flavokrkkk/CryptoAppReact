//Работа с модальным окном каждой валюты в select
import React from 'react';
import { useCrypto } from '../context/cryptoContext';
import { Divider, Flex, Tag, Typography } from 'antd';


const CoinInfoModal = ({coin}) => {

const { crypto } = useCrypto()
    
    return (
        <>
        <Flex align='center' justify='center'>
            <img src={coin.icon} alt={coin.name} style={{ width: '40px', marginRight: '1 0px' }}/>
            <Typography.Title
                level={2}
                style={{ margin: 0 }}
            >
                ({coin.symbol})
                {coin.name}
            </Typography.Title>
        </Flex>
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
        <Typography.Paragraph style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography.Text strong style={{marginRight: '10px'}}>
                    <span style={{fontSize: 24}}>Price: </span>
                </Typography.Text>
                <span style={{marginTop: '5px', fontSize: '18px'}}>{coin.price} $</span>
        </Typography.Paragraph>

        <Typography.Paragraph>
                <Typography.Text>
                    Price BTC:
                </Typography.Text>
                {coin.priceBtc} 
        </Typography.Paragraph>

        <Typography.Paragraph>
                <Typography.Text>
                    Market Cap: 
                </Typography.Text>
                {coin.marketCap}
        </Typography.Paragraph>

        <Typography.Paragraph>
                <Typography.Text>
                    Contract Address:
                </Typography.Text>
                {coin.contractAdress} 
        </Typography.Paragraph>
        </>
        
    );
};

export default CoinInfoModal;