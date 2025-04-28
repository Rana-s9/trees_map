document.addEventListener("turbo:load", function() {
    const treeDataElement = document.getElementById("treeData");

    // もし treeDataElement が存在すれば、JSONをパースして trees を取得
    const trees = treeDataElement ? JSON.parse(treeDataElement.textContent) : [];
    // 1. シーン、カメラ、レンダラーの設定
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement); // 描画領域を画面に追加
    // 背景色の設定
    scene.background = new THREE.Color('#CDE6C7');
    // const textureloader = new THREE.TextureLoader();
    // textureloader.load('./map.jpg', function (texture) {
    //     scene.background = texture;
    // });

    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = 0;
    controls.enableRotate = true;

    window.camera = camera;
    window.controls = controls;

    const cameraPositions = {
        north: {
            // スウェーデン（北）方向を見る
            position: new THREE.Vector3(11540.5585 / 3, 150, 1166.8548 / 3),
            lookAt: new THREE.Vector3(11540.5585 / 3, 0, 6166.8548 / 3)
        },
        south: {
            // オーストラリアのパース（南）方向を見る
            position: new THREE.Vector3(17235.1919 / 3, 150, 17451.7876 / 3),
            lookAt: new THREE.Vector3(17235.1919 / 3, 0, 12451.7876 / 3)
        },
        east: {
            // 日本（東）方向を見る
            position: new THREE.Vector3(13471.9972 / 3, 150, 8294.7173 / 3),
            lookAt: new THREE.Vector3(18471.9972 / 3, 0, 8294.7173 / 3)
        },
        west: {
            // ポルトガル（西）方向を見る
            position: new THREE.Vector3(14953.7215 / 3, 150, 8036.6137 / 3),
            lookAt: new THREE.Vector3(9953.7215 / 3, 0, 8036.6137 / 3)
        },
        "southeast-asia": {
            position: new THREE.Vector3(16343.6319 / 3, 150, 9639.8951 / 3),
            lookAt: new THREE.Vector3(16343.6319 / 3, 0, 9588.8949 / 3)
        },
        "south-asia": {
            position: new THREE.Vector3(15321.8055 / 3, 150, 8826.0183 / 3),
            lookAt: new THREE.Vector3(15321.8055 / 3, 0, 8777.0181 / 3)
        },
        africa: {
            position: new THREE.Vector3(12532.2303 / 3, 150, 10572.1101 / 3),
            lookAt: new THREE.Vector3(12532.2303 / 3, 0, 10522.1102 / 3)
        },
        "north-africa": {
            position: new THREE.Vector3(12299.5215 / 3, 150, 8653.7907 / 3),
            lookAt: new THREE.Vector3(12299.5215 / 3, 0, 8604.791 / 3)
        },
        "north-america": {
            position: new THREE.Vector3(4000.3173 / 3, 150, 7607.859 / 3),
            lookAt: new THREE.Vector3(4000.3173 / 3, 0, 7549.8591 / 3)
        },
        "south-america": {
            position: new THREE.Vector3(6861.4224 / 3, 150, 10687.7517 / 3),
            lookAt: new THREE.Vector3(6861.4224 / 3, 0, 10638.7518 / 3)
        },
        "central-america": {
            position: new THREE.Vector3(5832.0831 / 3, 150, 9952.0851 / 3),
            lookAt: new THREE.Vector3(5832.0831 / 3, 0, 9903.0852 / 3)
        },
        "eastern-europe": {
            position: new THREE.Vector3(11918.9764 / 3, 150, 7268.8875 / 3),
            lookAt: new THREE.Vector3(11918.9764 / 3, 0, 7219.8876 / 3)
        },
        "central-asia": {
            position: new THREE.Vector3(14818.5633 / 3, 150, 7442.7084 / 3),
            lookAt: new THREE.Vector3(14818.5633 / 3, 0, 7393.7085 / 3)
        },
        "middle-east": {
            position: new THREE.Vector3(13371.2388 / 3, 150, 8832.2287 / 3),
            lookAt: new THREE.Vector3(13371.2388 / 3, 0, 8791.2288 / 3)
        },
        arctic: {
            position: new THREE.Vector3(11707.6530 / 3, 150, 3001.3854 / 3),
            lookAt: new THREE.Vector3(11707.6530 / 3, 0, 2951.3853 / 3)
        },
        antarctic: {
            position: new THREE.Vector3(18350.0799 / 3, 150, 19747.1103 / 3),
            lookAt: new THREE.Vector3(18350.0799 / 3, 0, 19697.1102 / 3)
        }
    };    

    camera.position.copy(cameraPositions.east.position);

    // カメラの初期位置設定
    controls.target.copy(cameraPositions.east.lookAt); // ← 追加！
    camera.lookAt(cameraPositions.east.lookAt);         // ← 一応追加（無くてもOK）
    controls.update();

    window.switchCameraView = function(direction) {
        const target = cameraPositions[direction];
        if (target) {
            camera.position.copy(target.position);
            controls.target.copy(target.lookAt);  // ← 追加！
            camera.lookAt(target.lookAt);         // ← 一応追加
            controls.update();

            renderer.render(scene, camera);

            console.log(`Switched to ${direction}`, camera.position, controls.target);
        }
    };

    // カメラ切り替えボタンイベント設定
    const directions = [
        'north',
        'south',
        'east',
        'west',
        'southeast-asia',
        'south-asia',
        'africa',
        'north-america',
        'south-america',
        'eastern-europe',
        'central-asia',
        'central-america',
        'middle-east',
        'north-africa',
        'arctic',
        'antarctic'
    ];      
    directions.forEach(direction => {
        const btn = document.getElementById(`btn-${direction}`);
        if (btn) {
            btn.addEventListener("click", () => switchCameraView(direction));
        }
    });

    // 2. 照明を追加
    const light = new THREE.DirectionalLight(0xffffff, 1); // 太陽のような光
    light.position.set(10, 10, 10).normalize();
    scene.add(light); // シーンに光を追加

    // Dracoローダー設定
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');


    // GLTFローダー設定
    const loader = new THREE.GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load('./night_yanagawa_tree_new.glb', function(gltf) {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        // scene.add(model);

        // ユーザー名をキーにして、ランダムな色を割り当てるマップ
        const userColorMap = JSON.parse(localStorage.getItem('userColorMap')) || {};

        function getColorForUser(userName) {
            if (!userColorMap[userName]) {
                // ランダムカラーを作って保存
                userColorMap[userName] = getRandomColor();
                localStorage.setItem('userColorMap', JSON.stringify(userColorMap));
            }
            return userColorMap[userName];
        }

        // ランダムな色を生成する関数
        function getRandomColor() {
            const hue = Math.floor(Math.random() * 360);
            return `hsl(${hue}, 70%, 60%)`; // 彩度や明度を一定に保つと見やすい
        }

        // ラベルを作成する関数
        function createTextSprite(message1, message2, userName, favName) {
            const color = getColorForUser(userName, favName);

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.font = 'bold 15px Arial';
            context.fillStyle = color;
            context.fillText(message1, 10, 30);
            context.fillText(message2, 10, 45);


            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true; // 明示的に更新
            const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(50, 25, 1);
            return sprite;
        }

        // 木を複製する関数(保存なし)
        function cloneTreeWithoutSaving(tree) {
            const clonedTree = model.clone();

            // 座標スケーリングの条件分岐
            const scale = 300;
            let x = tree.position_x;
            let y = tree.position_y;
            let z = tree.position_z;

            if (tree.fav_place_id) {
                x /= scale;
                z /= scale;
            }

            const position = { x,y, z };
            clonedTree.position.set(position.x, position.y, position.z);
            
            scene.add(clonedTree);

            const labelText1 = `${tree.tree_name} / ${tree.user_name} `;
            const labelText2 = tree.fav_name? `${tree.fav_name}` : "random";
            const textSprite = createTextSprite(labelText1, labelText2);
            textSprite.position.set(position.x, position.y + 15, position.z);
            scene.add(textSprite);
        }

        // 木を複製して保存する関数（ボタン押下時）
        function cloneTreeWithSaving(position, favPlaceId = null) {
            const clonedTree = model.clone();
            clonedTree.position.set(position.x, position.y, position.z);
            scene.add(clonedTree);
            sendTreeDataToServer(clonedTree.position, favPlaceId);
        }

        // 木のデータを読み込んで、一度だけ表示
        trees.forEach(tree => {
            cloneTreeWithoutSaving(tree);
        });

        // ボタンがクリックされたときだけ、保存付きで木を追加
        document.getElementById('addTreeButton').addEventListener('click', () => {
            const scale = 300;

            const minX = 9953.7215/3 / scale;
            const maxX = 18471.9972/3 / scale;

            const minZ = 6166.8548/3 / scale;
            const maxZ = 17451.7876/3 / scale;
            const randomPosition = {
                x: Math.random() * (maxX - minX) + minX,
                y: 0,
                z: Math.random() * (maxZ - minZ) + minZ
            };
            cloneTreeWithSaving(randomPosition, null);
        });

        document.getElementById('addFavTreeButton')?.addEventListener('click', () => {
            const select = document.getElementById('fav_place_select');
            const selectedOption = select.selectedOptions[0];
        
            const favId = selectedOption.value;
            const favX = parseFloat(selectedOption.dataset.x);
            const favZ = parseFloat(selectedOption.dataset.z);

            // Three.js に木を追加
            const position = { x: favX, y: 0, z: favZ };
            cloneTreeWithSaving(position, favId); // ここで保存付きで追加
        });        

    });

    // アニメーションループ
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // 3. サーバーに木のデータを送信する関数
    function sendTreeDataToServer(position, favPlaceId = null) {
        const treeData = {
            tree_name: "名もない木",
            position_x: position.x,
            position_y: position.y,
            position_z: position.z,
            fav_place_id: favPlaceId || null
        };

        fetch('/map_trees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
            },
            credentials: 'same-origin',
            body: JSON.stringify({ tree: treeData })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log('木が保存されました:', data.tree)
            } else {
                console.error('保存エラー:', data.errors);
            }
        })
        .catch(error => console.error('送信エラー:', error));
    }

    // ウィンドウサイズ変更時にレンダラーとカメラを調整
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
});
