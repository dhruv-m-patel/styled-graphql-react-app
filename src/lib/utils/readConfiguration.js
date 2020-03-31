export default function readConfiguration(configFactory) {
  return new Promise((resolve, reject) => {
    configFactory.create((err, config) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(config);
    });
  });
}
