// Import document classes.
import { KidsOnBroomsActor } from "./documents/actor.mjs";
import { KidsOnBroomsItem } from "./documents/item.mjs";
// Import sheet classes.
import { KidsOnBroomsActorSheet } from "./sheets/actor-sheet.mjs";
import { KidsOnBroomsItemSheet } from "./sheets/item-sheet.mjs";
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { KIDSONBROOMS } from "./helpers/config.mjs";
import { HomeScore } from "./app/home_score.mjs"

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */
export default function registerSettings() {
	// -------------------
	//  INTERNAL SETTINGS
	// -------------------
	//
  const SYSTEM_ID = "kidsonbrooms";
	game.settings.register(SYSTEM_ID, "points_slytherin", {
		name: "points_slytherin",
		scope: "world",
		default: 0,
    config: false,
    is_on_leed: false,
		type: Number,
	})
  game.settings.register(SYSTEM_ID, "slytherin_on_leed",{
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
	})
  game.settings.register(SYSTEM_ID, "ravenclaw_on_leed",{
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
	})
  game.settings.register(SYSTEM_ID, "hufflepuff_on_leed",{
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
	})
  game.settings.register(SYSTEM_ID, "gryffindor_on_leed",{
    name: "gryffindor_on_leed",
		scope: "world",
		default: false,
    config: false,
		type: Boolean,
  }
);


}

Hooks.once('init',  function() {

  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  
  registerSettings();

  game.kidsonbrooms = {
    KidsOnBroomsActor,
    KidsOnBroomsItem,
    HomeScore,
    rollItemMacro
  };
  // Add custom constants for configuration.
  CONFIG.KIDSONBROOMS = KIDSONBROOMS;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };
  
  // Define custom Document classes
  CONFIG.Actor.documentClass = KidsOnBroomsActor;
  CONFIG.Item.documentClass = KidsOnBroomsItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("kidsonbrooms", KidsOnBroomsActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("kidsonbrooms", KidsOnBroomsItemSheet, { makeDefault: true });
 
  
  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here are a few useful examples:
Handlebars.registerHelper('concat', function() {
  var outStr = '';
  for (var arg in arguments) {
    if (typeof arguments[arg] != 'object') {
      outStr += arguments[arg];
    }
  }
  return outStr;
});
Handlebars.registerHelper('checkIfOnLead', async function (leadVar, options) {
  return leadVar ? '' : 'display:none';
});

Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});
Handlebars.registerHelper('is', function(value, comparison, options) {
  return value === comparison ? options.fn(this) : options.inverse(this);
});
Handlebars.registerHelper('progress',function(value){
  console.log(value);
})
Handlebars.registerHelper("enrichHtmlHelper", function(rawText) {
  return TextEditor.enrichHTML(rawText, {async: false});
});



Hooks.once("ready", async function() {
const SYSTEM_ID = "kidsonbrooms";
 await game.kidsonbrooms.HomeScore.initialise()

      const houseSettings = [
          { name: "gryffindor", value: game.kidsonbrooms.HomeScore._instance.data.points_gryffindor || 0 },
          { name: "slytherin", value: game.kidsonbrooms.HomeScore._instance.data.points_slytherin ||0 },
          { name: "hufflepuff", value: game.kidsonbrooms.HomeScore._instance.data.points_hufflepuff || 0 },
          { name: "ravenclaw", value: game.kidsonbrooms.HomeScore._instance.data.points_ravenclaw || 0 }
      ];
  
      const houseWithHighestPoints = houseSettings.reduce((maxHouse, currentHouse) => {
        return (currentHouse.value > maxHouse.value) ? currentHouse : maxHouse;
    }, houseSettings[0]);
          houseSettings.forEach(async house =>{
        if (house.name === houseWithHighestPoints.name) {
         await game.settings.set(SYSTEM_ID, `${house.name}_on_leed`, true);
        }
        else {
         await game.settings.set(SYSTEM_ID, `${house.name}_on_leed`, false);
        }        
      })
      
    
      // Hide all images with class 'imgflag'
     
})

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
  if (!("data" in data)) return ui.notifications.warn("You can only create macro buttons for owned Items");
  const item = data.data;

  // Create the macro command
  const command = `game.kidsonbrooms.rollItemMacro("${item.name}");`;
  let macro = game.macros.find(m => (m.name === item.name) && (m.command === command));
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: "script",
      img: item.img,
      command: command,
      flags: { "kidsonbrooms.itemMacro": true }
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
  const item = actor ? actor.items.find(i => i.name === itemName) : null;
  if (!item) return ui.notifications.warn(`Your controlled Actor does not have an item named ${itemName}`);

  // Trigger the item roll
  return item.roll();
}