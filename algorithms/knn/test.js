/**
 * This file contains an example for using the knn algorithm.
 */

import KNN from "./KNN.js";
import * as fs from "fs";
import KDTree from "./KDTree.js";
var train_dataset = [
  [0, 0, 0],
  [0, 1, 1],
  [1, 1, 0],
  [2, 2, 2],
  [1, 2, 2],
  [2, 1, 2],
];
var train_labels = [0, 0, 0, 1, 1, 1];
var knn = new KNN(train_dataset, train_labels, { k: 2 }); // consider 2 nearest neighbors
var test_dataset = [[0.9, 0.9, 0.9]];
var test_dataset2 = [[0.1, 0.5, 0.4]];
var test_dataset3 = [[0.95, 0.93, 0.92]];

var ans = knn.predict(test_dataset);

var knnJson = knn.toJSON();

fs.writeFileSync("knn-model.json", JSON.stringify(knnJson));
var knnString = fs.readFileSync("knn-model.json", "utf-8");
console.log(JSON.parse(knnString));

var test_dataset2 = [0.1, 5, 0.4];
var test_dataset3 = [0.95, 0.93, 0.92];

var ans2 = knn.predict(test_dataset2);
var ans3 = knn.predict(test_dataset3);

var knnJson = knn.toJSON();

fs.writeFileSync("knn-model.json", JSON.stringify(knnJson));
var knnString = fs.readFileSync("knn-model.json", "utf-8");
console.log(JSON.parse(knnString));

console.log(ans2, ans3);
