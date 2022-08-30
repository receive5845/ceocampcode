const firebaseConfig = {
  apiKey: "AIzaSyDWbTtsJrXAx8NdcnXgdy2vgleN83BI0BM",
  authDomain: "codecamp-a5ebf.firebaseapp.com",
  databaseURL: "https://codecamp-a5ebf-default-rtdb.firebaseio.com",
  projectId: "codecamp-a5ebf",
  storageBucket: "codecamp-a5ebf.appspot.com",
  messagingSenderId: "436850077819",
  appId: "1:436850077819:web:2fb0c8403903a98265b2de",
  measurementId: "G-RZV786HWLM"
};
firebase.initializeApp(firebaseConfig);
database = firebase.database();


function sendMsg(){
    let date = new Date();
    let msg = $("#message").val();
    database.ref("msgs/"+date.getTime()).set(msg);
    $("#message").val("");
}

function loadMsgs(){
    database.ref("msgs").on("value", callback);
    function callback(snapshot){
        $("#chatlist").html("");
        console.log(snapshot);
        snapshot.forEach(function(child){
             $("#chatlist").append("<div>"+child.val()+"</div>");
        });
        $("#chatlist").scrollTop(15000);
    }
}
