/*
 * @description 遍历文件夹生成markdown
 */
const { writeFile, stat, rm, readdir, readFile } = require("fs/promises");
const { parse } = require("path");

const originSource = "./src";

const generateName = "menu.md";

let mdContent = ``;

const getRealName = (name) => {
  if (!name) return "";
  return name.replace(/(-|\s)(\w)/g, (_, c, d) => (d ? d.toUpperCase() : ""));
};

const getNameFromFileName = (fileName) => {
  try {
    const {
      groups: { name },
    } = /\d+、(?<name>.*)(\.ts)?/.exec(fileName);
    // name转成驼峰并首字母大写
    return getRealName(name);
  } catch {
    return "";
  }
};

const readLine = async (dirName) => {
  const { name } = parse(dirName);
  const dir = await stat(dirName);
  if (dir.isDirectory()) {
    mdContent = `${mdContent}\r\n### ${getNameFromFileName(name)}
    `;
    // 读取文件 如果是目录继续读取
    const files = await readdir(dirName);
    const p = [];
    files.forEach((file) => {
      if (!/^\d.*/.exec(file)) {
        return;
      }
      p.push(readLine(`${dirName}/${file}`));
    });
    await Promise.all(p)
    return Promise.resolve(mdContent);
  } else {
    mdContent = `
${mdContent}${name}
    `;
    return Promise.resolve(mdContent);
  }
};

const generateMd = async () => {
  try {
    await rm(`${generateName}`, {
      force: true,
    });
    await readLine(originSource);
    writeFile(`./${generateName}`, mdContent);
  } catch (e) {
    throw new Error(`文件读取失败、${e}`);
  }
};

generateMd()
