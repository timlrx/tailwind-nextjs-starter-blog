# Deploy with Docker

Follow the [official Next.js repo docker build example and instructions](https://github.com/vercel/next.js/tree/canary/examples/with-docker) to deploy with docker. Copy the [`Dockerfile`](https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile) into the root of the project and modify the `next.config.js` file:

```js
// next.config.js
module.exports = {
  // ... rest of the configuration.
  output: 'standalone',
}
```

You can now build the docker image and run it:

```bash
docker build -t nextjs-docker .
docker run -p 3000:3000 nextjs-docker
```

Alternatively, to use docker compose, refer to the [docker compose repo](https://github.com/vercel/next.js/tree/canary/examples/with-docker-compose).
