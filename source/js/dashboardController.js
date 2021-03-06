// Defines the url variable for the server connection
var urlUsers = "http://localhost:8888/db/users.json";
var urlSeries = "http://localhost:8888/db/series.json";
var urlEvents = "http://localhost:8888/db/events.json";

// User functions
// Fetches the user json list using an XML Http request
function eventUserFetch()
{
  var usersRequest = new XMLHttpRequest();
  usersRequest.open('GET', urlUsers);
  usersRequest.onload = function()
  {
    var recievedData = JSON.parse(usersRequest.responseText);
    eventRotaDefine(recievedData);
  };
  usersRequest.send();
}

// Fetches the user json list using an XML Http request
function seriesUserFetch()
{
  var usersRequest = new XMLHttpRequest();
  usersRequest.open('GET', urlUsers);
  usersRequest.onload = function()
  {
    var recievedData = JSON.parse(usersRequest.responseText);
    seriesRotaDefine(recievedData);
  };
  usersRequest.send();
}


function eventRotaDefine(data) {

  // Grab the input elements
  var nameEvent = document.getElementById('eventRotaName').value;
  var reqBoatNo = document.getElementById('eventBoatNo').value;
  var mlBoatNo = document.getElementById('eventBoatNoML').value;
  var personnelPerBoat = document.getElementById('eventBoatPersonnelNo').value;
  var startDate = document.getElementById('eventDateStart').value;
  var eventLength = document.getElementById('eventDateLength').value;

  // Instantiate the event object
  var eventobj = {
    "EventName": nameEvent,
    "NumberOfBoats": reqBoatNo,
    "NumberOfMarklayers": mlBoatNo,
    "StartDate": startDate,
    "EventLength": eventLength,
    "MLBoatDriver": {},
    "MLBoatCrew": {},
    "RBoatDriver": {},
    "RBoatCrew": {}
  }

  // Set the boatFill equal to the reqBoatNo
  boatFill = reqBoatNo;

  console.log("Personnel per boat is set at: " + personnelPerBoat);

  // Sorts the drivers for the Marklayer Boats as well as the drivers for the Rescue Boats
  for (var i = 0; i < data.length; i++) {
    // Loops through all of the objects within the imported data file which is the users.json file
    if (data[i].qualifications.PBL2 && data[i].qualifications.ML && data[i].age >= 16 && boatFill > 0 && mlBoatNo > 0 && data[i].used != true) {
      // If a user has a PowerBoat Level 2 Qualification and a Marklayer Qualificaiton and the age is greater than or equal to 16 and
      //Boatfill is greater than 0 and the Marklayer Boat number is greater than 0 and they have not already been used, then the for loop runs
      for (var a = 0; a < personnelPerBoat; a++) {
        // Loops until it is equal to the number of people in a boat, therefore the for loop fills a boat
        var selector = 1;
        // Makes sure that this if statement only runs once
        if (selector = 1) {
          eventobj.MLBoatDriver[boatFill] = data[i].firstName + " " + data[i].lastName;
          // Sets the Marklayer Boat Driver property in the event object equal to the first and last name of the currently selected user
          data[i].used = true;
          // Sets the used property of the currently selected user to true so that they are not used again
          selector--;
        }
      }
      mlBoatNo--;
      boatFill--;
    } else if (data[i].qualifications.PBL2 && data[i].age >= 16 && data[i].qualifications.ML == false && reqBoatNo > mlBoatNo && boatFill > 0 && data[i].used != true) {
      // If a user has a Powerboard Level 2 Qualifcation and the Required Boat Number is greater than the Marklayer Boat Number
      // and boatFill is greater than 0 and the used property of the used is false then the for loop runs
      for (var a = 0; a < personnelPerBoat; a++) {
        // Loops until it is equal to the number of people in a boat, therefore the for loop fills a boat
        var selector = 1;
        // Makes sure that this if statement only runs once
        if (selector = 1) {
          eventobj.RBoatDriver[boatFill] = data[i].firstName + " " + data[i].lastName;
          // Sets the Rescue Boat Driver property in the event object equal to the first and last name of the currently selected user
          data[i].used = true;
          // Sets the used property of the currently selected user to true so that they are not used again
          selector--;
        }
      }
      boatFill--;
    }
  }

  // Grab the input elements again so that any changes made above
  var nameEvent = document.getElementById('eventRotaName').value;
  var reqBoatNo = document.getElementById('eventBoatNo').value;
  var mlBoatNo = document.getElementById('eventBoatNoML').value;
  var personnelPerBoat = document.getElementById('eventBoatPersonnelNo').value;
  var startDate = document.getElementById('eventDateStart').value;
  var eventLength = document.getElementById('eventDateLength').value;

  boatFill = reqBoatNo;

  // Sorts the Crew for both the Marklying Boat and the Rescue Boat
  for (var i = 0; i < data.length; i++)
  {
  // Loops through all of the objects within the imported data file which is the users.json file
    if (data[i].qualifications.PBL2 && boatFill > 0 && mlBoatNo > 0 && data[i].used != true)
    {
    // If a user has a PowerBoat Level 2 Qualification and Boatfill is greater than 0 and the Marklayer Boat number is greater than 0
    // and they have not already been used, then the for loop runs
      for (var a = 0; a < personnelPerBoat; a++)
      {
      // Loops until it is equal to the number of people in a boat, therefore the for loop fills a boat
        var selector = 1;
        // Makes sure that this if statement only runs once
        if (selector = 1)
        {
          eventobj.MLBoatCrew[boatFill] = data[i].firstName + " " + data[i].lastName;
          // Sets the Marklayer Boat Crew property in the event object equal to the first and last name of the currently selected user
          data[i].used = true;
          // Sets the used property of the currently selected user to true so that they are not used again
          selector--;
        }
      }
      mlBoatNo--;
      boatFill--;
    } else if (data[i].qualifications.PBL2 && reqBoatNo > mlBoatNo && boatFill > 0 && data[i].used != true)
    {
      // If a user has a Powerboard Level 2 Qualifcation and the Required Boat Number is greater than the Marklayer Boat Number
      // and boatFill is greater than 0 and the used property of the used is false then the for loop runs
      for (var a = 0; a < personnelPerBoat; a++)
      {
        // Loops until it is equal to the number of people in a boat, therefore the for loop fills a boat
        var selector = 1;
        // Makes sure that this if statement only runs once
        if (selector = 1)
        {
          eventobj.RBoatCrew[boatFill] = data[i].firstName + " " + data[i].lastName;
          // Sets the Rescue Boat Crew property in the event object equal to the first and last name of the currently selected user
          data[i].used = true;
          // Sets the used property
          selector--;
        }
      }
      boatFill--;
    }
  }
  console.log(eventobj);
  console.log(data);

}

