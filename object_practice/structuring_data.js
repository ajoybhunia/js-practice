const print = console.log;

const intern = {
  name: "Siddu",
  age: 16,
  height: 5.5,
  weight: 90,
  nickname: "Khabri",
  address: {
    vill: "sklm",
    state: "AP",
    counrty: "IND",
  },
  id: 47212,
  mob: 3141714,
  emil: "vksiddu@gmail.com",
  hobbies: [
    "staying healthy",
    "spreading confidential info.",
  ],
};

print(intern);

const keys = Object.keys(intern);
print(keys);

const values = Object.values(intern);
print(values);

const entries = Object.entries(intern);
print(entries);

for (const keys in intern) {
  print(keys);
}

for (const values of Object.entries(intern)) {
  print(values);
}