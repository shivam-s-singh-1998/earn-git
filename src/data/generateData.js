import { faker } from "@faker-js/faker"; 
import fs from "fs";

const users = [];

for (let i = 0; i < 10000; i++) {
  users.push({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 65 }),
    city: faker.location.city(),
    profession: faker.person.jobTitle()
  });
}

// Save as JSON
fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
console.log("✅ Generated 10,000 users in users.json");
