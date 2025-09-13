import {onManageActiveEffect, prepareActiveEffectCategories} from "../helpers/effects.mjs";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class KidsOnBroomsActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["kidsonbrooms", "sheet", "actor"],
      template: "systems/kidsonbrooms/templates/actor/actor-sheet.hbs",
      width: 800,
      height: 900,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features" }]
    });
  }

  /** @override */
  get template() {
    return `systems/kidsonbrooms/templates/actor/actor-${this.actor.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const context = await super.getData();
    const actorData = this.actor.toObject(false);
    context.system = actorData.system;
    context.flags = actorData.flags;  
    if (actorData.type == 'character') {
      this._prepareItems();
      this._prepareCharacterData();
    }    
        if (actorData.type == 'npc') {
      this._prepareItems(context);
    }
       context.rollData = context.actor.getRollData();
    context.effects = prepareActiveEffectCategories(this.actor.effects);
    context.schoolbagValue = await TextEditor.enrichHTML(context.system.schoolbag, {
			secrets: context.editable,
      async: true      			
		});  
    context.strengthsValue = await TextEditor.enrichHTML(context.system.strengths, {
			secrets: context.editable,
      async: true      			
		}); 
    context.tropequestionsValue = await TextEditor.enrichHTML(context.system.tropequestions, {
			secrets: context.editable,
      async: true      			
		}); 
		return context;    
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterData() {
   
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareItems() {
    // Initialize containers.
    const gear = [];
    const features = [];
    let context = this.actor.items
    // Iterate through items, allocating to containers
    for (let i of this.actor.items) {
      i.img = i.img || DEFAULT_TOKEN;
      // Append to gear.
      if (i.type === 'item') {
        gear.push(i);
      }
      // Append to features.
      else if (i.type === 'feature') {
        features.push(i);
      }
    }

    // Assign and return
    context.gear = gear;
    context.features = features;
   }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    
    html.find(".lessonname input[type='text']").change(async ev=> {
      const newvalue = $(ev).val();
      const nameAttributeValue = $(ev).attr('name');
      
      const updateData = {};
      updateData[nameAttributeValue] = newvalue;
      
      await this.actor.updateEmbeddedDocuments(updateData);
  });
  html.find("select[name='data.stats.{{key}}.value']").change(async function() {
    const newvalue = $(this).val();
    const nameAttributeValue = $(this).attr('name');
    
    const updateData = {};
    updateData[nameAttributeValue] = newvalue;
    
    await this.actor.updateEmbeddedDocuments(updateData);
});

    // Render the item sheet for viewing/editing prior to the editable check.
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Active Effect management
    html.find(".effect-control").click(ev => onManageActiveEffect(ev, this.actor));

    // Rollable abilities.
    html.find('.rollable').click(this._onRoll.bind(this));

    // Drag events for macros.
    if (this.actor.owner) {
      let handler = ev => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains("inventory-header")) return;
        li.setAttribute("draggable", true);
        li.addEventListener("dragstart", handler, false);
      });
    }
 
      
      
    
    /* -------------------------------------------- */
    /*  Ready Hook                                  */
    /* -------------------------------------------- */
  
    
      // Define a function to be called when the checkbox state changes
      
    
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      data: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.data["type"];

    // Finally, create the item!
    return await Item.create(itemData, {parent: this.actor});
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
  
    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }
  
    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let zetony = this.actor.system.adversity;
  
      // Ilość opcji zależna od wartości zewnętrznej
      var iloscOpcji = zetony; // Przykładowa ilość opcji, możesz dostosować zgodnie z potrzebami
  
      // Przygotowanie danych dla opcji
      var options = [];
      let i = 0;
      for (i; i <= iloscOpcji; i++) {
        options.push(i);
      }
  
      // Dodanie opcji do selektora
      var selectOptions = options.map(option => `<option value="${option}">${option}</option>`).join('');
  
      // Kod HTML dla dialogu
      const htmlContent = `
        <div>
          <label for="ST">Skala Trudności:</label>
          <input type="number" name="ST" value="8">
        </div>
  
        <div>
          <label for="fear">Modyfikator Strachu:</label>
          <input type="number" name="fear" value="0">
        </div>
  
        <div>
          <label for="zetonyPrzeciwnosci">Żetony Przeciwności:</label>
          <select name="zetonyPrzeciwnosci">
            ${selectOptions}
          </select>
        </div>
  
        <div>
          <label for="otherz">Inne Modyfikatory:</label>
          <input type="number" name="otherz" value="0">
        </div>
      `;
  
      // Utworzenie okna dialogowego z callbackiem
      let callbackData = null;
      let dialog = new Dialog({
        title: "Okno rzutu",
        content: htmlContent,
        buttons: {
          ok: {
            label: "OK",
            callback: async (html) => {
              // Pobierz dane z formularza
              callbackData = {
                ST: html.find('[name="ST"]').val(),
                fear: html.find('[name="fear"]').val(),
                zetonyPrzeciwnosci: html.find('[name="zetonyPrzeciwnosci"]').val(),
                otherz: html.find('[name="otherz"]').val()
              };
  
              // Kontynuuj rzut kostką
              await this._continueRoll(dataset, callbackData);
            }
          }
        },
        default: "Rzut"
      });
  
      // Wyrenderowanie okna dialogowego
      await dialog.render(true);
    }
  }
  
  async _continueRoll(dataset, formData) {
    console.log(formData);
    let mod = Number(dataset.mod)+Number(formData.zetonyPrzeciwnosci)-Number(formData.fear)+Number(formData.otherz);
    let dicemax = Number(dataset.roll);
    let ismagic = Number(dataset.ism);
    let zetony = this.actor.system.adversity;
    // Reszta kodu związana z rzutem kostką
    let f = `d${dicemax}`;
    let currentResult = 0;
    const targetNumber = Number(formData.ST);
    const roll = await new Roll(f).evaluate({ async: true });
    currentResult=+roll.result+ +mod;

    roll._total=currentResult;
    let i=0;
    
    roll._formula=(`${i+1}d${dicemax}+${mod}`);
    
    let rolle= await new Roll('d0').evaluate({ async: true });
    
     
    while ((currentResult < targetNumber) && (roll.result==dicemax || rolle.result==dicemax)&&i<10){
        i++;
              rolle =await  new Roll(`d${dicemax}`).evaluate({ async: true });
                currentResult =+currentResult + +rolle.result;
             
    roll._total=currentResult;
    
    roll.terms[0].results[i]=rolle.terms[0].results[0];
    roll.terms[0].number=i+1;
             roll._formula=(`${i+1}d${dicemax}+${mod}`);
      
    
    }
    if(ismagic==1){
     const mroll=await  new Roll(`d4`).evaluate({ async: true });
     
    roll.terms[0].number=i+1;
    roll.terms[1]=mroll.terms[0];
             roll._formula=(`${i+1}d${dicemax}+${mod}+1d4`);
             currentResult =+currentResult + +mroll.result;
    
    }
    
    roll._total=currentResult;
    const roll_results=(currentResult>=targetNumber);
    let result_label="";
    if(roll_results===false){
        result_label="Porażka";
    }
    else{
        result_label="Sukces!";
    };

    const msg= `${'<strong>' + dataset.label + '</strong>'}<br>` + `Skali trudności wynosiła: <strong>${targetNumber}</strong><br>` + `Wynik testu to <strong>${result_label}</strong>`;
  
    roll.toMessage({
        flavor: msg,
        
        speaker: ChatMessage.getSpeaker(this.actor)
    
    });
    if(Number(formData.zetonyPrzeciwnosci)!=0){
      const nz = zetony-Number(formData.zetonyPrzeciwnosci);
      await this.actor.update({"system.adversity":nz}); 
    }
    if(roll_results=== false){
      let zetony = this.actor.system.adversity;
      const nz = zetony+1;
      this.actor.update({"system.adversity":nz}); 
    }
        }
        
       
      }
    
