import type {
  Group,
  MeshBasicMaterial,
  Object3DEventMap,
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

const _defautlOptions = {
  diceColor: 0x000, // 骰子颜色
  diceScale: 5, // 骰子放大系数
  lightPosition: [20, 100, -50], // 灯光位置
  lightIntensity: 5, // 灯光强度
  lightDecay: 0.2, // 光衰强度
  shadowOpacity: 0.7, // 阴影透明度
  shadowColor: 0x000000, // 阴影颜色
  shadowEnable: true, // 开启阴影
  cameraPosition: [15, 15, 15], // 相机相对于骰子的位置
  ambientLightColor: 0xFFFFFF, // 环境光颜色
  ambientLightIntensity: 1, // 环境光强度
  throwPotion: [0, 50, 0], // 骰子投掷位置
  angularVelocity: [0, -10, 10], // 投掷旋转速度
  velocity: [-36, -17, -24], // 各个方向的速度
  refreshRate: 60, // 屏幕刷新率
  gravity: [0, -100, 0], // 物理引擎重力
  restitution: 0.5, // 反弹系数
  background: 0x000000, // 渲染器背景颜色
  lightColor: 0xFFFFFF, // 灯光颜色
}
type DiceParams = Partial<typeof _defautlOptions> & {
  element: Element | undefined
  modlePath: string
}
/**
 * 骰子投掷
 * @class
 *
 */
export class Dice {
  scene = new Scene()
  renderer = new WebGLRenderer({ antialias: true, alpha: true })
  camera = new PerspectiveCamera(75)
  world = new World()
  diceModle: Group | undefined
  private floor: Mesh | undefined
  diceBody: Body | undefined
  interaction: Interaction | undefined

  private threeChildren: { amlight?: AmbientLight, light?: PointLight, floor?: Mesh<PlaneGeometry, ShadowMaterial, Object3DEventMap> } = {}
  private start_throw = false
  private event: Array<(number: number) => void> = []
  directionalLight: PointLight | undefined
  element: Element | undefined
  options: Partial<DiceParams> = { modlePath: '/dice/dice.glb' }
  contactMaterial!: ContactMaterial
  private loadEvent: Array<() => void> = []
  /**
   * @param {object} params 初始化参数
   * @param {number} params.diceColor 骰子颜色 默认- 0x000000
   * @param {number} params.diceScale 骰子放大系数 默认- 5
   * @param {number[]} params.lightPosition 灯光位置 默认- [20, 100, -50]
   * @param {number} params.lightIntensity 灯光强度 默认- 5
   * @param {number} params.lightDecay 光衰系数 默认- 0.2
   * @param {number} params.shadowOpacity 投影透明度 默认- 0.7
   * @param {number} params.shadowColor 投影颜色 默认- 0x000000
   * @param {boolean} params.shadowEnable 是否开启投影 默认- true
   * @param {[number,number,number]} params.cameraPosition 相机相对于骰子的位置 默认- [15, 15, 15]
   * @param {number} params.ambientLightColor 环境光颜色 默认- 0xFFFFFF
   * @param {number} params.ambientLightIntensity 环境光强度 默认- 1
   * @param {number[]} params.throwPotion 投掷起始位置 默认- [0, 50, 0]
   * @param {number[]} params.angularVelocity 投掷旋转量 默认- [0, -10, 10]
   * @param {number[]} params.velocity 各个方向的速度 默认- [-36, -17, -24]
   * @param {number} params.ambientLightColor 环境光颜色 默认- 0xFFFFFF
   * @param {number} params.refreshRate 屏幕刷新率 默认- 60
   * @param {number[]} params.gravity 各个方向的重力 默认- [0,-100,0]
   * @param {number} params.restitution 反弹系数 默认- 0.5
   * @param {number} params.background 渲染器背景色 默认- 0xFFFFFF
   * @param {number} params.lightColor 灯光颜色 默认- 0xFFFFFF
   */
  constructor(params: DiceParams) {
    Object.assign(this.options, _defautlOptions, params)

    if (!this.options.element!)
      throw new Error('请传入容器Element')
    const container = this.options.element!
    this.initThree()
    this.resizie(container)
  }

  initWorld() {
    const { restitution } = this.options
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
        restitution: restitution!, // 反弹恢复系数
      },
    )
    this.contactMaterial = contactMaterial
    this.world.addContactMaterial(contactMaterial)
    this.updateWorld()
  }

  updateWorld() {
    const { gravity, restitution } = this.options
    this.world.gravity.set(gravity![0], gravity![1], gravity![2])
    this.contactMaterial.restitution = restitution!
  }

  async loadMoudle() {
    const { diceScale, modlePath } = this.options
    const modle = await new GLTFLoader().loadAsync(modlePath!)
    this.diceModle = modle.scene
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    this.diceModle.on('click', () => {
      const { throwPotion, angularVelocity, velocity } = this.options
      if (this.start_throw)
        return
      this.start_throw = true
      const randomEuler = Math.random() * 3
      this.diceBody?.quaternion.setFromEuler(
        Math.PI / randomEuler,
        Math.PI / 4,
        Math.PI / randomEuler,
      )

      this.diceBody!.position.copy(new Vec3(...throwPotion!)) // 点击按钮，body回到下落的初始位置
      // 为物体设置初始速度（用以产生抛物线效果）
      this.diceBody?.angularVelocity.copy(new Vec3(...angularVelocity!))
      this.diceBody?.velocity.copy(new Vec3(...velocity!)) // x, y, z 方向上的速度
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
    this.scene.add(this.diceModle)
    modle.scene.scale.set(diceScale!, diceScale!, diceScale!)
  }

  async initThree() {
    const { element, ambientLightColor, ambientLightIntensity, lightColor, lightIntensity, shadowOpacity } = this.options
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.outputColorSpace = 'srgb'
    this.renderer.shadowMap.type = PCFShadowMap
    this.threeChildren.amlight! = new AmbientLight(ambientLightColor, ambientLightIntensity)
    const light = new PointLight(lightColor, lightIntensity)
    this.threeChildren.light = light
    const plane = new PlaneGeometry(1000, 1000)
    const matari = new ShadowMaterial({
      transparent: true,
      opacity: shadowOpacity,
      name: 'shadow',
    })
    const floor = new Mesh(plane, matari)
    this.threeChildren.floor = floor
    floor.rotation.set(-Math.PI / 2, 0, 0)
    floor.receiveShadow = true

    light.castShadow = true
    light.shadow.mapSize.width = 2048
    light.shadow.mapSize.height = 2048
    light.shadow.camera.near = 0.5
    light.shadow.camera.far = 500
    await this.loadMoudle()
    this.initWorld()
    this.update()
    this.interaction = new Interaction(this.renderer, this.scene, this.camera)

    this.scene.add(light, floor, this.threeChildren.amlight)
    element?.appendChild(this.renderer.domElement)
    this.render()
    this.loadEvent.forEach((item) => {
      item()
    })
  }

  onLoaded(calback: () => void) {
    this.loadEvent.push(calback)
  }

  update() {
    const { shadowOpacity, shadowColor, diceScale, diceColor, element, background, shadowEnable, ambientLightColor, ambientLightIntensity, lightColor, lightDecay, lightIntensity, lightPosition } = this.options
    // 更新渲染器参数
    this.camera.aspect = element!.clientWidth / element!.clientHeight
    this.renderer.setClearColor(background!)
    this.renderer.setSize(element!.clientWidth, element!.clientHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.outputColorSpace = 'srgb'
    this.renderer.shadowMap.enabled = shadowEnable!
    this.renderer.shadowMap.type = PCFShadowMap
    // 更新环境光参数
    this.threeChildren.amlight?.color.set(ambientLightColor!)
    this.threeChildren.amlight!.intensity = ambientLightIntensity!
    // 更新灯光参数
    this.threeChildren.light?.color.set(lightColor!)
    this.threeChildren.light!.intensity = lightIntensity!
    this.threeChildren.light!.decay = lightDecay!
    this.threeChildren.light!.position.copy(new Vector3(...lightPosition!))
    this.threeChildren.light!.castShadow = true
    this.threeChildren.light!.shadow.mapSize.width = 2048
    this.threeChildren.light!.shadow.mapSize.height = 2048
    this.threeChildren.light!.shadow.camera.near = 0.5
    this.threeChildren.light!.shadow.camera.far = 500
    // 更新模型参数
    this.diceModle!.traverse((obj) => {
      obj.castShadow = true
      // obj.receiveShadow = true
      if ((obj as Mesh).isMesh && obj.name === 'Object_4') {
        const material = (obj as Mesh).material as unknown as MeshBasicMaterial
        material.color = new Color(diceColor)
      }
    })
    this.diceModle?.scale.set(diceScale!, diceScale!, diceScale!)
    this.threeChildren.floor?.material.color.set(shadowColor!)
    this.threeChildren.floor!.material.opacity = shadowOpacity!
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

  render() {
    const { refreshRate } = this.options
    this.directionalLight?.lookAt(this.diceModle!.position)
    this.world?.step(1 / refreshRate!)
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

  /**
   * 监听点数
   * @param {Function} callback
   */
  on(callback: (number: number) => void) {
    this.event.push(callback)
  }

  localView() {
    const { cameraPosition } = this.options
    if (this.diceModle && this.diceBody) {
      this.camera.position.x = this.diceModle.position.x + cameraPosition![0]
      this.camera.position.y = this.diceModle.position.y + cameraPosition![1]
      this.camera.position.z = this.diceModle.position.z + cameraPosition![2]
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
