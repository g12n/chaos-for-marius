import {distance,add, rotate} from "https://m.g12n.de/vec2/index.js"
import { createGridPts } from "./create-grid-points.js";

import {closestPointOnRay} from "./closest-point-to-ray.js"
import { mapRange } from "./map-range.js";

const square = (cx=100 , cy=10, size=100, rot=0) => {
    let sides = 4;
    let radius = size*Math.sqrt(2) /2;
    let step =  (2*Math.PI)/sides;
    let startRadians = (0.25*Math.PI)+ rot;
    let path = `M ${cx + radius * Math.cos(startRadians)},${cy + radius * Math.sin(startRadians)} `;
    for (let i = 0; i<= sides; i++ ){
        const angle = step * i + startRadians;
        path += `L ${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)} `;		
    }
    path +="Z"
    return new Path2D(path)
}

export const drawMarius = (context, target = [0,0] , cols=10 ) => {

    let {width,height} = context.canvas;

    let offset = width/12

    let innerWidth = width -offset*2;
    let innerHeight = height -offset*2;

    let p1 = [offset,offset];
    let p2 = [ offset +innerWidth, offset + innerHeight ]

    // fill Background
    context.fillStyle="#330011";
    context.lineWidth = width/200;
    context.fillRect(0,0,width,height);

    const gridPoints = createGridPts([offset,offset,innerWidth,innerHeight],cols, cols);

    let u = [width/2, height/2];
    let v = target;
    let tdist = distance(u,v)

     let  spread = (1 - (tdist/ (width/2))).toFixed(2)
	spread = Math.max(spread,0.05)


    gridPoints.map(point =>{

        let closestPoint = closestPointOnRay(point,u,v)

        let dist = distance(point,closestPoint)
        let [x,y] = point;
        
        let variability = mapRange(dist, 0, width* spread, 1, 0, true);

        let distTL = distance(p1,point);
        let distBR = distance(p1,p2)

        let hue = parseInt(Math.random()*40);
        hue = mapRange(distTL, 0, distBR, 0, 40, true);
        let lightness = mapRange(distTL, 0, distBR, 30, 60, true);

        context.fillStyle= `hsl(${hue}, 100%, ${lightness}%)`;
        context.strokeStyle= `hsla(${hue}, 100%, ${lightness+30}%,${variability})`;

        let min = -Math.PI ;
        let max =    Math.PI ;

        let rotation = mapRange(Math.random()*variability, 0, 1, min, max, true);
        let rotation2 = mapRange(Math.random()*variability, 0, 1, min, max, true);
        
        context.fill(square(x, y,innerWidth/cols * 0.65,rotation))
        context.stroke(square(x, y,innerWidth/cols * 0.35,rotation2))
        
    });

}