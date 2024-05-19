import React, { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './Filters.css';
import { fetchProduct } from '../Utils/ProductUtils';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, clearFilter } from '../redux/filterSlice';

function Filters() {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter);
    const [myFilter, setMyFilter] = useState({
        priceMin: 0,
        priceMax: 10000,
        category: '',
        idealFor: ''
    });

    function sliderChangehandle(value) {
        setMyFilter((prev) => {
            return {
                ...prev,
                priceMin: value[0],
                priceMax: value[1]
            }
        })
    }
    function changeHandler(e) {
        if (e.target.name === 'priceMin' && e.target.value < 0) {
            e.target.value = 0;
        }
        if (e.target.name === 'priceMax' && e.target.value > 10000) {
            e.target.value = 10000;
        }
        setMyFilter((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    function clearFilterHandle() {
        setMyFilter({
            priceMin: 0,
            priceMax: 10000,
            category: '',
            idealFor: ''
        });
        dispatch(clearFilter());
        const genderRadioButtons = document.querySelectorAll('input[name="idealFor"]');
        genderRadioButtons.forEach(radioButton => {
            radioButton.checked = false;
        });
    }
    function filterSubmitHandler(e) {
        e.preventDefault();
        dispatch(setFilter(myFilter));
        fetchProduct(1, myFilter, dispatch);
    }
    return (
        <div className='filter-container'>
            <h3>Filters</h3>
            <form onSubmit={(e) => filterSubmitHandler(e)}>
                <div className="price-range">
                    <p>Price Range</p>
                    <label htmlFor="priceMin">Min</label>
                    <input
                        type="number"
                        name="priceMin"
                        id="priceMin"
                        value={myFilter.priceMin}
                        onChange={(e) => changeHandler(e)}
                    />
                    <label htmlFor="priceMax"> - Max</label>
                    <input
                        type="number"
                        name="priceMax"
                        id="priceMax"
                        value={myFilter.priceMax}
                        onChange={(e) => changeHandler(e)}
                    />

                    <RangeSlider
                        className='range-slider'
                        min={0}
                        max={10000}
                        onInput={(value) => sliderChangehandle(value)}
                        value={[myFilter.priceMin, myFilter.priceMax]}
                    />
                </div>
                <div className='filter-category'>
                    <label htmlFor="category">Select Category</label>
                    <select name='category' id="category" onChange={changeHandler} value={myFilter.category}>
                        <option value="">All</option>
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
                <p>Ideal For</p>
                <div className="filter-gender">
                    <div>
                        <input type="radio" name="idealFor" id="male" value="Male" onChange={changeHandler} />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div>
                        <input type="radio" name="idealFor" id="female" value="Female" onChange={changeHandler} />
                        <label htmlFor="female">Female</label>
                    </div>
                    <div>
                        <input type="radio" name="idealFor" id="both" value='' onChange={changeHandler} />
                        <label htmlFor="both">Both</label>
                    </div>
                </div>
                <div className='filter-btn-container'>
                    <button type="submit" className='cart-btn'>Apply Filter</button>
                    <button className='cart-btn clear-filterbtn' onClick={clearFilterHandle}>Clear Filter</button>
                </div>
            </form>
        </div>
    );
}

export default Filters;