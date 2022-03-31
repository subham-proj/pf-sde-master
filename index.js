import fs from "fs";

const prepareBalanceSheet = (path) => {
  fs.readFile(path, function (err, data) {
    if (err) throw err;
    const jsonData = JSON.parse(data);

    let map = {};

    jsonData.revenueData.map((e) => {
      if (e.startDate in map) {
        map[e.startDate] += e.amount;
      } else {
        map[e.startDate] = e.amount;
      }
    });

    jsonData.expenseData.map((e) => {
      if (e.startDate in map) {
        map[e.startDate] -= e.amount;
      } else {
        map[e.startDate] = -e.amount;
      }
    });

    let balanceArray = [];

    for (let [key, val] of Object.entries(map)) {
      balanceArray.push({
        amount: val,
        startDate: key,
      });
    }

    let balance = balanceArray.sort((a, b) => {
      return new Date(a.startDate) - new Date(b.startDate);
    });

    console.log(JSON.stringify({ balance }));
  });
};

prepareBalanceSheet("./1-input.json"); //put the json file path with correct input format to run.