function seriesRotaDefine(data) {

  // Grab the input elements
  var seriesName = document.getElementById('seriesType').value;
  var reqBoatNo = document.getElementById('seriesBoatNo').value;
  var personnelPerBoat = document.getElementById('seriesPersonnelNo').value;
  var startDate = document.getElementById('seriesStartDate').value;
  var endDate = document.getElementById('seriesEndDate').value;

  var eModal = document.getElementById('EventRotaModal');
  eModal.style.display = 'none';

  var seriesobj = {
    "Name": seriesName,
    "numberOfBoats": reqBoatNo,
    "startDate": startDate,
    "endDate": endDate,
    "races": [{},{},{},{},{},{},{},{},{}]
  }

  // console.log(seriesobj);

  console.log("Personnel per boat is set at: " + personnelPerBoat);

  var dateArray = [];

  function getCountOfDay(d1, d2, dayToSearch, count)
  {
    // Create two new date objects, a count, define a week with shorthand days and define the dayIndex
    // as the nurmeric index value of the selected day
    var dateObj1 = d1;
    var dateObj2 = d2;
    var count = 0;
    var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var dayIndex = week.indexOf(dayToSearch);

    while (dateObj1.getTime() <= dateObj2.getTime())
    {
      if (dateObj1.getDay() == dayIndex)
      {
        count++
        dateArray.push(dateObj1.toDateString());
      }
      dateObj1.setDate(dateObj1.getDate() + 1);
    }

    datesRequired = count;
    return datesRequired;
  }

  var d1 = new Date(startDate);
  var d2 = new Date(endDate);
  var dayToSearch = "Sun";

  getCountOfDay(d1, d2, dayToSearch);

  console.log("Date List: ");
  console.log(dateArray);

  console.log("Number of Sundays is: " + datesRequired);

  // Sorts the drivers for the Rescue Boats as well as the crew for the Rescue Boats
  for (var a = 0; a < datesRequired; a++)
  {
    // Loops round the number of times that datesRequired is equal to, which is the number of Sunday's in the date range
    boatFill = reqBoatNo;
    for (var i = 0; i < data.length; i++)
    {
      // Loops through all of the objects within the imported data file which is the users.json file
      if (data[i].qualifications.PBL2 && data[i].age >= 16 && boatFill > 0 && data[i].used != true)
      // If a user has a PowerBoat Level 2 Qualification and the age is greater than or equal to 16 Boatfill is greater than 0
      //and they have not already been used, then the for loop runs
      {
        for (var b = 0; b < personnelPerBoat; b++)
        {
          // Loops until it is equal to the number of people in a boat, therefore the for loop fills a boat
          seriesobj.races[a].date = dateArray.shift();
          // Pops the first item off the date array and sets it equal to the data property in the seriesobj
          seriesobj.races[a].RBoatDriver = data[i].firstName + " " + data[i].lastName;
          // Sets the First Name and Last Name of the currently selected object equal to the Rescue Boat Driver property of the selected
          // race array index in the series object
          data[i].used = true;
          // Sets the used property of the data object to true so that the person is not re-used later on
        }
        boatFill--;
      }
    }

    boatFill = reqBoatNo;

    for (var i = 0; i < data.length; i++)
    {
      // Loops through all of the objects within the imported data file which is the users.json file
      if (data[i].qualifications.PBL2 && boatFill > 0 && data[i].used != true)
      {
        // If the Powerboat Level 2 qualification is equal to true and the boatFill is greater than 0 and the used property is false then run the for loop
        for (var b = 0; b < personnelPerBoat; b++)
        {
          // Loops until it is equal to the number of people in a boat, therefore the for loop fills a boat
          // Debugging purposes
          console.log("This is run number: " + a);
          console.log(seriesobj);
          seriesobj.races[a].RBoatCrew = data[i].firstName + " " + data[i].lastName;
          // Sets the First Name and Last Name of the currently selected object equal to the Rescue Boat Driver property of the selected
          // race array index in the series object
          data[i].used = true;
          // Sets the used property of the data object to true so that the person is not re-used later on
        }
        boatFill--;
      }
    }
  }
  console.log(a);
  console.log(data);
  console.log(seriesobj);

}

function displaySeries(){
  seriesHeading = "<h2>" + + "</h2>";
  seriesBoat =
  cardcontent.insertAdjacentHTML('beforeend', userString);
}
