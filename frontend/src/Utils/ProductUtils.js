import axios from 'axios';
import { setProducts } from '../redux/productSlice';
import toast from 'react-hot-toast';


export const fetchProduct = (page, filter, dispatch) => {

    const queryParams = new URLSearchParams(filter);
    queryParams.append('page', page);
    const load = toast.loading("Please Wait...");
    axios.get(`${process.env.REACT_APP_SERVER_URL}/products?${queryParams.toString()}`,
        { withCredentials: true }
    ).then(res => {
        dispatch(setProducts(res.data));
        
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        toast.dismiss(load);
    })
}