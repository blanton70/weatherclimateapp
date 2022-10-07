//import {climateprec,climatetemp, monthextractor, process1} from './api.js';


function visualize(data) {
    janhitemp = document.getElementById('janhi')
    janhitemp.style.height = `${data[0][1]}px`
    janhitemp.style.width = '12px'
    janlotemp = document.getElementById('janlo')
    janlotemp.style.height = `${data[1][1]}px`
    janlotemp.style.width = '12px'

}

function visualizeforecast(data) {
    current = document.getElementById('current')
    current.innerHTML = ''

    //let annotate = document.createElement('div')
    //annotate.style.height = '120px'
    //annotate.style.width = '3px'
    //let annotations = document.createElement('span')
    //annotations.style.height = `1px`
    //annotations.style.width = '3px'
    //annotations.innerHTML = '0'
    //annotate.appendChild(annotations).className = 'annotate'
    //current.appendChild(annotate).className = 'gridRow'
    //let annotations2 = document.createElement('span')
    //annotations2.innerHTML = '50'

    //annotate.appendChild(annotations2).className = 'annotate2'

    //current.innerHTML = ''
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //let tomorrowd = days[today.getDay()+1]
    //console.log(days[new Date().getDay()+1])
    //day1 = document.getElementById('day1')
    //day1.innerHTML = days[new Date().getDay()+1]
    for (index=0; index < data.length; index++) {
        current = document.getElementById('current')
        let row = document.createElement('div')
        let span = document.createElement('span')
        let zeroline = document.createElement('span')
        row.style.height = `${data[index]+30}px`
        row.style.width = '3px'
        //row.style.borderStyle = 'solid'
        //row.style.borderTopColor = 'black'
        span.setAttribute('id',index)
        current.appendChild(row).className = 'gridRow'
        row.appendChild(span).className = 'span'
        row.appendChild(zeroline).className = 'zeroline'
        
        if ( (data[index-1] > data[index]  && data[index+1] >= data[index]) || (data[index-1]<data[index] && data[index+1]<=data[index])  ) {
            span.innerHTML = data[index]
            if (index > 0) {document.getElementById(index-1).innerHTML = ''}
            if (index > 1) {document.getElementById(index-2).innerHTML = ''}
            if (index > 2) {document.getElementById(index-3).innerHTML = ''}
            if (index > 3) {document.getElementById(index-4).innerHTML = ''}
            //if (index > 4) {document.getElementById(index-5).innerHTML = ''}
        }
        if (index % 24 === 0) {
            let daytext = document.createElement('span')
            row.appendChild(daytext).className = 'weekdays'
            //console.log(new Date().getDay() + (index/24))
            //if ((new Date().getDay() + (index/24)) < 7) {
                //new Date(new Date().setDate(new Date().getDate() + (index/24)-7)).toString().substring(0,11)
                daytext.innerHTML = new Date(new Date().setDate(new Date().getDate() + (index/24))).toString().substring(0,11)
            //}
            //else {
            //    daytext.innerHTML =new Date(new Date().setDate(new Date().getDate() + (index/24)-7)).toString().substring(0,11)
           // }


        }
        if (index === 0) {
            let annotations = document.createElement('span')
            annotations.innerHTML = '0'
            row.appendChild(annotations).className = 'annotate'
            let annotations2 = document.createElement('span')
            annotations2.innerHTML = '50'
            row.appendChild(annotations2).className = 'annotate2'
        }


}
}

