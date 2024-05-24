var autosave = 0

function toDHMS(){
    GD.Days = Math.floor(GD.TotalSeconds/86400);
    GD.Hours = Math.floor((GD.TotalSeconds%86400)/3600);
    GD.Minutes = Math.floor((GD.TotalSeconds%3600)/60);
    GD.Seconds = Math.floor(GD.TotalSeconds%60);
}
function timertick(){
    GD.TotalSeconds++;
    autosave++;
    if(autosave>=GD.autosaveInterval){
        save();
        autosave = 0;
    }
    toDHMS();
}

/*** 
class XP{
    TotalXP = 0;
    CurrentXP = 0;
    level = 1;
    constructor(Name,Amplifier){
        this.Name = Name;
        this.Amplifier = Amplifier;
        this.RequiredXP = Amplifier;
    }
    calcRequiredXP(){
        this.RequiredXP = Math.pow(this.level,2) * this.Amplifier;
    }
    addXP(amount){
        this.TotalXP+=amount;
        this.CurrentXP+=amount;
        while(this.CurrentXP>=this.RequiredXP){
            this.level++;
            this.CurrentXP-=this.RequiredXP;
            this.calcRequiredXP();
        }
        update();
    }
    load(){
        this.TotalXP = Number(localStorage[this.Name + "TotalXP"]) || this.TotalXP;
        this.CurrentXP = Number(localStorage[this.Name + "CurrentXP"]) || this.CurrentXP;
        this.level = Number(localStorage[this.Name + "level"]) || this.level;
        this.RequiredXP = Number(localStorage[this.Name + "RequiredXP"]) || this.RequiredXP;
    }
    save(){
        localStorage.setItem(this.Name + "TotalXP" , this.TotalXP);
        localStorage.setItem(this.Name + "CurrentXP" , this.CurrentXP);
        localStorage.setItem(this.Name + "level" , this.level);
        localStorage.setItem(this.Name + "RequiredXP" , this.RequiredXP);
    }
    
**/