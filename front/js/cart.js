let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let singleProduct = [];
let cartDisplaySection = document.getElementById("cart__items");


for (let i = 0; i < cart.length; i++){
    let id = cart[i].id;
    let color = cart[i].color;
    let quantity = cart[i].quantity;
    //console.log (id + " - " + color + " - " + quantity);
    searchProductInfo(id, color, quantity);
}


function searchProductInfo(id, color, quantity){
    fetch ("http://localhost:3000/api/products/" + id)
    .then(function(response){
        return response.json()
    })
    .then(function(product){
        singleProduct = product;   
             
        
    })
    .catch(function(error){
        console.error(error);
    })
}



