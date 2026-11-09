const { api, sheets } = foundry.applications;

export class StudentSheet extends api.HandlebarsApplicationMixin(
  sheets.ActorSheetV2,
) {
  constructor(...args) {
    super(...args);

    /** @type {CharacterActor} */
    this.actor;
  }
  static DEFAULT_OPTIONS = {
    classes: ["kotb-sheet"],
    position: { width: 1020, height: 850 },
    actions: {
    },
    form: {
      submitOnChange: true,
    },
  };
  static PARTS = {
    main: {
      id: "main",
      template: `systems/kotb/templates/actor/actor-studnet-sheet.hbs`,
    },
    nav: {
      template: "systems/kotb/templates/actor/parts/actor-studnet-nav.hbs",
    },
  };
  static TABS = {
    items: {
      tabs: [
      ],
      initial: "",
    },
  };
  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    Object.assign(context, {
      actor: this.actor,
      source: this.actor.toObject(),
      system: this.actor.system,
      fields: this.actor.schema.fields,
      systemFields: this.actor.system.schema.fields,
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
    context.tropequestions = {
      value: this.actor.system.tropequestions,
      enriched: await enrich(this.actor.system.tropequestions),
      field: this.actor.system.schema.fields.tropequestions,
    };    
    context.strengths = {
      value: this.actor.system.strengths,
      enriched: await enrich(this.actor.system.strengths),
      field: this.actor.system.schema.fields.strengths,
    };    
    context.equipment = {
      value: this.actor.system.equipment,
      enriched: await enrich(this.actor.system.equipment),
      field: this.actor.system.schema.fields.equipment,
    };    
    context.description = {
      value: this.actor.system.description,
      enriched: await enrich(this.actor.system.description),
      field: this.actor.system.schema.fields.description,
    };    
    context.notes = {
      value: this.actor.system.notes,
      enriched: await enrich(this.actor.system.notes),
      field: this.actor.system.schema.fields.notes,
    };
    context.motivation = {
      value: this.actor.system.motivation,
      enriched: await enrich(this.actor.system.motivation),
      field: this.actor.system.schema.fields.motivation,
    };
    context.fear = {
      value: this.actor.system.fear,
      enriched: await enrich(this.actor.system.fear),
      field: this.actor.system.schema.fields.fear,
    };
    return context
  }
}