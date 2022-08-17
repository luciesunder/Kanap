let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let cartDisplaySection = document.getElementById("cart__items");
let products = [];

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
        products.push(productInfo);
        displayCart(products[i]);
        getTotalPrice();       
    })
    .catch(function(error){
        console.error(error);
    })
}

function displayCart(singleProduct){
    //console.log(singleProduct.price);
    let newItemArticle = document.createElement("article");
    newItemArticle.classList.add("cart__item");
    newItemArticle.setAttribute("data-id", singleProduct.id);
    newItemArticle.setAttribute("data-color", singleProduct.color);
    cartDisplaySection.appendChild(newItemArticle);

    let newItemDivImg = document.createElement('div');
    newItemDivImg.classList.add("cart__item__img");
    newItemArticle.appendChild(newItemDivImg);

    let newItemImg = document.createElement('img');
    newItemImg.setAttribute("src", singleProduct.img);
    newItemImg.setAttribute("alt", singleProduct.alt);
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
    newItemParagraphColor.innerHTML = singleProduct.color;
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
    newItemInputQuantity.setAttribute("value", singleProduct.quantity);
    newItemDivQuantity.appendChild(newItemInputQuantity);

    let newItemDivDelete = document.createElement("div");
    newItemDivDelete.classList.add("cart__item__content__settings__delete");
    newItemDivContentSetting.appendChild(newItemDivDelete);

    let newItemParagraphDelete = document.createElement("p");
    newItemParagraphDelete.classList.add("deleteItem");
    newItemParagraphDelete.innerText = "Supprimer";
    newItemDivDelete.appendChild(newItemParagraphDelete);

    checkButtonDelete(newItemParagraphDelete, products, singleProduct, newItemArticle);
}

function getTotalPrice(){
    let totalPrice = 0;
    let totalQuantity = 0;
    let totalQuantityDisplay = document.getElementById("totalQuantity");
    let totalPriceDisplay = document.getElementById("totalPrice");

    for (let p = 0; p < products.length; p++) {
        //console.log(products[p]);
        totalPrice += products[p].price * products[p].quantity;
        totalQuantity += products[p].quantity;
    }

    totalPriceDisplay.innerText = totalPrice;
    totalQuantityDisplay.innerText = totalQuantity;
}

function checkButtonDelete(buttonDelete, products, singleProduct, articleDiv){
    buttonDelete.addEventListener("click", function(){
        let productFindIndex = products.findIndex(cartSearch => cartSearch.id == singleProduct.id && cartSearch.color == singleProduct.color);
        
        products.splice(productFindIndex, 1);
        localStorage.setItem("cart", JSON.stringify(products));
        getTotalPrice();
        cartDisplaySection.removeChild(articleDiv);
    })
    
}