import { Todos } from "./todos";

const Tables = {
  Todos,
};

async function createTables() {
  for (const [key, table] of Object.entries(Tables)) {
    await table.sync().then(() => {
      console.log(`${key} Table is Created`);
    });
  }
}

export default createTables;
