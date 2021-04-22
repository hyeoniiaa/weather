$(document).ready(function(){
    //var city = "Seoul"; //선택한 버튼의 날씨를 알려주기 위한 도시명을 넣을 초기변수로 구성한다.
    var city = [];
    //city.push("Seoul");
    console.log(city);
    /*
    선택한 도시명을 배열데이터에 넣어준다.
    배열변수명.push("b") : ["a"]->["a", "b"]; !!마지막인덱스에 새로운 데이터인 "b"를 넣겠다는 의미
    shift() : 첫번째 인덱스 데이터를 제거한다.
    unshift("새로운데이터") : 첫번째 인덱스 자리에 새로운 데이터를 추가한다. -> 전체적인 인덱스번호가 하나씩 밀린다.
    */
    var myKey = "29afc9ba4ccc581a95a5eaa9b38ef293" //사이트로부터 받아온 API key를 저장한 곳.
    var state_icon = ""; //날씨아이콘의 이름 초기변수로 구성한다.
    var w_box = `
        <li>
            <div class="top">
                <div class="cur_icon"><i class="wi"></i></div>
                <div class="info">
                    <p class="temp"><span>20</span>℃</p>
                    <h4>Sunny</h4>
                    <p><span class="city">Seoul</span></p>
                    <p><span class="nation">KR</span></p>
                </div>
            </div>
            <div class="bottom">
                <div class="wind">
                    <i class="wi wi-strong-wind"></i>
                    <p><span>1.2</span>m/s</p>
                </div>
                <div class="humidity">
                    <i class="wi wi-humidity"></i>
                    <p><span>50</span>%</p>
                </div>
                <div class="cloud">
                    <i class="wi wi-cloud"></i>
                    <p><span>20</span>%</p>
                </div>
            </div>
        </li>
    `;

    function w_info(){
        $("#weather ul").empty(); //기존에 쌓여있던 모든 <li>를 제거한다.
        for(i=0; i<city.length; i++){
            $("#weather ul").append(w_box);
        }
        $("#weather ul li").each(function(index){
            $.ajax({
                url:"https://api.openweathermap.org/data/2.5/weather?q="+city[index]+"&appid="+myKey,
                dataType:"json",
                success:function(data){
                    console.log(data);
        
                    console.log("현재온도(℃): " + Math.round(data.main.temp - 273.15));
                    var temp = Math.round(data.main.temp - 273.15);
        
                    console.log("현재습도(%): " + data.main.humidity);
                    var humidity = data.main.humidity;
        
                    console.log("현재날씨: " + data.weather[0].main);
                    var weather = data.weather[0].main;
        
                    console.log("현재풍속(m/s): " + data.wind.speed);
                    var wind = data.wind.speed;
        
                    console.log("국가명: " + data.sys.country);
                    var nation = data.sys.country;
        
                    console.log("도시명: " + data.name);
                    var region = data.name;
        
                    console.log("현재구름량(%): " + data.clouds.all);
                    var cloud = data.clouds.all;
        
                    //텍스트(weather의 데이터: clear, rain, snow,)로 받아온 현재 날씨를 이미지 아이콘으로 변경(클래스명을 추가)
                    if(weather == "Clear"){
                        state_icon = "wi-day-sunny";
                    }else if(weather == "Clouds"){
                        state_icon = "wi-cloud";
                    }else if(weather == "Rain"){
                        state_icon = "wi-rain";
                    }else if(weather == "Snow"){
                        state_icon = "wi-snow";
                    }else if(weather == "Fog"){
                        state_icon = "wi-fog";
                    }
                    console.log(this);
                    $("#weather li").eq(index).find(".cur_icon i").addClass(state_icon);
                    $("#weather li").eq(index).find(".temp span").text(temp);
                    $("#weather li").eq(index).find(".info h4").text(weather);
                    $("#weather li").eq(index).find(".info .city").text(region);
                    $("#weather li").eq(index).find(".info .nation").text(nation);
                    $("#weather li").eq(index).find(".wind span").text(wind);
                    $("#weather li").eq(index).find(".humidity span").text(humidity);
                    $("#weather li").eq(index).find(".cloud span").text(cloud);
                }
            });
        });
    };
    $.getJSON("https://extreme-ip-lookup.com/json", function(data){
        console.log(data);
        city.unshift(data.city);
        w_info();
    });
    w_info(); //문서가 준비완료되면 함수를 호출해라.
    $(".cities button").click(function(){
        var $city_txt = $(this).text(); //클릭한 곳의 텍스트요소만을 저장
        city.unshift($city_txt); //기존의 배열데이터에 새로운 데이터를 추가한다.
        console.log(city);
        //city = $(this).text(); 기존 전역변수인 var city에 새로운 값을 대입하겠다는 의미
        $(this).prop("disabled", true);
        w_info(); //버튼을 클릭하면 함수를 호출해라.
    });
    function search(){
        var $search_val = $("#search_box").val(); //입력상자의 문자형데이터를 받아온다는 뜻!
        if($search_val.length<1){
            alert("검색어를 입력하세요.");
        }else{
            city.unshift($search_val);
            console.log(city);
            w_info();
        }
        $("#search_box").val("");
    }
    $(".search button").click(function(){
        search();
    });
    $(".search").keypress(function(event){
        console.log(event);
        if(event.keyCode == 13){
            search();
        }
    });

    //"타이틀" 클릭시, 모든 정보를 사라지게 만들기
    $(".title").click(function(){
        location.reload();
    });

});

/*
api.openweathermap.org/data/2.5/weather?q=London&appid=29afc9ba4ccc581a95a5eaa9b38ef293
!!!API key: 29afc9ba4ccc581a95a5eaa9b38ef293!!!
{
    "coord":{"lon":-0.1257,"lat":51.5085},
    "weather":[
        {
            "id":803,
            "main":"Clouds",
            "description":"broken clouds",
            "icon":"04n"
        }
    ],
    "base":"stations",
    "main":{
        "temp":276.17,
        "feels_like":273.64,
        "temp_min":275.37,
        "temp_max":277.04,
        "pressure":1026,
        "humidity":81
    },
    "visibility":10000,
    "wind":{"speed":2.57,"deg":0},
    "clouds":{"all":75},"dt":1619062029,
    "sys":{"type":1,"id":1414,"country":"GB","sunrise":1619066978,"sunset":1619118478},
    "timezone":3600,
    "id":2643743,
    "name":"London",
    "cod":200
}
*/