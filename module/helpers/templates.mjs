/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
 export const preloadHandlebarsTemplates = async function() {
  return loadTemplates([

    // Actor partials.
    "systems/kidsonthebroom/templates/actor/parts/actor-features.hbs",
    "systems/kidsonthebroom/templates/actor/parts/actor-adversity.hbs",
    "systems/kidsonthebroom/templates/actor/parts/actor-stats.hbs",
    "systems/kidsonthebroom/templates/actor/parts/actor-npc-stats.hbs",
    "systems/kidsonthebroom/templates/actor/parts/actor-lesson_plan.hbs",
    "systems/kidsonthebroom/templates/actor/parts/actor-shoolbag.hbs"
    //"systems/kidsonthebroom-BB/templates/actor/parts/actor-trope.hbs",
  ]);
  
};
