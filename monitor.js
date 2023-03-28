const axios = require("axios");
const cheerio = require("cheerio");
const crypto = require("crypto");
const sleep = require("util").promisify(setTimeout);

async function getPageContent(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  return $.html();
}

async function monitorChanges(url, checkInterval) {
  let previousContentHash = null;
  console.log("En route !");

  while (true) {

    console.log("Aucun changements actuellement ");
    const content = await getPageContent(url);
    const contentHash = crypto.createHash("md5").update(content).digest("hex");

    if (previousContentHash && contentHash !== previousContentHash) {
      console.log("La page a changé!");
      // Ajoutez ici votre code pour envoyer une notification, par exemple un email.
    }

    previousContentHash = contentHash;
    await sleep(checkInterval * 1000);
  }
}

const url =
  "https://www.onepiece-cardgame.it/articoli_int?uid=a3G7aZObLuULZ%2fuCKcOpqA%3d%3d"; // Remplacez par l'URL que vous souhaitez surveiller
const checkInterval = 60; // Vérifiez les changements toutes les 60 secondes
monitorChanges(url, checkInterval);
