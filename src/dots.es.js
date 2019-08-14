import anime from '../anime/lib/anime.es.js';  
  
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
       
        let obj = [
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
          
    
  }
  let howFarX = (s, e, el) => {
    console.log(el)
    let start = document.getElementById(s).getBoundingClientRect()
    let end = document.getElementById(e).getBoundingClientRect()
    let element = el.getBoundingClientRect()
    let uv = (element.left+element.right)/2
    let x = [(start.left+start.right)/2 -uv, (end.left+end.right)/2 -uv];
    console.log(uv)
    return x
  }
  let howFarY = (s, e, el) => {
    let start = document.getElementById(s).getBoundingClientRect()
    let end = document.getElementById(e).getBoundingClientRect()
    let element = el.getBoundingClientRect()
    let uh = (element.top+element.bottom)/2
    let st = (start.top+start.bottom)/2
    console.log(st, uh, element)
    let y = [st -uh, (end.top+end.bottom)/2 -uh];
    return y
  }
  let animation = (e, t, svg, start, end, crv, clr, d) => {

      let animate = anime.timeline({
  
      }).add({
          targets: svg.children[e],         
          translateX: translateX(start, t, crv),
          translateY: translateY(end, t, crv),
          fill: fillColor(clr, t, svg),
          backgroundColor: fillColor(clr, t, svg),
          complete: function(anim){
            animation(e, t, svg, start, end, crv, clr, 0)
          },
      }, d);
    
      return animate
    
  }
  
  export let dotsMovement = (svg, start, end, t, crv, clr) => {
    let delay = (el,time, n) =>{
      return 3.5 * time / el.children.length * n
    }
    let distX = [start[0], end[0]];
    let distY = [start[1], end[1]];
    //mobile functions for distance
    let loopThrough = (e) => {
      for (let i = 0; i < e.children.length; i++){
        animation(i, t, e, howFarX(distX[0], distX[1], e.children[i]), howFarY(distY[0], distY[1], e.children[i]), crv, clr, delay(e, t, i))
      }
    }
    if (typeof svg.length == 'undefined') {
      loopThrough(svg)
    } else {
      for (let j = 0; j < svg.length; j++){
        loopThrough(svg[j])
      }
    }
  }
  
  