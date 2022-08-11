const urlProduct =new URL(window.location.href); //collect the url
const idProduct = urlProduct.searchParams.get("id"); //collect the product ID in the url
//console.log(urlIdProduct);

let singleProduct= []; 


//collect only the product with the corresponding ID
fetch ("http://localhost:3000/api/products/" + idProduct)
    .then(function(response){
        return response.json()
    })
    .then(function(product){
        singleProduct = product;
        createSingleProduct(singleProduct);
    })
    .catch(function(error){
        console.error(error);
    })

//creating single product display
function createSingleProduct(item){
    //change the name of the page with the product name
    document.title = item.name;

    //add product image
    let singleProductImageDiv = document.getElementsByClassName("item__img");
    let singleProductImage = document.createElement("img");
    singleProductImage.setAttribute("src", item.imageUrl);
    singleProductImage.setAttribute("alt", item.altTxt);
    singleProductImageDiv[0].appendChild(singleProductImage);
    
    //add product name
    let singleProductTitle = document.getElementById("title");
    singleProductTitle.innerText = item.name;

    //add product price
    let singleProductPrice = document.getElementById("price");
    singleProductPrice.innerText = item.price;

    //add product description
    let singleProductDescription = document.getElementById("description");
    singleProductDescription.innerText = item.description;

    //add every color available
    //console.log(item.colors.length);
    let singleProductColor = document.getElementById("colors");
    for (let i = 0; i < item.colors.length; i++){
        let colorOption = document.createElement("option");
        colorOption.setAttribute("value", item.colors[i]);
        colorOption.innerText = item.colors[i];
        singleProductColor.appendChild(colorOption);
    }
}

//check if the "add to cart" button is being clicked
const cartButton = document.getElementById("addToCart");
cartButton.addEventListener("click", function(){
   
    let colorSelected = document.getElementById("colors").value;
    let quantitySelected = parseInt(document.getElementById("quantity").value);    
    
    //check if a color has been selected
    if (!colorSelected){
        alert ("Merci de sélectionner une couleur.");
    }
    //check if a valid quantity has been chosen
    else if (quantitySelected <= 0 || quantitySelected > 100 ){
        document.getElementById("quantity").value = 0; // ?
        alert ("Merci de sélectionner une quantité valide.");
    } 
    else{
        addProductToCart(idProduct, colorSelected, quantitySelected);
    }    
});

// function to add product into localStorage
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
function addProductToCart(id, color, quantity){
   
    let addToCart = {id, color, quantity};
    let productFindIndex = cart.findIndex(cartSearch => cartSearch.id == id && cartSearch.color == color);
    
    //check if the product is already in the cart
    if (productFindIndex != -1){
        cart[productFindIndex].quantity += quantity;        
    }
    else {
        cart.push(addToCart);        
    };
    //add to localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
    //console.log(cart);
}