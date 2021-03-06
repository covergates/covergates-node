const Binary = require("./binary-install/binary");
const os = require("os");

const { version } = require("./package.json");
const repository = "https://github.com/covergates/covergates";

/**
 * get user's os and architecture
 * @return {string} target platform
 */
function getPlatform() {
  const type = os.type();
  const arch = os.arch();

  const supportedPlatforms = [
    {
      TYPE: "Linux",
      ARCH: "x32",
      TARGET: "linux-386",
    },
    {
      TYPE: "Linux",
      ARCH: "x64",
      TARGET: "linux-amd64",
    },
    {
      TYPE: "Linux",
      ARCH: "arm",
      TARGET: "linux-arm",
    },
    {
      TYPE: "Linux",
      ARCH: "arm64",
      TARGET: "linux-arm64",
    },
    {
      TYPE: "Windows_NT",
      ARCH: "x32",
      TARGET: "windows-386",
    },
    {
      TYPE: "Windows_NT",
      ARCH: "x64",
      TARGET: "windows-amd64",
    },
    {
      TYPE: "Darwin",
      ARCH: "x32",
      TARGET: "darwin-386",
    },
    {
      TYPE: "Darwin",
      ARCH: "x64",
      TARGET: "darwin-amd64",
    },
  ];

  for (const platform of supportedPlatforms) {
    if (type === platform.TYPE && arch === platform.ARCH) {
      return platform.TARGET;
    }
  }
  console.error(
    `Platform with type ${type} and architecture ${arch}` +
      "is not supported by covergates"
  );
  process.exit(1);
}

/**
 * get binary
 * @return {Binary}
 */
function getBinary() {
  const platform = getPlatform();
  const url = `${repository}/releases/download/v${version}`;
  const binary = `covergates-v${version}-${platform}.tar.gz`;
  const name = "covergates";
  const installDirectory = __dirname;
  return new Binary(`${url}/${binary}`, { name, installDirectory });
}

const run = () => {
  const binary = getBinary();
  binary.run();
};

const install = () => {
  const binary = getBinary();
  binary.install();
};

const uninstall = () => {
  const binary = getBinary();
  binary.uninstall();
};

module.exports = {
  install,
  run,
  uninstall,
};
