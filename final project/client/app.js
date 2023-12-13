function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // writing this if i recieve an Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

   var url = "http://127.0.0.1:5000/predict_home_price"; //Use this while i am NOT using nginx 
  //var url = "/api/predict_home_price"; // Use this while i am using nginx 
  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
  });
  $.post(url, {
    total_sqft: parseFloat(sqft.value),
    bhk: bhk,
    bath: bathrooms,
    location: location.value
  }, function(data, status) {
    console.log(data.estimated_price);

    if (data.estimated_price >= 0) {
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
    } else {
      estPrice.innerHTML = "<font color='red'><h2>Error: Please enter valid data.</h2></font>";
      document.querySelector('.img').classList.add('blurred');
    }

    console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  var url = "http://127.0.0.1:5000/get_location_names"; // Use this while i am are NOT using nginx 
  //var url = "/api/get_location_names"; //Use this while i am using nginx  
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });

  var uiSqftRange = document.getElementById("uiSqftRange");
  var uiSqft = document.getElementById("uiSqft");

  // Set initial value for the input text field
  uiSqft.value = uiSqftRange.value;

  // Update text field value when slider changes
  uiSqftRange.addEventListener("input", function() {
    uiSqft.value = uiSqftRange.value;
  });
  
  // Update slider value when text field changes
  uiSqft.addEventListener("input", function() {
    uiSqftRange.value = uiSqft.value;
  });
}

window.onload = onPageLoad;

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_home_price";
  
  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  }, function(data, status) {
      console.log(data.estimated_price);
      
      if (data.estimated_price >= 0) {
          estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      } else {
          estPrice.innerHTML = "<font color='red'><h2>Error: Please enter a valid data.</h2></font>";
      }
      
      console.log(status);
  });
}
