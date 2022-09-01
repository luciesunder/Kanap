let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let cartDisplaySection = document.getElementById("cart__items");
let products = [];

//collect each product in localstorage
for (let i = 0; i < cart.length; i++){
    let id = cart[i].id;
    let color = cart[i].color;
    let quantity = cart[i].quantity;  

    //collect the product from the api with the corresponding ID
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

//create DOM elements for a product
function displayCart(singleProduct){
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
    checkQuantityUpdate(newItemInputQuantity, singleProduct, products);
}

//calculate and display the total price and total quantity
function getTotalPrice(){
    let totalPrice = 0;
    let totalQuantity = 0;
    let totalQuantityDisplay = document.getElementById("totalQuantity");
    let totalPriceDisplay = document.getElementById("totalPrice");

    for (let p = 0; p < products.length; p++) {
        totalPrice += products[p].price * products[p].quantity;
        totalQuantity += products[p].quantity;
    }

    totalPriceDisplay.innerText = totalPrice;
    totalQuantityDisplay.innerText = totalQuantity;
}

//listen if the button delete of a product in the cart is being clicked
function checkButtonDelete(buttonDelete, products, singleProduct, articleDiv){
    buttonDelete.addEventListener("click", function(){
        let productFindIndex = products.findIndex(cartSearch => cartSearch.id == singleProduct.id && cartSearch.color == singleProduct.color);

        products.splice(productFindIndex, 1); //remove elements in products array
        localStorage.setItem("cart", JSON.stringify(products)); //update localstorage
        getTotalPrice();
        cartDisplaySection.removeChild(articleDiv); //remove DOM element
    })   
}

//listen if the quantity is being changed and update the total price and quantity if so.
function checkQuantityUpdate(inputQuantity, singleProduct, products){
    inputQuantity.addEventListener("change", function(event){
        let newQuantity = event.target.value;
        if (newQuantity <= 0 || newQuantity > 100){
            alert ("Merci de sélectionner une quantité valide.");
            event.target.value = singleProduct.quantity;            
        }
        else{
            newQuantity = parseInt(event.target.value);
            //console.log(newQuantity);
            let productFindIndex = products.findIndex(cartSearch => cartSearch.id == singleProduct.id && cartSearch.color == singleProduct.color);
            products[productFindIndex].quantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(products));
            getTotalPrice();
        }
    })
}

//regex for the form
let formFirstName = /^[A-Za-zéè\s-]{2,}$/;
let formLastName = /^[A-Za-zéè\s-]{2,}$/;
let formAdress = /^[0-9A-Za-zéèà'\s-]+$/;
let formCity = /^[A-Za-zéèà'\s-]+$/;
let formEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userFirstName = document.getElementById("firstName");
const userLastName = document.getElementById("lastName");
const userAddress = document.getElementById("address");
const userCity = document.getElementById("city");
const userEmail = document.getElementById("email");

//check if the user input first name matches its regex
function checkingFirstName(){
    userFirstName.addEventListener("change", function(){
        let errorMessage = document.getElementById("firstNameErrorMsg");
        if (formFirstName.test(userFirstName.value)){
            errorMessage.innerText = "";
        }
        else{
            errorMessage.innerText = "Format incorrect";
        }
    });
}

//check if the user input last name matches its regex
function checkingLastName(){
    userLastName.addEventListener("change", function(){
        let errorMessage = document.getElementById("lastNameErrorMsg");
        if (formLastName.test(userLastName.value)){
            errorMessage.innerText = "";
        }
        else{
            errorMessage.innerText = "Format incorrect";
        }
    });
}

//check if the user input address matches its regex
function checkingAddress(){
    userAddress.addEventListener("change", function(){
        let errorMessage = document.getElementById("addressErrorMsg");
        if (formAdress.test(userAddress.value)){
            errorMessage.innerText = "";
        }
        else{
            errorMessage.innerText = "Format incorrect";
        }
    });
}

//check if the user input city matches its regex
function checkingCity(){
    userCity.addEventListener("change", function(){
        let errorMessage = document.getElementById("cityErrorMsg");
        if (formCity.test(userCity.value)){
            errorMessage.innerText = "";
        }
        else{
            errorMessage.innerText = "Format incorrect";
        }
    });
}

//check if the user input email matches its regex
function checkingEmail(){
    userEmail.addEventListener("change", function(){
        let errorMessage = document.getElementById("emailErrorMsg");
        if (formEmail.test(userEmail.value)){
            errorMessage.innerText = "";
        }
        else{
            errorMessage.innerText = "Format incorrect";
        }
    });
}

//call all the functions that check the input form
function checkingForm(){
    checkingFirstName();
    checkingLastName();
    checkingAddress();
    checkingCity();
    checkingEmail();
}

checkingForm();

//check if all the form inputs match their regex and if so create a contact object with the user info
function isFormValid(){
    let userContact = {firstName: userFirstName.value, lastName: userLastName.value, address: userAddress.value, city: userCity.value, email: userEmail.value};
    if (formFirstName.test(userFirstName.value) && formLastName.test(userLastName.value) 
        && formAdress.test(userAddress.value) && formCity.test(userCity.value) && formEmail.test(userEmail.value)){
        placeOrder(userContact);
    }
    else{
        alert("Erreur : Merci de corriger les champs incorrects.");
    }
}

//send the product and user info to the api
function placeOrder(contact){
    let productId = [];
    for (let i = 0; i < products.length; i++){
        productId.push(products[i].id);        
    }
    let userCommand = {contact: contact, products: productId};//create object with contact and product info
    fetch ("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(userCommand),
    })
    .then(function(response){
        return response.json();       
    })
    .then(function(command){
        window.location.href = "confirmation.html?orderId="+command.orderId; //collect the order id
    })
    .catch(function(error){
        console.error(error);
    })
}

//check if the form is valid when the user click the command button
const commandButton = document.getElementById("order");
commandButton.addEventListener("click", function(e){
    e.preventDefault();
    isFormValid();
});
