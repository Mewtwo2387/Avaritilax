function tick(){
    timertick();
    GD.KG+=GD.KGPS;
    if(debug){console.log('DEBUG: tick (previous tick ' + (new Date().getTime() - prevtick) + 'ms ago)');}
    prevtick = new Date().getTime();
    update();
}
function openlink(link){
    window.open(
        link,'_blank'
    );
}
function update(){
    var startupdate = new Date().getTime();
    GD.TotalKGPSMulti = GD.MissionsKGPSMulti * GD.UpgradesKGPSMulti;
    GD.MPCperKG = 0.01 * GD.UpgradesMPCMulti * GD.MissionsMPCMulti;
    foodupdate();
    GD.KGPS = GD.Food[0].TotalKGPS + GD.Food[1].TotalKGPS + GD.Food[2].TotalKGPS + GD.Food[3].TotalKGPS + GD.Food[4].TotalKGPS + GD.Food[5].TotalKGPS + GD.Food[6].TotalKGPS + GD.Food[7].TotalKGPS + GD.Food[8].TotalKGPS 
    GD.TotalAmount = GD.Food[0].Amount + GD.Food[1].Amount + GD.Food[2].Amount + GD.Food[3].Amount + GD.Food[4].Amount + GD.Food[5].Amount + GD.Food[6].Amount + GD.Food[7].Amount + GD.Food[8].Amount
    GD.totalMPC = GD.MPCperKG * GD.KG;
    document.getElementById("header-playtime").innerHTML = GD.Days + "d " + toTwoDigit(GD.Hours) + ":" + toTwoDigit(GD.Minutes) + ":" + toTwoDigit(GD.Seconds);
    // document.getElementById("mainxpdisplayinner").style.width = 100 * MainXP.CurrentXP / MainXP.RequiredXP;
    // document.getElementById("mainxplabel").innerHTML = toText(MainXP.CurrentXP,false) + "/" + toText(MainXP.RequiredXP,false);
    // document.getElementById("mainlevellabel").innerHTML = MainXP.level;
    document.getElementById("kglabel").innerHTML = toText(GD.KG,true);
    document.getElementById("catalystlabel").innerHTML = toText(GD.Catalyst,true);
    document.getElementById("goldenfishballlabel").innerHTML = toText(GD.GoldenFishball,true);
    document.getElementById("fatbloblabel").innerHTML = toText(GD.FatBlob,true);
    document.getElementById("kgpslabel").innerHTML = toText(GD.KGPS,true);
    document.getElementById("mpclabel").innerHTML = toText(GD.totalMPC,true);
    document.getElementById("moneylabel").innerHTML = "$" + toText(GD.Money,true);
    document.getElementById("title").innerHTML = toText(GD.KG,true) + ' KG';
    infoupdate();
    achiupdate();
    missionupdate();
    mineupdate();
    if(debug){console.log('DEBUG: update @'+ (new Date().getTime() - startupdate) + 'ms');}
}
function snorlaxclick(event){
    const template = document.getElementById('floating-text-snorlax-template').content.cloneNode(true);
    const element = template.querySelector('.floating-text');
    element.style.left = event.clientX + 'px'
    element.style.top = (event.clientY - 50) + 'px'
    GD.manualClicks++;
    if(Math.random()>=GD.CRate){
        GD.Money+=GD.totalMPC;
        GD.totalMoney+=GD.totalMPC;
        element.style.color="#CCCCCC"
        element.innerHTML = toText(GD.totalMPC,true);
    }else{
        GD.Money+=GD.totalMPC*(1+GD.CDmg);
        GD.totalMoney+=GD.totalMPC*(1+GD.CDmg);
        element.style.color="#FF5555"
        element.innerHTML = toText(GD.totalMPC*(1+GD.CDmg),true);
        GD.critClicks++;
    }
    document.getElementById('game').appendChild(element);
    update();
    setTimeout(function(){
        element.remove();
    },5000);
}
function navigate(tab,event){
    var unlocked = true;
    var items = document.getElementsByClassName("tab");
    if(tab=='mining'){
        if(GD.Missions[19]=='0'){unlockmission(19)}
    }
    if(tab=='mining'||tab=='alchemy'){
        if(GD.currentset<=1){
            unlocked = false
            floatingtext('Complete Mission Set 1 to Unlock!','#CC0000',event,false)
        }
    }
    if(unlocked){
        for (var i=0; i < items.length; i++) {
            items[i].style.display = "none";
        }
        document.getElementById(tab).style.display = "block";
    }
}
function newnotifs(icon,header,name,desc){
    notifs++;
    if(notifs<=3){
        document.getElementById("notifs" + notifs).style.display = "block";
        document.getElementById("notifs" + notifs + "icon").src = icon;
        document.getElementById("notifs" + notifs + "header").innerHTML = header;
        document.getElementById("notifs" + notifs + "name").innerHTML = name;
        document.getElementById("notifs" + notifs + "desc").innerHTML = desc;
    }else{
        document.getElementById("notifsmore").style.display = "block";
        document.getElementById("notifsmorecontent").innerHTML = "+" + (notifs - 3) + " more";
        document.getElementById("notifs1icon").src = document.getElementById("notifs2icon").src;
        document.getElementById("notifs1header").innerHTML = document.getElementById("notifs2header").innerHTML;
        document.getElementById("notifs1name").innerHTML = document.getElementById("notifs2name").innerHTML;
        document.getElementById("notifs1desc").innerHTML = document.getElementById("notifs2desc").innerHTML;
        document.getElementById("notifs2icon").src = document.getElementById("notifs3icon").src;
        document.getElementById("notifs2header").innerHTML = document.getElementById("notifs3header").innerHTML;
        document.getElementById("notifs2name").innerHTML = document.getElementById("notifs3name").innerHTML;
        document.getElementById("notifs2desc").innerHTML = document.getElementById("notifs3desc").innerHTML;
        document.getElementById("notifs3icon").src = icon;
        document.getElementById("notifs3header").innerHTML = header;
        document.getElementById("notifs3name").innerHTML = name;
        document.getElementById("notifs3desc").innerHTML = desc;
    }
    document.getElementById("notifscross").style.display = "block";
}
function clearnotifs(){
    notifs = 0;
    document.getElementById("notifsmore").style.display = "none";
    document.getElementById("notifs1").style.display = "none";
    document.getElementById("notifs2").style.display = "none";
    document.getElementById("notifs3").style.display = "none";
    document.getElementById("notifscross").style.display = "none";
}
function toggledebug(){
    debug = !debug;
    if(debug){
        document.getElementById("toggledebug").innerHTML = "ON";
        console.log("DEBUG ON");
    }else{
        console.log("DEBUG OFF");
        document.getElementById("toggledebug").innerHTML = "OFF";
    }
}
function infoupdate(){
    document.getElementById("infoKG").innerHTML = toText(GD.KG,true);
    document.getElementById("infoMoney").innerHTML = toText(GD.Money,true);
    document.getElementById("infoTMoney").innerHTML = toText(GD.totalMoney,true);
    document.getElementById("infoRKGPS").innerHTML = toText(GD.KGPS/GD.TotalKGPSMulti,true);
    document.getElementById("infoMKGPS").innerHTML = '+' + toText((GD.TotalKGPSMulti - 1)*100,true) + '%';
    document.getElementById("infoTKGPS").innerHTML = toText(GD.KGPS,true);
    document.getElementById("infoRMPC").innerHTML = toText(GD.KG/100,true);
    document.getElementById("infoMMPC").innerHTML = '+' + toText((GD.MPCperKG - 0.01)*10000,true) + '%';
    document.getElementById("infoTMPC").innerHTML = toText(GD.totalMPC,true);
    document.getElementById("infoShop").innerHTML = toText(GD.TotalAmount,false);
    document.getElementById("infoCRate").innerHTML = toText(GD.CRate*100 ,true) + '%';
    document.getElementById("infoCDmg").innerHTML = '+' + toText(GD.CDmg*100 ,true) + '%';
    document.getElementById("infoMClick").innerHTML = toText(GD.manualClicks, false);
    document.getElementById("infoCClick").innerHTML = toText(GD.critClicks, false);
    document.getElementById("infoUps").innerHTML = toText(GD.UpAmount, false);
    document.getElementById("infoAchis").innerHTML = toText(GD.AchiAmount, false);
}
function floatingtext(content,color,event,snorlaxclick){
    var template;
    if(snorlaxclick){
        template = document.getElementById('floating-text-snorlax-template').content.cloneNode(true);
    }else{
        template = document.getElementById('floating-text-template').content.cloneNode(true);
    }
    const element = template.querySelector('.floating-text');
    element.style.left = event.clientX + 'px'
    element.style.top = (event.clientY - 50) + 'px'
    element.style.color=color
    element.innerHTML = content
    document.getElementById('game').appendChild(element);
    setTimeout(function(){
        element.remove();
    },5000);
}