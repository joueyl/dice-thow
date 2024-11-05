import type {
  Group,
  MeshBasicMaterial,
} from 'three'
import {
  Body,
  Box,
  ContactMaterial,
  Material,
  Plane,
  Vec3,
  World,
} from 'cannon-es'
import {
  AmbientLight,
  AxesHelper,
  Box3,
  Color,
  Mesh,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  ShadowMaterial,
  Vector3,
  WebGLRenderer,
} from 'three'
import { Interaction } from 'three.interaction'
import { GLTFLoader } from 'three/addons'

const option = {
  z: -24,
  x: -36,
  y: -17,
}

const _defautlOptions = {
  diceColor: 0x000, // 骰子颜色
  diceScale: 5, // 骰子放大系数
  lightPosition: [20, 100, -50], // 灯光位置
  lightIntensity: 5, // 灯光强度
  lightDecay: 0.2, // 光衰强度
  shadowOpacity: 0.7, // 阴影透明度
  shadowColor: 0x000, // 阴影颜色
  shadowEnable: true, // 开启阴影
  cameraPosition: [15, 15, 15], // 相机相对于骰子的位置
  ambientLightColor: 0xFFF, // 环境光颜色
  ambientLightIntensity: 1, // 环境光强度
  throwPotion: [0, 50, 0], // 骰子投掷位置
  angularVelocity: [0, -10, 10], // 投掷旋转速度
  velocity: [-36, -17, -24], // 各个方向的速度
  refreshRate: 60, // 屏幕刷新率
  gravity: [0, -100, 0], // 物理引擎重力
  restitution: 0.5, // 反弹系数
}
type DiceParams = Partial<typeof _defautlOptions> & {
  element: Element | undefined
}

export class Dice implements DiceParams {
  scene = new Scene()
  renderer = new WebGLRenderer({ antialias: true })
  camera = new PerspectiveCamera(75)
  world: World | undefined
  diceModle: Group | undefined
  private floor: Mesh | undefined
  diceBody: Body | undefined
  interaction: Interaction | undefined
  private start_throw = false
  private event: Array<(number: number) => void> = []
  directionalLight: PointLight | undefined
  element: Element | undefined
  constructor(params: DiceParams) {
    Object.assign(this, _defautlOptions, params)
    if (!this.element!)
      throw new Error('请传入容器Element')
    const container = this.element!
    this.camera.aspect = container.clientWidth / container.clientHeight
    this.renderer.setClearColor(0xFFFFFF)
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.outputColorSpace = 'srgb'
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = PCFShadowMap
    container.appendChild(this.renderer.domElement)
    this.camera.position.set(15, 15, 15)
    this.scene.add(new AmbientLight(0xFFFFFF, 1))
    this.interaction = new Interaction(this.renderer, this.scene, this.camera)
    this.init()
    this.resizie(container)
  }

  private resizie(container: Element) {
    const observer = new ResizeObserver(() => {
      this.renderer.clear()
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      this.camera.aspect = container.clientWidth / container.clientHeight
      this.camera.updateProjectionMatrix()
    })
    observer.observe(container)
  }

  async init() {
    const directionalLight = new PointLight(0xFFFFFF, 5)
    directionalLight.decay = 0.2
    this.directionalLight = directionalLight
    directionalLight.position.set(20, 100, -50)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 500
    const plane = new PlaneGeometry(1000, 1000)
    const matari = new ShadowMaterial({
      transparent: true,
      opacity: 0.7,
    })
    const floor = new Mesh(plane, matari)
    floor.receiveShadow = true
    this.floor = floor
    floor.rotation.set(-Math.PI / 2, 0, 0)
    const modle = await new GLTFLoader().loadAsync('./dice/dice.glb')
    this.diceModle = modle.scene
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    this.diceModle.on('click', () => {
      if (this.start_throw)
        return
      this.start_throw = true
      const randomEuler = Math.random() * 3
      this.diceBody?.quaternion.setFromEuler(
        Math.PI / randomEuler,
        Math.PI / 4,
        Math.PI / randomEuler,
      )

      this.diceBody?.position.set(0, 50, 0) // 点击按钮，body回到下落的初始位置
      // 为物体设置初始速度（用以产生抛物线效果）
      this.diceBody?.angularVelocity.set(0, -10, 0)
      this.diceBody?.velocity.set(option.x, option.y, option.z) // x, y, z 方向上的速度
      // 选中模型的第一个模型，开始下落
      this.world?.addBody(this.diceBody!)
    })

    this.diceModle.traverse((obj) => {
      obj.castShadow = true
      // obj.receiveShadow = true
      if ((obj as Mesh).isMesh && obj.name === 'Object_4') {
        const material = (obj as Mesh).material as unknown as MeshBasicMaterial
        material.color = new Color(0xE6A46)
      }
    })
    modle.scene.scale.set(5, 5, 5)
    this.scene.add(modle.scene, floor, directionalLight)
    this.render()
    this.enablePhysics()
  }

