let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let cartDisplaySection = document.getElementById("cart__items");
let singleProduct = [];
let totalPrice = 0;
let totalQuantity = 0;

for (let i = 0; i < cart.length; i++){
    let id = cart[i].id;
    let color = cart[i].color;
    let quantity = cart[i].quantity;     

    fetch ("http://localhost:3000/api/products/" + id)
    .then(function(response){
        return response.json()
    })
    .then(function(product){
        const productInfo = {id: id, color: color, quantity: quantity, name: product.name, price: product.price, img: product.imageUrl, alt: product.altTxt};   
        singleProduct.push(productInfo);
        displayCart(singleProduct[i]);
        getTotalPrice(singleProduct[i]);        
    })
    .catch(function(error){
        console.error(error);
    })
}

function displayCart(products){
    //console.log(products.id);
    let newItemArticle = document.createElement("article");
    newItemArticle.classList.add("cart__item");
    newItemArticle.setAttribute("data-id", products.id);
    newItemArticle.setAttribute("data-color", products.color);
    cartDisplaySection.appendChild(newItemArticle);

    let newItemDivImg = document.createElement('div');
    newItemDivImg.classList.add("cart__item__img");
    newItemArticle.appendChild(newItemDivImg);

    let newItemImg = document.createElement('img');
    newItemImg.setAttribute("src", products.img);
    newItemImg.setAttribute("alt", products.alt);
    newItemDivImg.appendChild(newItemImg);

    let newItemDivContent = document.createElement('div');
    newItemDivContent.classList.add("cart__item__content");
    newItemArticle.appendChild(newItemDivContent);

    let newItemDivDescription = document.createElement("div");
    newItemDivDescription.classList.add("cart__item__content__description");
    newItemDivContent.appendChild(newItemDivDescription);

    let newItemHeading = document.createElement("h2");
    newItemHeading.innerText = products.name;
    newItemDivDescription.appendChild(newItemHeading);

    let newItemParagraphColor = document.createElement("p");
    newItemParagraphColor.innerHTML = products.color;
    newItemDivDescription.appendChild(newItemParagraphColor);

    let newItemParagraphPrice = document.createElement("p");
    newItemParagraphPrice.innerHTML = products.price + " €";
    newItemDivDescription.appendChild(newItemParagraphPrice);

    let newItemDivContentSetting = document.createElement('div');
    newItemDivContentSetting.classList.add("cart__item__content__settings");
    newItemDivContent.appendChild(newItemDivContentSetting);

    let newItemDivQuantity = document.createElement('div');
    newItemDivQuantity.classList.add("cart__item__content__settings__quantity");
    newItemDivContentSetting.appendChild(newItemDivQuantity);

    let newItemParagraphQuantity = document.createElement("p");
    newItemParagraphQuantity.innerText = "Qté : ";
    newItemDivQuantity.appendChild(newItemParagraphQuantity);

    let newItemInputQuantity = document.createElement("input");
    newItemInputQuantity.classList.add("itemQuantity");
    newItemInputQuantity.setAttribute("type", "number");
    newItemInputQuantity.setAttribute("name", "itemQuantity");
    newItemInputQuantity.setAttribute("min", "1");
    newItemInputQuantity.setAttribute("max", "100");
    newItemInputQuantity.setAttribute("value", products.quantity);
    newItemDivQuantity.appendChild(newItemInputQuantity);

    let newItemDivDelete = document.createElement("div");
    newItemDivDelete.classList.add("cart__item__content__settings__delete");
    newItemDivContentSetting.appendChild(newItemDivDelete);

    let newItemParagraphDelete = document.createElement("p");
    newItemParagraphDelete.classList.add("deleteItem");
    newItemParagraphDelete.innerText = "Supprimer";
    newItemDivDelete.appendChild(newItemParagraphDelete);

    checkButtonDelete(newItemParagraphDelete, products, newItemArticle);
}

function getTotalPrice(products){
    let totalQuantityDisplay = document.getElementById("totalQuantity");
    let totalPriceDisplay = document.getElementById("totalPrice");

    totalPrice += (products.price * products.quantity);
    totalQuantity += products.quantity;

    totalQuantityDisplay.innerText = totalQuantity;
    totalPriceDisplay.innerText = totalPrice
    //console.log(totalPrice + " - " + totalQuantity);    
}


function checkButtonDelete(buttonDelete, products, article){    
    buttonDelete.addEventListener("click", function(){
        //console.log(products.id + " - " + products.color + " - " + products.quantity);
        let productFindIndex = cart.findIndex(cartSearch => cartSearch.id == products.id && cartSearch.color == products.color);
        //console.log(productFindIndex);
        cart.splice(productFindIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        //console.log(cart);
        cartDisplaySection.removeChild(article);
        //location.reload();
    })
}


