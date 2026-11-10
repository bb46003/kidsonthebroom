const {
  StringField,
  NumberField,
  BooleanField,
  HTMLField
} = foundry.data.fields;

export class StrengthsDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      effectType: new StringField({
        initial: "passive",
        label: "kotb.strength.fields.effectType",
        choices: {
          passive: "kotb.passive",
          active: "kotb.active",
        },
        required: true,
      }),

      cost: new NumberField({
        initial: 0,
        min: 0,
        label: "kotb.strength.fields.cost",
      }),

      value: new NumberField({
        initial: 0,
        label: "kotb.strength.fields.value",
      }),

      skill: new StringField({
        initial: "",
        choices:{
           brains:"kotb.attributes.brains",
           brawn: "kotb.attributes.brawn",
           fight: "kotb.attributes.fight" ,
           flight: "kotb.attributes.flight",
           charm: "kotb.attributes.charm",
           grit: "kotb.attributes.grit"
        },
        label: "kotb.strength.fields.skill",
      }),

      magicType: new StringField({
        initial: "",
        label: "kotb.strength.fields.magicType",
      }),

      usageLimit: new NumberField({
        initial: 0,
        min: 0,
        label: "kotb.strength.fields.usageLimit",
      }),

      specialEffect: new BooleanField({
        initial: false,
        label: "kotb.strength.fields.specialEffect",
      }),
      specialEffectDescription: new HTMLField({
        initial: false,
        label: "kotb.strength.fields.specialEffectDescription",
      }),
    description: new HTMLField({
        label: "kotb.description",
        initial: "",
        requiredd: true,
      }),
    };
    
  }
    prepareDerivedData() {
    super.prepareDerivedData();
      this._preparespecialEffectDescription()
  }
  _preparespecialEffectDescription(){
    if(!this.specialEffect){
      this.specialEffectDescription = ""
    }
  }
}