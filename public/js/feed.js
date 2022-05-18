
(async () => {
    let user = await fetch("/user");
    user = await user.json();

    if (!user) return;

    const userNameEl = document.getElementById("username");
    const userProfileEl = document.getElementById("profile_pic");

    userNameEl.innerHTML = 'Hello! ' + user.name;
    userProfileEl.src = user.profile_pic;
})();