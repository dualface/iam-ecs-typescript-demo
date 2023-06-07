/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

// import { ecsclass, ECSSystem } from "iam-ecs-typescript";
import { HealthComponent } from "../components/HealthComponent";
import { RenderNodeComponent } from "../components/RenderNodeComponent";
import { AttackEvent } from "../events/AttackEvent";
import { ECSSystem } from "../lib/ECSSystem";
import { ecsclass } from "../lib/__private";

/**
 * 处理攻击事件的系统
 */
@ecsclass("AttackSystem")
export class AttackSystem extends ECSSystem {
    /**
     * 处理事件
     *
     * @param dt
     */
    update(dt: number): void {
        const attackEvents = this.ecs.events.fetch(AttackEvent);
        attackEvents.forEach((event) => {
            event.targets.forEach((entityId) => this.attackTarget(entityId));
        });
    }

    //// private

    /**
     * 攻击目标
     *
     * @param entityId
     */
    private attackTarget(entityId: string): void {
        // 如果目标实体不包含健康度组件，则不做处理
        const entity = this.ecs.entities.get(entityId);
        if (!entity.hasComponent(HealthComponent)) return;

        const health = entity.getComponent(HealthComponent);
        // 每次扣除最大健康度的 30%
        if (health.decreaseHP(health.max * 0.3).isDead()) {
            // 如果健康度归零，则移除实体
            if (entity.hasComponent(RenderNodeComponent)) {
                // 移除实体前，需要移除对应的渲染节点
                const render = entity.getComponent(RenderNodeComponent);
                render.setRemoved();
            }
            this.ecs.entities.delete(entity);
        }
    }
}
