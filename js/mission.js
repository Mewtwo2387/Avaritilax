//0: mission incomplete, 1: mission unclaimed, 2: mission claimed
function missionupdate(){

    if(GD.Missions[10]=='0' && GD.KG>=50000){unlockmission(10)}
    if(GD.Missions[11]=='0' && GD.Food[0].TotalKGPS>=50){unlockmission(11)}
    if(GD.Missions[12]=='0' && GD.Food[1].TotalKGPS>=125){unlockmission(12)}
    if(GD.Missions[13]=='0' && GD.Food[2].TotalKGPS>=250){unlockmission(13)}
    if(GD.Missions[14]=='0' && GD.Food[3].Amount>=2){unlockmission(14)}
    if(GD.Missions[15]=='0' && GD.manualClicks>=2222){unlockmission(15)}
    if(GD.Missions[16]=='0' && GD.critClicks>=50){unlockmission(16)}
    if(GD.Missions[17]=='0' && GD.UpAmount>=12){unlockmission(17)}
    if(GD.Missions[18]=='0' && GD.AchiAmount>=24){unlockmission(18)}

    
    document.getElementById('m10').innerHTML = `Reach a total of 50000 KG (${toText(GD.KG,true)}/50000.0)`
    document.getElementById('m11').innerHTML = `Reach 50 KGPS from fishballs (${toText(GD.Food[0].TotalKGPS,true)}/50.0)`
    document.getElementById('m12').innerHTML = `Reach 125 KGPS from burgers (${toText(GD.Food[1].TotalKGPS,true)}/125.0)`
    document.getElementById('m13').innerHTML = `Reach 250 KGPS from restaurants (${toText(GD.Food[2].TotalKGPS,true)}/250.0)`
    document.getElementById('m14').innerHTML = `Obtain 2 Factories (${toText(GD.Food[3].Amount,false)}/2)`
    document.getElementById('m15').innerHTML = `Click 2222 times (${toText(GD.manualClicks,false)}/2222)`
    document.getElementById('m16').innerHTML = `Hit a Critical Click 50 times (${toText(GD.critClicks,false)}/50)`
    document.getElementById('m17').innerHTML = `Buy 12 Upgrades (${toText(GD.UpAmount,false)}/12)`
    document.getElementById('m18').innerHTML = `Get 24 achievements (${toText(GD.AchiAmount,false)}/24)`

}

function unlockmission(id){
    document.getElementById('m'+id+'d').style.backgroundColor= "rgba(127,255,127,0.3)"
    document.getElementById('m'+id+'b').classList.add('unlocked')
    document.getElementById('m'+id+'b').classList.remove('locked')
    GD.Missions = replace(GD.Missions,id,'1');
}
function mclaim(id){
    if(GD.Missions[id]=='1'){
        GD.Missions = replace(GD.Missions,id,'2');
        document.getElementById('m'+id+'b').classList.add('locked')
        document.getElementById('m'+id+'b').classList.remove('unlocked')
        var set = Math.floor(id/10)
        GD.Set[set]++
        document.getElementById('s'+set+'b').innerHTML = `Claim(${GD.Set[set]}/10)`
        if(GD.Set[set]>=10){
            document.getElementById('s'+set+'b').classList.remove('locked')
            document.getElementById('s'+set+'b').classList.add('unlocked')
        }
        if(id!=19){GD.Catalyst+=50}else{GD.Catalyst+=25}

        if(id==10||id==17){GD.MissionsKGPSMulti+=0.05}
        else if(id==18){GD.MissionsKGPSMulti+=0.03}
        else if(id==11){GD.Food[0].MissionsKGPSMulti+=0.15}
        else if(id==12){GD.Food[1].MissionsKGPSMulti+=0.15}
        else if(id==13){GD.Food[2].MissionsKGPSMulti+=0.15}
        else if(id==14){GD.Money+=50000}
        else if(id==15){GD.MissionsMPCMulti+=0.05}
        else if(id==16){GD.CDmg+=0.3;GD.CRate+=0.03}
    }
    update();
}
function sclaim(s){
    if(GD.Set[s]>=10){
        document.getElementById('s'+s).style.display = 'none'
        GD.currentset++;
        document.getElementById('s'+GD.currentset).style.display = 'block'
        if(s==1){
            GD.Catalyst+=250
            GD.GoldenFishball+=1
        }
    }
}
function loadmissions(){
    document.getElementById("loginload").innerHTML = "Loading missions"
    for(var i=10; i<20; i++){
        if(GD.Missions[i]==1){
            document.getElementById('m'+i+'b').classList.add('unlocked')
            document.getElementById('m'+i+'b').classList.remove('locked')
        }
        if(GD.Missions[i]!=0){
            document.getElementById('m'+i+'d').style.backgroundColor= "rgba(127,255,127,0.3)"
        }
    }
    for(var s=1; s<=1; s++){
        document.getElementById('s'+s+'b').innerHTML = `Claim(${GD.Set[s]}/10)`
    }
    document.getElementById('s'+GD.currentset).style.display = 'block'
    loadmines();
}