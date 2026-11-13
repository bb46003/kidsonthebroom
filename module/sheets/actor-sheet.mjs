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
    position: { width: 1020, height: 900 },
    actions: {},
    form: {
      submitOnChange: true,
    },
    actions: {
      toggle: StudentSheet.#toggle,
      itemContextMenu: StudentSheet.#itemContextMenu
    },
  };
  static PARTS = {
    header: {
      template: "systems/kotb/templates/actor/parts/actor-student-header.hbs",
    },

    nav: {
      template: "systems/kotb/templates/actor/parts/actor-studnet-nav.hbs",
    },
        main: {
      template: `systems/kotb/templates/actor/actor-studnet-sheet.hbs`,
    },
    equipment:{
      template: "systems/kotb/templates/actor/parts/actor-student-eq.hbs",

    }
  };
  static TABS = {
    items: {
      tabs: [
        { id: "main", group: "items", label: "" },
        { id: "equipment", group: "items", label: "" },
        { id: "bio", group: "items", label: "" },
        { id: "lesson-plan", group: "items", label: "" },
      ],
      initial: "main",
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
    const items = {
      strengths: await this.prepareStrengths(),
      wands: await this.prepareWand(),
    }
    Object.assign(context, {
      tokenDisplay: this.tokenDisplay,
      tokenImg: this.actor.prototypeToken.texture.src,
      items: items
    });

    return context;
  }
  static async #toggle(ev) {
    const target = ev.target;
    this.tokenDisplay = target.checked;
    this.render(true);
  }
   static async #itemContextMenu(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    const button = ev.target.closest("a");
    const itemId = button.dataset.item;
    const item = this.actor.items.get(itemId);
    // Remove old menu if exists
    document.querySelector(".custom-context-menu")?.remove();

    // Create element instead of raw string (safer and cleaner)
    const menu = document.createElement("div");
    menu.classList.add("custom-context-menu");
    const openItem = game.i18n.format("kotb.openItem", {itemType: item.type})
    const deleteItem = game.i18n.format("kotb.deleteItem", {itemType: item.type})
 
    menu.innerHTML = `
    <div class="menu-option" data-action="open">${openItem}</div>
    <div class="menu-option" data-action="delete">${deleteItem}</div>
  `;
    

    // Position at mouse location
    menu.style.position = "absolute";
    menu.style.left = `${ev.pageX}px`;
    menu.style.top = `${ev.pageY}px`;
    menu.style.zIndex = 1000;

    document.body.appendChild(menu);

    // Attach click handler
    menu.addEventListener("click", async (e) => {
      const action = e.target.dataset.action;
      if (!action) return;

      if (action === "open") {
        const item = this.actor.items.get(itemId);
        item?.sheet.render(true);
      }

      if (action === "delete") {
        const item = this.actor.items.get(itemId);
        await item?.delete();
      }

      menu.remove();
    });

    // Close when clicking elsewhere
    setTimeout(() => {
      document.addEventListener("click", () => menu.remove(), { once: true });
    }, 10);
  }
  async prepareStrengths(){
        const strengths = this.actor.items.filter((item) => item.type === "strengths");
    const data = {};
    strengths.forEach((strength) => {
      const itemID = strength.id;
      const iamge = strength.img;
      const itemName = strength.name;
      data[itemID] = {
        img: iamge,
        name: itemName,
      };
    });

    return data;
  }
async prepareWand() {
  const wands = this.actor.items
    .filter((item) => item.type === "wand")
    .map((wand) => ({
      id: wand.id,
      img: wand.img,
      name: wand.name,
      isHeld: wand.system.isHeld,
      core: wand.system.core,
      wood: wand.system.wood,
    }));

  return {
    wands,
    selectedWand: wands.find((wand) => wand.isHeld) ?? null,
  };
}
_processFormData(event, form, formData) {
  const target = event.target;
  const name = target.name;

  if (name === "system.wand") {
    const selectedWandId = target.value;

    const wands = this.actor.items.filter((item) => item.type === "wand")
    wands.forEach((wand) =>{
      if(wand.id === selectedWandId){
        wand.update({["system.isHeld"]:true})
      }else{
         wand.update({["system.isHeld"]:false})
      }
    })
  }
   delete formData.object["system.wand"]
  return super._processFormData(event, form, formData);
}
}
