import React, { useEffect, useState } from 'react';
import { Button, Layout, Modal, Select, Space, Drawer } from 'antd';
import { useCrypto } from '../../context/cryptoContext';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const AppHeader = () => {

    //Состояние для селекта
    const [select, setSelect] = useState(false)

    //Состояние для выбранной валюты
    const [coin, setCoin] = useState(null)

    //Состояние модального окна
    const [modal, setModal] = useState(false)

    //Состояние для всплывающего меню
    const [drawer, setDrawer] = useState(false)

    const { crypto } = useCrypto()

    useEffect(() => {
        const keypress = (e) => {
            if (e.key === '/') {
                setSelect(prev => !prev)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, [])

    //Выбор option из select
    const handleSelect = (value) => {
      setCoin(crypto.find(c => c.id === value))
      setModal(true)
    }

    return (
        <Layout.Header style={headerStyle}>
             <Select
              style={{ width: 250 }}
              open={select}
              onClick={() => setSelect(prev => !prev)}
              onSelect={handleSelect}
              value='press / to open'
              options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
              }))}
              optionRender={(option) => (
              <Space>
                  <img style={{width: '35px'}} src={option.data.icon} alt={option.data.label}/> {' '}
                  {option.data.label}
              </Space>
            )}
          />
          <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

          <Modal
           open={modal}
           onCancel={() => setModal(false)}
           footer={null}
          >
            <CoinInfoModal coin={coin}/>
          </Modal>

          <Drawer width={600}
            title='Add Asset'
            onClose={() => setDrawer(false)}
            open={drawer}
            destroyOnClose
            >
              <AddAssetForm
              onClose={() => setDrawer(false)}/>
          </Drawer>
        </Layout.Header>
    );
};

export default AppHeader;