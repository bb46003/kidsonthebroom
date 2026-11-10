const {
  StringField,
  BooleanField,
  SchemaField,
  NumberField,
  HTMLField,
  SetField,
  ArrayField,
  DocumentUUIDField,
  IntegerSortField,
} = foundry.data.fields;

export class StudentDataModel extends foundry.abstract.TypeDataModel {
  static metadata = Object.freeze({});
  static defineSchema() {
    return {
      attributes: new SchemaField({
        brains: new SchemaField(
          {
            magic: new SchemaField(
              {
                total: new NumberField({
                  label: "kotb.attributes.magic",
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                bonuses: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                value: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                  label: "kotb.attributes.value",
                }),
              },
              { label: "kotb.magic" },
            ),
            stat: new SchemaField(
              {
                total: new NumberField({
                  label: "kotb.attributes.total",
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                bonuses: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                value: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                  label: "kotb.attributes.value",
                }),
              },
              { label: "kotb.stat" },
            ),
            dice: new StringField({
              initial: "d4",
              choices: {
                d4: "kotb.dice.d4",
                d6: "kotb.dice.d6",
                d8: "kotb.dice.d8",
                d10: "kotb.dice.d10",
                d12: "kotb.dice.d12",
                d20: "kotb.dice.d20",
              },
              required: true,
              label: "kotb.attributes.dice",
            }),
          },
          { label: "kotb.attributes.brains" },
        ),

        brawn: new SchemaField(
          {
            magic: new SchemaField(
              {
                total: new NumberField({
                  label: "kotb.attributes.magic",
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                bonuses: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                value: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                  label: "kotb.attributes.value",
                }),
              },
              { label: "kotb.magic" },
            ),
            stat: new SchemaField(
              {
                total: new NumberField({
                  label: "kotb.attributes.total",
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                bonuses: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                value: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                  label: "kotb.attributes.value",
                }),
              },
              { label: "kotb.stat" },
            ),
            dice: new StringField({
              initial: "d4",
              choices: {
                d4: "kotb.dice.d4",
                d6: "kotb.dice.d6",
                d8: "kotb.dice.d8",
                d10: "kotb.dice.d10",
                d12: "kotb.dice.d12",
                d20: "kotb.dice.d20",
              },
              required: true,
              label: "kotb.attributes.dice",
            }),
          },
          { label: "kotb.attributes.brawn" },
        ),

        fight: new SchemaField(
          {
            magic: new SchemaField(
              {
                total: new NumberField({
                  label: "kotb.attributes.magic",
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                bonuses: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                value: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                  label: "kotb.attributes.value",
                }),
              },
              { label: "kotb.magic" },
            ),
            stat: new SchemaField(
              {
                total: new NumberField({
                  label: "kotb.attributes.total",
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                bonuses: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                value: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                  label: "kotb.attributes.value",
                }),
              },
              { label: "kotb.stat" },
            ),
            dice: new StringField({
              initial: "d4",
              choices: {
                d4: "kotb.dice.d4",
                d6: "kotb.dice.d6",
                d8: "kotb.dice.d8",
                d10: "kotb.dice.d10",
                d12: "kotb.dice.d12",
                d20: "kotb.dice.d20",
              },
              required: true,
              label: "kotb.attributes.dice",
            }),
          },
          { label: "kotb.attributes.fight" },
        ),

        flight: new SchemaField(
          {
            magic: new SchemaField(
              {
                total: new NumberField({
                  label: "kotb.attributes.magic",
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                bonuses: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                value: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                  label: "kotb.attributes.value",
                }),
              },
              { label: "kotb.magic" },
            ),
            stat: new SchemaField(
              {
                total: new NumberField({
                  label: "kotb.attributes.total",
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                bonuses: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                value: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                  label: "kotb.attributes.value",
                }),
              },
              { label: "kotb.stat" },
            ),
            dice: new StringField({
              initial: "d4",
              choices: {
                d4: "kotb.dice.d4",
                d6: "kotb.dice.d6",
                d8: "kotb.dice.d8",
                d10: "kotb.dice.d10",
                d12: "kotb.dice.d12",
                d20: "kotb.dice.d20",
              },
              required: true,
              label: "kotb.attributes.dice",
            }),
          },
          { label: "kotb.attributes.flight" },
        ),

        charm: new SchemaField(
          {
            magic: new SchemaField(
              {
                total: new NumberField({
                  label: "kotb.attributes.magic",
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                bonuses: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                value: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                  label: "kotb.attributes.value",
                }),
              },
              { label: "kotb.magic" },
            ),
            stat: new SchemaField(
              {
                total: new NumberField({
                  label: "kotb.attributes.total",
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                bonuses: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                value: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                  label: "kotb.attributes.value",
                }),
              },
              { label: "kotb.stat" },
            ),
            dice: new StringField({
              initial: "d4",
              choices: {
                d4: "kotb.dice.d4",
                d6: "kotb.dice.d6",
                d8: "kotb.dice.d8",
                d10: "kotb.dice.d10",
                d12: "kotb.dice.d12",
                d20: "kotb.dice.d20",
              },
              required: true,
              label: "kotb.attributes.dice",
            }),
          },
          { label: "kotb.attributes.charm" },
        ),

        grit: new SchemaField(
          {
            magic: new SchemaField(
              {
                total: new NumberField({
                  label: "kotb.attributes.magic",
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                bonuses: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                value: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                  label: "kotb.attributes.value",
                }),
              },
              { label: "kotb.magic" },
            ),
            stat: new SchemaField(
              {
                total: new NumberField({
                  label: "kotb.attributes.total",
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                bonuses: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                }),
                value: new NumberField({
                  initial: 0,
                  min: 0,
                  required: true,
                  intiger: true,
                  label: "kotb.attributes.value",
                }),
              },
              { label: "kotb.stat" },
            ),
            dice: new StringField({
              initial: "d4",
              choices: {
                d4: "kotb.dice.d4",
                d6: "kotb.dice.d6",
                d8: "kotb.dice.d8",
                d10: "kotb.dice.d10",
                d12: "kotb.dice.d12",
                d20: "kotb.dice.d20",
              },
              required: true,
              label: "kotb.attributes.dice",
            }),
          },
          { label: "kotb.attributes.grit" },
        ),
      }),
      age: new NumberField({
        initial: 7,
        intiger: true,
        min: 7,
        required: true,
        label: "kotb.age",
      }),
      grade: new StringField({
        initial: "underclass",
        required: true,
        choices: {
          underclass: "kotb.underclass",
          upperclass: "kotb.upperclass",
          faculty: "kotb.faculty",
        },
        label: "kotb.grade",
      }),
      asversityTokens: new NumberField({
        initial: 3,
        min: 0,
        intiger: true,
        required: true,
        label: "kotb.asversityTokens",
      }),
      motivation: new HTMLField({
        label: "kotb.motivation",
        initial: "",
        requiredd: true,
      }),
      fear: new HTMLField({
        label: "kotb.fear",
        initial: "",
        requiredd: true,
      }),
      pronouns: new StringField({
        label: "kotb.pronouns",
        initial: "",
        requiredd: true,
      }),
      animalfamiliar: new SchemaField(
        {
          spiecies: new StringField({
            initial: "",
            label: "kotb.animalfamiliar.spiecies",
          }),
          name: new StringField({
            initial: "",
            label: "kotb.animalfamiliar.name",
          }),
          img: new StringField({
            initial: "",
            label: "kotb.animalfamiliar.img",
          }),
        },
        { label: "kotb.animalfamiliar.label" },
      ),
      tropequestions: new HTMLField({
        label: "kotb.tropequestions",
        initial: "",
        requiredd: true,
      }),
      strengths: new HTMLField({
        label: "kotb.tropequestions",
        initial: "",
        requiredd: true,
      }),
      equipment: new HTMLField({
        label: "kotb.equipment",
        initial: "",
        requiredd: true,
      }),
      description: new HTMLField({
        label: "kotb.description",
        initial: "",
        requiredd: true,
      }),
      notes: new HTMLField({
        label: "kotb.notes",
        initial: "",
        requiredd: true,
      }),
      lessonPlan: new SchemaField({
        topics: new ArrayField(
          new SchemaField({
            name: new StringField({
              initial: "",
            }),
            progress: new NumberField({
              initial: 0,
              min: 0,
              max: 10,
            }),
          }),
          { label: "kotb.lessonPlan" },
        ),

        monday: new SchemaField(
          {
            morning: new StringField({}),
            afternon: new StringField({}),
            nights: new StringField({}),
          },
          { label: "kotb.monday" },
        ),

        tuesday: new SchemaField(
          {
            morning: new StringField({}),
            afternon: new StringField({}),
            nights: new StringField({}),
          },
          { label: "kotb.tuesday" },
        ),

        wednesday: new SchemaField(
          {
            morning: new StringField({}),
            afternon: new StringField({}),
            nights: new StringField({}),
          },
          { label: "kotb.wednesday" },
        ),

        thursday: new SchemaField(
          {
            morning: new StringField({}),
            afternon: new StringField({}),
            nights: new StringField({}),
          },
          { label: "kotb.thursday" },
        ),

        friday: new SchemaField(
          {
            morning: new StringField({}),
            afternon: new StringField({}),
            nights: new StringField({}),
          },
          { label: "kotb.friday" },
        ),
      }),
    };
  }
  prepareDerivedData() {
    super.prepareDerivedData();
    this._setMinimumAge();
    this._prepareAttributeTotals();
  }

