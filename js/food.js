class MainShopFood{
    AdditionalKGPSMulti = 1;
    MissionsKGPSMulti = 1;
    AdditionalCostMulti = 1;
    rawAmount = 0;
    AdditionalAmount = 0;
    Amount = 0;
    TotalKGPS = 0;

    constructor(Name,KGPS,Cost) {
        this.Name = Name;
        this.rawKGPS = KGPS;
        this.KGPS = KGPS;
        this.rawCost = Cost;
        this.Cost = Cost;
    }
}
function foodupdate(){
    for(var i=0;i<9;i++){
        GD.Food[i].KGPS = GD.Food[i].rawKGPS * GD.Food[i].AdditionalKGPSMulti * GD.Food[i].MissionsKGPSMulti * GD.TotalKGPSMulti;
        GD.Food[i].Cost = GD.Food[i].rawCost * GD.Food[i].AdditionalCostMulti;
        GD.Food[i].Amount = GD.Food[i].rawAmount + GD.Food[i].AdditionalAmount;
        GD.Food[i].TotalKGPS = GD.Food[i].KGPS * GD.Food[i].Amount; 
        document.getElementById(GD.Food[i].Name + "display").innerHTML = "Cost: " + toText(GD.Food[i].Cost,true) + " KGPS: " + toText(GD.Food[i].KGPS,true);
        document.getElementById(GD.Food[i].Name + "display2").innerHTML = "KGPS: " + toText(GD.Food[i].TotalKGPS,true);
        document.getElementById(GD.Food[i].Name + "countdisplay").innerHTML = GD.Food[i].Amount;
        
        document.getElementById(GD.Food[i].Name + "percent").style.width = Math.min(GD.Money/GD.Food[i].Cost,1) * 300;
        if(GD.Money<GD.Food[i].Cost){
            document.getElementById(GD.Food[i].Name + "percent").style.backgroundColor = 'rgb(0, 150, 96)';
            document.getElementById(GD.Food[i].Name + "percent10").style.width = 0;
            document.getElementById(GD.Food[i].Name + "percent100").style.width = 0;
        }else{
            document.getElementById(GD.Food[i].Name + "percent").style.backgroundColor = 'rgb(0, 210, 132)';
            document.getElementById(GD.Food[i].Name + "percent10").style.width = Math.min(GD.Money/geometric(GD.Food[i].Cost,1.2,10),1) * 300;
            if(GD.Money<geometric(GD.Food[i].Cost,1.2,10)){
                document.getElementById(GD.Food[i].Name + "percent10").style.backgroundColor = 'rgb(0, 96, 150)';
                document.getElementById(GD.Food[i].Name + "percent100").style.width = 0;
            }else{
                document.getElementById(GD.Food[i].Name + "percent10").style.backgroundColor = 'rgb(0, 132, 210)';
                document.getElementById(GD.Food[i].Name + "percent100").style.width = Math.min(GD.Money/geometric(GD.Food[i].Cost,1.2,100),1) * 300;
                if(GD.Money<geometric(GD.Food[i].Cost,1.2,100)){
                    document.getElementById(GD.Food[i].Name + "percent100").style.backgroundColor = 'rgb(150, 96, 0)';
                }else{
                    document.getElementById(GD.Food[i].Name + "percent100").style.backgroundColor = 'rgb(210, 132, 0)';
                }
            }
        }

        for(var j = 0; j<=1999 ; j++){
            if(GD.Achievements[j]==1 && AchiList[j].Type==GD.Food[i].Name && GD.Food[i].Amount>=AchiList[j].Amount){
                unlockachi(j);
            }
        }   
    }
}

function buyfood(id){
    if(GD.Money>=GD.Food[id].Cost){
        GD.Money -= GD.Food[id].Cost;
        GD.Food[id].rawAmount++;
        GD.Food[id].rawCost *= 1.2;
        update();
        return true;
    }else{
        return false;
    }
}
function buyfoodn(id,n){
    if(GD.Money>=geometric(GD.Food[id].Cost,1.2,n)){
        GD.Money -= geometric(GD.Food[id].Cost,1.2,n);
        GD.Food[id].rawAmount+=n;
        GD.Food[id].rawCost *= 1.2**n;
        if(n==10 && GD.Achievements[1915]==1){
            unlockachi(1915);
        }
        if(n==100 && GD.Achievements[1916]==1){
            unlockachi(1916);
        }
        update();
        return true;
    }else{
        return false;
    }
}
function upfood(id){
    for(var i=0;i<9;i++){
        if(UpList[id].Type==GD.Food[i].Name){
            GD.Food[i].AdditionalKGPSMulti *= UpList[id].Multi;
        }else if(UpList[id].Type==(GD.Food[i].Name + 'cost')){
            GD.Food[i].AdditionalCostMulti *= UpList[id].Multi;
        }
    }
}




