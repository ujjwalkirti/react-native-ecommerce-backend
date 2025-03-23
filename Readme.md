# Ecommerce API

This is a dummy api for an ecommerce website. I have created this to test my DevOps and AWS skills.

## Endpoints

### Product Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /products | Get all products |
| GET | /products/:id | Get a single product |
| GET | /products/search/:key | Search for a product |
| POST | /products | Create a new product |

### Cart Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /cart/find/:id | Get a cart |
| POST | /cart | Create a new cart |
| POST | /cart/:quantity | Add a product to the cart |
| DELETE | /cart/:cartItemId | Remove a product from the cart |

### Order Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /orders/:id | Get all orders |

### User Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| DELETE | /user/:id | Delete a user |
| GET | /user/:id | Get a user |

### Auth Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login a user |




### Things to do:
- [x] Dockerfile to build docker image 
- [x] Add JWT-based login feature  
- [x] Store tokens in MongoDB  
- [ ] Write github actions file to push docker image to AWS ECR
- [ ] Kubernetes deployment file  
- [ ] Deploy to AWS EKS  
- [ ] Configure env variables in k8s deployment  


## ✅ DevOps Pipeline Setup Checklist

### 1️⃣ Code Repository & CI/CD Trigger
- [ ] Initialize a GitHub repository for the ExpressJS application

- [ ] Set up GitHub Actions workflow to trigger on push

- [ ] Install and configure Renovate Bot for dependency updates

- [ ] Add Prettier + ESLint for code quality checks

### 2️⃣ Build & Push Docker Image
- [ ] Create a Dockerfile for the application

- [ ] Set up GitHub Actions to build the Docker image

- [ ] Use Kaniko for efficient Docker builds in CI

- [ ] Scan the image for vulnerabilities using Trivy

- [ ] Authenticate with AWS and push the image to Amazon ECR

### 3️⃣ Deploy Using GitOps (Argo CD + Helm + Kustomize)
- [ ] Store Kubernetes manifests in a separate Git repository

- [ ] Install Argo CD on the Amazon EKS cluster

- [ ] Configure Argo CD to watch the Git repository for changes

- [ ] Use Helm to manage Kubernetes manifests

- [ ]Use Kustomize for environment-specific configurations

### 4️⃣ Kubernetes Deployment in Amazon EKS
- [ ] Provision an Amazon EKS cluster

- [ ] Deploy the application using Kubernetes Deployment, Service, and Ingress

- [ ] Configure External Secrets Operator to pull secrets from AWS Secrets Manager

- [ ] Set up Ingress-NGINX + Cert-Manager for HTTPS with Let's Encrypt

### 5️⃣ Monitoring & Logging
- [ ] Install Prometheus for collecting application & Kubernetes metrics

- [ ] Set up Grafana for real-time monitoring dashboards

- [ ] Configure Loki for centralized logging

- [ ] Set up Tempo for distributed tracing of requests

### 6️⃣ Auto Scaling & Performance Optimization
- [ ] Configure Horizontal Pod Autoscaler (HPA) for scaling based on CPU/memory

- [ ] Install KEDA for event-driven auto-scaling

- [ ] Use Goldilocks to optimize Kubernetes resource limits

### 7️⃣ Security & Policy Enforcement
- [ ] Install OPA Gatekeeper for Kubernetes policy enforcement

- [ ] Configure Kyverno to automate policy management

- [ ] Deploy Falco to detect security threats in real time

### 8️⃣ Backup & Disaster Recovery
- [ ] Install Velero for Kubernetes backup and recovery

- [ ] Configure Kanister for PostgreSQL database backups

### 9️⃣ Cost Optimization & Observability
- [ ] Install Kubecost to track Kubernetes resource usage and costs

- [ ] Use AWS Compute Optimizer to optimize EC2 instance types

### 🔟 CI/CD Deployment & Rollbacks
- [ ] Use Argo Rollouts for canary and blue-green deployments

- [ ] Test rollback functionality using Argo CD

### 1️⃣1️⃣ Centralized DevOps Dashboard
- [ ] Set up Backstage to manage services, monitoring, and deployments