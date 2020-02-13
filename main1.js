var container;
var camera, scene, renderer;

var x=0, y=0, z=0;

init();
animate();

function init() 
{
    container = document.getElementById( 'container');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000);
    camera.position.set(300, 0, 0);
    camera.lookAt(new THREE.Vector3( 0,  0.0, 0));  
    renderer = new THREE.WebGLRenderer( { antialias: false} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x00000000, 1);
    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false);
    Star();
    Sun();
}

function onWindowResize() 
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate()
{
    requestAnimationFrame( animate);
    render();
}

function render() 
{
    renderer.render( scene, camera );
}

function Sun()
{
    var loader = new THREE.TextureLoader();
    var geometry = new THREE.SphereGeometry( 10, 32, 32 ); 
    var tex = loader.load( "imgs/sunmap.jpg" );
    tex.minFilter = THREE.NearestFilter; 

    var material = new THREE.MeshBasicMaterial({
            map: tex,
            side: THREE.DoubleSide
        });
    
    var sphere = new THREE.Mesh( geometry, material );

    scene.add( sphere );
    
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z; 

    sphere.position.set(x,y,z); 
 
    var pos = new THREE.Vector3(x,y,z);
    sphere.position.copy(pos);
}

function Star()
{
    var loader = new THREE.TextureLoader();
    var geometry = new THREE.SphereGeometry( 1000, 32, 32 ); 
    var tex = loader.load( "imgs/starmap.jpg" );
    tex.minFilter = THREE.NearestFilter; 

    var material = new THREE.MeshBasicMaterial({
            map: tex,
            side: THREE.DoubleSide
        });
    
    var sphere = new THREE.Mesh( geometry, material );

    scene.add( sphere );
    
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z; 

    sphere.position.set(x,y,z); 
 
    var pos = new THREE.Vector3(x,y,z);
    sphere.position.copy(pos);
}