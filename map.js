import * as THREE from 'three';

export var map0_data = {
  "data" : [
    [2, 1, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 1, 2]
  ],
  "mobpath" : [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 5, 0, 0, 0, 0, 4, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 6, 0, 0, 0, 0, 0, 7, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 8, 0]
  ]
};

export function loadMap(mapdata, scene, clickableObjs)
{
  var size_Y = mapdata.data.length;
  var size_X = mapdata.data[0].length;

  const material = new THREE.MeshLambertMaterial();
  const geometry = new THREE.BoxGeometry(2,2,2);
  var basic_cube = new THREE.Mesh(geometry, material);

  const road_material = new THREE.MeshLambertMaterial({color : 0x2c3e50});
  var road_cube = new THREE.Mesh(geometry, road_material);

  for(var x  = 0 ; x < size_X ; x++)
  {
    for(var y = 0 ; y < size_Y ;  y++)
    {
        var posx = (x*2) - (size_X/2)*2;
        var posy = (y*2) - (size_Y/2)*2;

        switch(mapdata.data[y][x])
        {
          case 0:
              var tmpbloc = basic_cube.clone();
              tmpbloc.position.set(posx, 0 , posy);
              scene.add(tmpbloc);
              clickableObjs.push(tmpbloc);
          break;

          case 1 :
            var tmpbloc = road_cube.clone();
            tmpbloc.scale.y = 0.8;
            tmpbloc.position.set(posx, -0.2 , posy);
            scene.add(tmpbloc);
          break;
        }
    }
  }
}