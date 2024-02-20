import { Card, Layout, List, Statistic, Tag, Typography} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {capitalize} from '../../utils.js'
import { useContext} from 'react';
import CryptoContext, { CryptoContextProvider } from '../../context/cryptoContext.jsx';


const {Text} = Typography

const siderStyle = {
    padding: '1rem'
  };

const AppSider = () => {

  const {assets} = useContext(CryptoContext)

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