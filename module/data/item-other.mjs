const {
  StringField,
  NumberField,
  BooleanField,
  HTMLField,
  SchemaField
} = foundry.data.fields;

export class OtherDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
    description: new HTMLField({
        label: "kotb.description",
        initial: "",
        requiredd: true,
      }),
     
    };
    
  }


}
