import fs from "fs";
import csv from "csv-parser";
const path = "./data/matches.csv";

const jsondata = [];
fs.createReadStream(path)
  .pipe(csv())
  .on("data", (row) => {
    jsondata.push(row);
  })
  .on("end", () => {
    fs.writeFile("matches.json", JSON.stringify(jsondata), (err) => {
      if (err) {
        console.log("Something wrong", err);
        return;
      }
      console.log("written to matches.json");
    });
  });
