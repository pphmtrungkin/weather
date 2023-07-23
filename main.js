window.addEventListener('load', ()=> {
    const searchIcon = document.getElementById("search-icon");
    const searchInput = document.getElementById("search-input");
    const errorSection = document.getElementsByClassName("error-section")[0];
    
    const container = document.getElementsByClassName("container")[0];
    searchIcon.addEventListener('click', (e) =>{
        let URL = '';
        const API_KEY = "8aa2d41df4ac61c9f084c32fc19a6783";
        e.preventDefault;
        const searchValue = searchInput.value.toLowerCase();
        const searchResult = searchValue.split(", ");
        
        console.log(searchResult);

        if(searchResult.length==0){
            return;
        }
        if(searchResult.length==1){
            URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchResult[0]}&appid=${API_KEY}&units=metric`;
        } else if(searchResult.length==2){
            URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchResult[0]},${searchResult[1]}&appid=${API_KEY}&units=metric`;
        } else if(searchResult.length==3){
            URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchResult[0]},${searchResult[1]},${searchResult[2]}&appid=${API_KEY}&units=metric`
        }
        async function getData(){
            try {
                const response = await fetch(URL);
                const data = await response.json();
                if(response.ok){
                    displayWeatherData(data);
                } else {
                    displayError(data.message)
                }
            }
            catch(error) {
                displayError('An error occurred. Please try again.');
            }
        }
        const displayWeatherData= (data) => {
            errorSection.style.display="none";

            console.log(data);

            container.style.display = "block";
            
            const cityName = document.getElementById("city-name");
            const image = document.getElementById("weather-img");
            const condition = document.getElementById("condition");
            const temperature = document.getElementById("degree");
            const humidity = document.getElementById("humidity");
            const wind = document.getElementById("wind");
            
            cityName.innerText = data.name;
            
            condition.innerText = data.weather[0].description;
            switch(data.weather[0].main){
                case 'Clear':
                    image.src = './img/clear-sky.png';
                    break;
                    
                case 'Rain':
                    image.src = './img/rainy.png';
                    break;
                        
                case 'Snow':
                    image.src = './img/snow.png';
                    break;
                            
                case 'Clouds':
                    image.src = './img/cloudy-day.png';
                    break;
                                
                case 'Mist':
                    image.src = './img/fog.png';
                    break;
                    default: image.src = '';
            }
            temperature.innerHTML = `${parseInt(data.main.temp)}<span>&degC</span>`;
            humidity.innerHTML = `${data.main.humidity} %`;
            wind.innerHTML = `${parseInt(data.wind.speed)} km/h`;
        }

        getData();
        
        const displayError = (errorMessage) => {
            container.style.display="none";
            document.getElementById("message").innerText = errorMessage;
            errorSection.style.display="block";
        };
    })
    
})