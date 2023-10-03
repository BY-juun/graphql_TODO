import { Posts } from "./posts";

const Tables = {
  Posts,
};

async function createTables() {
  for (const [key, table] of Object.entries(Tables)) {
    await table.sync().then(() => {
      console.log(`${key} Table is Created`);
    });
  }
}

export default createTables;
