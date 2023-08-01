function toTwoDigit(num){
    if(num>=10){
        return num;
    }else{
        return "0" + num;
    }
}
function toText(num,decimal){
    if(GD.shortennumbers){
        suffixused = suffix;
    }else{
        suffixused = word;
    }
    if(num>=1){
        digits = Math.floor(Math.log10(num)) + 1;
        if(digits<=5){
            if(decimal){
                return num.toPrecision(digits + 1);
            }else{
                return num.toPrecision(digits);
            }
        }else{
            suffixlevel = Math.floor((digits - 1)/3);
            num = num / 10**(suffixlevel*3);
            digits = Math.floor(Math.log10(num)) + 1;
            return num.toPrecision(digits + 3) + ' ' + suffixused[suffixlevel - 1];
        }
    }else{
        if(decimal){
            return num.toPrecision(1);
        }else{
            return Math.round(num);
        }
    }
}
function toThreeDigit(num){
    if(num>=100){
        return num;
    }else if(num>=10){
        return "0" + num;
    }else{
        return "00" + num;
    }
}
function replace(str,id,val){
    return str.substr(0, id) + val + str.substr(id+1, str.length);
}
function geometric(a,r,n){
    return a*(1-r**n)/(1-r)
}