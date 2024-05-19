import React, { useState } from 'react'
import './Categories.css';
import SportsShoes from '../Assets/ShoesCategories/SportsShoes.png';
import Sneakers from '../Assets/ShoesCategories/Sneakers.png';
import Boots from '../Assets/ShoesCategories/Boots.png';
import CasualShoes from '../Assets/ShoesCategories/CasualShoes.png';
import Flats from '../Assets/ShoesCategories/Flats.jpg';
import FlipFlops from '../Assets/ShoesCategories/FlipFlops.jpg';
import FormalShoes from '../Assets/ShoesCategories/FormalShoes.png';
import SandalsImage from '../Assets/ShoesCategories/SandalsImage.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/filterSlice';

function Categories() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    function categoryHandler(item) {
        const myFilter = {
            priceMin: 0,
            priceMax: 10000,
            category: item.cate,
            idealFor: ''
        }
        dispatch(setFilter(myFilter));
        navigate('/products');
    }
    const [categories, setCategories] = useState([
        {
            cate: "Sports",
            image: SportsShoes
        },
        {
            cate: "Sandals",
            image: SandalsImage
        },
        {
            cate: "Formals",
            image: FormalShoes
        },
        {
            cate: "FlipFlops",
            image: FlipFlops
        },
        {
            cate: "Flats",
            image: Flats
        },
        {
            cate: "Casuals",
            image: CasualShoes
        },
        {
            cate: "Boots",
            image: Boots
        },
        {
            cate: "Sneakers",
            image: Sneakers
        }
    ]);


    return (
        <div className='category-container'>
            <h1>Browse Categories</h1>
            <div className='category-card-container'>
                {
                    categories.map((item, index) => {
                        return <div key={index} className='category-card' onClick={() => categoryHandler(item)}>
                            <img src={item.image} alt="Shoes" />
                            <p>{item.cate}</p>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default Categories;