function visualizeprecforecast(data) {
    precfore = document.getElementById('precfore')
    precfore.innerHTML = ''
    for (index=0; index < data.length; index++) {
        precfore = document.getElementById('precfore')
        let row = document.createElement('div')
        let span = document.createElement('span')
        row.style.height = `${data[index]*50}px`
        row.style.width = '3px'
        //row.style.borderStyle = 'solid'
        //row.style.borderTopColor = 'black'
        precfore.appendChild(row).className = 'gridRow'
        row.appendChild(span).className = 'span'
        //if ((data[index-1] > data[index]  && data[index+1] > data[index]) || (data[index-1]<data[index] && data[index+1]<data[index])) {
        //    span.innerHTML = data[index]
        //}


    max = data.slice().sort().reverse()[0]*10
    //console.log(max)
    if (max % 2 === 0){
        precfore.style.height = `${max*5}px`
    }
    else {
        precfore.style.height = `${(max+1)*5}px`
    }

    if (index === 0) {
        let annotations = document.createElement('span')
        annotations.innerHTML = '0'
        row.appendChild(annotations).className = 'annotateprec'
        let annotations2 = document.createElement('span')
        annotations2.innerHTML = '1'
        row.appendChild(annotations2).className = 'annotateprec2'
    }
    

}
}

function visualizecloudforecast(data) {
    cloudfore = document.getElementById('cloudfore')
    cloudfore.innerHTML = ''
    for (index=0; index < data.length; index++) {
        cloudfore = document.getElementById('cloudfore')
        let row = document.createElement('div')
        //let span = document.createElement('span')
        row.style.height = `${data[index]}px`
        row.style.width = '3px'
        //row.style.borderStyle = 'solid'
        //row.style.borderTopColor = 'black'
        cloudfore.appendChild(row).className = 'gridRow'
        //row.appendChild(span).className = 'span'
        //if ((data[index-1] > data[index]  && data[index+1] > data[index]) || (data[index-1]<data[index] && data[index+1]<data[index])) {
        //    span.innerHTML = data[index]
        //}


}
}




 function climatetemp(month,datearray,temparray) {
    let dateboolean = []
    month = String(month).padStart(2, '0'); // '0009'

    for (let index = 0; index < datearray.length; index++) {
        if (datearray[index].substring(5,7)=== month && datearray[index].substring(0,4) < 2001) {
            dateboolean[index] = true
        }
        else {
            dateboolean[index] = false
        }
        
    }
    let temps = []
    temps = temparray.filter((item, index) => dateboolean[index]);
    const average = temps.reduce((a,b) => a + b) / temps.length;
    return average.toFixed(2)
 }

 function climateprec(month,datearray,precarray) {
    let dateboolean = []
    month = String(month).padStart(2, '0'); // '0009'

    for (let index = 0; index < datearray.length; index++) {
        if (datearray[index].substring(5,7)=== month && datearray[index].substring(0,4) < 2001) {
            dateboolean[index] = true
        }
        else {
            dateboolean[index] = false
        }
        
    }
    let prec = []
    prec = precarray.filter((item, index) => dateboolean[index]);
    const sum = prec.reduce((partialSum, a) => partialSum + a, 0)/ 21;
    return sum. toFixed(2)

 }

 // Calculate the average of all the numbers
const calculateMean = (values) => {
    const mean = (values.reduce((sum, current) => sum + current)) / values.length;
    return mean;
};

// Calculate variance
const calculateVariance = (values) => {
    const average = calculateMean(values);
    const squareDiffs = values.map((value) => {
        const diff = value - average;
        return diff * diff;
    });
    const variance = calculateMean(squareDiffs);
    return variance;
};

