import React, {useEffect, useState}  from "react";
import less from '../../../images/less.png'
import plus from '../../../images/plus.png'

const Quantity = ({onChangeAmount, defaultValue, item}) => {
    const [amount, setAmount] = useState(defaultValue?defaultValue:1);
/*
    useEffect(()=>{
        
    },[amount])
*/
    const handleDecrease = () => {
        if (amount > 1) {
            const resAmount=amount - 1
            setAmount(resAmount);
            onChangeAmount(resAmount,item?item:{})
        }
    };

    const handleIncrease = () => {
        const addAmount=amount+ 1
        setAmount(addAmount);
        onChangeAmount(addAmount,item?item:{})
    };

    return (
        <>
            <button className="car_add_reduce" onClick={handleDecrease}>
                <img src={less} alt="less" />
            </button>
            <span>{amount}</span>
            <button className="car_add_reduce" onClick={handleIncrease}>
                <img src={plus} alt="plus" />
            </button>
        </>
    );
};

export default Quantity;