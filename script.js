const container = document.querySelector('.container');
let mouseX = 0;
let mouseY = 0;
let widgetCount = 0;
let activeWidget = null;
let dragging = false;
let resizing = false;


//event listeners

//dragging and resizing end on mouseup
document.addEventListener('mouseup', () => {
    dragging = false;
    resizing = false;
    snapToGrid();
});

//dragging and resizing on mousemove
document.addEventListener('mousemove', handleMouseMove);

function handleMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY; 
    if (activeWidget && dragging) {
        dragWidget(activeWidget);
        }
    if (activeWidget && resizing) {
        resizeWidget(activeWidget);
    }
}

//spawn widget on button click
const widgetSpawnButton = document.querySelector('#btn');
widgetSpawnButton.addEventListener('click', spawnWidget);

   //functions for widget creation and manipulation below here
function spawnWidget() {
    // increment widget count, create widget, add properties, add position
    widgetCount++;
    const widget = document.createElement('div');
    widget.classList.add('widget');
    widget.id = `widget-${widgetCount}`;

    widget.style.left = window.innerWidth / 2 + 'px';
    widget.style.top = window.innerHeight / 2 + 'px';
    widget.style.zIndex = widgetCount;
    widget.style.height = '200px';
    widget.style.width = '200px';
    
    // add menu items
    
    
    
    // add widget to container and log
    container.appendChild(widget);
    makeMenu(widget.id);
    console.log('Added ' + widget.id);
}

    
//ACTIONS UPON WIDGETS BELOW HERE
function dragWidget(id) {
    const widget = document.getElementById(id);
    if (dragging) {
        widget.style.left = mouseX + 'px';
        widget.style.top = mouseY + 'px';
        snapToGrid();
    }
}

gridwidth = 25;
gridheight = 11;
function snapToGrid(id) {
    const widget = document.getElementById(id);
    if (widget) {
        widget.style.left = Math.round(parseInt(widget.style.left) / gridwidth) * gridwidth + 'px';
        widget.style.top = Math.round(parseInt(widget.style.top) / gridheight) * gridheight + 'px';
    }
}

function resizeWidget(id) {
    const widget = document.getElementById(id);
    if (resizing) {
        widget.style.width = mouseX - widget.offsetLeft + 'px';
        widget.style.height = mouseY - widget.offsetTop + 'px';
        // set font size to an average of the width and height
        
        widget.lastElementChild.style.fontSize = (parseInt(widget.style.width) + parseInt(widget.style.height)) / 16 + 'px';   
        snapToGrid
    }
}

function deleteWidget(id) {
    const widget = document.getElementById(id);
    widget.remove();
    console.log('Deleted ' + id);
    widgetCount--;
}









//FUNCTIONS FOR MAKING WIDGETS BELOW HERE
function makeMenu(id){
    const widget = document.getElementById(id);
    widget.innerHTML = '';
    addDragbutton(widget);
    addResizeButton(widget);
    addDeleteButton(widget);

    const menuItem2 = document.createElement('div');
    menuItem2.classList.add('menu-item');
    menuItem2.innerHTML = clockIcon;
    menuItem2.addEventListener('click', () => {
        makeClock(widget.id);
    });

    const menuItem3 = document.createElement('div');
    menuItem3.classList.add('menu-item');
    menuItem3.innerHTML = noteIcon;
    menuItem3.addEventListener('click', () => {
        makeNotes(widget.id);
    });

    const menuItem4 = document.createElement('div');
    menuItem4.classList.add('menu-item');
    menuItem4.innerHTML = weatherIcon;
    menuItem4.addEventListener('click', () => {
        makeWeather(widget.id);
    });

    const menuItem5 = document.createElement('div');
    menuItem5.classList.add('menu-item');
    menuItem5.innerHTML = alertIcon;
    menuItem5.addEventListener('click', () => {
        makeAlert(widget.id);
    });
    
    // add items to menu
    const widgetMenu = document.createElement('div');
    widgetMenu.classList.add('widget-menu');
    widgetMenu.appendChild(menuItem2);
    widgetMenu.appendChild(menuItem3);
    widgetMenu.appendChild(menuItem4);
    widgetMenu.appendChild(menuItem5);

    //  add menu to widget
    widget.appendChild(widgetMenu);
    
    console.log('Added Menu to ' + widget.id);
}

