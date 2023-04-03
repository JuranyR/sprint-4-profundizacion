import React, {useState}  from "react";
import less from '../../../images/less.png'
import plus from '../../../images/plus.png'

const Quantity = () => {
    const [amount, setAmount] = useState(1);

    //Function to decrease the amount of pizza
    const handleDecrease = () => {
        if (amount > 1) {
        setAmount(amount - 1);
        }
    };

    //Function to increase the amount of pizza
    const handleIncrease = () => {
        setAmount(amount + 1);
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