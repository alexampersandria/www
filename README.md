# liara.io

## Building

Build images for production

```sh
sh ./build.sh
```

This will create a Docker image tagged `liara.io:latest` and `liara.io:<version>`, where `<version>` is the version specified in the `VERSION` file

## Running

Run the production image

```sh
docker run -d -p 80:80 liara.io:latest
```
