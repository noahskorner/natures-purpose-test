//find all update cart buttons
var updateBtns = document.getElementsByClassName('update-cart')

//iterate through all btns 
for(var i = 0; i < updateBtns.length; i++){
    updateBtns[i].addEventListener('click', function(){
        var productId = this.dataset.product
        var action = this.dataset.action
        console.log('Product Id: ', productId, 'Action: ', action)

        console.log('User: ', user)
        if(user === 'AnonymousUser'){
            addCookieItem(productId, action)
        }
        else{
            updateUserOrder(productId, action)
        }
    })
}

//to convert cookies to cart items
function addCookieItem(productId, action){
    console.log("User is not authenticated")

    if(action == 'add'){
        if(cart[productId] == undefined){
            //not in cart yet -> need to create it
            cart[productId] = {'quantity':1}
        }else{
            cart[productId]['quantity'] += 1
        }
    }

    if(action == 'remove'){
        cart[productId]['quantity'] -= 1

        if(cart[productId]['quantity'] <= 0){
            //need to delete the product from the cart
            console.log('Remove item')
            delete cart[productId]
        }
    }

    //update the cookie
    console.log('Cart:', cart)
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
    location.reload()
}


function updateUserOrder(productId, action){
    console.log('user is logged in, sending data...')

    //send data to this url
    var url='/update_item/'
    //post data to url 
    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({'productId':productId, 'action':action})
    })

    //response
    .then((response) =>{
        return response.json()
    })
    
    .then((data) =>{
        console.log('data:', data)
        //reload the page
        location.reload()
    })
}

