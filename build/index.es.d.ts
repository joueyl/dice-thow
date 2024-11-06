import { Body as Body_2 } from 'cannon-es';
import { ContactMaterial } from 'cannon-es';
import { Group } from 'three';
import { Interaction } from 'three.interaction';
import { PerspectiveCamera } from 'three';
import { PointLight } from 'three';
import { Scene } from 'three';
import { WebGLRenderer } from 'three';
import { World } from 'cannon-es';

declare const _defautlOptions: {
    diceColor: number;
    diceScale: number;
    lightPosition: number[];
    lightIntensity: number;
    lightDecay: number;
    shadowOpacity: number;
    shadowColor: number;
    shadowEnable: boolean;
    cameraPosition: number[];
    ambientLightColor: number;
    ambientLightIntensity: number;
    throwPotion: number[];
    angularVelocity: number[];
    velocity: number[];
    refreshRate: number;
    gravity: number[];
    restitution: number;
    background: number;
    lightColor: number;
};

/**
 * 骰子投掷
 * @class
 *
 */
export declare class Dice {
    scene: Scene;
    renderer: WebGLRenderer;
    camera: PerspectiveCamera;
    world: World;
    diceModle: Group | undefined;
    private floor;
    diceBody: Body_2 | undefined;
    interaction: Interaction | undefined;
    private threeChildren;
    private start_throw;
    private event;
    directionalLight: PointLight | undefined;
    element: Element | undefined;
    options: Partial<DiceParams>;
    contactMaterial: ContactMaterial;
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
    constructor(params: DiceParams);
    initWorld(): void;
    updateWorld(): void;
    loadMoudle(): Promise<void>;
    initThree(): Promise<void>;
    update(): void;
    private resizie;
    render(): void;
    enableSceneHelper(): void;
    /**
     * 监听点数
     * @param {Function} callback
     */
    on(callback: (number: number) => void): void;
    localView(): void;
    getNumber(): any;
    isBodyStoped(body: Body_2, linearVelocityThreshold?: number, angularVelocityThreshold?: number): boolean;
}

declare type DiceParams = Partial<typeof _defautlOptions> & {
    element: Element | undefined;
    modlePath: string;
};

export { }
