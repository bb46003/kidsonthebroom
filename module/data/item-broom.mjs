const {
  StringField,
  NumberField,
  BooleanField,
  HTMLField,
  SchemaField
} = foundry.data.fields;

export class BroomDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {

    riderDescription: new StringField({
      initial: "",
      label: "kotb.riderDescription"
    }),  
    description: new HTMLField({
        label: "kotb.description",
        initial: "",
        requiredd: true,
    }),
    isHeld: new BooleanField({
        initial:false,
        label: "kotb.heldWand"
    }),
    gainStrength: new SchemaField({
      use: new BooleanField({
        initial: false,
        label: "kotb.gainStrength"
      }),
      itemID: new StringField({
        initial:"",
        required: true,
        label: "kotb.linkStrength"
      })
    }),
    gainSkillBonus: new SchemaField({
      use:new BooleanField({
        initial: false,
        label: "kotb.gainSkillBonus"
      }),
      skill: new StringField({
        initial: "brains",
        choices:{
           brains:"kotb.attributes.brains",
           brawn: "kotb.attributes.brawn",
           fight: "kotb.attributes.fight" ,
           flight: "kotb.attributes.flight",
           charm: "kotb.attributes.charm",
           grit: "kotb.attributes.grit"
        },
        required: true,
        label: "kotb.strength.fields.skill",
      }),
      value: new NumberField({
        initial: 1,
        label: "kotb.skillBonus",
        min: 1
      })
    }),
    other: new SchemaField({
      use: new BooleanField({
        initial: false,
        label: "kotb.gainotherBonus"
      }),
      description: new HTMLField({
        initial: "",
        label: "kotb.otherBonus"
      })
    })
    };
    
  }
    prepareDerivedData() {
    super.prepareDerivedData();
  }

}
