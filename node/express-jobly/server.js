"use strict";

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});

// {
// 	"username": "testadmin",
// 	"password": "password",
// 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMTI1NjQ1Nn0.kz5Ad9joyO2fsc3iPtQpw1SqGwl4DShsV_0h4pl-rIU"
// }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcyMTQzNjAyMX0.gMa4WrEp3u6k3HOSO42NXYydELhlgrUZUXTSxeLpZ1U

// {
//   id:1,
//   title: "j1",
//   salary: 50000,
//   equity: 0,
//   companyHandle: "job-test",

// },
// {
//   id: 2,
//   title: "j2",
//   salary: 75000,
//   equity: 1,
//   companyHandle: "testy-jobs",

// },
// {
//   id:3,
//   title: "j3",
//   salary: 125000,
//   equity: 0,
//   companyHandle: "nice-pay",

// }