  render() {
    this.directionalLight?.lookAt(this.diceModle!.position)
    this.world?.step(1 / 60)
    this.renderer?.render(this.scene, this.camera) // undefined
    // 镜头追踪模型
    this.localView()

    if (this.diceModle && this.diceBody?.position) {
      this.diceModle?.position.copy(this.diceBody!.position)
      this.diceModle?.quaternion.copy(this.diceBody!.quaternion)
      if (this.isBodyStoped(this.diceBody) && this.start_throw) {
        if (this.event.length) {
          const number = this.getNumber()
          this.event.forEach((item) => {
            item(number)
          })
        }
        this.start_throw = false
      }
    }
    requestAnimationFrame(this.render.bind(this))
  }

  enableSceneHelper() {
    this.scene.add(new AxesHelper(10))
  }

  on(callback: (number: number) => void) {
    this.event.push(callback)
  }

  enablePhysics() {
    this.world = new World()
    this.world.gravity.set(0, -100, 0)
    const box3 = new Box3()
    box3.expandByObject(this.diceModle!)
    const size = new Vector3()
    box3.getSize(size)
    const sphereMaterial = new Material()

    const bodyDice = new Body({
      mass: 1,
      position: new Vec3(0, size.y / 2, 0),
      shape: new Box(new Vec3(size.x / 2, size.y / 2, size.z / 2)),
      material: sphereMaterial,
    })

    this.diceBody = bodyDice
    const groundMaterial = new Material()
    const groundBody = new Body({
      mass: 0,
      shape: new Plane(),
      material: groundMaterial,
    })
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // 旋转规律类似threejs 平面
    this.world.addBody(groundBody)
    this.world.addBody(bodyDice)
    const contactMaterial = new ContactMaterial(
      groundMaterial,
      sphereMaterial,
      {
        restitution: 0.5, // 反弹恢复系数
      },
    )

    this.world.addContactMaterial(contactMaterial)
  }

  localView() {
    if (this.diceModle && this.diceBody) {
      this.camera.position.x = this.diceModle.position.x + 20
      this.camera.position.y = this.diceModle.position.y + 20
      this.camera.position.z = this.diceModle.position.z + 10
      this.camera.lookAt(this.diceModle.position)
    }
  }

  getNumber() {
    const localNormals = [
      new Vec3(0, 1, 0), // 面1
      new Vec3(0, 0, -1), // 面2
      new Vec3(-1, 0, 0), // 面3
      new Vec3(1, 0, 0), // 面4
      new Vec3(0, 0, 1), // 面5
      new Vec3(0, -1, 0), // 面6
    ]
    // 映射法向量到点数
    const faceToPointMap = {
      '0,1,0': 2,
      '0,-1,0': 4,
      '1,0,0': 6,
      '-1,0,0': 5,
      '0,0,1': 3,
      '0,0,-1': 1,
    }
    let maxDot = -Infinity
    let topFace = null

    for (const face of localNormals) {
      const rotatedFace = this.diceBody?.quaternion.vmult(face)
      const dot = rotatedFace?.dot(new Vec3(0, 1, 0))
      if (dot! > maxDot) {
        maxDot = dot!
        topFace = face
      }
    }
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
    return faceToPointMap[`${topFace.x},${topFace.y},${topFace.z}`]
  }

  isBodyStoped(
    body: Body,
    linearVelocityThreshold = 0.1,
    angularVelocityThreshold = 0.1,
  ) {
    // 获取物体的线性速度和角速度
    const linearVelocityMagnitude = body.velocity.length()
    const angularVelocityMagnitude = body.angularVelocity.length()
    return (
      linearVelocityMagnitude < linearVelocityThreshold
      && angularVelocityMagnitude < angularVelocityThreshold
    )
  }
}