function makeClock(id){
    const widget = document.getElementById(id);
    widget.innerHTML = '';
    addDeleteButton(widget);
    addMenuButton(widget);
    addDragbutton(widget);
    addResizeButton(widget);
    const clock = document.createElement('div');
    clock.classList.add('clock');
    clock.id = `clock-${widget.id}`;
    clock.textContent = '12:00:00';
    widget.appendChild(clock);
    updateClocks();
    console.log('Added ' + clock.id);
    clock.style.fontSize = (parseInt(widget.style.width) + parseInt(widget.style.height)) / 12 + 'px';
}

function makeNotes(id){
    const widget = document.getElementById(id);
    widget.innerHTML = '';
    addDeleteButton(widget);
    addMenuButton(widget);
    addDragbutton(widget);
    addResizeButton(widget);
    const notes = document.createElement('textarea');
    notes.classList.add('notes');
    notes.id = `notes-${widget.id}`;
    notes.placeholder = 'Write your notes here';
    widget.appendChild(notes);
    console.log('Added ' + notes.id);
}

function makeWeather(id){
    const widget = document.getElementById(id);
    widget.innerHTML = '';
    addDeleteButton(widget);
    addMenuButton(widget);
    addDragbutton(widget);
    addResizeButton(widget);
    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.id = `weather-${widget.id}`;
    weather.textContent = 'Weather';
    widget.appendChild(weather);
    console.log('Added ' + weather.id);
    updateWeather();
}

function makeAlert(id){
    const widget = document.getElementById(id);
    widget.innerHTML = '';
    addDeleteButton(widget);
    addMenuButton(widget);
    addDragbutton(widget);
    addResizeButton(widget);
    const alert = document.createElement('div');
    alert.classList.add('widget-menu');
    alert.id = `alert-${widget.id}`;
    
    const alertButton1 = document.createElement('div');
    alertButton1.classList.add('menu-item');
    alertButton1.textContent = 'Hi!';
    alertButton1.addEventListener('click', () => {
        window.alert('Hi!');
    });
    const alertButton2 = document.createElement('div');
    alertButton2.classList.add('menu-item');
    alertButton2.textContent = 'Bye';
    alertButton2.addEventListener('click', () => {
        window.alert('Bye');
    });

alert.appendChild(alertButton1);
alert.appendChild(alertButton2);

    widget.appendChild(alert);
    console.log('Added ' + alert.id);
}

//FUNCTIONS FOR ASSEMBLING COMPONENTS BELOW HERE

function addDeleteButton(widget){
    const deleteButton = document.createElement('div');
    deleteButton.classList.add('delete-button');
    deleteButton.classList.add('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => {
        deleteWidget(widget.id);
    });
    widget.appendChild(deleteButton);
    console.log('Added delete button to ' + widget.id);
}

function addMenuButton(widget){
    const menuButton = document.createElement('div');
    menuButton.classList.add('menu-button');
    menuButton.classList.add('button');
    menuButton.textContent = '...';
    menuButton.addEventListener('click', () => {
        makeMenu(widget.id);
    });
    widget.appendChild(menuButton);
    console.log('Added menu button to ' + widget.id);
}

function addDragbutton(widget){
    const dragButton = document.createElement('div');
    dragButton.classList.add('drag-button');
    dragButton.classList.add('button');
    dragButton.textContent = '-';
    dragButton.addEventListener('mousedown', () => {
        activeWidget = widget.id;
        dragging = true;
        console.log('Dragging ' + widget.id);
        });
    widget.addEventListener('mouseup', () => {
        dragging = false;
        console.log('Stopped dragging ' + widget.id);
    });

    widget.appendChild(dragButton);
    console.log('Added drag button to ' + widget.id);
}

function addResizeButton(widget){
    const resizeButton = document.createElement('div');
    resizeButton.classList.add('resize-button');
    resizeButton.classList.add('button');
    resizeButton.textContent = '⇲';
    resizeButton.addEventListener('mousedown', () => {
        activeWidget = widget.id;
        resizing = true;
        console.log('Resizing ' + widget.id);
        });
    widget.addEventListener('mouseup', () => {
        resizing = false;
        console.log('Stopped resizing ' + widget.id);
    });

    widget.appendChild(resizeButton);
    console.log('Added resize button to ' + widget.id);
}

