import React, { useEffect, useState } from 'react';
import Filters from '../Components/Filters';
import './AllProducts.css';
import { fetchProduct } from '../Utils/ProductUtils';
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../Components/ProductCard';
import noProductFound from '../Assets/No_Product_Found.png';
import { clearFilter } from '../redux/filterSlice';

function AllProducts() {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter)
    const { products, currentPage, hasNextPage, hasPreviosuPage } = useSelector(state => state.product);
    const [page, setPage] = useState(1);

    useEffect(() => {
        // console.log("all products filter: ",filter);
        dispatch(clearFilter());
        fetchProduct(page, filter, dispatch);
    }, [page])
    return (
        <div className='all-products'>
            <div className="filter-section">
                <Filters />
            </div>
            <div className="product-section">
                {products && products === undefined
                    ?
                    <p>Loading</p>
                    :
                    (products.length <= 0
                        ?
                        <div className='no-product-found'>
                            <img src={noProductFound} alt="No Product Found" />
                        </div>
                        :
                        products.map(product => {
                            return <ProductCard key={product._id} product={product} />
                        })
                    )
                }
            </div>
            <div className="pagination-container">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={!hasPreviosuPage}
                >
                    previous
                </button>
                <p>{currentPage}</p>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={!hasNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default AllProducts;