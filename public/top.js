let controls, mixer;
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  // const textureloader = new THREE.TextureLoader();
  // textureloader.load('./star.png', function (texture) {
  //   scene.background = texture;
  // });
  scene.background = new THREE.Color('#CDE6C7');
  renderer.outputEncoding = THREE.sRGBEncoding;

  // ライト
  // 平行光源（太陽のようなライト）
  // 環境光（全体を均等に照らす光）
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // 平行光源（太陽のような方向性のある光）
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(5, 10, 7);
  scene.add(directionalLight);

  // Dracoローダー設定
  let dracoLoader = new THREE.DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');


  // GLTFローダー設定
  let loader = new THREE.GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

//   const texture = new THREE.Texture();
//   texture.format = THREE.RGBAFormat;

  loader.load('./night_trees_new.glb', function (gltf) {
    const model = gltf.scene;
    // gltf.scene.rotation.z = Math.PI; // 180度回転（上下逆さ修正）
    scene.add(model);

    // デフォルトカメラの設定
  const defaultCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  defaultCamera.position.set(0, 5, 8);

  // カメラの読み込み
  if (gltf.cameras && gltf.cameras.length > 0) {
    const cameraName = "1カメ";
    const foundCamera = gltf.cameras.find(cam => cam.name === cameraName);

    camera = foundCamera;  // 見つかったカメラを使用
    camera.up.set(0, 1, 0); // Three.jsは Y を上方向に設定（通常）

    camera.rotation.Y += Math.PI; // 上下反転を修正
    camera.position.z += 1;
  } else {
    camera = defaultCamera;  // GLTFにカメラがない場合、デフォルトカメラを使用
  }
  camera.rotation.y = Math.PI;  // Y軸で180度回転させる
  // camera.lookAt(new THREE.Vector3(0, 0, 0)); // 例えば、シーンの中心を向かせる
  // camera.flipY = false
  scene.add(camera);  // カメラをシーンに追加

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // 回転を無効化（マウスドラッグによる回転が効かなくなる）
  controls.enableRotate = false;

  // パン（平行移動）を無効化
  controls.enablePan = false;

  // ズームは有効（マウスホイール）
  controls.enableZoom = false;

    // アニメーション設定
    if (gltf.animations && gltf.animations.length) {
      mixer = new THREE.AnimationMixer(model); // モデルにアニメーションを適用
      gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play(); // アニメーション再生
        action.setLoop(THREE.LoopRepeat, Infinity); // ループ再生
      });
    }

    // アニメーション開始
    animate();
  });

  function animate() {
    requestAnimationFrame(animate);

    // アニメーションの更新
    if (mixer) mixer.update(0.008); // アニメーション速度調整（0.01を調整する）

    // コントロールの更新
    // if (controls) controls.update();

    if (camera.position.y > 0.1) {
      camera.position.y = 0.1;
    }

    // レンダリング
    if (camera) renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    if (camera) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  });