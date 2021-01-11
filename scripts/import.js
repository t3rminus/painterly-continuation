import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';
import DB from './lib/database.js';

const sourcePath = process.env.GITHUB_ACTIONS ? process.env.GITHUB_WORKSPACE : '.';
const ref = process.env.GITHUB_ACTIONS ? process.env.GITHUB_REF : 'blob/main';
const baseUrl = process.env.GITHUB_ACTIONS ?
  'https://raw.github.com/' + process.env.GITHUB_REPOSITORY + '/' + process.env.GITHUB_SHA :
  'https://raw.github.com/t3rminus/painterly-continuation/main';


(async () => {
  const db = new DB();
  await db.initialize(baseUrl);

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
        await db.insertOption({ ...json, id, group, category, texture, path: fileDir, telethon: json.telethon || false });
      }
    } catch(err) {
      console.log(err);
      /* ignore */
    }
  }
  db.end();
})();