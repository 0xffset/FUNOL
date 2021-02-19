
var firebaseConfig = {
    apiKey: "AIzaSyBb7Cf7Bn67ALLnSX3s6rToQE2STWTSafk",
    authDomain: "funol-a2f7b.firebaseapp.com",
    databaseURL: "https://funol-a2f7b-default-rtdb.firebaseio.com",
    projectId: "funol-a2f7b",
    storageBucket: "funol-a2f7b.appspot.com",
    messagingSenderId: "1012156267731",
    appId: "1:1012156267731:web:9bb6a0eb939b77db31a826"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function writeUserData(userId, name, email) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        bottles: 0
    });
}

fetchAllContents();

function fetchAllContents() {
    var count = 0;
    var query = firebase.database().ref('users/');
    query.once("value")
        .then(function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
                 count++;
                var data = childSnapshot.val();
                $("#data-appened").append(`<tr>
      <th id="data-view"scope="row">${count}</th>
      <td id="data-view">${data.username}</td>
      <td id="data-view">${data.email}</td>
      <td id="data-view">${data.bottles}</td>
    </tr>`)
            })
        })
       
}

function addBottles(userId) {
    firebase.database().ref('users/' + userId).once('value').then((snapshot) => {
       var bottles = snapshot.val().bottles;
        // var username = (snapshot.val() && snapshot.val().username && snapshot.val().email) || 'Anonymous';
       firebase.database().ref('users/'+ userId).update({'bottles' : (bottles+1) })
       .then(res => {
        $("#data-appened > tr").remove();

        fetchAllContents()
        $.toast({
                heading: 'Enhorabuena!',
                text: 'Se ha agragado una botella correctamente',
                icon: 'success',
                loader: true,        // Change it to false to disable loader
                loaderBg: '#9EC600'  // To change the background
})
       })

    });
  
}

function getCurrentIdUser() {
    return firebase.auth().currentUser.uid
}

function logOut() {
    firebase.auth().signOut();
    window.location = 'login.html';
}
function fetchSingleUser(userId) {
    // var userId = firebase.auth().currentUser.uid;
     firebase.database().ref('users/' + userId).once('value').then((snapshot) => {
        var email = document.getElementById("username");
        var name = document.createTextNode(snapshot.val().username)
        email.appendChild(name)
        // var username = (snapshot.val() && snapshot.val().username && snapshot.val().email) || 'Anonymous';

    });
}
function onAuth() {
    firebase.auth().onAuthStateChanged(user => {
        if (user == null) {
            window.location = 'login.html'
            return false
        } else {

            fetchSingleUser(user.uid)
        }
    })
}

function goBack() {
     firebase.auth().onAuthStateChanged(user => {
        if (user == null) {
            return false
        } else {
            window.location = 'dashboard.html'
            fetchSingleUser(user.uid)
        }
    })
}

function SignUp(email, password, name) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            var code = firebase.auth().currentUser.uid;
            writeUserData(code, name, email);
            swal({
                title: "Good job!",
                text: "You has been signup successfully!",
                icon: "success",
                button: "Go to sigin!",
            })
                .then(() => {

                    location.href = "login.html"
                })
        })
        .catch(error => {
            swal({
                title: "Ooops!",
                text: error.message,
                icon: "error",
                dangerMode: true,
            })
        })

}

function SignIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => { location.href = "dashboard.html" })
        .catch(error => {
            swal({
                title: "Ooops!",
                text: error.message,
                icon: "error",
                dangerMode: true,
            })


        })
}