//functions for svgs here
let trashIcon = `<svg class="svg-icon" viewBox="0 0 20 20">
<path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
</svg>`;

let clockIcon = `<svg class="svg-icon" viewBox="0 0 20 20">
<path fill="none" d="M11.088,2.542c0.063-0.146,0.103-0.306,0.103-0.476c0-0.657-0.534-1.19-1.19-1.19c-0.657,0-1.19,0.533-1.19,1.19c0,0.17,0.038,0.33,0.102,0.476c-4.085,0.535-7.243,4.021-7.243,8.252c0,4.601,3.73,8.332,8.332,8.332c4.601,0,8.331-3.73,8.331-8.332C18.331,6.562,15.173,3.076,11.088,2.542z M10,1.669c0.219,0,0.396,0.177,0.396,0.396S10.219,2.462,10,2.462c-0.22,0-0.397-0.177-0.397-0.396S9.78,1.669,10,1.669z M10,18.332c-4.163,0-7.538-3.375-7.538-7.539c0-4.163,3.375-7.538,7.538-7.538c4.162,0,7.538,3.375,7.538,7.538C17.538,14.957,14.162,18.332,10,18.332z M10.386,9.26c0.002-0.018,0.011-0.034,0.011-0.053V5.24c0-0.219-0.177-0.396-0.396-0.396c-0.22,0-0.397,0.177-0.397,0.396v3.967c0,0.019,0.008,0.035,0.011,0.053c-0.689,0.173-1.201,0.792-1.201,1.534c0,0.324,0.098,0.625,0.264,0.875c-0.079,0.014-0.155,0.043-0.216,0.104l-2.244,2.244c-0.155,0.154-0.155,0.406,0,0.561s0.406,0.154,0.561,0l2.244-2.242c0.061-0.062,0.091-0.139,0.104-0.217c0.251,0.166,0.551,0.264,0.875,0.264c0.876,0,1.587-0.711,1.587-1.587C11.587,10.052,11.075,9.433,10.386,9.26z M10,11.586c-0.438,0-0.793-0.354-0.793-0.792c0-0.438,0.355-0.792,0.793-0.792c0.438,0,0.793,0.355,0.793,0.792C10.793,11.232,10.438,11.586,10,11.586z"></path>
</svg>`;

let noteIcon = `<svg class="svg-icon" viewBox="0 0 20 20">
<path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
</svg>`;

let weatherIcon = `<svg class="svg-icon" viewBox="0 0 20 20">
<path fill="none" d="M5.114,5.726c0.169,0.168,0.442,0.168,0.611,0c0.168-0.169,0.168-0.442,0-0.61L3.893,3.282c-0.168-0.168-0.442-0.168-0.61,0c-0.169,0.169-0.169,0.442,0,0.611L5.114,5.726z M3.955,10c0-0.239-0.193-0.432-0.432-0.432H0.932C0.693,9.568,0.5,9.761,0.5,10s0.193,0.432,0.432,0.432h2.591C3.761,10.432,3.955,10.239,3.955,10 M10,3.955c0.238,0,0.432-0.193,0.432-0.432v-2.59C10.432,0.693,10.238,0.5,10,0.5S9.568,0.693,9.568,0.932v2.59C9.568,3.762,9.762,3.955,10,3.955 M14.886,5.726l1.832-1.833c0.169-0.168,0.169-0.442,0-0.611c-0.169-0.168-0.442-0.168-0.61,0l-1.833,1.833c-0.169,0.168-0.169,0.441,0,0.61C14.443,5.894,14.717,5.894,14.886,5.726 M5.114,14.274l-1.832,1.833c-0.169,0.168-0.169,0.441,0,0.61c0.168,0.169,0.442,0.169,0.61,0l1.833-1.832c0.168-0.169,0.168-0.442,0-0.611C5.557,14.106,5.283,14.106,5.114,14.274 M19.068,9.568h-2.591c-0.238,0-0.433,0.193-0.433,0.432s0.194,0.432,0.433,0.432h2.591c0.238,0,0.432-0.193,0.432-0.432S19.307,9.568,19.068,9.568 M14.886,14.274c-0.169-0.168-0.442-0.168-0.611,0c-0.169,0.169-0.169,0.442,0,0.611l1.833,1.832c0.168,0.169,0.441,0.169,0.61,0s0.169-0.442,0-0.61L14.886,14.274z M10,4.818c-2.861,0-5.182,2.32-5.182,5.182c0,2.862,2.321,5.182,5.182,5.182s5.182-2.319,5.182-5.182C15.182,7.139,12.861,4.818,10,4.818M10,14.318c-2.385,0-4.318-1.934-4.318-4.318c0-2.385,1.933-4.318,4.318-4.318c2.386,0,4.318,1.933,4.318,4.318C14.318,12.385,12.386,14.318,10,14.318 M10,16.045c-0.238,0-0.432,0.193-0.432,0.433v2.591c0,0.238,0.194,0.432,0.432,0.432s0.432-0.193,0.432-0.432v-2.591C10.432,16.238,10.238,16.045,10,16.045"></path>
</svg>`;

