export const closestPointOnRay = ([px,py], [l1x, l1y], [l2x, l2y])=>{
    const xD = l2x - l1x;
    const yD = l2y - l1y;
    const u = (((px - l1x) * xD) + ((py - l1y) * yD)) / ((xD * xD) + (yD * yD));
    let closest = [l1x + (u * xD), l1y + (u * yD)]; 
    return closest
}