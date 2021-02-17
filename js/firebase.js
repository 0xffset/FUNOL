
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
firebase.auth();


function SignUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            swal({
                title: "Good job!",
                text: "You has been signup successfully!",
                icon: "success",
                button: "Go to sigin!",
            })
                .then(() => { location.href = "login.html" })
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
        .then((res) => { console.log(res) })
        .catch(error => {
            swal({
                title: "Ooops!",
                text: error.message,
                icon: "error",
                dangerMode: true,
            })


        })
}