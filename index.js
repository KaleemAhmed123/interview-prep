import fs from "fs";
import csv from "csv-parser";
const path = "./data/deliveries.csv";

const jsondata = [];
fs.createReadStream(path)
  .pipe(csv())
  .on("data", (row) => {
    jsondata.push(row);
  })
  .on("end", () => {
    fs.writeFile("./data/deliveries.json", JSON.stringify(jsondata, null, 2), (err) => {
      if (err) {
        console.log("Something wrong", err);
        return;
      }
      console.log("written to matches.json");
    });
  });
