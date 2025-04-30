(() => {
  // app/javascript/custom/top.js
  var mixer;
  var scene = new THREE.Scene();
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  scene.background = new THREE.Color("#CDE6C7");
  renderer.outputEncoding = THREE.sRGBEncoding;
  var ambientLight = new THREE.AmbientLight(16777215, 0.5);
  scene.add(ambientLight);
  var directionalLight = new THREE.DirectionalLight(16777215, 0.5);
  directionalLight.position.set(5, 10, 7);
  scene.add(directionalLight);
  var dracoLoader = new THREE.DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  var loader = new THREE.GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.load("./night_trees_new.glb", function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    const defaultCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e3);
    defaultCamera.position.set(0, 5, 8);
    if (gltf.cameras && gltf.cameras.length > 0) {
      const cameraName = "1\u30AB\u30E1";
      const foundCamera = gltf.cameras.find((cam) => cam.name === cameraName);
      camera = foundCamera;
      camera.up.set(0, 1, 0);
      camera.rotation.Y += Math.PI;
      camera.position.z += 1;
    } else {
      camera = defaultCamera;
    }
    camera.rotation.y = Math.PI;
    scene.add(camera);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false;
    controls.enablePan = false;
    controls.enableZoom = false;
    if (gltf.animations && gltf.animations.length) {
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
        action.setLoop(THREE.LoopRepeat, Infinity);
      });
    }
    animate();
  });
  function animate() {
    requestAnimationFrame(animate);
    if (mixer) mixer.update(8e-3);
    if (camera.position.y > 0.1) {
      camera.position.y = 0.1;
    }
    if (camera) renderer.render(scene, camera);
  }
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    if (camera) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  });
})();
//# sourceMappingURL=assets/top.js.map
