import path from "path";
import Fastify, { FastifyServerFactory } from "fastify";
import helmet from "fastify-helmet";
import cors from "fastify-cors";
import fastifyStatic from "fastify-static";
import fastifyJwt from "fastify-jwt";
import { API_JWT_SECRET, API_BASE_PATH } from "$/configs/envValues";
import server from "$/$server";

export const init = (serverFactory?: FastifyServerFactory) => {
  const app = Fastify({ serverFactory, logger: true });
  app.register(helmet);
  app.register(cors);
  app.register(fastifyStatic, {
    root: path.join(__dirname, "static"),
    prefix: "/static/",
  });
  app.register(fastifyJwt, { secret: API_JWT_SECRET });
  server(app, { basePath: API_BASE_PATH });
  return app;
};
