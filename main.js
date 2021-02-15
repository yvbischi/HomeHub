//data will be outsourced
const quotes = [ "Money won't leave you on delievered for 8 hours.", "Money won't lie to you.", "Love may not be worth jackshit tomorrow, a 100$ will be still worth a 100$." ];
//personal API key
var key = "HEREISYOURPERSONALOPENWEATHERMAPAPIKEY";
//id of the city you want the weather for
var cityid = 123456;
//3 hours
var secondcounter = 10800;
//your username on github
var username = "GITHUBUSER";
//we get the Weather on load of the page
window.onload = function(){
	//get the weather for hünenberg
	getWeather(cityid);
	//get CurrentQuote
	getQuote();
	//getTimeInfo
	getTime();
	//refresh
	refreshInfo();
};
function refreshInfo(){
	//refreshtime
	var curTime = new Date().toLocaleTimeString();
	document.getElementById("curTime").innerHTML = curTime;
	secondcounter--;
	if(secondcounter !=0){
		//every second update time
		setTimeout(refreshInfo, 1000); 
	}else{
		//all three hours (10800 seconds) update weather and quote
		secondcounter = 10800;
		getWeather(cityid);
		getQuote();
		setTimeout(refreshInfo, 1000); 
	}
	
}
function getQuote(){
	var quoteAccess = "https://raw.githubusercontent.com/"+username+"/HomeHub/main/quotes.json";
	fetch(quoteAccess)
	.then(response => response.json())
	.then(function(data){
	var randomNumber = Math.floor(Math.random() * data.length);
	document.getElementById("todayQuote").innerHTML = data[randomNumber];  
  });
}
//getTime
function getTime(){
	var curTime = new Date().toLocaleTimeString();
	document.getElementById("curTime").innerHTML = curTime;
}
//fetch the weather
function getWeather( city_id ) {
	//fetch the data
	fetch('https://api.openweathermap.org/data/2.5/weather?id=' + city_id+ '&appid=' + key+'&units=metric')
	//work with Promise	
	//convert to json
	.then(function(prom){return prom.json()})
	.then(function(data) {
		//work with data
		extractWeather(data);
	})
	//in case of error
	.catch(function() {
	});
}

//extract the needed data
function extractWeather(data){
	var tempCels = Math.round(parseFloat(data.main.temp));
	var feelsCels = Math.round(parseFloat(data.main.feels_like));
	var description = data.weather[0].description;
	var icon = data.weather[0].icon;
	changeHTML(tempCels, feelsCels, description, icon);
}

//change the needed html parts
function changeHTML(temp, feels, description, icon){
	//suffix of the temperature information
	var suffix = "&#176;C";
	//change the temperature info
	document.getElementById('temp').innerHTML = temp + suffix;
	//change the temperature feels like
	document.getElementById('feelsTemp').innerHTML = temp+suffix;
	//change html description
	document.getElementById("description").innerHTML = description;
	//get the picture
		//prefix of picture url
		var pictureprefix = "http://openweathermap.org/img/wn/";
		//suffix of picture url
		var picturesuffix = "@2x.png";
		//get corresponding picture picture
		var fullurl = pictureprefix + icon + picturesuffix;
		document.getElementById("currentWeatherPic").src = fullurl;
	
}

//Helper function gets n-th digit from the right
function getDigit(number, n){
	return Math.floor(number/(Math.pow(10,n-1)))%10;
}u
