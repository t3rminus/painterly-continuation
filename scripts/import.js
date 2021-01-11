import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';
import pg from 'pg';
const { Pool } = pg;

const sourcePath = process.env.GITHUB_ACTIONS ? process.env.GITHUB_WORKSPACE : '.';
const ref = process.env.GITHUB_ACTIONS ? process.env.GITHUB_REF : 'blob/main';
const baseUrl = process.env.GITHUB_ACTIONS ?
  'https://raw.github.com/' + process.env.GITHUB_REPOSITORY + '/' + process.env.GITHUB_SHA :
  'https://raw.github.com/t3rminus/painterly-continuation/main';

const client = new Pool({ connectionString: process.env.DATABASE_URL });
const insertQuery = `
  INSERT INTO "painterly_options" (
    "id", "group", "category", "texture", "name", "choice",
    "author", "date", "preview", "path", "tags", "collections",
    "telethon", "edits", "output"
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
  ON CONFLICT ("id")
  DO UPDATE SET
    "name" = $5, "choice" = $6, "author" = $7, "date" = $8, "preview" = $9,
    "path" = $10, "tags" = $11, "collections" = $12, "telethon" = $13,
    "edits" = $14, "output" = $15
`;

const titleCase = (str) =>
  str.toLowerCase().split(' ').map((word) => (word.charAt(0).toUpperCase() + word.slice(1))).join(' ');

const setPath = (obj, path, set) => {
  let start = obj;
  const segs = path.split('.');
  const last = segs.pop();
  segs.forEach((seg) => {
    if(!start[seg]) {
      start[seg] = {};
    }
    start = start[seg];
  });
  start[last] = set;
};

(async () => {
  await client.connect();
  await client.query('TRUNCATE TABLE "painterly_options"');

  const srcGlob = path.join(sourcePath, '{textures,misc}', '**', '*.json');
  const jsons = await new Promise((y,n) => glob(srcGlob, (err, res) => err ? n(err) : y(res)));

  for(const file of jsons) {
    try {
      const json = await fs.readJson(file);
      if(json.name && json.category && json.choice && json.author) {
        const fileDir = path.dirname(file.replace(path.resolve(sourcePath), ''));
        const [,group,texture] = /([^\/]+)\/([^\/]+)\/[^.\/]+\.json$/.exec(file).map(t => t.toLowerCase());
        const category = json.category.toLowerCase();
        const id = `${group}/${json.category}/${texture}/${json.name}`;
        if(json.preview) {
          json.preview = `${fileDir}/${json.preview}`;
        } else {
          const firstFile = Object.values(json.output)[0];
          if(Array.isArray(firstFile)) {
            json.preview = `${fileDir}/${firstFile.slice(-1)[0]}`;
          } else {
            json.preview = `${fileDir}/${firstFile}`;
          }
        }
        json.path = fileDir;
        await client.query(insertQuery, [
          id, group, category, texture, json.name, json.choice,
          json.author, json.date, json.preview, json.path, json.tags, json.collections,
          json.telethon || false, json.edits, json.output
        ])
      }
    } catch(err) {
      console.log(err);
      /* ignore */
    }
  }
  await client.end();
})();