import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AddCard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const newItem = location.state?.item

    const [cartItems, setCartItems] = useState(()=>{
        const stored = localStorage.getItem('cart');
        return stored? JSON.parse(stored): [];
    });

    const addRef = useRef(false);

    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(()=>{
        if(newItem && addRef.current){
            addRef.current = true;

            setCartItems((prevItems)=>{
                const exist = prevItems.find(item=> item.id === newItem.id);
                if(exist){
                    return prevItems.map(item=> item.id === newItem.id? {...item, quantity: item.quantity + 1}: item);
                }else{
                    return [...prevItems, {...newItem, quantity: 1}];
                }
            });
            navigate(location.pathname, {replace: true});
        }
    },[newItem, navigate, location.pathname]);

    const removeItem = (id)=>{
        setCartItems(prevItem=> prevItem.filter(item=> item.id !== id));
    };

    const decreaseQty = (id)=>{
        setCartItems(previtem=> previtem.map(item=> item.id === id?
            {...item, quantity: item.quantity -1}:
            item
        ).filter(item=> item.quantity > 0));
    };

    const increaseQty = (id)=>{
        setCartItems(previtem=> previtem.map(item=> item.id === id?
            {...item, quantity: item.quantity + 1}:
            item
        ).filter(item=> item.quantity > 0));
    };

    const totalPrice = cartItems.reduce(
        (total, item)=> total + item.price * item.quantity,
        0
    );


  return (
    <div>
        <p>this is add to card for this food{newItem.name}</p>
        <p>this is add to card for this food</p>
        <p>this is add to card for this food</p>
    </div>
  )
}

export default AddCard