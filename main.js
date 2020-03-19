var container; 
var scene, camera, render;
var keyboard;
var moon;

var clock = new THREE.Clock();
var planets;
var press;
var i = 0;
var camA = 0;
var press1= false;
var press2= false;
var press3= false;
var press4= false;
var delta;

init();
animate();



function init()  {
    planets = [];
    press = [];
    press.push(press1);
    press.push(press2);
    press.push(press3);
    press.push(press4); 

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


    planets.push(addSphere(1500,new THREE.Vector3(0,0,0),0,"imgs/starmap.jpg", 0,planets[0])) //star
    planets.push(addSphere(69.6,new THREE.Vector3(0,0,0),0,"imgs/sunmapY.jpg", 0,planets[0])) //Sun
    planets.push(addSphere(2.4,new THREE.Vector3(69.6+58,0,0),    4.8/10.0 ,"imgs/Planets/mercury/mercurymap.jpg",1,planets[0])) //mercury
    planets.push(addSphere(6,new THREE.Vector3(69.6+108,0,0),     3.5/10.0 ,"imgs/Planets/earth/earthmap1k.jpg",1,planets[0])) //venus  
    planets.push(addSphere(6.3,new THREE.Vector3(69.6+149,0,0),   3/10.0   ,"imgs/Planets/venus/venusmap.jpg", 1,planets[0])) //earth
    planets.push(addSphere(3.4,new THREE.Vector3(69.6+228,0,0),   2.4/10.0 ,"imgs/Planets/mars/mars_1k_color.jpg",1,planets[0])) //mars    
     //moon
    for (var i = 1; i < planets.length; i++){ 
    scene.add(planets[i].model)
    draw(planets[i]);
    }
    moon = addSphere(1.7,new THREE.Vector3(69.6+12,6,0,0), 3/10.0   ,"imgs/Planets/earth/moon/moonmap1k.jpg", 1, planets[4]);
    scene.add(moon.model)
}



    
function onWindowResize()  {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}



function animate()  {
    var t = 0; 
    delta = clock.getDelta();     
    t+=delta/50.0;
    for (var i = 1; i < planets.length; i++){ 
        movement(planets[i]);        
    }


    //.......... ЛУНА

    var mm = new THREE.Matrix4(); 
    var mm1 = new THREE.Matrix4(); 
    var mm2 = new THREE.Matrix4();

    mm1.makeRotationY( 100 * t ); 
    mm2.setPosition(new THREE.Vector3(15, 0, 0));
    mm.multiplyMatrices( mm1, mm2 );

    mm.multiplyMatrices( mm, mm1 );
    
    mm2.copyPosition(planets[3].model.matrix);
    
    mm.multiplyMatrices( mm2, mm );

    moon.model.matrix = mm; 
    moon.model.matrixAutoUpdate = false;

    //.......... КАМЕРА


    if (keyboard.pressed("Q")) 
    { 
        camA+=0.025;

    }    
    if (keyboard.pressed("E")) 
    { 
        camA-=0.005;
    }

    if (keyboard.pressed("0")) {
        for (var i = 0; i < press.length; i++)
    {
        press[i]=false;
    };
        camera.position.set(550, 150, 100);camera.lookAt(new THREE.Vector3( 0,  0.0, 0));} 
    if (keyboard.pressed("1")) 
    { 
        for (var i = 0; i < press.length; i++)
        {
            press[i]=false;
        };
        press[1] = true;

    }
   
    if (keyboard.pressed("2")) { for (var i = 0; i < press.length; i++)
        {
            press[i]=false;
        };  press[2] = true;}
    if (keyboard.pressed("3")) { for (var i = 0; i < press.length; i++)
        {
            press[i]=false;
        }; press[3] = true;}
    if (keyboard.pressed("4")) { for (var i = 0; i < press.length; i++)
        {
            press[i]=false;
        }; press[4] = true;}
   
    for (var i = 0; i < press.length; i++)
    {
   if (press[i] == true)
   {
        //получение матрицы позиции из матрицы объекта
        var m = new THREE.Matrix4();
        m.copyPosition(planets[i+1].model.matrix);
        //получение позиции из матрицы позиции
        var pos = new THREE.Vector3(0, 0, 0);
        pos.setFromMatrixPosition(m);

        var x = pos.x + (4.0 * planets[i+1].r * Math.cos(-planets[i+1].a*2+ camA));
        var z = pos.z + (4.0 * planets[i+1].r * Math.sin(-planets[i+1].a*2+ camA));
        camera.position.set(x, 0, z); 
        camera.lookAt(pos);
   }
    }
    requestAnimationFrame( animate ); 
    render();
    

} 


function render()  {
    renderer.render( scene, camera ); 


   
    // camera.position.copy();
} 


function movement(planet){

    var m = new THREE.Matrix4(); 
    var m1 = new THREE.Matrix4(); 
    var m2 = new THREE.Matrix4();
    planet.a += planet.v * delta;

    m1.makeRotationY( planet.a ); 
    m2.setPosition(new THREE.Vector3(planet.x, 0, 0));
      
    m.multiplyMatrices( m1, m2 );
    m.multiplyMatrices( m, m1 ); 
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
    

    var planet = {}
    planet.model = sphere;
    planet.x = pos.x;
    planet.a = 0.0;
    planet.v = v;
    planet.child = planetG;
    planet.r = r;

    return planet;
}

function draw(planet){

    var lineGeometry = new THREE.Geometry();
    var vertArray = lineGeometry.vertices; 
 
    for (var i = 0; i<360; i++ )
    {
        var x = planet.model.position.x*Math.cos(i/10);
        var z = planet.model.position.x*Math.sin(i/10);

        vertArray.push(new THREE.Vector3(x,0,z))
    }

    var lineMaterial = new THREE.LineDashedMaterial( {
        color: 0x811ED4, dashSize: 1, gapSize: 1 
        } );
 
    var line = new THREE.Line( lineGeometry, lineMaterial );
     line.computeLineDistances();
      scene.add(line);

}