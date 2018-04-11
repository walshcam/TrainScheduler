  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAmiG9z0HqSfUE_VqLZYXtmu6MyncZAZ94",
    authDomain: "trainscheduler-cd762.firebaseapp.com",
    databaseURL: "https://trainscheduler-cd762.firebaseio.com",
    projectId: "trainscheduler-cd762",
    storageBucket: "",
    messagingSenderId: "731094045454"
  };
  firebase.initializeApp(config);

  //database variable

  let database = firebase.database();

// Input fields need to be pushed to server on button click

$("#findButton").on("click",function(event) {
    //prevents user from clicking button without any input fields?
    event.preventDefault();

    // Get user input
    let name = $("#name").val().trim();
    let destination = $("destination").val().trim();
    let time = $("firstTrainTime").val().trim();
    let frequency = $("frequency").val().trim();

    //Create object for holding train data

    let newTrain = {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    }

    //Upload employee data to database
    //set replaces data while push adds new data

    database.ref().push(newTrain);

    //log everything to the console

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    //Clear all text boxes for new info

    $("#name").val().trim("");
    $("destination").val().trim("");
    $("firstTrainTime").val().trim("");
    $("frequency").val().trim("");
});

// server needs to be pulled back to website 

database.ref().on("child_added", function(childSnapshot) {
    
    //show value to ensure database is working
    console.log(childSnapshot.val());

    let name = childSnapshot.val().name;
    let destination = childSnapshot.val().destination;
    let time = childSnapshot.val().time;
    let frequency = childSnapshot.val().frequency;

    //Show Info is correct
    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    // Moment.js calculations 

    let prettyTime = moment.unix(time).format("hh:mm");
    let frequencyMin = moment.unix(frequency).format("mm");
    console.log(prettyTime);
    console.log(frequencyMin);

    let timeInterval = moment(prettyTime).fromNow();
    console.log(timeInterval);
});

// Moment.js calculations 

// while (timeInterval > frequency) {
//     timeInterval = timeInterval + frequency;
// }

// Properties need to be displayed on page