import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';

const sourcePath = process.env.GITHUB_ACTIONS ? process.env.GITHUB_WORKSPACE : '.';
const ref = process.env.GITHUB_ACTIONS ? process.env.GITHUB_REF : 'blob/main';
const baseUrl = process.env.GITHUB_ACTIONS ?
  process.env.GITHUB_SERVER_URL.replace('github.com','raw.github.com') + '/' + process.env.GITHUB_REPOSITORY :
  'https://raw.github.com/t3rminus/painterly-continuation';

const titleCase = (str) =>
  str.toLowerCase().split(' ').map((word) => (word.charAt(0).toUpperCase() + word.slice(1))).join(' ');

(async () => {
  const srcGlob = path.join(sourcePath, '{textures,misc}', '**', '*.json');
  const jsons = await new Promise((y,n) => glob(srcGlob, (err, res) => err ? n(err) : y(res)));
  const result = {
    version: '0.1.0',
    baseUrl: baseUrl + '/' + ref,
    groups: {}
  };
  for(const file of jsons) {
    try {
      const json = await fs.readJson(file);
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
      if(!json.kind) {
        if(result.groups[group]) {
          if(result.groups[group].categories[category]) {
            if(result.groups[group].categories[category].textures[texture]) {
              result.groups[group].categories[category].textures[texture].options[id] = json;
            } else {
              result.groups[group].categories[category].textures[texture] = {
                name: titleCase(texture),
                options: {
                  [id]: json
                }
              }
            }
          } else {
            result.groups[group].categories[category] = {
              name: titleCase(category),
              textures: {
                [texture]: {
                  name: titleCase(texture),
                  options: {
                    [id]: json
                  }
                }
              }
            };
          }
        } else {
          result.groups[group] = {
            name: titleCase(group),
            categories: {
              [category]: {
                name: titleCase(category),
                textures: {
                  [texture]: {
                    name: titleCase(texture),
                    options: {
                      [id]: json
                    }
                  }
                }
              }
            }
          };
        }
      }
    } catch(err) {
      console.log(err);
      /* ignore */
    }
  }
  fs.ensureDir('build');
  await fs.writeJSON('build/combined.json', result, { spaces: 2 });
})();