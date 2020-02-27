var container; 
var scene, camera, render;

init();
animate();
var planets = [];



function init()  {
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


    addSphere(1500,new THREE.Vector3(0,0,0),10,"imgs/starmap.jpg") //star
    addSphere(25,new THREE.Vector3(0,0,0),10,"imgs/sunmap.jpg") //Sun
    addSphere(10,new THREE.Vector3(0,0,120),10,"imgs/Planets/earth/earthmap1k.jpg") //earth
    addSphere(15,new THREE.Vector3(0,0,170),10,"imgs/Planets/mars/mars_1k_color.jpg") //mars
    addSphere(5,new THREE.Vector3(0,0,50),10,"imgs/Planets/mercury/mercurymap.jpg") //mercury    
    addSphere(9,new THREE.Vector3(0,0,90),10,"imgs/Planets/venus/venusmap.jpg") //venus
}
    
function onWindowResize()  {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate()  {
    requestAnimationFrame( animate ); 
    render();    
} 

function render()  {
    renderer.render( scene, camera ); 
} 


function movement(){
    planets.model.position.x = N/2+N*Math.cos(a);
    planets.model.position.y = N*Math.sin(a);

    var x = N/2+2*N*Math.cos(a);
    var z = N/2+2*N*Math.sin(a);
    
}

function addSphere(r, pos, v, texPath){
    var loader = new THREE.TextureLoader();
    var geometry = new THREE.SphereGeometry(r, 32, 32);

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

//    var planet = {}
//    planet.model = sphere;
//   planet.x = pos.x
//    planet.a = 0;
//    planet.v = v;

//    planets.push(planet);
}