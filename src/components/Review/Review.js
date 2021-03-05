import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'

const Review = () =>{
    const [orderPlaced, setOrderPlaced] = useState(false);
    const handlePlacedOrder = () =>{
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

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
    let thankYou; 
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    }
   
    return (
        <div className="twin-container">
            <div className="product-container">
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
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlacedOrder} className="main-button">Place Order</button>
                </Cart>

            </div>
        </div>
    );
};

export default Review;