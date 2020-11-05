export interface IDatabaseEnvorimmet {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
}

export interface IEnvorimment {
  envorimmentName: string;
  serverPort: string;
  database: IDatabaseEnvorimmet;
}

export class Envorimment {
  private envorimentList: IEnvorimment[] = [
    {
      envorimmentName: "development",
      database: {
        username: "postgres",
        password: "postgres",
        database: "mass_schedule",
        host: "127.0.0.0",
        dialect: "postgres",
      },
      serverPort: "8008",
    },
    {
      envorimmentName: "test",
      database: {
        username: "postgres",
        password: "postgres",
        database: "mass_schedule",
        host: "127.0.0.0",
        dialect: "postgres",
      },
      serverPort: "8009",
    },
  ];

  private envorimment: string;

  constructor(envorimment: string) {
    this.envorimment = envorimment;
  }

  getInfoEnvorimment(): IEnvorimment {
    let envorimmentSelected: IEnvorimment;

    this.envorimentList.forEach((element) => {
      if (element.envorimmentName == this.envorimment) {
        envorimmentSelected = element;
        return;
      }
    });

    return envorimmentSelected;
  }
}
