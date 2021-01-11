import pg from 'pg';
const { Pool } = pg;

const QUERY_CREATE_SETTINGS = `
  CREATE TABLE IF NOT EXISTS "settings" (
    "key" text,
    "value" text,
    PRIMARY KEY ("key")
  );
`;

const QUERY_CREATE_OPTIONS = `
  CREATE TABLE IF NOT EXISTS "painterly_options" (
    "id" text NOT NULL,
    "group" text NOT NULL,
    "category" text NOT NULL,
    "texture" text NOT NULL,
    "name" text NOT NULL,
    "choice" text,
    "author" text NOT NULL,
    "date" date NOT NULL,
    "preview" text,
    "path" text NOT NULL,
    "tags" text[],
    "collections" text[],
    "telethon" boolean DEFAULT false NOT NULL,
    "edits" jsonb,
    "output" jsonb,
    PRIMARY KEY (id)
  );
`;

const QUERY_INSERT_OPTION = `
  INSERT INTO "painterly_options" (
    "id", "group", "category", "texture", "name", "choice",
    "author", "date", "preview", "path", "tags", "collections",
    "telethon", "edits", "output"
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
`;

const VERSION = 1;

export default class Database {
  constructor() {
    this.client = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }

  async initialize(baseUrl) {
    await this.client.query(QUERY_CREATE_SETTINGS);

    const currentVersion = await this.getSetting('version', 0);
    if(currentVersion < VERSION) {
      await this.client.query('DROP TABLE IF EXISTS "painterly_options"');
      await this.client.query(QUERY_CREATE_OPTIONS);
      await this.setSetting('version', VERSION);
    }
    await this.client.query(`TRUNCATE TABLE "painterly_options"`);
    await this.setSetting('base_url', baseUrl);
  }

  async setSetting(key, val) {
    await this.client.query(`
      INSERT INTO "settings" ("key", "value")
      VALUES ($1, $2)
      ON CONFLICT ("key")
      DO UPDATE SET "value" = $2`, [key, val]);
  }

  async getSetting(key, defaultVal) {
    const result = await this.client.query(`SELECT "value" FROM "settings" WHERE "key" = $1`, [key]);
    if(result.rows[0]) {
      return result.rows[0].value;
    }
    return defaultVal;
  }

  insertOption(option) {
    return this.client.query(QUERY_INSERT_OPTION, [
      option.id, option.group, option.category, option.texture, option.name, option.choice,
      option.author, option.date, option.preview, option.path, option.tags, option.collections,
      option.telethon || false, option.edits, option.output
    ]);
  }

  end() {
    return this.client.end();
  }
}