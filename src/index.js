// write your code here
document.addEventListener("DOMContentLoaded", () => {

    const baseUrl = "http://localhost:3000/ramens"
    //grab element where images go
    const ramenMenu = document.getElementById("ramen-menu")
    
    //fetch ramen info from API
    function getRamen() {
        fetch(baseUrl)
            .then(r => r.json())
            .then(data => {
                renderAllRamen(data)
            })
    }

    //render info on page
    function renderOneRamen(ramenObj) {

        //create image element (must be in function)
        const image = document.createElement("img");
        image.src = ramenObj.image;

        //click on image to enlarge it
        image.addEventListener('click', () => {

            //find element in DOM and set info using API path
            document.querySelector('.detail-image').src = ramenObj.image;
            document.querySelector('.name').innerHTML = ramenObj.name;
            document.querySelector('.restaurant').innerHTML = ramenObj.restaurant;
            document.querySelector('#rating-display').innerHTML = ramenObj.rating;
            document.querySelector('#comment-display').innerHTML = ramenObj.comment;
        })

        //append the image in DOM
        ramenMenu.appendChild(image);
    

    }

    function renderAllRamen(ramenArray) {

        //iterate the array of ramen info
        ramenArray.forEach(ramenObj => {

            renderOneRamen(ramenObj)

        })    
    }

    getRamen()

    //grab form
    const form = document.getElementById('new-ramen');
    
    //grab user input and add to DOM
    form.addEventListener('submit', (e) => {
        
        e.preventDefault()
        
        const newObj = {}
        newObj.name = document.getElementById('new-name').value;
        newObj.restaurant = document.getElementById('new-restaurant').value;
        newObj.image = document.getElementById('new-image').value;
        newObj.rating = document.getElementById('new-rating').value;
        newObj.comment = document.getElementById('new-comment').value;

        //add user input to API
        fetch(baseUrl, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                "name": e.target.name.value,
                "restaurant": e.target.restaurant.value,
                "image": e.target.image.value,
                "rating": e.target.rating.value,
                "comment": e.target["new-comment"].value,
            })
        })
            .then(r => r.json())
            .then(renderOneRamen(newObj));
        
        form.reset();
    })





























})