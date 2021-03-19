/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { Component, Prefab, _decorator } from "cc";
import { createECSEnv } from "iam-ecs-typescript";
import { AttackSystem } from "./systems/AttackSystem";
import { InputSystem } from "./systems/InputSystem";
import { MovableSystem } from "./systems/MovableSystem";
import { NPCFactorySystem } from "./systems/NPCFactorySystem";

const { ccclass, property } = _decorator;

@ccclass
export default class GameScene extends Component {
    @property({ displayName: "NPC 预制件", type: Prefab })
    NPCPrefab: Prefab | undefined;

    /**
     * 创建 ECS
     */
    private ecs = createECSEnv();

    onLoad() {
        if (!this.NPCPrefab) {
            throw new TypeError("没有设置 NPC 预制件");
        }

        // 将系统添加到 ECS 中
        this.ecs.systems
            .add(new InputSystem(this.node))
            .add(new NPCFactorySystem(this.node, this.NPCPrefab))
            .add(new MovableSystem())
            .add(new AttackSystem());
    }

    start() {
        this.ecs.start();
    }

    stop() {
        this.ecs.stop();
    }

    update(dt: number) {
        // 持续更新 ECS 状态
        this.ecs.update(dt);
    }
}
