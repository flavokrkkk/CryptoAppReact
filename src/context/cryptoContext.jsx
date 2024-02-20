//Глобальный контекст приложения
import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { fakeFetchCrypto, fetchAssets } from '../api';
import { percentDifference } from '../utils';

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

export const CryptoContextProvider = ({children}) => {

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

    return (
        <CryptoContext.Provider value={{loading, crypto, assets}}>
            {children}
        </CryptoContext.Provider>
    );
};

export default CryptoContext;

export const useCrypto = () => {
      return useContext(CryptoContext)
}