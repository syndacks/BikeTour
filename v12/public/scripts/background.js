var counter = 0;
function changeBG(){
    var imgs = [
        "url(../images/coverPhoto1.jpg)",
        "url(../images/coverPhoto2.jpg)",
        "url(../images/coverPhoto3.jpg)",
        "url(../images/coverPhoto4.jpg)"
      ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 2000);


