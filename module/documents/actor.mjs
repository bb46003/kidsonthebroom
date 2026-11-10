export class StudentActor extends foundry.documents.Actor {
  /** @override */
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);

    if (this.type === "studnet") {
      await this.updateSource({
        "prototypeToken.actorLink": true,
        "prototypeToken.displayBars": 10, // Hovered by Anyone
        "prototypeToken.sight.enabled": true, // Vision enabled
        "prototypeToken.disposition": 1, // Friendly
      });
    }
  }
}
