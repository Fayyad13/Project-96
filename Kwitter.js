function addUser()
{
    username = document.getElementById("username_ID").value;

    localStorage.setItem("username", username)

    window.location = "Kwitter_room.html"
}