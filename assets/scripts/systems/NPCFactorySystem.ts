import { instantiate, Node, Prefab, Vec3 } from "cc";
// import { ecsclass, ECSEntity, ECSSystem } from "iam-ecs-typescript";
import { HealthComponent } from "../components/HealthComponent";
import { MovableComponent } from "../components/MovableComponent";
import { NPCComponent } from "../components/NPCComponent";
import { RenderNodeComponent } from "../components/RenderNodeComponent";
import { ECSEntity } from "../lib/ECSEntity";
import { ECSSystem } from "../lib/ECSSystem";
import { ecsclass } from "../lib/__private";

/**
 * 可以移动的方向
 */
const DIRECTIONS = ["up", "down", "left", "right"];

@ecsclass("NPCFactorySystem")
export class NPCFactorySystem extends ECSSystem {
    /**
     * 创建下一个 NPC 之前的倒计时
     */
    private createCountdown = 0;

    /**
     * 构造函数
     *
     * @param renderNode 放置 NPC 渲染节点的容器
     * @param prefab NPC Prefab
     */
    constructor(readonly renderNode: Node, readonly prefab: Prefab) {
        super();
    }

    start(): void {
        // 初始化场景时创建一个 NPC
        this.createNPC();
    }

    update(dt: number): void {
        this.createCountdown -= dt;
        if (this.createCountdown <= 0) {
            // 确定下一次创建 NPC 的倒计时
            this.createCountdown = 0.5;

            if (this.ecs.components.all(NPCComponent).length < 10) {
                // 当前存活的 NPC 少于 10 个时，创建新 NPC
                this.createNPC();
            }
        }
    }

    //// private

    private createNPC() {
        // 创建一个 NPC 的渲染节点
        const NPCNode = instantiate(this.prefab);
        NPCNode.setParent(this.renderNode);

        const barNode = NPCNode.getChildByName("hp_bar");
        if (!barNode) {
            throw new TypeError("NPC 预制件中没有名为 hp_bar 的子节点");
        }

        // 创建一个 NPC 实体，并添加需要的组件
        const npc = new ECSEntity();
        // 添加 NPC 组件
        npc.addComponent(new NPCComponent());
        // 添加渲染节点组件，并指定 npcNode
        npc.addComponent(new RenderNodeComponent(NPCNode));
        // 添加健康度组件，并指定初始 HP
        npc.addComponent(new HealthComponent(100, barNode));
        // 添加移动组件，并指定初始位置、移动方向和速度
        const direction =
            DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
        const speed = Math.random() * 100 + 10;
        npc.addComponent(new MovableComponent(new Vec3(), direction, speed));

        // 将实体添加到 ECS 中
        this.ecs.entities.add(npc);
    }
}
