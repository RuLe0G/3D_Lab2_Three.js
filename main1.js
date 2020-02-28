var container; 
var scene, camera, render;

init();
animate();
var planets;
var i = 0;


function init()  {
    planets = [];
    container = document.getElementById( 'container' );
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
                                45, window.innerWidth / window.innerHeight, 1, 4000 );  
    camera.position.set(400, 100, 100);

    camera.lookAt(new THREE.Vector3( 0,  0.0, 0));
    
    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setSize( window.innerWidth, window.innerHeight ); 
    renderer.setClearColor( 0x000000, 1); 
 
    container.appendChild( renderer.domElement ); 
 
     window.addEventListener( 'resize', onWindowResize, false ); 


    addSphere(1500,new THREE.Vector3(0,0,0),0,"imgs/starmap.jpg", 0) //star
    addSphere(25,new THREE.Vector3(0,0,0),0,"imgs/sunmapY.jpg", 0) //Sun
    addSphere(10,new THREE.Vector3(120,0,0),3,"imgs/Planets/earth/earthmap1k.jpg", 1) //earth
    addSphere(15,new THREE.Vector3(170,0,0),2.4,"imgs/Planets/mars/mars_1k_color.jpg",1) //mars
    addSphere(5,new THREE.Vector3(50,0,0),4.8,"imgs/Planets/mercury/mercurymap.jpg",1) //mercury    
    addSphere(9,new THREE.Vector3(90,0,0),3.5,"imgs/Planets/venus/venusmap.jpg",1) //venus
    for (var i = 1; i < planets.length; i++){ 
    draw(planets[i].x);
       
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
} 


function movement(planet){



   var m = new THREE.Matrix4();
   var m1 = new THREE.Matrix4();
    var m2 = new THREE.Matrix4();


        var x = planet.x * Math.cos(i*planet.v/10) ;
        var z = planet.x * Math.sin(i*planet.v/10);

        i+=0.01;
   // var x = planet.x * Math.cos();
   // var z = planet.x * Math.sin();

   
    
    
    m1.makeRotationY( planet.a * i /10);
    m2.setPosition(new THREE.Vector3(x, 0, z));
     
    //m.makeRotationAxis( axis, amgle ); 
    m.multiplyMatrices( m1, m2 ); 
 

    planet.model.matrix = m; 
    planet.model.matrixAutoUpdate = false; 
}

function addSphere(r, pos, v, texPath, ang){
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
    

    planets.push(planet);
}

function draw(r){

    var lineGeometry = new THREE.Geometry();
    var vertArray = lineGeometry.vertices; 
 
    for (var i = 0; i<360; i++ )
    {
        var x = r*Math.cos(i*Math.PI/180);
        var z = r*Math.sin(i*Math.PI/180);

        vertArray.push(new THREE.Vector3(x,0,z))
    }

    var lineMaterial = new THREE.LineDashedMaterial( {
        color: 0x811ED4, dashSize: 1, gapSize: 1 
        } );
 
    var line = new THREE.Line( lineGeometry, lineMaterial );
     line.computeLineDistances();
      scene.add(line);
}