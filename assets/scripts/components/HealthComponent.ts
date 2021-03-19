/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { Node, tween, Vec3 } from "cc";
import { ecsclass, ECSComponent } from "iam-ecs-typescript";

/**
 * 健康度组件
 */
@ecsclass("HealthComponent")
export class HealthComponent extends ECSComponent {
    /**
     * 当前健康度
     */
    get current(): number {
        return this._current;
    }
    private _current: number;

    /**
     * 当前健康度相对于最大健康度的百分比
     */
    get percent(): number {
        return this._percent;
    }
    private _percent: number;

    /**
     * 构造函数
     *
     * @param max 最大健康度
     * @param barNode 血条渲染节点
     */
    constructor(readonly max: number, readonly barNode: Node) {
        super();
        this.max = this._current = max;
        this._percent = 1;
        this.barNode.active = false;
    }

    /**
     * 扣除 HP
     *
     * @param n
     */
    decreaseHP(n: number): HealthComponent {
        this._current -= n;
        if (this._current < 0) this._current = 0;
        this._percent = this._current / this.max;

        this.barNode.active = true;
        tween(this.barNode)
            .stop()
            .to(0.1, { scale: new Vec3(this.percent, 1, 1) })
            .start();

        return this;
    }

    /**
     * 是否已经死亡
     */
    isDead(): boolean {
        return this._current <= 0;
    }
}
