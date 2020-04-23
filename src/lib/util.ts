import net, { AddressInfo } from "net";

export const getAvailableTCPPort = (testPort: number = 0): Promise<number> => new Promise((resolve, reject) => {
  const server = net.createServer();
  server.on("error", reject);
  server.listen(testPort, () => {
    const { port } = server.address() as AddressInfo;
    server.close(() => {
      resolve(port);
    });
  });
});
