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
            console.log('not logged in')
        }
        else{
            updateUserOrder(productId, action)
        }
    })
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