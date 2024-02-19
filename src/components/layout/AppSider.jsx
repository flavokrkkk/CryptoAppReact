import React, { useEffect, useState } from 'react';
import { Card, Layout, List, Spin, Statistic, Tag, Typography} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { fakeFetchCrypto, fetchAssets } from '../../api';
import {capitalize, percentDifference} from '../../utils.js'
 

const {Text} = Typography

const siderStyle = {
    padding: '1rem'
  };


const AppSider = () => {

  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState([])
  const [assets, setAssets] = useState([])


//UseEffect - который отвечает за запрос на фейк дату и формирует данные
  useEffect(() => {
    const preload = async () => {
        setLoading(true)
        const { result } = await fakeFetchCrypto()
        const assets = await fetchAssets()

        setAssets(assets.map(asset => {
            const coin = result.find(c => c.id === asset.id)

            //coin - рыночная цена
            //asset - цена за которую мы купили 

            return {
              //Подсвечивает значение при падении или при росте
              grow: asset.price < coin.price, // boolean

              //Отвечает за вычет итогового процента падения или роста
              growPercent: percentDifference(asset.price, coin.price),

              //Отвечает за то сколько у нас капитал определенной монеты
              totalAmount: asset.amount * coin.price,

              //Подсчитывает выручку пользователя
              totalProfit: asset.amount * coin.price - asset.amount * asset.price,
              ...asset
            }
        }))
        setCrypto(result)
        setLoading(false)
    }
    preload()
  }, [])

  if (loading) {
    return <Spin fullscreen />
  }

//Отрисовываем все карточки из нашего кошелька крипты
    return (
        <Layout.Sider width="25%" style={siderStyle}>

            {
            assets.map(asset => 
                <Card style={{marginBottom:'1rem'}} key={asset.id}>
                  <Statistic
                    title={capitalize(asset.id)}
                    value={asset.totalAmount}
                    precision={2}
                    valueStyle={{
                    color: asset.grow ? '#3f8600' : '#cf1322',
                  }}
                    prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined />}
                    suffix="$"/>

                <List
                    size={'small'}
                    dataSource={[
                      {title: 'Total Profit', value: asset.totalProfit, withTag: true},
                      {title: 'Asset Amount', value: asset.amount, isPlain: true},
                      // {title: 'Difference', value: asset.growPercent},
                    ]}
                    renderItem={(item) => (
                <List.Item>
                    <span>{item.title}</span>
                    <span>
                    {item.withTag && ( <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag> )}
                    {item.isPlain && item.value}
                    {!item.isPlain && <Text  type={asset.grow ? 'success': 'danger' }>{item.value.toFixed(2)} $</Text>}
                    </span>
                </List.Item>
            )}
              />
          </Card>

              )
          }
          
          {/* <Card>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{
              color: '#cf1322',
            }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card> */}
        </Layout.Sider>
    );
};

export default AppSider;