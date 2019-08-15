  
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
  let whereStart = (x, y, el) => {
    console.log(s)
    let start = document.getElementById(s).getBoundingClientRect()
    let end = document.getElementById(e).getBoundingClientRect()
    let element = el.getBoundingClientRect()
    let uv = (element.left+element.right)/2
    x = [(start.left+start.right)/2 -uv, (end.left+end.right)/2 -uv];
    console.log(uv)
    return x
  }
  let whereEnd = (x, y, el) => {
    let start = document.getElementById(s).getBoundingClientRect()
    let end = document.getElementById(e).getBoundingClientRect()
    let element = el.getBoundingClientRect()
    let uh = (element.top+element.bottom)/2
    let st = (start.top+start.bottom)/2
    console.log(st, uh, element)
    y = [st -uh, (end.top+end.bottom)/2 -uh];
    return y
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
  
  var dotsMovement = (params) => {
    let delay = (el,time, n) =>{
      return 3.5 * time / el.children.length * n
    }
    let distX = [];
    let distY = [];
    if (typeof params.start === Object) {
      let start = whereStart(params.start[0], params.start[1], e.children[i]);
      distX[0] = start[0];
      distY[0] = start[1];
    } else {
      distX[0] = params.start[0];
      distY[0] = params.start[1];
    }
    if (typeof params.end === Object) {
      let end = whereEnd(params.end[0], params.end[1], e.children[i]);
      distX[1] = end[0];
      distY[1] = end[1];
    } else {
      distX[1] = params.end[0];
      distY[1] = params.end[1];
    }

    //mobile functions for distance
    let loopThrough = (e) => {
      for (let i = 0; i < e.children.length; i++){
        animation(i, params.time, e, distX, distY, params.curve, params.color, delay(e, params.time, i))
      }
    }
    if (typeof params.target.length == 'undefined') {
      loopThrough(params.target)
    } else {
      for (let j = 0; j < params.target.length; j++){
        loopThrough(params.target[j])
      }
    }
  }
  
  