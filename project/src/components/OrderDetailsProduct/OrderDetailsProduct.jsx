

function OrderDetailsProduct({ image, title, price,oldQuantity, id,updateQuantity,deleteProductFromCart }) {
  const quantityAvailable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   
  return (
    <>
      <div className="order-details-product d-flex flex-row">
        <div className="order-details-product-img d-flex">
          <img src={image} />
        </div>
        <div className="order-details-product-data d-flex flex-column">
          <div>{title}</div>
          <div>{price}</div>
        </div>
        <div className="order-details-product-actions d-flex flex-column">
          <div className="order-details-product-quantity">
            <div className="fw-bold">Quantity</div>
            <div className="form-group">
              <select className="form-select" 
              onChange={(e)=>{
              
                
                  updateQuantity(id,Number(e.target.value))
                  
                
              }}
              >
                {quantityAvailable.map((id) => (
                  <option selected={oldQuantity == id} value={id} key={id} >
                    {id}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            className="order-details-product-remove btn btn-danger"
            onClick={()=>deleteProductFromCart(id)}
          >
            Remove
          </button>
        </div>
      </div>
      <hr />
    </>
  );
}

export default OrderDetailsProduct;
