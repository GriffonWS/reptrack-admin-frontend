# Admin Frontend Deployment Guide

## 🚀 Automatic Deployment (CI/CD)

Every push to `main` branch automatically deploys to EC2 server on **port 3001**.

### Prerequisites

1. **EC2 Server Setup**
   - Ubuntu server with Node.js and PM2 installed
   - Admin code cloned to: `/home/ubuntu/reptrack-admin-frontend`
   - PM2 process name: `reptrack-admin`
   - Port: **3001**

2. **GitHub Repository Secrets**

   Go to: **Repository → Settings → Secrets and variables → Actions**

   Add these secrets:

   | Secret Name | Value | Description |
   |------------|-------|-------------|
   | `EC2_HOST` | `13.221.184.255` | EC2 server IP address |
   | `EC2_USERNAME` | `ubuntu` | SSH username |
   | `EC2_SSH_KEY` | Private SSH key | Full SSH private key (including BEGIN/END lines) |

3. **SSH Key Setup**

   Add your public SSH key to EC2:
   ```bash
   echo "your-public-key" >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

---

## 📋 Initial Server Setup (One-time)

```bash
# SSH into server
ssh -i ~/.ssh/griffon-ec2-key ubuntu@13.221.184.255

# Clone admin frontend
cd /home/ubuntu
git clone https://github.com/GriffonWS/reptrack-admin-frontend.git
cd reptrack-admin-frontend

# Install dependencies
npm install

# Create .env file with your variables
nano .env

# Build the admin frontend
npm run build

# Install serve globally
sudo npm install -g serve

# Start admin with PM2 on port 3001
pm2 start "serve -s dist -l 3001" --name reptrack-admin

# Save PM2 configuration
pm2 save

# Verify it's running
pm2 list
curl http://localhost:3001
```

**Important:** Make sure port 3001 is open in EC2 Security Group!

---

## 🚀 Deployment Process

### Automatic (Recommended)
```bash
git add .
git commit -m "your changes"
git push origin main
```
✅ GitHub Actions will automatically:
- SSH into EC2 server
- Pull latest code
- Install dependencies
- Build production bundle
- Restart PM2 process on port 3001

### Manual Deployment
```bash
# SSH into server
ssh -i ~/.ssh/griffon-ec2-key ubuntu@13.221.184.255

# Navigate to admin project
cd /home/ubuntu/reptrack-admin-frontend

# Pull latest code
git pull origin main

# Install dependencies
npm install

# Build for production
npm run build

# Restart PM2
pm2 restart reptrack-admin
pm2 save
```

---

## 🔍 Monitoring

**Check Deployment Status:**
- GitHub Actions: https://github.com/GriffonWS/reptrack-admin-frontend/actions

**Check Server Status:**
```bash
# PM2 status
pm2 status reptrack-admin

# View logs
pm2 logs reptrack-admin

# Check if accessible
curl http://13.221.184.255:3001
```

---

## 🌐 Access

**Admin Frontend URL:** http://13.221.184.255:3001
**Port:** 3001

---

## ⚠️ Important Notes

- **`.env` file**: Not tracked in git. Manage separately on server.
- **Port**: Admin runs on port 3001 (different from main frontend on port 80)
- **Process**: Uses PM2 with `serve` to serve built files
- **Auto-restart**: PM2 ensures admin restarts on server reboot
- **Build Tool**: Uses Vite for building

---

## 🐛 Troubleshooting

**Deployment failed?**
1. Check GitHub Actions logs
2. Verify SSH key is correct
3. Ensure all secrets are set in GitHub
4. Check PM2 logs: `pm2 logs reptrack-admin`

**Port 3001 not accessible?**
1. Verify EC2 Security Group allows port 3001
2. Check if PM2 process is running: `pm2 list`
3. Test locally on server: `curl http://localhost:3001`
4. Restart PM2: `pm2 restart reptrack-admin`

**Changes not showing?**
1. Clear browser cache (Ctrl + Shift + R)
2. Check if build succeeded: `ls -la /home/ubuntu/reptrack-admin-frontend/dist`
3. Verify PM2 process: `pm2 describe reptrack-admin`