// Calculate stand deviation
const calculateSD = (variance) => {
    return Math.sqrt(variance);
};

 function stddev(month,datearray, valuearray) {
    let dateboolean = []
    month = String(month).padStart(2, '0'); // '0009'
    
    for (let index = 0; index < datearray.length; index++) {
        if (datearray[index].substring(5,7)=== month) {
            dateboolean[index] = true
        }
        else {
            dateboolean[index] = false
        }}
    let values = []
    values = valuearray.filter((item, index) => dateboolean[index]);
    variation = calculateVariance(values)
    std = calculateSD(variation)
    return std.toFixed(2)


 }
 
 function meanabsdev(month, datearray, valuearray) {
    let dateboolean = []
    month = String(month).padStart(2, '0'); // '0009'
    
    for (let index = 0; index < datearray.length; index++) {
        if (datearray[index].substring(5,7)=== month) {
            dateboolean[index] = true
        }
        else {
            dateboolean[index] = false
        }}
    let values = []
    values = valuearray.filter((item, index) => dateboolean[index]);
    
    const average = values.reduce((a,b) => a + b) / values.length;
    let deviations = []
    for (let index = 0; index < values.length; index++) {
            deviations[index] = Math.abs(values[index] - average)
            
        }
    const deviationsum = deviations.reduce((partialSum, a) => partialSum + a, 0);
    meanabsdeviation = deviationsum/ deviations.length
    return meanabsdeviation.toFixed(2)
    }

 function monthextractor(monthsago, datearray,temparray)   {
    var date = new Date()
    date.setMonth(date.getMonth() - monthsago);
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    date = yyyy + '-' + mm;
    let dateboolean = []
    for (let index = 0; index < datearray.length; index++) {
        String(datearray[index])
        if (datearray[index].includes(date)) {
            dateboolean[index] = true
        }
        else {
            dateboolean[index] = false
        }}
    let temps = [] 
    temps = temparray.filter((item, index) => dateboolean[index]);
    const average = temps.reduce((a, b) => a + b) / temps.length;
    return average.toFixed(2)
        
    }

function monthextractorprec(monthsago, datearray,precarray)   {
        var date = new Date()
        date.setMonth(date.getMonth() - monthsago);
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        date = yyyy + '-' + mm;
        let dateboolean = []
        for (let index = 0; index < datearray.length; index++) {
            String(datearray[index])
            if (datearray[index].includes(date)) {
                dateboolean[index] = true
            }
            else {
                dateboolean[index] = false
            }}
        let prec = [] 
        prec = precarray.filter((item, index) => dateboolean[index]);
        const sum = prec.reduce((partialSum, a) => partialSum + a, 0);
        //sum[14] = sum.slice(1).reduce((a,b) => a + b)
        return sum//.toFixed(2)
            
        }


const img = document.querySelector('img')
let cat = 'clouds'
fetch(`https://api.giphy.com/v1/gifs/translate?api_key=bb2006d9d3454578be1a99cfad65913d&s=${cat}`, {mode: 'cors'})
  .then(function(response) {
    return response.json()
  })
  .then(function(response) {
    img.src = response.data.images.original.url
  })
  .catch(e => {
    console.log(e)
  })
