const addArrClass = (e, c) => { //e is element and c is classes to add
  for (let i = 0; i < c.length; i++) {
    i != 0 ? e.setAttributeNS(null, "class", " "): null; //doesnt add a space to the first element for class name seperation
    e.setAttributeNS(null, "class", c[i]); //add the classes
  }
}

const makeSVG = (el, howMany, classSVG, classElement, w, h, apnd) => {
  let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttributeNS(null, 'width', w);
  svg.setAttributeNS(null, 'height', h);
  //checks to see if the cssSVG comes in as a string and adds the class if so. if not it adds all the classes in the array
  typeof classSVG === "string" ?  svg.setAttributeNS(null, "class", classSVG) : addArrClass(svg, classSVG);
  // default svg animation builder
  switch (el){


    default:
      let dot = []
      for (let i = 0; i < howMany; i++){
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.push(circle);
        dot[i].className += classElement[i % classElement.length];
        dot[i].setAttributeNS(null, 'cy', -5);
        dot[i].setAttributeNS(null, 'cx', w - 15);
        dot[i].setAttributeNS(null, 'r', 5);
        svg.appendChild(dot[i]);
        dot[i].className +=  ` dot dotNo${i}`;
      }
  }
  return document.querySelector(apnd).appendChild(svg);
}


const where = (e) => {
  return (e[1] + e[0])/2 ;
}

const translateY = (mv, t, crv) => {
  switch (crv) {

    case "cubic":
      return (
        [
          {
            value: [mv[0], mv[1]],
            duration: t * 3.5,
            easing: "easeInOutCubic",
          },
        ]
      )
      break;
    case "cubicY":
      return (
        [
          {
            value: [mv[0], mv[1]],
            duration: t * 3.5,
            easing: "easeInOutCubic",
          },
        ]
      )
      break;
    case "cubicX":
      return (
        [
          {
            value: [mv[0], mv[1]],
            duration: t * 3.5,
            easing: "linear",
          },
        ]
      )
      break;
    case "linear":
      return (
        [
          {
            value: [mv[0], mv[1]],
            duration: t * 1.5,
            easing: "linear",
            delay: t,
          },
        ]
      )
      break;
    case "linearX":
      return (
        [
          {
            value: [mv[0], where(mv)],
            duration: t,
            easing: "linear",
          },
          {
            value: [where(mv), mv[1]],
            duration: t,
            delay: t * 1.5,
            easing: "linear",
          },
        ]
      )
      break;
    case "linearY":
      return (
          [
            {
              value: [mv[0], mv[1]],
              duration: t * 1.5,
              easing: "linear",
              delay: t,
            },
          ]
      )
      break;

    default:
      return (
          [
              {
                  value: [mv[0], where(mv)],
                  duration: t,
                  easing: "linear",
              },
              {
                  value: [where(mv), mv[1]],
                  duration: t,
                  delay: t * 1.5,
                  easing: "linear",
              },
          ]
      )
      break;
  }
}

const translateX = (mv, t, crv) => {
  switch (crv) {
    case "cubic":
      return (
        [
          {
            value: [mv[0], mv[1]],
            duration: t * 3.5,
            easing: "easeInOutCubic",
          },
        ]
      )
      break;
    case "cubicX":
      return (
        [
          {
            value: [mv[0], mv[1]],
            duration: t * 3.5,
            easing: "easeInOutCubic",
          },
        ]
      )
      break;
    case "cubicY":
      return (
        [
          {
            value: [mv[0], mv[1]],
            duration: t * 3.5,
            easing: "linear",
          },
        ]
      )
      break;
    case "linear":
      return (
        [
          {
            value: [mv[0], mv[1]],
            duration: t * 1.5,
            easing: "linear",
            delay: anime.stagger(t / 2, {start: t}),
          },
        ]
      )
      break;
    case "linearX":
      return (
        [
          {
            value: [mv[0], mv[1]],
            duration: t * 1.5,
            easing: "linear",
            delay: anime.stagger(t / 2, {start: t}),
          },
        ]
      )
      break;
    case "linearY":
        return (
            [
                {
                    value: [mv[0], where(mv)],
                    duration: t,
                    easing: "linear",
                },
                {
                    value: [where(mv), mv[1]],
                    duration: t,
                    delay: t * 1.5,
                    easing: "linear",
                },
            ]
        )
        break;
    default:
      return (
        [
          {
            value: [mv[0], mv[1]],
            duration: t * 1.5,
            easing: "linear",
            delay: t,
          },
        ]
      )
      break;
  }
}

let fillColor = (e, t, svg) =>{
  for (let i = 0; i < svg.length; i++){
          let svgStart = document.querySelectorAll(svg[i]);
          for (let j = 0; j < svgStart.length; j++){
            svgStart[j].style.fill = e[0];
          }
        }
  switch (typeof e){

    case "string":
      return (
        [
          {
            value: e,
            duration: t * 1,
            easing: "linear",
            delay: anime.stagger(t / 2, {start: t * .5}),
          },
        ]
      )
      break;

      case "object":

        obj = [
          {
            value: e[0],
            duration: (t * 1.5)/e.length,
            easing: "linear",
            delay: anime.stagger(t / 2)
          },
        ]

        for (let i = 1; i < e.length; i++){
          obj.push({
              value: e[i],
              duration: (t * 1.5)/e.length,
              easing: "linear",
              delay: t / e.length
          });
        }
        return obj;
        break;

    default:
      return "";
      break;
  }
}

let animation = (e, t, svg, mvX, mvY, crv, clr, d) => {
    let animate = anime.timeline({

    }).add({
        targets: svg.children[e],
        translateX: translateX(mvX, t, crv),
        translateY: translateY(mvY, t, crv),
        fill: fillColor(clr, t, svg),
        complete: function(anim){
          animation(e, t, svg, mvX, mvY, crv, clr, 0)
        },
    }, d);
  
    return animate
  
}

let dotsMovement = (svg, mvX, mvY, t, crv, clr) => {
  let delay = (el,time, n) =>{
    return 3.5 * time / el.childNodes.length * n
  }
  //mobile functions for distance
  let loopThrough = (e) => {
    for (i = 0; i < e.childNodes.length; i++){
      
      animation(i, t, e, mvX, mvY, crv, clr, delay(e, t,i))
    }
  }
  if (typeof svg.length == 'undefined') {
    loopThrough(svg)
  } else {
    for (j = 0; j < svg.length; j++){
      loopThrough(svg[j])
    }
  }
}







let dotsLTR = makeSVG("heartBeat", 4, "dot", ["dot-c1", "dot-c2"], 500, 360, ".stage");
let dotsRTL = makeSVG("heartBeat", 7, "dot2", ["dot-c1", "dot-c2"], 500, 360, ".stage");
dotsMovement(dotsLTR, [-40, -360], [10, 360], 2300, "cubicX", "#F30659");
dotsMovement(dotsRTL, [-360, -40], [10, 360], 1000, "cubicX", "#F30659");

