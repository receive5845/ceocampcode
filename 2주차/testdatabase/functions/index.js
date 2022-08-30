const functions = require("firebase-functions");
let admin = require("firebase-admin");
const cors = require("cors")({origin:true});

let serviceAccount = require("./test-database5845-firebase-adminsdk-zv3u0-29306eef84.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-database5845-default-rtdb.firebaseio.com"
});

let db = admin.database();

exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, ()=>{

    db.ref("msgs").on("value",(snapshot)=>{

      response.send(snapshot.val());

    });
  })
});

exports.ceocamp = functions.https.onRequest((request, response) => {
  let byul = {
    name : "김수신",
    age : 33,
    height : 174
  }
  response.send(byul);
});

exports.login = functions.https.onRequest((request, response) => {
  cors(request, response, ()=>{

    if(!request.body.id){
      response.send({"result":"정상적인 접근이 아닙니다."})

    }

    let id = request.body.id;
    let pwd = request.body.pwd;
    db.ref("members/"+id).on("value",(snapshot)=>{
      if(snapshot.val()){
        if(snapshot.val() == pwd){
          response.send({"result_code":1, "result:":"로그인 되었습니다."})
        }else{
          response.send({"result_code":2, "result:":"비밀번호가 일치하지 않습니다."})
        }
      }else{
        response.send({"result_code":3, "result:":"가입되지 않은 회원입니다."})
      }
    });
  });
});

exports.join = functions.https.onRequest((request, response) => {
  cors(request, response, ()=>{
    let id = request.body.id;
    let pwd = request.body.pwd;
    db.ref("members/"+id).set(pwd);
  });
});
