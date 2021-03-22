function randint(low, high) {
    return Math.round((Math.random() * (high-low))+low);
}
function choice(li) {
    return li[randint(0,li.length-1)];
}
//random functionality

function findscrolled(element){//find if element is scrolled to or not, used to trigger slide-in divs
    doctop=$(window).scrollTop()
    docheight=$(window).outerHeight()
    elementtop=$(element).offset().top
    elementheight=$(element).outerHeight()

    //true if the bottom of the element is scrolled to
    return (doctop > (elementtop+elementheight-docheight))
}


currenthouse=1
function changedisplay(num,ele=0){//operates the slideshow
    document.getElementById("leftarrow").onclick=""
    document.getElementById("rightarrow").onclick=""
    //prevent double clicking so the function doesn't fire twice at once
    currenthouse+=num
    if (currenthouse<1){
        currenthouse=5
    }
    if (currenthouse>5){
        currenthouse=1
    }//loop back to start
    fade=1
    decreasefade=setInterval(function(){ 
        fade-=0.02
        document.getElementById("showcase").style.opacity=fade
        if (fade<=0.3){//only partially fades out, then fades back in
            clearInterval(decreasefade)
            document.getElementById("showcase").src="./images/house"+currenthouse+".jpg"
            //change image being displayed
            increasefade=setInterval(function(){
                fade+=0.01
                document.getElementById("showcase").style.opacity=fade
                //change opacity to show background
                if (fade>=1){
                    clearInterval(increasefade)
                    document.getElementById("leftarrow").onclick=function() {changedisplay(-1)}
                    document.getElementById("rightarrow").onclick=function() {changedisplay(1)}
                    //re-enable clicking
                }
            },1)
        }
    },1)
}

function search(){
    window.location.href="https://www.realestate.com.au/"+document.getElementById("buysell").value.toLowerCase()+"/in-"+document.getElementById("searchbar").value+"/list-1"
}

leftarrow=document.getElementById("leftarrow")
rightarrow=document.getElementById("rightarrow")
opacitynum=0
autoslideshow=setInterval(function() {changedisplay(1)},7000)
//automatically moves through the slideshow every 7 seconds

document.getElementById("showcase").addEventListener("mouseover",function(){
    try{
        clearInterval(opacitydecrease)
        //stop fading out
    }catch{}
    clearInterval(autoslideshow)
    //don't move slideshow while the user has their mouse over it
    opacityincrease=setInterval(function(){
        opacitynum+=0.1
        leftarrow.style.opacity=opacitynum
        rightarrow.style.opacity=opacitynum
        if (opacitynum>=1){
            clearInterval(opacityincrease)
        }
        //fade in until fully visible
    },15)
    //makes the buttons fade in when the mouse goes onto the slideshow
})
document.getElementById("showcase").addEventListener("mouseout",function(){
    try{
        clearInterval(opacityincrease)
        //stop fading in
    }catch{}
    autoslideshow=setInterval(function() {changedisplay(1)},7000)
    //restart the automatic slideshow
    opacitydecrease=setInterval(function(){
        opacitynum-=0.1
        leftarrow.style.opacity=opacitynum 
        rightarrow.style.opacity=opacitynum
        if (opacitynum<=0){
            clearInterval(opacitydecrease)
        }
        //fade out until fully invisible
    },10)
    //buttons fade out when the mouse exits the slideshow
})

$(window).scroll(function(){
    //triggers slide-in whenever user scrolls down to the given divs
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

window.addEventListener("keydown",event => {//did it this way because slack to actually make a form element
    if (event.keyCode==13 && document.activeElement.id=="searchbar"){//keycode 13: enter key
        search()
    }
})
