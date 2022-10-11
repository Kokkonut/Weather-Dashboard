let searchFormEl = document.querySelector('#search-form');
let searchBtn = document.querySelector('#search-btn')
let pastCitysEl = document.querySelector('#last-city')
let city = [];

function handleSearchFormSubmit(event){
    event.preventDefault();

    let searchInputVal = document.querySelector('#search-bar').value;
    city.push(searchInputVal)
    
                                            console.log(city);
    localStorage.setItem('city', JSON.stringify(city));

    pastCitys();
        return city;
};

function pastCitys() {
    let cityList =  JSON.parse(localStorage.getItem('city'));
                                            console.log(cityList);
                                            console.log(typeof cityList);
                                            console.log(Array.isArray(cityList));
            
    for (var i = 0; i < cityList.length; i++) {
                                            console.log(cityList[i]);
            var butt=document.createElement('button');
            butt.innerHTML=cityList[i];
            pastCitysEl.appendChild(butt);
    }
};


searchBtn.addEventListener('click', handleSearchFormSubmit);
pastCitys();

