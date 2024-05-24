debug = true;


function save(){
    if(login){
        var LastSaved = new Date();
        document.getElementById("header-lastsaved").innerHTML = "Last Saved: " + LastSaved.toLocaleDateString(undefined, DateOptions) + " " + LastSaved.toLocaleTimeString('en-US');
        localStorage.setItem("GD",JSON.stringify(GD))
        document.getElementById("notifsave").style.display = "block";
        setTimeout(function(){document.getElementById("notifsave").style.display = "none";}, 5000);
        if(debug){console.log('DEBUG: Saved');}
    }else{
        if(debug){console.log('DEBUG: Not logged in, cannot save');}
    }
}

var startload;
function load(restart){
    startload = new Date().getTime();
    document.getElementById("continue").style.display = "none";
    document.getElementById("restart").style.display = "none";
    document.getElementById("loginload").style.display = "block";
    if(!restart){   
        document.getElementById("loginload").innerHTML = "Loading in previous data"
        try{
            GD = JSON.parse(localStorage['GD'])
        }catch(SyntaxError){
            console.log("no save")
        }
        try{
            document.getElementById("header-lastsaved").innerHTML = "Last Saved: " + LastSaved.toLocaleDateString(undefined, DateOptions) + " " + LastSaved.toLocaleTimeString('en-US');
        }catch(ReferenceError){
            console.log("no last save")
        }
        if(debug){
            document.getElementById("toggledebug").innerHTML = "ON";
            console.log("DEBUG ON");
        }else{
            console.log("DEBUG OFF");
            document.getElementById("toggledebug").innerHTML = "OFF";
        }
        document.getElementById("toggleshorten").innerHTML = (GD.shortennumbers) ? "ON" : "OFF";
        document.getElementById("autosaveinterval").value = GD.autosaveInterval || 60;
        if(debug){console.log('DEBUG: Loaded in previous data');}
    }else{
        document.getElementById("loginload").innerHTML = "Restarting"
        if(debug){console.log('DEBUG: Restarted' );}
    }
    initup(restart);
}
function contload(){
    document.getElementById("loginload").innerHTML = "Finishing up"
    tick();
    const tickInterval = setInterval(tick,1000);
    document.getElementById("login").style.display = "none";
    document.getElementById("game").style.display = "block";
    update();
    navigate('basicshop')
    login = true;
    if(debug){console.log('DEBUG: loading complete @'+ (new Date().getTime() - startload) + 'ms');}
}
function setautosave(){
    GD.autosaveInterval = document.getElementById("autosaveinterval").value;
    if(debug){console.log('DEBUG: autosave set to ' + GD.autosaveInterval + 's');}
}
function preload(){
    try{
        GD = JSON.parse(localStorage['GD'])
        document.getElementById("peek").innerHTML = `Level ${GD.level || 1} | ${GD.AchiAmount || 0} Achievements`
    }catch(SyntaxError){
        console.log("no save")
    }
}
setTimeout(preload, 200)