function process1(city,country) {
//let city = 'saltillo'
//let country = 'mexico'

let coord = [0,0]
coord[0] = 1
  fetch(`https://nominatim.openstreetmap.org/search?q=${city},_${country}&format=json&polygon_geojson=1&addressdetails=1`, {mode: 'cors'}).then(function(response) {
    return response.json()
  })
  .then(function(reponse) {
    
    coord[0] = parseFloat(reponse[0].lat)
    coord[1] = parseFloat(reponse[0].lon)
    coord[2] = reponse[0].display_name
    
    return coord

  })
  .catch(e => {
    console.log(e)
  }).then(function(response) {
    city = city.trim()
    country = country.trim()
    country =  country.split(' ').map( w =>  w.substring(0,1).toUpperCase()+ w.substring(1)).join(' ')
    city =  city.split(' ').map( w =>  w.substring(0,1).toUpperCase()+ w.substring(1)).join(' ')

    city = city.replace(" ", "_");
    country = country.replace(' ', '_')
    //country = country[0].toUpperCase() + country.substring(1);
    //console.log(city)
    fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=parse&page=${city},_${country}&format=json&redirects`/*, {mode: 'cors'}*/).then(function(response) {
        return response.json()
    }).then(function(response) {
        let sunshine = response.parse.text['*']
        sunshine = sunshine.split('sunshine hours')
        sunshine = sunshine[1]
        sunshine = sunshine.substring(0,1000)
        sunshine = sunshine.replace(/,/g, '')
        sunshine = sunshine.match(/[+-]?\d+(\.\d+)?/g)
        console.log(sunshine)
        let sunshinehours = []
        for (let index = 0; index < sunshine.length; index++) {
            if (sunshine[index].includes('.')) {
                sunshinehours.push(sunshine[index])
            }
            
        }
        //console.log(sunshinehours)
    }).catch(e => {
        console.log(e)
    })
  
  }).then(function(response) {
    
  


  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coord[0]}&longitude=${coord[1]}&hourly=temperature_2m,precipitation,cloudcover&temperature_unit=fahrenheit&current_weather=true`,{mode:'cors'})
  .then(function(response){
    return response.json()
  })
  .then(function(response) {
    let temp = response.current_weather.temperature
    let elevation = response.elevation
    let tempforecast = response.hourly.temperature_2m
    let precforecast = response.hourly.precipitation
    let cloudforecast = response.hourly.cloudcover
    let forecastdata = []
    visualizeforecast(tempforecast)
    visualizeprecforecast(precforecast)
    visualizecloudforecast(cloudforecast)
    console.log('height in meters: ',elevation)
    console.log(temp)
    height = document.getElementById('height')
    height.innerHTML = `Height in meters: ${elevation}`
    currenttemp = document.getElementById('temp')
    currenttemp.innerHTML = `Current temperature: ${temp} F`
  })
  .catch(e => {
    console.log(e)
 })
  })
  .then(function(response) {
    let yearago = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    var dd = String(yearago.getDate()).padStart(2, '0');
    var mm = String(yearago.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = yearago.getFullYear();
    //yearago = yyyy + '-' + mm + '-' + dd;
    yearago = '1980' + '-' + '01' + '-' + '01'

    let today = new Date()
    dd = String(today.getDate()).padStart(2, '0');
    mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    fetch(`https://archive-api.open-meteo.com/v1/era5?latitude=${coord[0]}&longitude=${coord[1]}&start_date=${yearago}&end_date=${today}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=America%2FChicago&temperature_unit=fahrenheit&precipitation_unit=inch`,{mode:'cors'})
    .then(function(response){
        return response.json()
    })
    .then(function(response){
        let temp =response.daily.temperature_2m_max
        let month = []
        month[12] =monthextractor(12,response.daily.time, temp)
        month[11] =monthextractor(11,response.daily.time, temp)
        month[10] =monthextractor(10,response.daily.time, temp)
        month[9] =monthextractor(9,response.daily.time, temp)
        month[8] =monthextractor(8,response.daily.time, temp)
        month[7] =monthextractor(7,response.daily.time, temp)
        month[6] =monthextractor(6,response.daily.time, temp)
        month[5] =monthextractor(5,response.daily.time, temp)
        month[4] =monthextractor(4,response.daily.time, temp)
        month[3] =monthextractor(3,response.daily.time, temp)
        month[2] =monthextractor(2,response.daily.time, temp)
        month[1] =monthextractor(1,response.daily.time, temp)
        month[0] =monthextractor(0,response.daily.time, temp)
        let tempmin = response.daily.temperature_2m_min
        let monthmin = []
        for (let index = 0; index < 13; index++) {
            monthmin[index] = monthextractor(index, response.daily.time, tempmin)
            
        }
        let prec = []
        let precdata= response.daily.precipitation_sum
        for (let index = 0; index < 13; index++) {
            prec[index] = monthextractorprec(index,response.daily.time,precdata)
            
        }
        prec[13] = prec.slice(1).reduce((partialSum, a) => partialSum + a, 0)
        let tempvolatility = []
        let hitempvoldata = response.daily.temperature_2m_max 
        for (let index = 1; index < 13; index++) {
            
            tempvolatility[index] = meanabsdev(index,response.daily.time,hitempvoldata)
            
        }
        let lotempvolatility = []
        let lotempvoldata = response.daily.temperature_2m_min 
        for (let index = 1; index < 13; index++) {
            
            lotempvolatility[index] = meanabsdev(index,response.daily.time,lotempvoldata)
            
        }

        hitempstddev = []
        let hitempstddevdata = response.daily.temperature_2m_max
        for (let index = 1; index < 13; index++) {
            hitempstddev[index] = stddev(index,response.daily.time,hitempstddevdata)
            
        }
        lotempstddev = []
        let lotempstddevdata = response.daily.temperature_2m_min
        for (let index = 1; index < 13; index++) {
            lotempstddev[index] = stddev(index,response.daily.time,lotempstddevdata)
            
        }
        hiratio = []
        for (let index = 1; index < 13; index++) {
            hiratio[index] = (tempvolatility[index]/hitempstddev[index]).toFixed(2)
            
        }
        loratio = []
        for (let index = 1; index < 13; index++) {
            loratio[index] = (lotempvolatility[index]/lotempstddev[index]).toFixed(2)
        }
        let hi1980climate = []
        for (let index = 1; index < 13; index++) {
            hi1980climate[index] = climatetemp(index,response.daily.time,temp)
            
        }
        let lo1980climate = []
        for (let index = 1; index < 13; index++) {
            lo1980climate[index] = climatetemp(index,response.daily.time,tempmin)
            
        }
        let prec1980climate = []
        for (let index = 1; index < 13; index++) {
            prec1980climate[index] = climateprec(index,response.daily.time,precdata)
            
        }
        let precmad = []
        for (let index = 1; index < 13; index++) {
            precmad[index] = meanabsdev(index, response.daily.time,precdata);
            
        }
        let precstd = []
        for (let index = 1; index < 13; index++) {
            precstd[index] = stddev(index, response.daily.time,precdata);
            
        }
        let precratio = []
        for (let index = 1; index < 13; index++) {
            precratio[index] = (precmad[index]/precstd[index]).toFixed(2)
            
            
        }

        //console.log('jan high:',climatetemp(01,response.daily.tim, temp))
        //console.log('july high: ', climatetemp(07,response.daily.time, temp))
        console.log('monthlyaverages:',month)//,month2,month3,month4,month5,month6,month7,month8,month9, month10,month11,month12,month0)
        console.log('monthlylows:',monthmin)
        console.log('precipitation: ',prec)
        //console.log('madhi: ', tempvolatility)
        //console.log('madlo:', lotempvolatility)
        //console.log('hitempstddev:', hitempstddev)
        console.log('lotempstddev:', lotempstddev)
        //console.log('hiratio:', hiratio)
        //console.log('loratio:', loratio)
        //console.log('1980-2000Prec mad /std ration:', precratio)
        console.log('1980-2000 avg hi:', hi1980climate)
        console.log('1980-2000 avg lo:', lo1980climate)
        console.log('1980-2000 prec avg:', prec1980climate)
        console.log(coord[2])
        locale = document.getElementById('location')
        locale.innerHTML = coord[2]
        let data = []
        data[0] = month
        data[1] = monthmin
        data[2] = hi1980climate
        data[3] = lo1980climate

        //visualize(data)
        return data
        
        })
//console.log(data)
}) 
}

citylocation = document.querySelector('input')
button = document.querySelector('button')
button.addEventListener('click', function(e) {
    e.preventDefault()
    citylocation = document.querySelector('input')
    var array = citylocation.value.split(',');
    process1(array[0],array[1])
    console.log(citylocation.value)
    //janclmhi = document.getElementById('jan')
    //console.log('data',data)
    //janclmhi.style.height = `${data[0][1]}px`
    //janclmhi.style.width = '25px'


})

//var array = user.split(',');

  
regex = /\d\,*\d*(\.\d{0,4})?(?=(\\n))/g