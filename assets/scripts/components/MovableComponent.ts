/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { Vec3 } from "cc";
import { ECSComponent } from "../lib/ECSComponent";
import { ecsclass } from "../lib/__private";
// import { ecsclass, ECSComponent } from "iam-ecs-typescript";
/**
 * 可移动组件
 */
@ecsclass("MovableComponent")
export class MovableComponent extends ECSComponent {
    /**
     * 位置
     */
    position = new Vec3();

    /**
     * 移动方向
     */
    direction = "down";

    /**
     * 移动速度
     */
    speed = 0;

    /**
     * 构造函数
     *
     * @param position
     * @param direction
     * @param speed
     */
    constructor(position: Vec3, direction: string, speed: number) {
        super();
        this.position = position.clone();
        this.direction = direction;
        this.speed = speed;
    }
}
