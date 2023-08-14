function generate(){
    GD.generated = true;
    GD.mine = [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]
    GD.exposed = [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]
    for(var i=0;i<20;i++){
        for(var j=0;j<20;j++){
            if(i+j<7){
                GD.mine[j][i] = 'air'
            }else{
                GD.mine[j][i] = 'stone'
            }
            if(i+j<8){
                GD.exposed[j][i] = true
            }else{
                GD.exposed[j][i] = false
            }
        }
        for(var j=20;j<40;j++){
            GD.mine[j][i] = 'darkstone'
            GD.exposed[j][i] = false
        }
    }
    GD.mine[3][4] = 'air'
    GD.mine[2][5] = 'air'
    GD.exposed[2][6] = true
    GD.exposed[3][5] = true
    GD.exposed[4][4] = true
    GD.mine[38][19] = 'soulstone'
    GD.mine[39][18] = 'soulstone'
    GD.mine[39][19] = 'soulgem'

    //LAYER 2
    i = 20
    while(i!=0){
        var x = Math.floor(Math.random()*10) + 10
        var y = Math.floor(Math.random()*20)
        if(GD.mine[x][y]=='stone'){
            GD.mine[x][y]='haematite'
            i--
        }
    }

    //LAYER 3
    i = 28
    while(i!=0){
        var x = Math.floor(Math.random()*10) + 20
        var y = Math.floor(Math.random()*20)
        if(GD.mine[x][y]=='darkstone'){
            if(i>16){
                GD.mine[x][y]='haematiteD'
            }else{
                GD.mine[x][y]='silver'
            }
            i--
        }
    }

    //LAYER 4
    i = 27
    while(i!=0){
        var x = Math.floor(Math.random()*10) + 30
        var y = Math.floor(Math.random()*20)
        if(GD.mine[x][y]=='darkstone'){
            if(i>19){
                GD.mine[x][y]='haematiteD'
            }else if(i>11){
                GD.mine[x][y]='silver'
            }else if(i>3){
                GD.mine[x][y]='gold'
            }else{
                GD.mine[x][y]='fishball'
            }
            i--
        }
    }

    //UPPER RIGHT
    var i = 40
    while(i!=0){
        var x = Math.floor(Math.random()*20)
        var y = Math.floor(Math.random()*10) + 10
        if(GD.mine[x][y]=='stone'){
            GD.mine[x][y]='coal'
            i--
        }
    }

    //LOWER RIGHT
    var i = 8
    while(i!=0){
        var x = Math.floor(Math.random()*20) + 20
        var y = Math.floor(Math.random()*10) + 10
        if(GD.mine[x][y]=='darkstone'){
            if(i>3){
                GD.mine[x][y]='diamond'
            }else{
                GD.mine[x][y]='crystal'
            }
            i--
        }
    }
    showmine()
}

function showmine(){
    if(GD.generated){
        document.getElementById('mining').innerHTML += '<br>'

        for(var i=0;i<40;i++){
            for(var j=0;j<20;j++){
                if(GD.exposed[i][j]){
                    draw(`assets/images/icons-mine/${GD.mine[i][j]}.jpg`,i,j)
                }else{
                    draw(`assets/images/icons-mine/locked.jpg`,i,j)
                }
            }
        }
        select(0,0)
    }
}

function draw(src,x,y){
    var canvas = document.getElementById('miningcanvas')
    var ctx = canvas.getContext('2d');
    var image = new Image();
    image.src = src;
    image.onload = function(){
        ctx.drawImage(image,y*16,x*16)
        console.log(x + ' ' + y)
    }
}

