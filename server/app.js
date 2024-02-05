const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const allPackages = [
  {
    id: 1,
    packageName: "Basic",
    merryLimit: 25,
    icon: "/images/basic.svg",
    details: ["‘Merry’ more than a daily limited, Up to 25 Merry per day"],
    createdDate: "12/02/2022 10:30PM",
    updatedDate: "12/02/2022 10:30PM",
  },
  {
    id: 2,
    packageName: "Platinum",
    merryLimit: 45,
    icon: "/images/platinum.svg",
    details: ["'Merry’ more than a daily limited", "Up to 45 Merry per day"],
    createdDate: "12/02/2022 10:30PM",
    updatedDate: "12/02/2022 10:30PM",
  },
  {
    id: 3,
    packageName: "Premium",
    merryLimit: 70,
    icon: "/images/premium.svg",
    details: ["‘Merry’ more than a daily limited, Up to 70 Merry per day"],
    createdDate: "12/02/2022 10:30PM",
    updatedDate: "12/02/2022 10:30PM",
  },
];

app.get("/packages", (req, res) => {
  res.json(allPackages);
});

app.get("/packages/:id", (req, res) => {
  const id = req.params.id;
  const package = allPackages.find((p) => p.id == id);
  if (!package) {
    res.status(404).json({ error: "Package not found" });
  } else {
    res.json(package);
  }
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
