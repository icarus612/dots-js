
let scrollBG = [];
scrollBG[0] = anime({
  targets: ".color-changer-hospitals",
  backgroundColor: ["#F1F8FF", "#004589"],
  easing: "linear",
  autoplay: false,
  duration: 3000
})




    let heartbeat = (element, color, direction = ["LtR"]) => {

      let circle = document.querySelectorAll("circle");

      for (i = 0; i < circle.length; i++){
        circle[i].style.fill = "none";
      }

      let aniLoop = (e) =>{
        let whichWay;
        direction[e] == "RtL" ? whichWay = [anime.setDashoffset, 2275] : whichWay = [2275, anime.setDashoffset];
        let t = () => {
          return Math.random() * 300
        }
        anime({
          targets: `.${element[e]} polyline`,
          strokeDashoffset: whichWay,
          duration: 3000,
          easing: "easeInOutQuad",
          loop: true,
          delay: t()
        });
      }

      if  (typeof element == "string"){
        anime({
          targets: `.${element} polyline`,
          strokeDashoffset: [2088, anime.setDashoffset],
          duration: 3000,
          easing: "easeInOutCubic",
          loop: true,
        });
        } else {
          for(let i = 0; i < element.length; i++){

            scrollBG[scrollBG.length] = anime({
              targets: `.${element[i]} polyline`,
              stroke: [color[0], color[1]],
              easing: "linear",
              autoplay: false,
              duration: 2000
            });


            aniLoop(i);
          }
        }


    }

    heartbeat(["dotsRtL", "dotsLtR", "dotsRtL2"], ["#6194BC", "#CB0018"], ["RtL", "LtR", "RtL"]);

    window.onscroll = () => {
      for (i = 0; i < scrollBG.length; i++){
         scrollBG[i].seek((window.scrollY /2000) * scrollBG[i].duration);
       }
     };
