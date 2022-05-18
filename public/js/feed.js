
(async () => {
    let user = await fetch("/user");
    user = await user.json();

    if (!user) return;

    const userNameEl = document.getElementById("username");
    const userProfileEl = document.getElementById("profile_pic");

    userNameEl.innerHTML = 'Hello! ' + user.name;
    userProfileEl.src = user.profile_pic;


    let posts = await fetch('/post');
    posts = await posts.json();

    posts.forEach(post => {
        addPost(post);
    });
})();


function addPost(post) {

    console.log(post);

    let postEl = document.createElement('div');
    postEl.className = 'post';

    postEl.innerHTML = `
    <img src="${post.image}" alt="" srcset="">
    <div class="info">
        <div class="key">Species</div>
        <div class="value">${post.animal}</div>
    </div>
    <div class="info">
        <div class="key">Breed</div>
        <div class="value">${post.breed}</div>
    </div>
    <div class="info">
        <div class="key">Age</div>
        <div class="value">${post.age}</div>
    </div>
    <div class="info">
        <div class="key">Detail</div>
        <div class="value">${post.specification}</div>
    </div>
    <div class="info">
        <div class="key">Address</div>
        <div class="value">${post.address}</div>
    </div>
    <div class="info">
        <div class="key">Contact</div>
        <div class="value">${post.email}</div>
    </div>`;

    document.getElementById('post-container').append(postEl);
}

const filterForm = document.getElementById('filter-form');
filterForm.addEventListener('submit', async (event) => {
    
    event.preventDefault();
    document.getElementById("post-container").innerHTML = "";

    let url = new URLSearchParams();


    let animal = document.getElementById('animal').value;
    let breed = document.getElementById('breed').value;
    let age = document.getElementById('age').value;
    let address = document.getElementById('address').value;

    
    if (animal !== '') url.set('animal', animal);
    if (breed !== '') url.set('breed', breed);
    if (age !== '') url.set('age', age);
    if (address !== '') url.set('address', address);

    let posts = await fetch('/post?' + url.toString());
    console.log(posts);
    posts = await posts.json();

    posts.forEach(post => {
        addPost(post);
    });
});



