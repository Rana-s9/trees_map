(() => {
  // app/javascript/custom/trees.js
  document.addEventListener("turbo:load", function() {
    const treeDataElement = document.getElementById("treeData");
    const trees = treeDataElement ? JSON.parse(treeDataElement.textContent) : [];
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5e3);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    scene.background = new THREE.Color("#CDE6C7");
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.maxPolarAngle = Math.PI / 2.2;
    controls.minPolarAngle = 0;
    controls.enableRotate = true;
    window.camera = camera;
    window.controls = controls;
    const cameraPositions = {
      north: {
        // スウェーデン（北）方向を見る
        position: new THREE.Vector3(11540.5585 / 3, 130, 5e3 / 3),
        lookAt: new THREE.Vector3(11540.5585 / 3, 10, 6166.8548 / 3)
      },
      south: {
        // オーストラリアのパース（南）方向を見る
        position: new THREE.Vector3(17500 / 3, 130, 14e3 / 3),
        lookAt: new THREE.Vector3(17235.1919 / 3, 10, 12451.7876 / 3)
      },
      east: {
        // 日本（東）方向を見る
        position: new THREE.Vector3(19e3 / 3, 150, 11500 / 3),
        lookAt: new THREE.Vector3(18471.9972 / 3, 10, 8294.7173 / 3)
      },
      west: {
        // ポルトガル（西）方向を見る
        position: new THREE.Vector3(9400 / 3, 130, 9e3 / 3),
        lookAt: new THREE.Vector3(9953.7215 / 3, 10, 8036.6137 / 3)
      },
      "southeast-asia": {
        position: new THREE.Vector3(16800 / 3, 100, 9639.8951 / 3),
        lookAt: new THREE.Vector3(16343.6319 / 3, 10, 9588.8949 / 3)
      },
      "south-asia": {
        position: new THREE.Vector3(14800 / 3, 120, 9500 / 3),
        lookAt: new THREE.Vector3(15321.8055 / 3, 10, 8777.0181 / 3)
      },
      africa: {
        position: new THREE.Vector3(13e3 / 3, 130, 11e3 / 3),
        lookAt: new THREE.Vector3(12532.2303 / 3, 10, 10522.1102 / 3)
      },
      "north-africa": {
        position: new THREE.Vector3(12800 / 3, 110, 8653.7907 / 3),
        lookAt: new THREE.Vector3(12299.5215 / 3, 10, 8604.791 / 3)
      },
      "north-america": {
        position: new THREE.Vector3(3500 / 3, 130, 7e3 / 3),
        lookAt: new THREE.Vector3(4000.3173 / 3, 10, 7549.8591 / 3)
      },
      "south-america": {
        position: new THREE.Vector3(7500 / 3, 120, 10687.7517 / 3),
        lookAt: new THREE.Vector3(6861.4224 / 3, 0, 10638.7518 / 3)
      },
      "central-america": {
        position: new THREE.Vector3(6400 / 3, 120, 9952.0851 / 3),
        lookAt: new THREE.Vector3(5832.0831 / 3, 0, 9903.0852 / 3)
      },
      "eastern-europe": {
        position: new THREE.Vector3(11918.9764 / 3, 130, 6300 / 3),
        lookAt: new THREE.Vector3(11918.9764 / 3, 10, 7219.8876 / 3)
      },
      "central-asia": {
        position: new THREE.Vector3(14300 / 3, 120, 7200 / 3),
        lookAt: new THREE.Vector3(14818.5633 / 3, 10, 7393.7085 / 3)
      },
      "middle-east": {
        position: new THREE.Vector3(13900 / 3, 120, 8832.2287 / 3),
        lookAt: new THREE.Vector3(13371.2388 / 3, 10, 8791.2288 / 3)
      },
      arctic: {
        position: new THREE.Vector3(11700 / 3, 130, 1800 / 3),
        lookAt: new THREE.Vector3(11707.653 / 3, 10, 2951.3853 / 3)
      },
      antarctic: {
        position: new THREE.Vector3(10730 / 3, 150, 18760 / 3),
        lookAt: new THREE.Vector3(10481.6013 / 3, 0, 17260.2432 / 3)
      },
      refresh: {
        position: new THREE.Vector3(19e3 / 3, 150, 11500 / 3),
        lookAt: new THREE.Vector3(18471.9972 / 3, 10, 8294.7173 / 3)
      }
    };
    camera.position.copy(cameraPositions.east.position);
    controls.target.copy(cameraPositions.east.lookAt);
    camera.lookAt(cameraPositions.east.lookAt);
    controls.update();
    window.switchCameraView = function(direction) {
      const target = cameraPositions[direction];
      if (target) {
        camera.position.copy(target.position);
        controls.target.copy(target.lookAt);
        camera.lookAt(target.lookAt);
        controls.update();
        renderer.render(scene, camera);
        console.log(`Switched to ${direction}`, camera.position, controls.target);
      }
    };
    const directions = [
      "north",
      "south",
      "east",
      "west",
      "southeast-asia",
      "south-asia",
      "africa",
      "north-america",
      "south-america",
      "eastern-europe",
      "central-asia",
      "central-america",
      "middle-east",
      "north-africa",
      "arctic",
      "antarctic",
      "refresh"
    ];
    directions.forEach((direction) => {
      const btn = document.getElementById(`btn-${direction}`);
      if (btn) {
        btn.addEventListener("click", () => switchCameraView(direction));
      }
    });
    const light = new THREE.DirectionalLight(16777215, 1);
    light.position.set(10, 10, 10).normalize();
    scene.add(light);
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    const loader = new THREE.GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load("./night_yanagawa_tree_new.glb", function(gltf) {
      const model = gltf.scene;
      model.scale.set(1, 1, 1);
      const userColorMap = JSON.parse(localStorage.getItem("userColorMap")) || {};
      function getColorForUser(userName) {
        if (!userColorMap[userName]) {
          userColorMap[userName] = getRandomColor();
          localStorage.setItem("userColorMap", JSON.stringify(userColorMap));
        }
        return userColorMap[userName];
      }
      function getRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 60%)`;
      }
      function createTextSprite(message1, message2, userName, favName) {
        const color = getColorForUser(userName, favName);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "bold 15px Arial";
        context.fillStyle = color;
        context.fillText(message1, 10, 30);
        context.fillText(message2, 10, 45);
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(50, 25, 1);
        return sprite;
      }
      function cloneTreeWithoutSaving(tree) {
        const clonedTree = model.clone();
        const scale = 300;
        let x = tree.position_x;
        let y = tree.position_y;
        let z = tree.position_z;
        if (tree.fav_place_id) {
          x /= scale;
          z /= scale;
        }
        const position = { x, y, z };
        clonedTree.position.set(position.x, position.y, position.z);
        scene.add(clonedTree);
        const labelText1 = `${tree.tree_name} / ${tree.user_name} `;
        const labelText2 = tree.fav_name ? `${tree.fav_name}` : "random";
        const textSprite = createTextSprite(labelText1, labelText2);
        textSprite.position.set(position.x, position.y + 15, position.z);
        scene.add(textSprite);
      }
      function cloneTreeWithSaving(position, favPlaceId = null) {
        const clonedTree = model.clone();
        clonedTree.position.set(position.x, position.y, position.z);
        scene.add(clonedTree);
        sendTreeDataToServer(clonedTree.position, favPlaceId);
      }
      trees.forEach((tree) => {
        cloneTreeWithoutSaving(tree);
      });
      document.getElementById("addFavTreeButton")?.addEventListener("click", () => {
        const select = document.getElementById("fav_place_select");
        const selectedOption = select.selectedOptions[0];
        const favId = selectedOption.value;
        const favX = parseFloat(selectedOption.dataset.x);
        const favZ = parseFloat(selectedOption.dataset.z);
        const position = { x: favX, y: 0, z: favZ };
        cloneTreeWithSaving(position, favId);
      });
      function sendTreeDataToServer(position, favPlaceId = null) {
        const treeData = {
          tree_name: "\u540D\u3082\u306A\u3044\u6728",
          position_x: position.x,
          position_y: position.y,
          position_z: position.z,
          fav_place_id: favPlaceId
        };
        fetch("/map_trees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": document.querySelector('[name="csrf-token"]').content
          },
          body: JSON.stringify({ tree: treeData })
        }).then((response) => response.json()).then((data) => {
          if (data.status === "success") {
            console.log("\u6728\u304C\u4FDD\u5B58\u3055\u308C\u307E\u3057\u305F:", data.tree);
            const selectTree = document.getElementById("fav_place_select");
            const selectedOption = selectTree.options[selectTree.selectedIndex];
            let selectedFavName = selectedOption ? selectedOption.textContent : "\u30E9\u30F3\u30C0\u30E0\u4F4D\u7F6E";
            if (selectedOption) {
              selectedOption.remove();
            }
            const treeWith = {
              ...data.tree,
              user_name: data.user_name,
              fav_name: selectedFavName
            };
            cloneTreeWithoutSaving(treeWith);
            if (selectTree.options.length <= 1) {
              const msgTree = document.getElementById("no-tree-msg");
              if (msgTree) msgTree.remove();
              const selectBlock = document.getElementById("select-block");
              if (selectBlock) selectBlock.remove();
            }
            if (data.tree_count >= 10) {
              const till10 = document.getElementById("till-10");
              if (till10) {
                till10.remove();
              }
              const already10 = document.getElementById("already-10");
              if (already10) {
                already10.classList.remove("hidden");
              }
            }
            const treeList = document.getElementById("tree-list");
            if (treeList) {
              const newTree = document.createElement("li");
              newTree.textContent = `\u{1F333} ${treeWith.tree_name}/ ${treeWith.fav_name || "\u307E\u3060\u6728\u304C\u3042\u308A\u307E\u305B\u3093"}`;
              treeList.appendChild(newTree);
            }
            updateTreeCount(data.trees_count);
            updateUserTreeCount(data.tree_count);
          } else {
            if (data.errors) {
              console.error("\u4FDD\u5B58\u30A8\u30E9\u30FC:", data.errors);
            } else {
              console.error("\u4FDD\u5B58\u30A8\u30E9\u30FC: \u4E0D\u660E\u306A\u30A8\u30E9\u30FC");
            }
          }
        }).catch((error) => console.error("\u9001\u4FE1\u30A8\u30E9\u30FC:", error));
        function updateTreeCount(count) {
          const treesCountElement = document.getElementById("trees-count");
          if (treesCountElement) {
            treesCountElement.textContent = count;
          }
        }
        function updateUserTreeCount(count) {
          const userTreeCountElement = document.getElementById("user-tree-count");
          if (userTreeCountElement) {
            userTreeCountElement.textContent = count;
          }
        }
      }
    });
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  });
})();
//# sourceMappingURL=assets/trees.js.map
