# Manual Production Deployment Guide

Since you want to securely deploy to the Production Docker Swarm manually before enabling Jenkins automation, here are the exact steps you must run **on the production server** where your Swarm manager is running.

### 1. Copy the Files to the Production Server
Ensure that the `prod` branch codebase (which includes `docker-compose.prod.yml`, `nginx.conf`, `Dockerfile` etc.) is copied into a matching directory on the production server.

### 2. Build the Docker Image Locally
Because we aren't using the Jenkins `docker push` mechanism to pull from Docker Hub yet, you need to manually build the image directly on the production server so that Docker Swarm knows about it:
```bash
cd /path/to/connectado-outlook-ui
docker build -t connectado-outlook-ui:prod .
```

### 3. Deploy to Docker Swarm
Now you can instruct your swarm to spin up the 5 distributed replicas securely! The compose file already defaults the `${IMAGE_NAME}` variable to `connectado-outlook-ui:prod`.
```bash
docker stack deploy -c docker-compose.prod.yml connectado_stack
```

### 4. Verify the Replicas are Running
Check that all 5 instances were successfully scheduled and are load-balanced:
```bash
docker stack ps connectado_stack
docker service ls
```

### 5. Setup the Main Host Nginx Proxy
Since we created a dedicated and isolated routing file `prod.sigmasoftinfotech.com.conf` for best practices, you don't need to modify your massive `default` file! 
Just symlink this new file into your `sites-enabled` tracking folder:

```bash
# 1. Copy the isolated config file we generated in the repo to Nginx
sudo cp prod.sigmasoftinfotech.com.conf /etc/nginx/sites-available/prod.sigmasoftinfotech.com

# 2. Activate it securely by linking it into sites-enabled
sudo ln -s /etc/nginx/sites-available/prod.sigmasoftinfotech.com /etc/nginx/sites-enabled/

# 3. Reload the main server to pick up the new domain!
sudo systemctl reload nginx
```

Your application should now be smoothly load-balanced under `prod.sigmasoftinfotech.com/connectado_outlook/` !
