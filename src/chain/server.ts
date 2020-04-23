import { Router, Server } from "@open-rpc/server-js";
import { OpenrpcDocument } from "@open-rpc/meta-schema";
import { methods } from "./ethereum";
import cors from "cors";
import { json as jsonParser } from "body-parser";
import { HandleFunction } from "connect";
import openRPCDoc from "../../openrpc.json";
import jsonSchemaRefParser from "json-schema-ref-parser";
import { IMethodMapping } from "@open-rpc/server-js/build/router";
const openRPC = openRPCDoc as OpenrpcDocument;
/**
 * ChainServer
 * It instantiates the Chain Server.
 */
export class ChainServer {

  public port: string;
  public methodMapping: IMethodMapping;
  public storage: any;

  constructor(port: string, methodMapping: IMethodMapping) {
    this.port = port;
    this.methodMapping = methodMapping;
  }

  /**
   * start - Launches the chain server
   */
  public async start() {
    const derefOpenRPCDoc: OpenrpcDocument = await jsonSchemaRefParser.dereference(openRPC) as OpenrpcDocument;
    const router = new Router(derefOpenRPCDoc, this.methodMapping);
    const options = {
      methodMapping: this.methodMapping,
      openrpcDocument: derefOpenRPCDoc,
      router,
      transportConfigs: this.setupTransport(this.port),
    };
    const server = new Server(options);
    server.start();
  }

  public async stop() {
    this.storage.close();
  }

  private setupTransport(port: string = "8557"): any {
    const corsOptions = { origin: "*" } as cors.CorsOptions;
    return [{
      type: "HTTPTransport", options: {
        middleware: [
          cors(corsOptions) as HandleFunction,
          jsonParser(),
        ],
        port,
      },
    },
    ];
  }

}
