# Trino Setup

## Run Trino using Docker

### 1. Clone the Repository (Preferred)
Clone the repository using the following command:
```sh
git clone git@github.com:aryanbhat-fl/trino_setup.git
```

Alternatively, you can run the Docker command directly.

### 2. Run Trino Using Docker Run Command
Ensure you have the necessary properties file inside the directory where you are executing this command.

```sh
docker run -d \
  --name trino \
  -p 8086:8080 \
  -v "$(pwd)/postgres.properties:/etc/trino/catalog/postgres.properties" \
  -v "$(pwd)/post-init.sh:/tmp/post-init.sh" \
  -v "$(pwd)/post-init.sql:/tmp/post-init.sql" \
  trinodb/trino:latest \
  /tmp/post-init.sh
```

### 3. Update Postgres Connection
Modify the `postgres.properties` file and replace `<IP>` with your PostgreSQL database IP address.

### 4. Start the Trino Service Using Docker Compose
Run the following command to start the container:
```sh
docker compose up -d
```

### 5. Verify Trino Container is Running
Check if the container named `trino` is running:
```sh
docker ps | grep trino
```

You can also check the Web UI at: [http://localhost:8086](http://localhost:8086)

### 6. Verify PostgreSQL Connection in Trino
#### 6.1 Access Trino CLI
```sh
docker exec -it trino trino
```

#### 6.2 List Available Catalogs
Run the following command in the CLI:
```sh
show catalogs;
```
You should see an output listing the available catalogs.

#### 6.3 Check PostgreSQL Connection
```sh
show schemas from postgres;
```
If the connection is successful, it will display available schemas.

### 7. Troubleshooting
If you encounter an error, bring down the container:
```sh
docker compose down
```
Update the `postgres.properties` file with the correct IP and retry the setup.

---

## Adding More Catalogs
To add more catalogs, ensure that a connector exists for the database. You can check available connectors here:
[Trino Connectors](https://trino.io/docs/current/connector.html)

To add a catalog:
1. Create the appropriate properties file using the database documentation.
2. Place the catalog file inside the repository.

### Example: Adding Elasticsearch
Refer to the official documentation: [Elasticsearch Connector](https://trino.io/docs/current/connector/elasticsearch.html)

