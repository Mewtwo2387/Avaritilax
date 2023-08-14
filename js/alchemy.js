// 0: No alchemy corresponding to that ID; 1: Alchemy exist, but not yet crafted; 2: Crafted
var AlchemyList;
function initalchemy(restart){
    var startloadalchemy = new Date().getTime();
    document.getElementById("loginload").innerHTML = "Loading alchemy"
    $.getJSON("alchemy.json?1", function(json) {
        AlchemyList = json;
        GD.Alchemy = '';
        if(restart){
            for(var i = 0; i<=99 ; i++){
                GD.Alchemy += AlchemyList[i].Implemented;
                if(AlchemyList[i].Implemented == 1){
                    var div = `
                    <div id="C${toThreeDigit(i)}" class="shopitemdisplay">
                    <img class="img32px60" src="assets/images/icons-alchemy/C${toThreeDigit(i)}.png">
                    <h2 class="shopitem-label">${AlchemyList[i].Name}</h2>
                    <button type="button" class="shopitem-button" onclick="buyalchemy(${i})">Craft</button><br>
                    <p class="ps">${AlchemyList[i].Desc}</p><br>
                    <p class="ps changelog-quote">${AlchemyList[i].Quote}</p><br>
                    img class="img32px" src="assets/images/icons-main/catalyst.png" style="display: inline;"><p>${AlchemyList[i].Catalyst}</p>`
                    var itemlist = ['fishstick','GoldenFishball','stone','refinedstone','darkstone','refineddarkstone','darkstuff','coal','haematite','iron','refinediron','silver','refinedsilver','gold','refinedgold','lumium','diamond','refineddiamond','crystal','soulstone','soulgem']
                    for(var j=0; j<itemlist.length; j++){
                        if(AlchemyList[i][itemlist[j]] != 0){
                            div += `<img class="img32px" src="assets/images/icons-mine-items/${itemlist[j]}.png" style="display: inline;"><p>${AlchemyList[i][itemlist[j]]}</p>`
                        }
                    }
                    div += '</div>'
                    console.log(div)
                    document.getElementById("alchemy").innerHTML += div;
                }
            }
        }else{
            for(var i = 0; i<=99 ; i++){
                GD.Alchemy += AlchemyList[i].Implemented;
            }
            try{
                GD.Alchemy = JSON.parse(localStorage['GD']).Alchemy
            }catch(SyntaxError){
                console.log('no save (alchemy)')
            }
            for(var i = 0; i<=99 ; i++){
                if(AlchemyList[i].Implemented==1 && GD.Alchemy[i]==0){ //update
                    GD.Alchemy = replace(GD.Alchemy,i,'1');
                }
                if(GD.Alchemy[i]==1){
                    var div = `
                    <div id="C${toThreeDigit(i)}" class="shopitemdisplay">
                    <img class="img32px60" src="assets/images/icons-alchemy/C${toThreeDigit(i)}.png">
                    <h2 class="shopitem-label">${AlchemyList[i].Name}</h2>
                    <button type="button" class="shopitem-button" onclick="buyalchemy(${i})">Craft</button><br>
                    <p class="ps">${AlchemyList[i].Desc}</p><br>
                    <p class="ps changelog-quote">${AlchemyList[i].Quote}</p><br>
                    <img class="img32px" src="assets/images/icons-main/catalyst.png" style="display: inline;"><p>${AlchemyList[i].Catalyst}</p>`
                    var itemlist = ['fishstick','GoldenFishball','stone','refinedstone','darkstone','refineddarkstone','darkstuff','coal','haematite','iron','refinediron','silver','refinedsilver','gold','refinedgold','lumium','diamond','refineddiamond','crystal','soulstone','soulgem']
                    for(var j=0; j<itemlist.length; j++){
                        if(AlchemyList[i][itemlist[j]] != 0){
                            div += `<img class="img32px" src="assets/images/icons-mine-items/${itemlist[j]}.png" style="display: inline;"><p>${AlchemyList[i][itemlist[j]]}</p>`
                        }
                    }
                    div += '</div>'
                    console.log(div)
                    document.getElementById("alchemy").innerHTML += div;
                }
            }
        }
        if(debug){console.log('DEBUG: Alchemy init\'ed @'+ (new Date().getTime() - startloadalchemy) + 'ms');}
    });
    loadmissions();
}

function buyalchemy(id){
    var itemlist = ['Catalyst','fishstick','GoldenFishball','stone','refinedstone','darkstone','refineddarkstone','darkstuff','coal','haematite','iron','refinediron','silver','refinedsilver','gold','refinedgold','lumium','diamond','refineddiamond','crystal','soulstone','soulgem']
    var craftable = true
    for(var j=0; j<itemlist.length; j++){
        if(AlchemyList[id][itemlist[j]] != 0){
            if(AlchemyList[id][itemlist[j]]>GD[itemlist[j]]){
                craftable = false
            }
        }
    }   
    if(craftable){
        for(var j=0; j<itemlist.length; j++){
            if(AlchemyList[id][itemlist[j]] != 0){
                GD[itemlist[j]] -= AlchemyList[id][itemlist[j]]
            }
        } 
        boughtalchemy(id)
    }         
}
function boughtalchemy(id){
    document.getElementById('C'+toThreeDigit(id)).style.display = 'none';
    GD.Alchemy = replace(GD.Alchemy,id,'2');
    if(AlchemyList[id].Type=='pick'){
        if(GD.pickLevel<id){GD.pickLevel = id}
    }
}
