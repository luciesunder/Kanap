
let productList = [];

//fetch products from API
fetch ("http://localhost:3000/api/products")
    .then(function(response){
        return response.json()
    })
    .then(function(products){
        productList = products;
        createProductDisplay(productList);
        //console.log(productList);
    })
    .catch(function(error){
        console.error(error);
    })

//creating products display
function createProductDisplay(item){
    let productDisplaySection = document.getElementById("items"); //select section where products will display
    //console.log(item.length);
    for (let i = 0; i < item.length; i++){
        
        let newAnchor = document.createElement("a");
        newAnchor.setAttribute("href", "./product.html?id=" + item[i]._id);
        productDisplaySection.appendChild(newAnchor);

        let newArticle = document.createElement("article");
        newAnchor.appendChild(newArticle);

        let newImg = document.createElement("img");
        newImg.setAttribute("src", item[i].imageUrl);
        newImg.setAttribute("alt", item[i].altTxt);
        newArticle.appendChild(newImg);

        let newHeading = document.createElement("h3");
        newHeading.classList.add("productName");
        newHeading.innerText = item[i].name;
        newArticle.appendChild(newHeading);

        let newParagraph = document.createElement("p");
        newParagraph.classList.add("productDescription");
        newParagraph.textContent = item[i].description;
        newArticle.appendChild(newParagraph);
        /* console.log(item[i].imageUrl + " | " + item[i].altTxt);
        console.log(item[i].name + " | " + item[i].description); */
    }
}