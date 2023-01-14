const https = require("https");
const fs = require("fs");

const origin = "https://github.com/madler/zlib/raw/master/contrib/minizip";
const entries = new Map([
  [`${origin}/ioapi.h`, "include/miniunz/ioapi.h"],
  [`${origin}/unzip.h`, "include/miniunz/unzip.h"],
  [`${origin}/ioapi.c`, "src/ioapi.c"],
  [`${origin}/unzip.c`, "src/unzip.c"],
]);

function downloadFileToPath(netFile, localFile) {
  const lfs = fs.createWriteStream(localFile);
  console.log("get", localFile);
  https.get(netFile, (response) => {
    console.log("pipe", localFile);
    response.pipe(lfs);
    lfs.on("finish", () => {
      console.log("done", localFile);
      lfs.close();
    });
  });
}

for (const [netFile, localFile] of entries) {
  downloadFileToPath(netFile, localFile);
}
