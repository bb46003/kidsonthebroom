
export class KotbItem extends Item {
  async _onUpdate(data, options, user) {
    await super._onUpdate(data, options, user);

    const changedOption = Object.entries({
      gainStrength: "system.gainStrength.use",
      gainSkillBonus: "system.gainSkillBonus.use",
      other: "system.other.use"
    }).find(([key, path]) => foundry.utils.getProperty(data, path) === true);

    if (!changedOption) return;

    const [selected] = changedOption;

    const update = {};

    for (const [key, path] of Object.entries({
      gainStrength: "system.gainStrength",
      gainSkillBonus: "system.gainSkillBonus",
      other: "system.other"
    })) {
      if (key === selected) continue;

      update[`${path}.use`] = false;

      if (key === "gainStrength") {
        update[`${path}.itemID`] = "";
      }

      if (key === "gainSkillBonus") {
        update[`${path}.skill`] = "brains";
        update[`${path}.value`] = 1;
      }

      if (key === "other") {
        update[`${path}.description`] = "";
      }
    }

    await this.update(update);
  }
}
