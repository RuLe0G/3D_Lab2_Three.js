var container; 
var scene, camera, render;
var keyboard;

init();
animate();
var planets;
var i = 0;


function init()  {
    planets = [];
    keyboard = new THREEx.KeyboardState();
    container = document.getElementById( 'container' );
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
                                45, window.innerWidth / window.innerHeight, 1, 4000 );  
    camera.position.set(550, 150, 100);

    camera.lookAt(new THREE.Vector3( 0,  0.0, 0));
    
    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setSize( window.innerWidth, window.innerHeight ); 
    renderer.setClearColor( 0x000000, 1); 
 
    container.appendChild( renderer.domElement ); 
 
     window.addEventListener( 'resize', onWindowResize, false ); 


    addSphere(1500,new THREE.Vector3(0,0,0),0,"imgs/starmap.jpg", 0,planets[0]) //star
    addSphere(69.6,new THREE.Vector3(0,0,0),0,"imgs/sunmapY.jpg", 0,planets[0]) //Sun
    addSphere(6.3,new THREE.Vector3(69.6+149,0,0),3,"imgs/Planets/earth/earthmap1k.jpg", 1,planets[0]) //earth
    addSphere(1.7,new THREE.Vector3(69.6+120,6,0,0),3,"imgs/Planets/earth/moon/moonmap1k.jpg", 1, planets[2]) //moon
    addSphere(3.4,new THREE.Vector3(69.6+228,0,0),2.4,"imgs/Planets/mars/mars_1k_color.jpg",1,planets[0]) //mars
    addSphere(2.4,new THREE.Vector3(69.6+58,0,0),4.8,"imgs/Planets/mercury/mercurymap.jpg",1,planets[0]) //mercury    
    addSphere(6,new THREE.Vector3(69.6+108,0,0),3.5,"imgs/Planets/venus/venusmap.jpg",1,planets[0]) //venus
    for (var i = 1; i < planets.length; i++){ 
    draw(planets[i]);
    }

  
}
    
function onWindowResize()  {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate()  {
    requestAnimationFrame( animate ); 
    render();
    
    for (var i = 1; i < planets.length; i++){ 
    movement(planets[i]);
   
    }
} 

function render()  {
    renderer.render( scene, camera ); 

    if (keyboard.pressed("0")) { camera.position.set(550, 150, 100);camera.lookAt(new THREE.Vector3( 0,  0.0, 0));} 
    if (keyboard.pressed("1")) { camera.position.set(planets[5].model.position.x, 50, planets[5].model.position.z); camera.lookAt(new THREE.Vector3( planets[5].model.position.x,  0.0, planets[5].model.position.z))}
    if (keyboard.pressed("2")) { camera.position.set(planets[6].model.position.x, 50, planets[6].model.position.z);camera.lookAt(new THREE.Vector3( planets[6].model.position.x,  0.0, planets[6].model.position.z))}
    if (keyboard.pressed("3")) { camera.position.set(planets[2].model.position.x, 50, planets[2].model.position.z);camera.lookAt(new THREE.Vector3( planets[2].model.position.x,  0.0, planets[2].model.position.z))}
    if (keyboard.pressed("4")) { camera.position.set(planets[4].model.position.x, 50, planets[4].model.position.z);camera.lookAt(new THREE.Vector3( planets[4].model.position.x,  0.0, planets[4].model.position.z))}
    
} 


function movement(planet){

    
   var m = new THREE.Matrix4();
   var m1 = new THREE.Matrix4();
    var m2 = new THREE.Matrix4();


    var x = (planet.x+ planet.child.x) * Math.cos(i*planet.v/10) ;
    var z = (planet.x+ planet.child.x) * Math.sin(i*planet.v/10)  ;

        i+=0.01;
   // var x = planet.x * Math.cos();
   // var z = planet.x * Math.sin();

  



    
    
    m1.makeRotationY( planet.a * i /10);
    m2.setPosition(new THREE.Vector3(x + planet.child.x, 0, z+ planet.child.x));
     
    //m.makeRotationAxis( axis, amgle ); 
    m.multiplyMatrices( m1, m2 ); 
 

    planet.model.matrix = m; 
    planet.model.matrixAutoUpdate = false; 
}

function addSphere(r, pos, v, texPath, ang, planetG){
    var loader = new THREE.TextureLoader();
    var geometry = new THREE.SphereGeometry(r, 64, 64);

    //var material = new THREE.MeshBasicMaterial({color: 0x000000});
    var tex = loader.load( texPath );
    tex.minFilter = THREE.NearestFilter; 

    var material = new THREE.MeshBasicMaterial({
            map: tex,
            side: THREE.DoubleSide
        });

    var sphere = new THREE.Mesh(geometry, material)
    sphere.position.copy(pos);
    scene.add(sphere);

    var planet = {}
    planet.model = sphere,
    planet.x = pos.x,
    planet.a = ang,
    planet.v = v
    planet.child = planetG;

    planets.push(planet);
}

function draw(planet){

    var lineGeometry = new THREE.Geometry();
    var vertArray = lineGeometry.vertices; 
 
    for (var i = 0; i<360; i++ )
    {
        var x = planet.x*Math.cos(i*Math.PI/180);
        var z = planet.x*Math.sin(i*Math.PI/180);

        vertArray.push(new THREE.Vector3(x+ planet.child.x,0,z+ planet.child.x))
    }

    var lineMaterial = new THREE.LineDashedMaterial( {
        color: 0x811ED4, dashSize: 1, gapSize: 1 
        } );
 
    var line = new THREE.Line( lineGeometry, lineMaterial );
     line.computeLineDistances();
      scene.add(line);
}