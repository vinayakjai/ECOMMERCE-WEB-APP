import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

// CSS import
import './ProductList.css';

// Component import
import ProductBox from '../../components/ProductBox/ProductBox';
import FilterProducts from '../../components/FilterProducts/FilterProducts';

import { fetchAllProductsByCategory, fetchAllProductsCall } from '../../helpers/fetchProductsHelper';


function ProductList() {

    const [productList, setProductList] = useState(null);
    const [query] = useSearchParams();

    async function downloadProducts(productCategory) {
      
        if(productCategory){
            const allProductByCategory=fetchAllProductsByCategory(productCategory);
           
            allProductByCategory.then((response)=>{
                
                setProductList(response.data);
            }).catch(()=>{
              
                return alert('error occurred while fetching products')
            })
        }else{
           const allProducts=fetchAllProductsCall();
           allProducts.then((response)=>{
            setProductList(response.data);
           }).catch(()=>{
            return alert('error occurred while fetching products plz try again')
           })
        }
    }

    useEffect(() => {
       
        downloadProducts(query.get("category"));
       
    }, [query.get("category")])

    return (
        <div className='container'>
            <div className='row'>
                <h2 className='product-list-title text-center'>All Products</h2>
                <div className='product-list-wrapper d-flex flex-row'>


                <FilterProducts productList={productList} setProductList={setProductList}/>

                    {/* list of products */}
                    <div className='product-list-box' id='productList'>

                        {productList && productList.map(
                            (product) => <ProductBox 
                                            productId={product.id}
                                            key={product.id} 
                                            name={product.title}
                                            price={product.price}
                                            productImage={product.image}
                            />)}

                    </div>


                </div>
            </div>
        </div>
    )
}

export default ProductList;