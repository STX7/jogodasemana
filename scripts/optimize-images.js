/**
 * Otimiza as imagens de img/: converte para WebP, limita a largura e
 * atualiza as referências em js/data.js.
 *
 * Uso: npm run optimize:images
 * Imagens já em .webp e pequenas são mantidas. Os originais são removidos
 * (continuam disponíveis no histórico do git).
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Desabilita cache interno do sharp para evitar locks de arquivo no Windows
sharp.cache(false);

const ROOT = path.resolve(__dirname, "..");
const IMG_DIR = path.join(ROOT, "img");
const DATA_FILE = path.join(ROOT, "js", "data.js");
const MAX_WIDTH = 1920;
const QUALITY = 80;
const EXTS = new Set([".jpg", ".jpeg", ".png", ".jfif", ".webp"]);

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(dir, e.name);
  return e.isDirectory() ? walk(p) : [p];
});

(async () => {
  const files = walk(IMG_DIR).filter((f) => EXTS.has(path.extname(f).toLowerCase()));
  const renames = {}; // "img/a/b.png" -> "img/a/b.webp"
  let before = 0, after = 0;

  for (const file of files) {
    const ext = path.extname(file);
    const srcBuf = fs.readFileSync(file);
    const srcSize = srcBuf.length;
    before += srcSize;

    // Se já for .webp, converte para verificar se comprime mais ou redimensiona
    const isWebp = ext.toLowerCase() === ".webp";
    let target = isWebp ? file : file.slice(0, -ext.length) + ".webp";

    try {
      const optBuf = await sharp(srcBuf)
        .rotate() // respeita orientação EXIF
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toBuffer();

      if (isWebp && optBuf.length >= srcSize) {
        after += srcSize;
        continue;
      }

      fs.writeFileSync(target, optBuf);
      if (target !== file) {
        fs.unlinkSync(file);
      }
      after += optBuf.length;

      const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");
      if (rel(file) !== rel(target)) {
        renames[rel(file)] = rel(target);
      }
    } catch (err) {
      console.warn(`Aviso: erro ao processar ${file}:`, err.message);
      after += srcSize;
    }
  }

  // Atualiza referências no data.js
  let data = fs.readFileSync(DATA_FILE, "utf8");
  let count = 0;
  for (const [from, to] of Object.entries(renames)) {
    const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    data = data.replace(re, () => { count++; return to; });
  }
  fs.writeFileSync(DATA_FILE, data, "utf8");

  const mb = (b) => (b / 1024 / 1024).toFixed(1) + " MB";
  console.log(`\nConcluído!`);
  console.log(`${files.length} imagens processadas.`);
  console.log(`Tamanho total: ${mb(before)} -> ${mb(after)} (economia de ${((1 - after / before) * 100).toFixed(1)}%)`);
  console.log(`${count} referências atualizadas em js/data.js.`);
})();
