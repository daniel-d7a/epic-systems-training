// const fs = require("node:fs");
const fs = require("node:fs/promises");

// fs.readFile("1.txt", { encoding: "utf-8" }, (err, data1) => {
//   console.log(data1);
//   fs.readFile("2.txt", { encoding: "utf-8" }, (err, data2) => {
//     console.log(data2);
//     fs.readFile("3.txt", { encoding: "utf-8" }, (err, data3) => {
//       console.log(data3);
//     });
//   });
// });

// fs.readFile("100.txt", { encoding: "utf-8" })
//   .then((data1) => {
//     console.log(data1);
//     return fs.readFile("2.txt", { encoding: "utf-8" });
//   })
//   .then((data2) => {
//     console.log(data2);
//     return fs.readFile("3.txt", { encoding: "utf-8" });
//   })
//   .then((data3) => {
//     console.log(data3);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

async function readFiles() {
  const file1 = await fs.readFile("1.txt", { encoding: "utf-8" });
  console.log(file1);
  const file2 = await fs.readFile("2.txt", { encoding: "utf-8" });
  console.log(file2);
  const file3 = await fs.readFile("3.txt", { encoding: "utf-8" });
  console.log(file3);
}

readFiles();

console.log("reading a file");
