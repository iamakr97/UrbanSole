import React, { useState } from 'react'
import axios from 'axios';
import './AddProduct.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast'

function AddProduct() {
    const { token } = useSelector((state) => state.auth);
    const [productInfo, setProductInfo] = useState({
        title: '',
        file: null,
        description: '',
        price: null,
        color: '',
        category: 'Sneakers',
        brand: '',
        model: '',
        idealFor: 'Male',
        quantity: null
    });
    function changeHandler(e) {
        if (e.target.name === "file") {
            setProductInfo((prev) => ({
                ...prev,
                file: e.target.files
            }));
        } else {
            setProductInfo((prev) => ({
                ...prev,
                [e.target.name]: e.target.value
            }));
        }
    }
    function submitHandler(e) {
        e.preventDefault();
        if (!productInfo.title || !productInfo.description || !productInfo.price || !productInfo.color || !productInfo.category || !productInfo.brand || !productInfo.model || !productInfo.idealFor || !productInfo.quantity || !productInfo.file) {
            toast.error("Please fill All Details");
            return;
        }

        const formData = new FormData();
        formData.append('title', productInfo.title);
        formData.append('description', productInfo.description);
        formData.append('price', productInfo.price);
        formData.append('color', productInfo.color);
        formData.append('category', productInfo.category);
        formData.append('brand', productInfo.brand);
        formData.append('model', productInfo.model);
        formData.append('idealFor', productInfo.idealFor);
        formData.append('quantity', productInfo.quantity);

        const files = productInfo.file;
        for (let i = 0; i < files.length; i++) {
            formData.append("file", productInfo.file[i]);
        }
        const load = toast.loading("Please Wait...");

        axios.post(`${process.env.REACT_APP_SERVER_URL}/addProduct`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }).then((res) => {
                console.log(res);
                setProductInfo({
                    title: '',
                    file: null,
                    description: '',
                    price: null,
                    color: '',
                    category: 'Sneakers',
                    brand: '',
                    model: '',
                    idealFor: 'Male',
                    quantity: null
                });
                toast.success("Product Added Successfully");
            }).catch((error) => {
                console.log(error.message);
                toast.error("Internal Server Error");
            }).finally(() => {
                toast.dismiss(load);
            })
    }
    return (
        <div className='addProduct'>
            <h2 className='addProductHeading'>Admin Add new Product</h2>
            <form onSubmit={submitHandler} className='form-container'>
                <div>
                    <label htmlFor="title">Enter Title of Product</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder='Enter Title of Product'
                        onChange={changeHandler}
                        value={productInfo.title}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="file">Select Product Images</label>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={changeHandler}
                        required
                        multiple
                    />
                </div>
                <div>
                    <label htmlFor="description">Enter desctiption of Product </label>
                    <textarea
                        id="description"
                        rows="4"
                        cols="50"
                        name='description'
                        placeholder='Enter desctiption of Product'
                        onChange={changeHandler}
                        value={productInfo.description}
                        required
                    >
                    </textarea>
                </div>


                <div>
                    <label htmlFor="price">Enter Price </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        placeholder='Enter Price'
                        onChange={changeHandler}
                        value={productInfo.price}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="color">Enter Color </label>
                    <input
                        type="text"
                        name="color"
                        id="color"
                        placeholder='Enter Color'
                        onChange={changeHandler}
                        value={productInfo.color}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category">Slect Category</label>
                    <select name='category' id="category" onChange={changeHandler} value={productInfo.category} required>
                        <option value="Sneakers">Sneakers</option>
                        <option value="Sports">Sports</option>
                        <option value="Boots">Boots</option>
                        <option value="Formals">Formal Shoes</option>
                        <option value="Sandals">Sandals</option>
                        <option value="Casuals">Casual Shoes</option>
                        <option value="Flats">Flats</option>
                        <option value="FlipFlops">Flip Flops</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="brand">Enter Brand Name</label>
                    <input
                        type="text"
                        name="brand"
                        id="brand"
                        placeholder='Enter Brand Name'
                        onChange={changeHandler}
                        value={productInfo.brand}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="model">Enter Model </label>
                    <input
                        type="text"
                        name="model"
                        id="model"
                        placeholder='Enter Model'
                        onChange={changeHandler}
                        value={productInfo.model}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="idealFor">Select Ideal For</label>
                    <select name="idealFor" id="idealFor" onChange={changeHandler} value={productInfo.idealFor} required>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="quantity">Enter Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        placeholder='Enter quantity'
                        onChange={changeHandler}
                        value={productInfo.quantity}
                        required
                    />
                </div>
                <div className='submitbtncontainer'>
                    <button type="submit" className='addProductbtn'>Submit</button>
                </div>
            </form>

        </div>
    )
}

export default AddProduct;