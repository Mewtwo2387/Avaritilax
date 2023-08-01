// 0: No upgrade corresponding to that ID; 1: Upgrade exist, but locked; 2: Upgrade unlocked, but not bought; 3: Upgrade bought
var UpList;
function initup(restart){
    var startloadup = new Date().getTime();
    document.getElementById("loginload").innerHTML = "Loading upgrades"
    $.getJSON("Up.json?7", function(json) {
        UpList = json;
        GD.Upgrades = '';
        for(var i = 0; i<=1999 ; i++){
            GD.Upgrades += UpList[i].Implemented;
            if(UpList[i].Implemented==1){
                document.getElementById("upgrades").innerHTML += 
                '<div id="U' + toThreeDigit(i) + '" class="shopitemdisplay" style="display:none"><img class="img32px60" src="assets/images/icons-upgrades/U' + toThreeDigit(i) + '.png"><h2 class="shopitem-label">' + UpList[i].Name + '</h2><button type="button" class="shopitem-button" onclick="buyup(' + i + ')">Buy</button><br><p class="ps">' + UpList[i].Description + '</p><br><p class="ps changelog-quote">' + UpList[i].Quote + '</p><br><p>Cost: ' + toText(UpList[i].Cost,false) + '</p></div>';
            }
        }
        if(!restart){
            try{
                GD.Upgrades = JSON.parse(localStorage['GD']).Upgrades
            }catch(SyntaxError){
                console.log('no save (up)')
            }
            for(var i = 0; i<=1999 ; i++){
                if(UpList[i].Implemented==1 && GD.Upgrades[i]==0){ //update
                    GD.Upgrades = replace(GD.Upgrades,i,'1');
                }
                if(GD.Upgrades[i]==2){
                    document.getElementById("U" + toThreeDigit(i)).style.display = "block";
                }
            }
        }    
        if(debug){console.log('DEBUG: Up init\'ed @'+ (new Date().getTime() - startloadup) + 'ms');}
        initachi(restart);
    });
}
function unlockup(id){
    GD.Upgrades = replace(GD.Upgrades,id,'2');
    document.getElementById("U" + toThreeDigit(id)).style.display = "block";
}
function buyup(id){
    if(UpList[id].Cost<=GD.Money){
        if(UpList[id].Type=="KGPS"){
            GD.UpgradesKGPSMulti += UpList[id].Multi / 100;
        }else if(UpList[id].Type=="MPC"){
            GD.UpgradesMPCMulti += UpList[id].Multi / 100;
        }else if(UpList[id].Type=="CRate"){
            GD.CRate += UpList[id].Multi / 100;
        }else if(UpList[id].Type=="CDmg"){
            GD.CDmg += UpList[id].Multi / 100;
        }else{
            upfood(id)
        }
        GD.Money-=UpList[id].Cost;
        GD.Upgrades = replace(GD.Upgrades,id,'3');
        document.getElementById("U" + toThreeDigit(id)).style.display = "none";   
        GD.UpAmount++;
        update();
    }
}