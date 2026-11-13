const {
  StringField,
  NumberField,
  BooleanField,
  HTMLField,
  SchemaField
} = foundry.data.fields;

export class wandDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      core: new SchemaField({
        name: new StringField({
          initial:"",
          required: true
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
        label: "kotb.strength.fields.skill",
      }),
      },{label: "kotb.wand.core"}),
            wood: new SchemaField({
        name: new StringField({
          initial:"",
          required: true
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
        label: "kotb.strength.fields.skill",
      }),
      },{label: "kotb.wand.wood"}),
    description: new HTMLField({
        label: "kotb.description",
        initial: "",
        requiredd: true,
      }),
      isHeld: new BooleanField({
        initial:false,
        label: "kotb.heldWand"
      })
    };
    
  }
    prepareDerivedData() {
    super.prepareDerivedData();
  }

}