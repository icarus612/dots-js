
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
  let el = svg.children
  for (let i = 0; i < svg.children.length; i++){
    el[i].style.fill = e[0];
    el[i].style.backgroundColor = e[0];
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
        backgroundColor: fillColor(clr, t, svg),
        complete: function(anim){
          animation(e, t, svg, mvX, mvY, crv, clr, 0)
        },
    }, d);
  
    return animate
  
}

var dotsMovement = (svg, mvX, mvY, t, crv, clr) => {
  let delay = (el,time, n) =>{
    return 3.5 * time / el.children.length * n
  }
  //mobile functions for distance
  let loopThrough = (e) => {
    for (i = 0; i < e.children.length; i++){
      
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
