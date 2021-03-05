import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () =>{

    const removeProduct = (productKey) => {
        // console.log('removed clicked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }

    const [cart, setCart] = useState([])
    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        // console.log('vvvvvvv',savedCart);
        const productKeys = Object.keys(savedCart);


        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
        console.log(cartProducts);

    },[])
    return (
        <div>
            <h1>cart items: {cart.length}</h1>
            {
                cart.map(pd =>
                     <ReviewItem 
                        product={pd}
                        key = {pd.key}
                        removeProduct = {removeProduct}
                        >
                        

                     </ReviewItem>)
            }
        </div>
    );
};

export default Review;