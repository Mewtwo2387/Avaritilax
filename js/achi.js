// 0: No achi corresponding to that ID; 1: Achi exist, but not yet completed; 2: Achi completed, but unclaimed; 3: Achi claimed
var AchiList;
function initachi(restart){
    var startloadachi = new Date().getTime();
    document.getElementById("loginload").innerHTML = "Loading achievements"
    $.getJSON("Achi.json?5", function(json) {
        AchiList = json;
        GD.Achievements = '';
        if(restart){
            for(var i = 0; i<=1999 ; i++){
                GD.Achievements += AchiList[i].Implemented;
                if(AchiList[i].Implemented==1){
                    document.getElementById("achievements").innerHTML += '<img class="50px" id="A' + toThreeDigit(i) + '" src="assets/images/icons-achievements/achievement-locked.png" onclick=viewachi(' + i + ')>';
                }
            }
        }else{
            for(var i = 0; i<=1999 ; i++){
                GD.Achievements += AchiList[i].Implemented;
            }
            try{
                GD.Achievements = JSON.parse(localStorage['GD']).Achievements
            }catch(SyntaxError){
                console.log('no save (achi)')
            }
            for(var i = 0; i<=1999 ; i++){
                if(AchiList[i].Implemented==1 && GD.Achievements[i]==0){ //update
                    GD.Achievements = replace(GD.Achievements,i,'1');
                }
                if(GD.Achievements[i]==1){
                    document.getElementById("achievements").innerHTML += '<img class="50px" id="A' + toThreeDigit(i) + '" src="assets/images/icons-achievements/achievement-locked.png" onclick=viewachi(' + i + ')>';
                }else if(GD.Achievements[i]>=2){
                    document.getElementById("achievements").innerHTML += '<img class="50px" id="A' + toThreeDigit(i) + '" src="assets/images/icons-achievements/A' + toThreeDigit(i) + '.png" onclick=viewachi(' + i + ')>';
                }
            }
        }
        if(debug){console.log('DEBUG: Achi init\'ed @'+ (new Date().getTime() - startloadachi) + 'ms');}
        loadmissions();
    });
}
function viewachi(id){
    if(GD.Achievements[id]>=2){
        document.getElementById("achiname").innerHTML = AchiList[id].Name;
        document.getElementById("achidesc").innerHTML = AchiList[id].Description;
        document.getElementById("achiquote").innerHTML = AchiList[id].Quote;
        document.getElementById("achiicon").src = 'assets/images/icons-achievements/A' + toThreeDigit(id) + '.png';
    }
}
function unlockachi(id){
    GD.Achievements = replace(GD.Achievements,id,'2');
    document.getElementById('A' + toThreeDigit(id)).src = 'assets/images/icons-achievements/A' + toThreeDigit(id) + '.png';
    if(debug){console.log(AchiList[id].Name + ' unlocked!');}
    newnotifs("assets/images/icons-achievements/A" + toThreeDigit(id) + ".png","Achievement Unlocked!",AchiList[id].Name,AchiList[id].Description)
    if(AchiList[id].Unlock1!="none"){
        unlockup(AchiList[id].Unlock1);
        if(AchiList[id].Unlock2!="none"){
            unlockup(AchiList[id].Unlock2);
        }
    }
    GD.AchiAmount++
    GD.nextstam--
    if(GD.nextstam==0){
        GD.nextstam = 2
        GD.stamina++
    }
}
function achiupdate(){
    if(GD.Achievements[0]==1){
        unlockachi(0);
    }
    for(var i = 0; i<=1999 ; i++){
        if(GD.Achievements[i]==1){
            switch(AchiList[i].Type){
                case "KG":
                    if(GD.KG>=AchiList[i].Amount){
                        unlockachi(i);
                    }
                    break;
                case "KGPS":
                    if(GD.KGPS>=AchiList[i].Amount){
                        unlockachi(i);
                    }
                    break;
                //case "level":
                //    if(MainXP.level>=AchiList[i].Amount){
                //        unlockachi(i);
                //    }
                //    break;
                case "money":
                    if(GD.totalMoney>=AchiList[i].Amount){
                        unlockachi(i);
                    }
                    break;
                case "click":
                    if(GD.manualClicks>=AchiList[i].Amount){
                        unlockachi(i);
                    }
                    break;
                case "CRate":
                    if(GD.CRate*100>=AchiList[i].Amount){
                        unlockachi(i);
                    }
                    break;
                case "CDmg":
                    if(GD.CDmg*100>=AchiList[i].Amount){
                        unlockachi(i);
                    }
                    break;
                case "save":
                    if(GD.save>=AchiList[i].Amount){
                        unlockachi(i);
                    }
                    break;
            }
        }
    }
}


