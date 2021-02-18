
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
        email: email
    });
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
        var username = (snapshot.val() && snapshot.val().username && snapshot.val().email) || 'Anonymous';
        console.log(username)

    });
}
function onAuth() {
    firebase.auth().onAuthStateChanged(user => {
        if (user == null) {
            window.location = 'login.html'
            return false
        } else {
            fetchSingleUser(user.uid)
            console.log(user.uid)
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