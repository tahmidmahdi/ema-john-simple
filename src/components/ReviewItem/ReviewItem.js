import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity, key, price} = props.product;
    return (
        <div>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity: {quantity}</p>
            <br/>
            <p><small>$ {price}</small></p>
            <button  

            className="main-button"
            onClick={() => props.removeProduct(key)}


            >Remove
            </button>
        </div>
    );
};

export default ReviewItem;