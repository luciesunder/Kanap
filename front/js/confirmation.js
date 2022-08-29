const urlOrder =new URL(window.location.href); //collect the url
const idOrder = urlOrder.searchParams.get("orderId"); //collect the order ID in the url
const orderNumber = document.getElementById("orderId");
orderNumber.innerText = idOrder; //display the order number
localStorage.clear(); //clear localstorage