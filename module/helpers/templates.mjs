/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
 export const preloadHandlebarsTemplates = async function() {
  return loadTemplates([

    // Actor partials.
    "systems/kidsonbrooms-BB/templates/actor/parts/actor-features.hbs",
    "systems/kidsonbrooms-BB/templates/actor/parts/actor-adversity.hbs",
    "systems/kidsonbrooms-BB/templates/actor/parts/actor-stats.hbs",
    "systems/kidsonbrooms-BB/templates/actor/parts/actor-npc-stats.hbs",
    "systems/kidsonbrooms-BB/templates/actor/parts/actor-lesson_plan.hbs",
    "systems/kidsonbrooms-BB/templates/actor/parts/actor-shoolbag.hbs"
    //"systems/kidsonbrooms-BB/templates/actor/parts/actor-trope.hbs",
  ]);
  
};