let alertIcon = `<svg class="svg-icon" viewBox="0 0 20 20">
<path d="M14.38,3.467l0.232-0.633c0.086-0.226-0.031-0.477-0.264-0.559c-0.229-0.081-0.48,0.033-0.562,0.262l-0.234,0.631C10.695,2.38,7.648,3.89,6.616,6.689l-1.447,3.93l-2.664,1.227c-0.354,0.166-0.337,0.672,0.035,0.805l4.811,1.729c-0.19,1.119,0.445,2.25,1.561,2.65c1.119,0.402,2.341-0.059,2.923-1.039l4.811,1.73c0,0.002,0.002,0.002,0.002,0.002c0.23,0.082,0.484-0.033,0.568-0.262c0.049-0.129,0.029-0.266-0.041-0.377l-1.219-2.586l1.447-3.932C18.435,7.768,17.085,4.676,14.38,3.467 M9.215,16.211c-0.658-0.234-1.054-0.869-1.014-1.523l2.784,0.998C10.588,16.215,9.871,16.447,9.215,16.211 M16.573,10.27l-1.51,4.1c-0.041,0.107-0.037,0.227,0.012,0.33l0.871,1.844l-4.184-1.506l-3.734-1.342l-4.185-1.504l1.864-0.857c0.104-0.049,0.188-0.139,0.229-0.248l1.51-4.098c0.916-2.487,3.708-3.773,6.222-2.868C16.187,5.024,17.489,7.783,16.573,10.27"></path>
</svg>`;


//fucntions for widget update functionality here


//clock
function updateClocks() {
    const now = new Date();
    const clocks = document.querySelectorAll('.clock');
    if (clocks.length === 0) {
        return;
    }
    clocks.forEach(clock => {
        amPm = now.getHours() >= 12 ? 'PM' : 'AM';
        twelveHour = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
        clock.innerHTML = `<p class="clockText">${(twelveHour < 10 ? '0' : '') + twelveHour}</p><p class="clockText">:${now.getMinutes()}</p><p class="clockText">:${(now.getSeconds() < 10 ? '0' : '')}${now.getSeconds()}</p><p class="clockText">${amPm}</p>`;
        
    });

}

setInterval(updateClocks, 1000);

//weather
const apiKey = '57d1e6c999423bfdd98c0b877524d639';
 let zipCode = '83843'

 async function getWeatherData() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`);
    const data = await response.json();
    return data;
}

function updateWeather() {
    const weatherWidgets = document.querySelectorAll('.weather');
    if (weatherWidgets.length === 0) {
        return;
    }
    
    weatherWidgets.forEach(async widget => {
        const data = await getWeatherData();
        let Ktemp = data.main.temp;
        let Ftemp = (Ktemp - 273.15) * 9/5 + 32;
        widget.innerHTML = `<p class="weatherText">${Math.round(Ftemp)} &deg;F</p>`;
        let iconLink = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        widget.style.backgroundImage = `url(${iconLink})`;
        widget.fontSize = (parseInt(widget.style.width) + parseInt(widget.style.height)) / 12 + 'px';
    });
}

