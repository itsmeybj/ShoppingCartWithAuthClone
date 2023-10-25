import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Rating } from 'react-simple-star-rating'
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

const Product = () => {

    const dispatch = useDispatch()

    const getProducts = async () => {
        const prod = await axios.get("https://fakestoreapi.com/products");
        setProducts(prod.data)
    }

    const [products, setProducts] = useState()

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <div className="container">
                <div className="row d-flex flex-wrap justify-content-start ms-1 gap-3 mt-5">

                    {
                        (products) ? products.map((product) => {
                            return (
                                <div className="card" key={product.id} style={{ width: "18rem", minHeight: "20rem" }}>
                                    <div className="text-center">
                                        <img src={product.image} alt="" />
                                    </div>
                                    <div className="card-body">

                                        <div className="card-title">
                                            <h5>{(product.title).slice(1, 25)}</h5>
                                        </div>

                                        <div className="category">
                                            <h5>{product.category}</h5>
                                        </div>
                                        <div className="card-text">
                                            <p>{(product.description).slice(0, 50)}.....</p>
                                        </div>
                                        <div className="price">
                                            <h4>${product.price}</h4>
                                        </div>
                                        <div className="rating">
                                            <Rating readonly={true} initialValue={product.rating.rate} />
                                        </div>
                                        <button onClick={() => dispatch(addToCart(product))} className="btn btn-primary">Add to Cart</button>
                                    </div>
                                </div>
                            )

                        }) : <h2>Loading....</h2>
                    }

                </div>
            </div>
        </>
    )
}

export default Product;