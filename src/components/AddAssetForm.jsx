//Всплывающее окно - работа с ним
import { Divider, Flex, Select, Space, Typography, Form, Input, DatePicker, Button, Checkbox, InputNumber, Result } from 'antd';
import React, { useRef, useState } from 'react';
import { useCrypto } from '../context/cryptoContext';
import CoinInfo from './CoinInfo';

//Сообщения о валидации формы по определенным критериям
const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} is not valid number'
    },
    number: {
        range: '${label} must be between ${min} and ${max}'
    }
}

const AddAssetForm = ({onClose}) => {

    //Оживление формы, для динамического вывода цены
    const [form] = Form.useForm()

    //Получаем массив крипто с помощью кастомного хука
    const { crypto, addAsset } = useCrypto()

    //Состояние для выбранной крипты из селекта
    const [coin, setCoin] = useState(null)

    //Состояние для чека о добавлении крипты
    const [submitted, setSubmitted] = useState(false)

    //
    const assetRef = useRef()

    if (submitted) {
        return (
        <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
        <Button type="primary" key="console" onClick={onClose}>
            Close
        </Button>
    ]}
  />
    )}

    if (!coin) {
      return (  
        <Select
        style={{
            width: '100%'
        }}
        onSelect={(v) => setCoin(crypto.find(c => v === c.id))}
        placeholder='Select coin'
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
    )}

    const onFinish = (values) => {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date ?.$d ?? new Date()
        }
        assetRef.current = newAsset
        setSubmitted(true)
        addAsset(newAsset)
    }

    //Динамическое заполнение формы
    function handleAmountChange(value) {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2),
        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2),
        })
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
            span: 4,
            }}
            wrapperCol={{
            span: 10,
            }}
            style={{
            maxWidth: 600,
            }}
            initialValues={{
                 price: +coin.price.toFixed(2),
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
       <CoinInfo
        coin={coin}
       />
        <Divider/>


            <Form.Item
            label="Amount"
            name="amount"
            rules={[
                {
                required: true,
                type: 'number',
                min: 0,
                },
            ]}
            >
            <InputNumber placeholder='Enter coin amount' onChange={handleAmountChange} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
            label="Price"
            name="price"
            >
            <InputNumber onChange={handlePriceChange} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
            label="Date & Time"
            name="date"
            >
                <DatePicker showTime/>
            </Form.Item>

            <Form.Item
            label="Total"
            name="total"
            >
            <InputNumber disabled style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item>
            <Button type="primary" htmlType="submit">
                Add Asset!
            </Button>
            </Form.Item>

            
        </Form>
    );
};

export default AddAssetForm;