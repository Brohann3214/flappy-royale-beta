var instance;
var firebaseConfig = {}

var apiKey = (value) => {

  firebaseConfig.apiKey = value
}

var authDomain = (value) => {

  firebaseConfig.authDomain = value
}

var databaseURL = (value) => {

  firebaseConfig.databaseURL = value
}

var projectId = (value) => {
  
  firebaseConfig.projectId = value
  authDomain(value+".firebaseapp.com")
  databaseURL(value+".firebaseio.com")
}

var start = (_apiKey, _projectId) => {

  apiKey(_apiKey)
  projectId(_projectId)

  firebase.initializeApp(firebaseConfig);

  instance = new Firebase()
 
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;

      //console.log( uid )
      //console.log( "user logged" )
     
      // ...
    } else {
      // User is signed out.
      // ...
    }
    // ...
  }); 

}
 
var update = (attr, value, data) => { 

  if( attr.includes("/") ){

      attr = attr.split("/")

      data = {
        [attr[attr.length-1]] : value
      }

      attr.pop()
      attr = attr.join("/")

  }else data = value   

  var database = firebase.database().ref(attr)
  const update = database.update(data)
}

var createGameAttribute = ( URL ) => {   

  var ref = firebase.database().ref(URL);

  ref.on('value', function(snapshot) {

    instance.constructor.set(URL, snapshot.val())
  })          
}
 