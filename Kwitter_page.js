var firebaseConfig = {
    apiKey: "AIzaSyAzbu9l8K8E5Gkg5SWEWVad5roNPzd8hkY",
    authDomain: "kwitter-3223e.firebaseapp.com",
    databaseURL: "https://kwitter-3223e-default-rtdb.firebaseio.com",
    projectId: "kwitter-3223e",
    storageBucket: "kwitter-3223e.appspot.com",
    messagingSenderId: "687115565962",
    appId: "1:687115565962:web:3eb5bd86a108c8245c6673"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("username");
room_name = localStorage.getItem("roomName");

function send()
{
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name, 
            message:msg, 
            like:0
      });

      document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
      firebase_message_id = childKey;
      message_data = childData;
//Start code
   console.log(firebase_message_id);
     console.log("----------");
     console.log(message_data);

     name = message_data['name'];
     message = message_data['message'];
     like = message_data['like'];

     part1 = "<h4> "+name+"<img class='user_tick' src='tick.png'></h4>";
     part2 = "<h4 class='message_h4'>" + message + "</h4>";

     part3 = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
     part4 = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

     row = part1 + part2 + part3 + part4;
     document.getElementById("output").innerHTML += row;
//End code
   } });  }); }
getData();
function updateLike(message_id)
{
console.log("clicked on like button - " + message_id);
button_id = message_id;
likes = document.getElementById(button_id).value;
updated_likes = Number(likes) + 1;
console.log(updated_likes);

firebase.database().ref(room_name).child(message_id).update({
 like : updated_likes
});
}

function logout()
{
      localStorage.removeItem("username");
      localStorage.removeItem("roomName");
      window.location = "index.html";
}

