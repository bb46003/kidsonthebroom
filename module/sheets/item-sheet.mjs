const { api, sheets } = foundry.applications;

export class StrengthsItemSheet extends api.HandlebarsApplicationMixin(
  sheets.ItemSheetV2,
) {
  constructor(...args) {
    super(...args);
    this.item;
  }
  static DEFAULT_OPTIONS = {
    classes: ["kotb-item"],
    position: { width: 500, height: 610 },
    actions: {
    },
    form: {
      submitOnChange: true,
    },
  };
  static PARTS = {
    tabs: {
      id: "tabs",
      template: `systems/kotb/templates/item/item-strengths.hbs`,
    },
  };
  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    Object.assign(context, {
      item: this.item,
      source: this.item.toObject(),
      system: this.item.system,
      fields: this.item.schema.fields,
      systemFields: this.item.system.schema.fields,
    });
    async function enrich(html) {
      if (html) {
        return await foundry.applications.ux.TextEditor.implementation.enrichHTML(
          html,
          {
            secrets: game.user.isOwner,
            async: true,
          },
        );
      } else {
        return html;
      }
    }
    context.description = {
      value: this.item.system.description,
      enriched: await enrich(this.item.system.description),
      field: this.item.system.schema.fields.description,
    };
        context.specialEffectDescription = {
      value: this.item.system.specialEffectDescription,
      enriched: await enrich(this.item.system.specialEffectDescription),
      field: this.item.system.schema.fields.specialEffectDescription,
    };
    return context;
  }
}
