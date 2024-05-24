document.addEventListener('keydown', (event) => {
    switch(event.key){
        case 's':
            save();
            GD.save++;
            break;
        case 'm':
            document.getElementById('minebutton').click();
            break;
        case 'q':
            navigate('basicshop', event);
            break;
        case 'w':
            navigate('evolutionshop', event);
            break;
        case 'e':
            navigate('ascensionshop', event);
            break;
        case 'r':
            navigate('upgrades', event);
            break;
        case 't':
            navigate('isekaiportal', event);
            break;
        case 'y':
            navigate('mining', event);
            break;
        case 'u':
            navigate('exploring', event);
            break;
        case 'i':
            navigate('alchemy', event);
            break;
        case 'o':
            navigate('research', event);
            break;
        case 'p':
            navigate('missions', event);
            break;
        case '[':
            navigate('achievements', event);
            break;
        case ']':
            navigate('infosettings', event);
            break;
        default:
            break;
    }
    if(event.key <= 9 && event.key >= 1){
        if(event.ctrlKey){
            buyfoodn(event.key - 1, 100)
        }else if(event.altKey){
            buyfoodn(event.key - 1, 10)
        }else{
            buyfoodn(event.key - 1, 1)
        }
    }
} , false )