function mineupdate(){
    document.getElementById('stam').innerHTML = toText(GD.stamina,false)
    document.getElementById('nextstam').innerHTML = toText(GD.nextstam,false)
    var itemlist = ['fishstick','GoldenFishball','stone','refinedstone','darkstone','refineddarkstone','darkstuff','coal','haematite','iron','refinediron','silver','refinedsilver','gold','refinedgold','lumium','diamond','refineddiamond','crystal','soulstone','soulgem']
    for(var i=0; i<itemlist.length; i++){
        if(GD[itemlist[i]]>0){
            document.getElementById(itemlist[i]).style.display = 'inline-block'
            document.getElementById(itemlist[i] + 'amount').innerHTML = GD[itemlist[i]]
        }else{
            document.getElementById(itemlist[i]).style.display = 'none'
        }
    }
    var picklevel = ['None','Fishstick','Stone','Darkstone','Iron','Lumium','Diamond','Soulstone']
    document.getElementById('pickaxename').innerHTML = picklevel[GD.pickLevel+1]
    checkmine();
}

function mine(){
    var ore = GD.mine[selx][sely]
    if(GD.mine[selx][sely]=='fishball'){ore='GoldenFishball'}
    else if(GD.mine[selx][sely]=='haematiteD'){ore='haematite'}
    GD[ore]++
    if(ore=='darkstone'){GD.darkstuff++}
    for(var i=1001;i<=1009;i++){
        if(AchiList[i].Type==ore && GD.Achievements[i]==1){
                unlockachi(i);
        }
    }
    GD.mine[selx][sely] = 'air'
    draw(`assets/images/icons-mine/air.jpg`,selx,sely)
    try{GD.exposed[selx-1][sely]=true;draw(`assets/images/icons-mine/${GD.mine[selx-1][sely]}.jpg`,selx-1,sely)}catch(TypeError){}
    try{GD.exposed[selx+1][sely]=true;draw(`assets/images/icons-mine/${GD.mine[selx+1][sely]}.jpg`,selx+1,sely)}catch(TypeError){}
    try{GD.exposed[selx][sely+1]=true;draw(`assets/images/icons-mine/${GD.mine[selx][sely+1]}.jpg`,selx,sely+1)}catch(TypeError){}
    try{GD.exposed[selx][sely-1]=true;draw(`assets/images/icons-mine/${GD.mine[selx][sely-1]}.jpg`,selx,sely-1)}catch(TypeError){}
    GD.stamina--
    update()
}

function sel(event){
    const rect = document.getElementById('miningcanvas').getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    select(Math.floor(y/16),Math.floor(x/16))
}
function select(x,y){
    if(GD.exposed[selx][sely]){
        draw(`assets/images/icons-mine/${GD.mine[selx][sely]}.jpg`,selx,sely)
    }else{
        draw(`assets/images/icons-mine/locked.jpg`,selx,sely)
    }
    selx = x
    sely = y
    draw(`assets/images/icons-mine/select.png`,selx,sely)
    checkmine()
}

function toggleminebutton(locked){
    if(locked){
        document.getElementById('minebutton').classList.add('locked')
        document.getElementById('minebutton').classList.remove('unlocked')
        document.getElementById('minebutton').disabled = true
    }else{
        document.getElementById('minebutton').classList.add('unlocked')
        document.getElementById('minebutton').classList.remove('locked')
        document.getElementById('minebutton').disabled = false
    }
}

function checkmine(){
    if(GD.stamina==0){
        toggleminebutton(true)
        document.getElementById('minebutton').innerHTML = 'Cannot Mine (No Stamina)'
    }else{ 
        if(GD.exposed[selx][sely]){
            if(GD.mine[selx][sely]=='air'){
                toggleminebutton(true)
                document.getElementById('minebutton').innerHTML = 'Cannot Mine (Air)'
            }else{
                toggleminebutton(false)
                document.getElementById('minebutton').innerHTML = 'Mine'
            }
        }else{
            toggleminebutton(true)
            document.getElementById('minebutton').innerHTML = 'Cannot Mine (Unrevealed)'
        }
    }
}

function loadmines(){
    if(!GD.generated){
        document.getElementById("loginload").innerHTML = "Generating Mines"
        generate();
    }else{
        document.getElementById("loginload").innerHTML = "Loading Mines"
        showmine();
    }
    contload();
}