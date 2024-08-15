import React, { useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

const Card = (props) => {
    let dispatch = useDispatchCart();
    let data = useCart();
    let options = props.options || {};
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(priceOptions.length > 0 ? priceOptions[0] : "");

    const handleAddToCart = () => {
        if (!size || qty <= 0) {
            alert("Please select a size and quantity!");
            return;
        }

        const existingItemIndex = data.findIndex(item => item.id === props.foodItem._id);
        let foodItem = {
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: options[size] * qty,
            qty: qty,
            size: size,
            img: props.foodItem.img,
        };

        if (existingItemIndex >= 0) {
            // If item already exists, update the quantity and price
            const existingItem = data[existingItemIndex];
            foodItem.qty += existingItem.qty; // Update quantity
            foodItem.price += existingItem.price; // Update total price
            dispatch({ type: "REMOVE", index: existingItemIndex }); // Remove existing item before adding updated one
        }

        dispatch({ type: 'ADD', ...foodItem });
    };
    return (
        <div>
            <div className="card mt-4" style={{ "width": "18rem", "maxHeight": "600px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt={props.foodItem.name} style={{ height: "200px", objectFit: "fill" }} />
                <div className="container card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text">{props.foodItem.description}</p>

                    <div className="container w-100">
                        <h6>Available Sizes and Prices:</h6>
                        <ul>
                            {Object.entries(options).map(([key, value]) => (
                                <li key={key}>
                                    {key}: ${value}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="container w-100">
                        <select className="m-2 h-100 bg-info rounded" onChange={(e) => setSize(e.target.value)} value={size}>
                            {priceOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <select className="m-2 h-100 bg-info rounded" onChange={(e) => setQty(parseInt(e.target.value))} value={qty}>
                            {Array.from(Array(10), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <div className='d-inline h-100 fs-7'>
                            Total Price: {options[size] ? (options[size] * qty).toFixed(2) : "0.00"}
                        </div>
                    </div>
                    <hr />
                    <button className='btn btn-warning justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
