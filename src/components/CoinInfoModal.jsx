import React from 'react';
import { useCrypto } from '../context/cryptoContext';


const CoinInfoModal = ({coin}) => {

    const { crypto } = useCrypto()
    
    return (
        <h2>
            {coin.name}
        </h2>
    );
};

export default CoinInfoModal;