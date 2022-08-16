let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let singleProduct = [];
let cartDisplaySection = document.getElementById("cart__items");
let totalPrice = 0;
let totalQuantity = 0;

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
        displayCart(id, color, quantity); 
        getTotalPrice(quantity);    
        
    })
    .catch(function(error){
        console.error(error);
    })
}


function displayCart(id, color, quantity){
    //console.log(id, color, quantity, singleProduct.name, singleProduct.price);
    let newItemArticle = document.createElement("article");
    newItemArticle.classList.add("cart__item");
    newItemArticle.setAttribute("data-id", id);
    newItemArticle.setAttribute("data-color", color);
    cartDisplaySection.appendChild(newItemArticle);

    let newItemDivImg = document.createElement('div');
    newItemDivImg.classList.add("cart__item__img");
    newItemArticle.appendChild(newItemDivImg);

    let newItemImg = document.createElement('img');
    newItemImg.setAttribute("src", singleProduct.imageUrl);
    newItemImg.setAttribute("alt", singleProduct.altTxt);
    newItemDivImg.appendChild(newItemImg);

    let newItemDivContent = document.createElement('div');
    newItemDivContent.classList.add("cart__item__content");
    newItemArticle.appendChild(newItemDivContent);

    let newItemDivDescription = document.createElement("div");
    newItemDivDescription.classList.add("cart__item__content__description");
    newItemDivContent.appendChild(newItemDivDescription);

    let newItemHeading = document.createElement("h2");
    newItemHeading.innerText = singleProduct.name;
    newItemDivDescription.appendChild(newItemHeading);

    let newItemParagraphColor = document.createElement("p");
    newItemParagraphColor.innerHTML = color;
    newItemDivDescription.appendChild(newItemParagraphColor);

    let newItemParagraphPrice = document.createElement("p");
    newItemParagraphPrice.innerHTML = singleProduct.price + " €";
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
    newItemInputQuantity.setAttribute("value", quantity);
    newItemDivQuantity.appendChild(newItemInputQuantity);

    let newItemDivDelete = document.createElement("div");
    newItemDivDelete.classList.add("cart__item__content__settings__delete");
    newItemDivContentSetting.appendChild(newItemDivDelete);

    let newItemParagraphDelete = document.createElement("p");
    newItemParagraphDelete.classList.add("deleteItem");
    newItemParagraphDelete.innerText = "Supprimer";
    newItemDivDelete.appendChild(newItemParagraphDelete);

}


function getTotalPrice(quantity){
    let totalQuantityDisplay = document.getElementById("totalQuantity");
    let totalPriceDisplay = document.getElementById("totalPrice");

    totalPrice += (singleProduct.price * quantity);
    totalQuantity += quantity;

    totalQuantityDisplay.innerText = totalQuantity;
    totalPriceDisplay.innerText = totalPrice
    //console.log(totalPrice + " - " + totalQuantity);


}


