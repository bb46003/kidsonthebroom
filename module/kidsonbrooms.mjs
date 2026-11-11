import { StudentActor } from "./documents/actor.mjs";
import { StudentSheet } from "./sheets/actor-sheet.mjs";
import { HomeScore } from "./app/home_score.mjs";
import { StudentDataModel } from "./data/actor-data.mjs";
import { StrengthsDataModel } from "./data/item-strengths.mjs";
import { StrengthsItemSheet } from "./sheets/item-sheet.mjs";
import * as utils from "./utils.mjs";
import { wandDataModel } from "./data/item-wand.mjs";
/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */
export default function registerSettings() {
  // -------------------
  //  INTERNAL SETTINGS
  // -------------------
  //
  const SYSTEM_ID = "kotb";
  game.settings.register(SYSTEM_ID, "points_slytherin", {
    name: "points_slytherin",
    scope: "world",
    default: 0,
    config: false,
    is_on_leed: false,
    type: Number,
  });
  game.settings.register(SYSTEM_ID, "slytherin_on_leed", {
    name: "slytherin_on_leed",
    scope: "world",
    default: false,
    config: false,
    type: Boolean,
  });
  game.settings.register(SYSTEM_ID, "points_ravenclaw", {
    name: "points_ravenclaw",
    scope: "world",
    default: 0,
    config: false,
    is_on_leed: false,
    type: Number,
  });
  game.settings.register(SYSTEM_ID, "ravenclaw_on_leed", {
    name: "ravenclaw_on_leed",
    scope: "world",
    default: false,
    config: false,
    type: Boolean,
  });
  game.settings.register(SYSTEM_ID, "points_hufflepuff", {
    name: "points_hufflepuff",
    scope: "world",
    default: 0,
    config: false,
    is_on_leed: false,
    type: Number,
  });
  game.settings.register(SYSTEM_ID, "hufflepuff_on_leed", {
    name: "hufflepuff_on_leed",
    scope: "world",
    default: false,
    config: false,
    type: Boolean,
  });
  game.settings.register(SYSTEM_ID, "points_gryffindor", {
    name: "points_gryffindor",
    scope: "world",
    default: 0,
    config: false,
    type: Number,
  });
  game.settings.register(SYSTEM_ID, "gryffindor_on_leed", {
    name: "gryffindor_on_leed",
    scope: "world",
    default: false,
    config: false,
    type: Boolean,
  });
  game.settings.register(SYSTEM_ID, "hous_score", {
    name: "Displey house score",
    scope: "world",
    default: false,
    config: true,
    type: Boolean,
  });
}

Hooks.once("init", function () {
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.

  registerSettings();

  game.kotb = {
    StudentActor,
    HomeScore,
    rollItemMacro,
  };
  // Add custom constants for configuration.
  //CONFIG.kotb = kotb;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2,
  };

  CONFIG.Actor.documentClass = StudentActor;

  CONFIG.Actor.dataModels = {
    student: StudentDataModel,
  };
  CONFIG.Item.dataModels = {
    strengths: StrengthsDataModel,
    wand: wandDataModel
  }

  foundry.applications.apps.DocumentSheetConfig.unregisterSheet(
    foundry.documents.Actor,
    "core",
    foundry.applications.sheets.ActorSheet,
  );
  foundry.applications.apps.DocumentSheetConfig.unregisterSheet(
    foundry.documents.Item,
    "core",
    foundry.applications.sheets.ItemSheetV2,
  );
    utils.registerSystemSheet(foundry.documents.Actor, StudentSheet, "student");
  utils.registerSystemSheet(foundry.documents.Item, StrengthsItemSheet, "strengths");
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here are a few useful examples:
Handlebars.registerHelper("concat", function (...arg) {
  var outStr = "";
  for (var arg in arguments) {
    if (typeof arguments[arg] != "object") {
      outStr += arguments[arg];
    }
  }
  return outStr;
});
Handlebars.registerHelper("checkIfOnLead", async function (leadVar, options) {
  return leadVar ? "" : "display:none";
});

Handlebars.registerHelper("toLowerCase", function (str) {
  return str.toLowerCase();
});
Handlebars.registerHelper("is", function (value, comparison, options) {
  return value === comparison ? options.fn(this) : options.inverse(this);
});
Handlebars.registerHelper("progress", function (value) {
  console.log(value);
});
Handlebars.registerHelper("enrichHtmlHelper", function (rawText) {
  return TextEditor.enrichHTML(rawText, { async: false });
});
Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
  switch (operator) {
    case "==":
      // eslint-disable-next-line eqeqeq
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      // eslint-disable-next-line eqeqeq
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

Hooks.once("ready", async function () {
  const SYSTEM_ID = "kotb";
  if (game.settings.get(SYSTEM_ID, "hous_score")) {
    await game.kotb.HomeScore.initialise();

    const houseSettings = [
      {
        name: "gryffindor",
        value: game.kotb.HomeScore._instance.data.points_gryffindor || 0,
      },
      {
        name: "slytherin",
        value: game.kotb.HomeScore._instance.data.points_slytherin || 0,
      },
      {
        name: "hufflepuff",
        value: game.kotb.HomeScore._instance.data.points_hufflepuff || 0,
      },
      {
        name: "ravenclaw",
        value: game.kotb.HomeScore._instance.data.points_ravenclaw || 0,
      },
    ];

    const houseWithHighestPoints = houseSettings.reduce(
      (maxHouse, currentHouse) => {
        return currentHouse.value > maxHouse.value ? currentHouse : maxHouse;
      },
      houseSettings[0],
    );
    houseSettings.forEach(async (house) => {
      if (house.name === houseWithHighestPoints.name) {
        await game.settings.set(SYSTEM_ID, `${house.name}_on_leed`, true);
      } else {
        await game.settings.set(SYSTEM_ID, `${house.name}_on_leed`, false);
      }
    });
  }
  // Hide all images with class 'imgflag'
});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
  if (data.type !== "Item") return;
  if (!("data" in data))
    return ui.notifications.warn(
      "You can only create macro buttons for owned Items",
    );
  const item = data.data;

  // Create the macro command
  const command = `game.kotb.rollItemMacro("${item.name}");`;
  let macro = game.macros.find(
    (m) => m.name === item.name && m.command === command,
  );
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: "script",
      img: item.img,
      command: command,
      flags: { "kotb.itemMacro": true },
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemName
 * @return {Promise}
 */
function rollItemMacro(itemName) {
  const speaker = ChatMessage.getSpeaker();
  let actor;
  if (speaker.token) actor = game.actors.tokens[speaker.token];
  if (!actor) actor = game.actors.get(speaker.actor);
  const item = actor ? actor.items.find((i) => i.name === itemName) : null;
  if (!item)
    return ui.notifications.warn(
      `Your controlled Actor does not have an item named ${itemName}`,
    );

  // Trigger the item roll
  return item.roll();
}
