/* Global Variables */

//Adding API key and url 
const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&appid=3734059046e3ec7ec64c53f70125cac5&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Retrieve weather data from API
const getWeatherData = async (weatherUrl,zip,key)=>{
    const result = await fetch(weatherUrl+zip+key);
    try {
      const data = await result.json();
      return data;
    }  catch(error) {
      console.log("ERROR!!", error);
    }
  }

//Configuring body of the post request
const postRouteData = async ( url = '', object = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    date: object.date,
    temp: object.temp,
    content: object.content
    }),       
});
    try {
    const returnData = await response.json();
    return returnData;
    }catch(error) {
    console.log("ERROR!!", error);
    }
};

//Function to listen on button clicks (event listeners)
document.getElementById('generate').addEventListener('click',()=>{
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeatherData(weatherUrl,zip,key)
    // Update the UI with the new data
    .then(function(weather){
      console.log(weather);
      // Add data to POST
      postRouteData('/add',{date:newDate,temp:weather.main.temp,content:feelings});
    }).then(function(){
      updateUI();
    });
  });

const updateUI = async () => {
    const req = await fetch('/all');
    try{
      const updated = await req.json();
      // updating the UI
      document.getElementById('date').innerHTML = updated.date;
      document.getElementById('temp').innerHTML = updated.temp;
      document.getElementById('content').innerHTML = updated.content;
    }catch(error){
      console.log("ERROR!!",error);
    }
  }
  