function randint(low, high) {
    return Math.round((Math.random() * (high-low))+low);
}
function choice(li) {
    return li[randint(0,li.length-1)];
}

function findscrolled(element){//find if element is scrolled to or not, used to trigger slide-in divs
    doctop=$(window).scrollTop()
    //docbottom=doctop+$(window).height()
    docheight=$(window).outerHeight()
    elementtop=$(element).offset().top
    //elementbottom=elementtop+$(element).height()
    elementheight=$(element).outerHeight()
    //true if the top and the bottom of the element are in view
    //return ((elementbottom <= docbottom) && (elementtop>=doctop));
    return (doctop > (elementtop+elementheight-docheight))
}


currenthouse=1
function changedisplay(num,ele=0){
    document.getElementById("leftarrow").onclick=""
    document.getElementById("rightarrow").onclick=""
    currenthouse+=num
    if (currenthouse<1){
        currenthouse=5
    }
    if (currenthouse>5){
        currenthouse=1
    }
    fade=1
    decreasefade=setInterval(function(){
        fade-=0.02
        document.getElementById("showcase").style.opacity=fade
        if (fade<=0.3){
            clearInterval(decreasefade)
            document.getElementById("showcase").src="./images/house"+currenthouse+".jpg"
            increasefade=setInterval(function(){
                fade+=0.01
                document.getElementById("showcase").style.opacity=fade
                if (fade>=1){
                    clearInterval(increasefade)
                    document.getElementById("leftarrow").onclick=function() {changedisplay(-1)}
                    document.getElementById("rightarrow").onclick=function() {changedisplay(1)}
                }
            },1)
            
        }
    },1)
}
leftarrow=document.getElementById("leftarrow")
rightarrow=document.getElementById("rightarrow")
opacitynum=0
autoslideshow=setInterval(function() {changedisplay(1)},7000)
document.getElementById("showcase").addEventListener("mouseover",function(){
    try{
        clearInterval(opacitydecrease)
    }catch{}
    clearInterval(autoslideshow)
    opacityincrease=setInterval(function(){
        opacitynum+=0.1
        leftarrow.style.opacity=opacitynum
        rightarrow.style.opacity=opacitynum
        if (opacitynum>=1){
            clearInterval(opacityincrease)
        }
    },15)
})
document.getElementById("showcase").addEventListener("mouseout",function(){
    try{
        clearInterval(opacityincrease)
    }catch(err){console.log(err)}
    autoslideshow=setInterval(function() {changedisplay(1)},7000)
    opacitydecrease=setInterval(function(){
        opacitynum-=0.1
        leftarrow.style.opacity=opacitynum
        rightarrow.style.opacity=opacitynum
        if (opacitynum<=0){
            clearInterval(opacitydecrease)
        }
    })
})

$(window).scroll(function(){
    if (findscrolled("#achievements")){
        document.getElementById("achievements").classList.add("slideleft")
    }
    if (findscrolled("#reviews")){
        document.getElementById("reviews").classList.add("slideright")
    }
    if (findscrolled("#contact")){
        document.getElementById("contact").classList.add("slideleft")
    }
})
