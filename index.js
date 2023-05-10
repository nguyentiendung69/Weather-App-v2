const $$ = document.querySelector.bind(document);

const search = $$('.search');
const city = $$('.city');
const value = $$('.value');
const country = $$('.country');
const shortDesc = $$('.short-desc');
const visibility = $$('.visibility span');
const wind = $$('.wind span');
const sun = $$('.sun span');
const temperature = $$('.temperature span');
const time = $$('.time');
const content = $$('.content');
const imgweather = $$('#weather');
const imgBody = $$('body');
search.addEventListener("keypress",(e)=>{
    const capital = search.value.trim();
    if(e.code==='Enter')changeWeatherUI(capital);
})
async function changeWeatherUI(capital){
    try {
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=91f827737de3a965bef13f26a864b5b1&units=metric`
        const response = await fetch(apiURL);
         if(!response.ok){
            throw new Error("Network response was not oke");
        }
        const data = await response.json();
        console.log(data);

        content.classList.remove('hiden');
        city.innerText = data.name;
        country.innerText = data.sys.country;
        visibility.innerText = data.visibility + 'm';
        wind.innerText = data.wind.speed + 'm/s';
        sun.innerText = data.main.humidity + '%';
        shortDesc.innerText = data.weather[0].main;
        temperature.innerText = Math.round(data.main.temp) + '°C';
        time.innerText = new Date().toLocaleString(`${data.sys.country}`);
        if( Math.round(data.main.temp) < 18){
            imgweather.style.background = "url(https://images.pexels.com/photos/2086267/pexels-photo-2086267.jpeg?auto=compress&cs=tinysrgb&w=1600) no-repeat center/cover";
            imgBody.style.background = "linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.5)), url(https://images.pexels.com/photos/2086267/pexels-photo-2086267.jpeg?auto=compress&cs=tinysrgb&w=1600) no-repeat center/cover";
        }else if(Math.round(data.main.temp)<25){
            imgweather.style.background = "url(https://images.pexels.com/photos/4906295/pexels-photo-4906295.jpeg?auto=compress&cs=tinysrgb&w=1600) no-repeat center/cover";
            imgBody.style.background = "linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.5)), url(https://images.pexels.com/photos/4906295/pexels-photo-4906295.jpeg?auto=compress&cs=tinysrgb&w=1600) no-repeat center/cover";
        }else if(Math.round(data.main.temp)<30){
            imgweather.style.background = "url( https://images.pexels.com/photos/2310641/pexels-photo-2310641.jpeg?auto=compress&cs=tinysrgb&w=1600) no-repeat center/cover";
            imgBody.style.background = "linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.5)), url( https://images.pexels.com/photos/2310641/pexels-photo-2310641.jpeg?auto=compress&cs=tinysrgb&w=1600) no-repeat center/cover";
        }else{
            imgweather.style.background = "url( https://images.pexels.com/photos/954929/pexels-photo-954929.jpeg?auto=compress&cs=tinysrgb&w=1600) no-repeat center/cover";
            imgBody.style.background = "linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.5)), url( https://images.pexels.com/photos/954929/pexels-photo-954929.jpeg?auto=compress&cs=tinysrgb&w=1600) no-repeat center/cover";
        }
    } catch (error) {
        content.classList.add('hiden');
        imgweather.style.background = "url( https://images.pexels.com/photos/2085318/pexels-photo-2085318.jpeg?auto=compress&cs=tinysrgb&w=1600) no-repeat center/cover";
        imgBody.style.background = "linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.5)), url( https://images.pexels.com/photos/2085318/pexels-photo-2085318.jpeg?auto=compress&cs=tinysrgb&w=1600) no-repeat center/cover";
        const err = $$('.err h3');
        err.innerText='Vui lòng nhập lại tên thành phố !'
    }
}
