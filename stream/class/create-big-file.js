import fs from "fs"
import { faker } from '@faker-js/faker';

const writeStream = fs.createWriteStream('./stream/class/big-file.text');
writeStream.write("userId;username;email;avatar;password;birthdate;registeredAt\n")

// create user
function createRandomUser() {
    return [
      faker.string.uuid(),
      faker.internet.username(),
      faker.internet.email(),
      faker.image.avatar(),
      faker.internet.password(),
      faker.date.birthdate(),
      faker.date.past(),
    ]
  }

for (let i = 1; i < 500_000; i++) {
  const user = createRandomUser();
  writeStream.write(user.join(";") + "\n");
}

writeStream.end();