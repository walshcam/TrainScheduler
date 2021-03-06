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
    let destination = $("#destination").val().trim();
    let time = $("#firstTrainTime").val().trim();
    let frequency = $("#frequency").val().trim();

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
    $("#destination").val().trim("");
    $("#firstTrainTime").val().trim("");
    $("#frequency").val().trim("");
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
    let momentTime = moment(time).format("LT");
    console.log("momentTime: " + momentTime);


    // Get time until next train
    let timeInterval = moment().diff(moment(time, "m"),"minutes");
    let timeUntil = frequency - (timeInterval % frequency)
    console.log(timeInterval);
    console.log("timeUntil: " + timeUntil);

    //Get time from timeInterval
    let nextTrain = moment().add(timeUntil,"minutes")
    let prettyTime = moment(nextTrain).format("hh:mm A");
    console.log("prettyTime: " + prettyTime);

    // Append info to page
    let infoArray = [name,destination,prettyTime,timeUntil];

    let container = $(".outputContainer");
    let newUL = $("<ul>");

    for (let i = 0; i < infoArray.length; i++) {
        let newLI = $("<li>");
        newLI.text(infoArray[i]);
        newUL.append(newLI);
    }

    container.append(newUL);
});






// Properties need to be displayed on page