  _setMinimumAge() {
    const grade = this.grade;
    const age = this.age;
    switch (grade) {
      case "underclass": {
        if (age > 14) {
          this.age = 14;
        }
        this.attributes.charm.stat.bonuses =
          this.attributes.charm.stat.bonuses + 1;
        this.attributes.flight.stat.bonuses =
          this.attributes.flight.stat.bonuses + 1;

        break;
      }
      case "upperclass": {
        if (age < 15) {
          this.age = 15;
        } else if (age > 20) {
          this.age = 20;
        }
        this.attributes.brawn.stat.bonuses =
          this.attributes.brawn.stat.bonuses + 1;
        this.attributes.fight.stat.bonuses =
          this.attributes.fight.stat.bonuses + 1;

        break;
      }
      case "faculty": {
        if (age < 21) {
          this.age = 21;
        }
        this.attributes.brains.stat.bonuses =
          this.attributes.brains.stat.bonuses + 1;
        this.attributes.grit.stat.bonuses =
          this.attributes.grit.stat.bonuses + 1;

        break;
      }
    }
  }
  _prepareAttributeTotals() {
    for (const attribute of Object.values(this.attributes)) {
      for (const type of ["magic", "stat"]) {
        const data = attribute[type];

        data.total = data.value + data.bonuses;
      }
    }
  }
}
