const isInternalCommand = function (command) {
  const internalCommands = ['cd', 'pwd', 'which'];
  return internalCommands.includes(command);
};

const executeInternalCommand = function (args) {
  console.log('Internal command executed.');
  return;
};

const shell = function () {
  while (true) {
    const tokens = prompt('shell> ').split(' ');
    const command = tokens[0];
    const commandArgs = tokens[1];

    if (isInternalCommand(command)) {
      console.log(command);
      executeInternalCommand(commandArgs);
    }
  }
};

shell();
