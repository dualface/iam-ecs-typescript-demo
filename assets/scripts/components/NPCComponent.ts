/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSComponent } from "../lib/ECSComponent";
import { ecsclass } from "../lib/__private";

// import { ecsclass, ECSComponent } from "iam-ecs-typescript";

/**
 * 将实体标记为 NPC
 */
@ecsclass("NPCComponent")
export class NPCComponent extends ECSComponent {}
