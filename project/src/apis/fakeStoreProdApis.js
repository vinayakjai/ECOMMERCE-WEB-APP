//product related apis******
export function getAllCategories() {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/categories`;
}

export function getAllProducts() {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products`;
}

export function getAllProductsByCategory(category) {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/category/${category}`;
}

export function getProduct(id) {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/${id}`;
}


export function filterProduct(min,max,searchQuery){

    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/filter?min=${min}&max=${max}&q=${searchQuery}`;

}


//authentication apis*******
export function signup() {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/users`;
}

export function sigin() {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/auth/login`;
}

export function logoutUser(){
    return `${import.meta.env.VITE_FAKE_STORE_URL}/logout`;
}




//cart apis*****
export function getCartByUser(userId) {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/carts/${userId}`;
}

export function addProductToCart() {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/carts/product`;
} 

export function removeProductFromCart(userId,productId) {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/product?userId=${userId}&productId=${productId}`;
} 

export function RemoveAllProductFromUserCart(userId) {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/carts/products/${userId}`;
} 

export function createCartForUser(userId) {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/carts/${userId}`;
} 

export function deleteUserCart(userId) {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/carts/${userId}`;
} 

export function updateProductQuantity(userId,productId,updatedQuantity)
{
    return `${import.meta.env.VITE_FAKE_STORE_URL}/carts/quantity?userId=${userId}&productId=${productId}&quantity=${updatedQuantity}`
}

export function calculatepriceApi(productsInCart){
     return `${import.meta.env.VITE_FAKE_STORE_URL}/carts/totalAmount?products=${productsInCart}`;
}

