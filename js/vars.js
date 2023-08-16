class gameData{
    //Main
     KG = 100;
     KGPS = 0;
     UpgradesMPCMulti = 1;
     MissionsMPCMulti = 1;
     MPCperKG = 0.01;
     totalMPC = 1;
     Money = 0;
     totalMoney = 0;
     UpgradesKGPSMulti = 1;
     MissionsKGPSMulti = 1;
     TotalKGPSMulti = 1;
     CRate = 0;
     CDmg = 0.5;
     TotalAmount = 0;
    //stuff
    Catalyst = 0;
    GoldenFishball = 0;
    FatBlob = 0;
    //stats
     manualClicks = 0;
     autoClicks = 0;
    critClicks = 0;
    save = 0;
    // ups and achis
     Achievements = '' 
     AchiAmount = 0;
     Upgrades = ''
     UpAmount = 0; 
    
    //missions
    Missions = '00000000000000000000'
    Set = [0,0,0]
    currentset = 1
    //time
     DateOptions = { year: 'numeric', month: 'long', day: 'numeric' , timeZoneName: 'short' };
     Days = 0;
     Hours = 0;
     Minutes = 0;
     Seconds = 0;
     TotalSeconds = 0;

    //XP
    // MainXP = new XP('MainXP',100);

    //Settings
     shortennumbers = true;


    //mine
    generated = false
    mine = [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]
    exposed = [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]
    stamina = 0
    nextstam = 2
    fishstick = 0
    stone = 0
    refinedstone = 0
    darkstone = 0
    refineddarkstone = 0
    darkstuff = 0
    coal = 0
    haematite = 0
    iron = 0
    refinediron = 0
    silver = 0
    refinedsilver = 0
    gold = 0
    refinedgold = 0
    lumium = 0
    diamond = 0
    refineddiamond = 0
    crystal = 0
    soulstone = 0
    soulgem = 0
    pickLevel = -1
    furnaceLevel = -1
    refinaryLevel = -1
    alloyLevel = -1
}
var GD = new gameData

//Food
GD.Food = {}
GD.Food[0] = new MainShopFood('fishball',0.2, 15);
GD.Food[1] = new MainShopFood('burger',1.2, 100);
GD.Food[2] = new MainShopFood('restaurant',8, 2500);
GD.Food[3] = new MainShopFood('factory',40, 55000);
GD.Food[4] = new MainShopFood('farm',200, 850000);
GD.Food[5] = new MainShopFood('castle',900, 10e6);
GD.Food[6] = new MainShopFood('asteroid',4400, 150e6);
GD.Food[7] = new MainShopFood('portal',177013, 2.8e9);
GD.Food[8] = new MainShopFood('fatconvertor',777000, 44e9);

const suffix = ['K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','De','UD','DD','TD','QaD','QiD','SxD','SpD','OcD','NoD','Vi','UV','DV','TV','QaV','QiV','SxV','SpV','OcV','NoV','Tg']
const word = ['Thousand','Million','Billion','Trillion','Quadrillion','Quintillion','Sextillion','Septillion','Octillion','Nonillion','Decillion','Uundecillion','Duodecillion','Tredecillion','Quattourdecillion','Quindecillion','Sexdecillion','Septendecillion','Octodecillion','Novemdecillion','Vigintillion','Unvigintillion','Duovigintillion','Trevigintillion','Quattourvigintillion','Quinvigintillion','Sexvigintillion','Septenvigintillion','Octovigintillion','Novemvigintillion','Trigintillion']
const DateOptions = { year: 'numeric', month: 'long', day: 'numeric' , timeZoneName: 'short' };

//Main misc
var login = false;
var debug = true;
var prevtick = new Date().getTime();
var notifs = 0;

//
var selx = 0;
var sely = 0;
