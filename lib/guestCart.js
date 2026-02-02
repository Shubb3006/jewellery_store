
export const GUEST_CART_KEY = "guest_cart";

export const getGuestCart=()=>{
    if (typeof window === "undefined") return [];
    const cart = localStorage.getItem(GUEST_CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

export const setGuestCart=async(cart)=>{
    if (typeof window === "undefined") return;
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
}

export const addToGuestCart = async(product, quantity = 1) => {
    if (!product || !product.isActive) {
        throw new Error("Sorry Product not available");
      }
    
      if (product.stock < quantity) {
        throw new Error("Insufficient stock");
      }
    const cart = await getGuestCart();
    console.log(product)

    const index = cart.findIndex(
      (item) => item.productId._id === product._id
    );
  
    if (index > -1) {
    if(cart[index].quantity < product.stock)
        cart[index].quantity += 1;
        else{
            throw new Error("Insufficient stock");
        }
    } else {
      cart.push({
        productId:product,
        quantity
      });
    }

    setGuestCart(cart);
    
};

export const removeFromGuestCart = async(productId) => {
    const cart = getGuestCart().filter(
      (item) => item.productId._id !== productId
    );
    setGuestCart(cart);
  };

export const clearGuestCart = () => {
  localStorage.removeItem(GUEST_CART_KEY);
};

export const updateGuestCartQuantity = async(product, action) => {
    const cart = getGuestCart();
  
    const index = cart.findIndex(
      (item) => item.productId._id === product._id
    );
  
    if (index === -1) {
      throw new Error("Product not in cart");
    }
  
    if (action === "inc") {
      if (cart[index].quantity >= product.stock) {
        throw new Error("No more stock available");
      }
      cart[index].quantity += 1;
    }
  
    if (action === "dec") {
      cart[index].quantity -= 1;
  
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
    }
  
    setGuestCart(cart);
  };

export const deleteItemGuestCart=(productId)=>{
    if(!productId)
        throw new Error("No Product")
    let cart = getGuestCart();
    console.log(cart)
    
    cart=cart.filter((item)=>item.productId.toString()!==productId)
    setGuestCart(cart);
}
  