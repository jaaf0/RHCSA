# RHCSA Daily Tasks and Solutions: Real-World Scenarios

As a Red Hat Certified System Administrator (RHCSA), daily tasks often involve a mix of routine maintenance, troubleshooting, and implementing new configurations. This document outlines several common scenarios an RHCSA might encounter in a professional environment, along with detailed, step-by-step solutions.

---

## Scenario 1: Expanding Storage for a Web Server

**Problem:** A web server is running low on disk space in its `/var/www/html` directory, which is currently part of a Logical Volume (LV). The system administrator needs to expand this LV to accommodate more website content without downtime.

**RHCSA Skills Applied:** Logical Volume Management (LVM), file system resizing.

### Solution Steps:

1.  **Identify the current LVM setup:**
    First, determine the current size of the logical volume and the available space in its volume group.
    ```bash
    sudo lvs
    sudo vgs
    ```

2.  **Extend the Logical Volume:**
    Assume there is free space in the volume group. Extend the logical volume by 5GB. Replace `web_vg` and `html_lv` with the actual volume group and logical volume names.
    ```bash
    sudo lvextend -L +5G /dev/web_vg/html_lv
    ```
    *Note: If there isn't enough free space in the volume group, you would first need to add a new physical volume (e.g., a new disk or partition) to the volume group using `vgextend`.*

3.  **Resize the File System:**
    After extending the logical volume, the file system on it must also be resized to utilize the new space. For XFS file systems (common in RHEL 7/8/9):
    ```bash
    sudo xfs_growfs /var/www/html
    ```
    For Ext4 file systems:
    ```bash
    sudo resize2fs /dev/web_vg/html_lv
    ```

4.  **Verify the expansion:**
    Check the new size of the file system.
    ```bash
    df -h /var/www/html
    ```

---

## Scenario 2: Automating a Daily Backup Script

**Problem:** The manager requests a daily backup of critical configuration files (`/etc/httpd/conf/httpd.conf`, `/etc/nginx/nginx.conf`) to a remote server via `rsync`. The backup should run every day at 2:00 AM.

**RHCSA Skills Applied:** Cron scheduling, `rsync`, basic shell scripting.

### Solution Steps:

1.  **Create the backup script:**
    Create a shell script that performs the backup. Save it as `/usr/local/bin/daily_config_backup.sh`.
    ```bash
    #!/bin/bash
    
    BACKUP_DIR="/tmp/config_backup_$(date +%Y%m%d)"
    REMOTE_USER="backupuser"
    REMOTE_HOST="backupserver.example.com"
    REMOTE_PATH="/backups/web_configs/"
    
    mkdir -p $BACKUP_DIR
    cp /etc/httpd/conf/httpd.conf $BACKUP_DIR/
    cp /etc/nginx/nginx.conf $BACKUP_DIR/
    
    rsync -avz $BACKUP_DIR/ ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}
    
    rm -rf $BACKUP_DIR
    
    exit 0
    ```

2.  **Make the script executable:**
    ```bash
    sudo chmod +x /usr/local/bin/daily_config_backup.sh
    ```

3.  **Schedule the script with Cron:**
    Open the root user's crontab for editing.
    ```bash
    sudo crontab -e
    ```
    Add the following line to schedule the script to run daily at 2:00 AM:
    ```
    0 2 * * * /usr/local/bin/daily_config_backup.sh > /dev/null 2>&1
    ```
    *Explanation: `0 2 * * *` means at minute 0, hour 2, every day of the month, every month, every day of the week. `> /dev/null 2>&1` redirects all output (stdout and stderr) to null to prevent cron from sending emails.*

4.  **Verify Cron job:**
    List the root user's cron jobs.
    ```bash
    sudo crontab -l
    ```

---

## Scenario 3: Deploying a Simple Web Application in a Container

**Problem:** A developer provides a simple Nginx configuration and an HTML file. The task is to deploy this as a web server using Podman, ensuring it's accessible on port 8080 of the host and starts automatically on boot.

**RHCSA Skills Applied:** Container management (Podman), systemd services, firewall configuration.

### Solution Steps:

1.  **Prepare the content:**
    Create a directory for the web content and Nginx configuration.
    ```bash
    mkdir -p ~/mywebapp/html
    mkdir -p ~/mywebapp/nginx_conf
    ```
    Create a simple `index.html`:
    ```bash
    echo "<h1>Hello from my Containerized Web App!</h1>" > ~/mywebapp/html/index.html
    ```
    Create a basic `nginx.conf` (simplified for this example):
    ```bash
    echo "worker_processes 1;\n\nevents {\n    worker_connections 1024;\n}\n\nhttp {\n    include mime.types;\n    default_type application/octet-stream;\n\n    sendfile on;\n    keepalive_timeout 65;\n\n    server {\n        listen 80;\n        root /usr/share/nginx/html;\n        index index.html;\n    }\n}" > ~/mywebapp/nginx_conf/nginx.conf
    ```

2.  **Run the Nginx container with Podman:**
    Map the host directories to the container and expose port 8080.
    ```bash
    podman run -d --name my_nginx_app -p 8080:80 -v ~/mywebapp/html:/usr/share/nginx/html:ro -v ~/mywebapp/nginx_conf/nginx.conf:/etc/nginx/nginx.conf:ro nginx:latest
    ```
    *Explanation: `-d` runs in detached mode, `--name` assigns a name, `-p 8080:80` maps host port 8080 to container port 80, `-v` mounts volumes, `nginx:latest` is the image.*

3.  **Generate and enable a systemd service for the container:**
    This ensures the container starts automatically on boot.
    ```bash
    podman generate systemd --name my_nginx_app --files
    sudo mv container-my_nginx_app.service /etc/systemd/system/
    sudo systemctl daemon-reload
    sudo systemctl enable --now container-my_nginx_app.service
    ```

4.  **Configure the firewall:**
    Allow traffic on port 8080.
    ```bash
    sudo firewall-cmd --permanent --add-port=8080/tcp
    sudo firewall-cmd --reload
    ```

5.  **Verify accessibility:**
    Test the web server from the host.
    ```bash
    curl http://localhost:8080
    ```

---

## Scenario 4: Troubleshooting SELinux Denials

**Problem:** A custom application is failing to write to its log file located at `/opt/my_app/logs/app.log`, and `dmesg` shows SELinux AVC denials related to the application's process.

**RHCSA Skills Applied:** SELinux troubleshooting, `sealert`, `audit2allow`.

### Solution Steps:

1.  **Identify the SELinux denial:**
    Use `sealert` to get a human-readable explanation of the denial.
    ```bash
    sudo sealert -a /var/log/audit/audit.log
    ```
    This command will typically provide suggestions for fixing the issue, including `audit2allow` commands.

2.  **Analyze the audit log (manual inspection):**
    If `sealert` is not installed or for deeper analysis, inspect the audit log directly.
    ```bash
    sudo grep "AVC" /var/log/audit/audit.log | tail -n 5
    ```

3.  **Generate a custom SELinux policy module (if necessary):**
    If the denial is legitimate and the application needs specific access not covered by existing policies, create a custom policy. *This is an advanced step and should only be done after careful consideration.*
    ```bash
    sudo grep "AVC" /var/log/audit/audit.log | audit2allow -M myapp_log_write
    sudo semodule -i myapp_log_write.pp
    ```
    *Explanation: `audit2allow -M myapp_log_write` creates a type enforcement file (`.te`) and a policy package (`.pp`). `semodule -i` installs the policy.*

4.  **Restore file contexts (if mislabeled):**
    Sometimes, files are simply mislabeled. If the application's log directory has the wrong SELinux context, restore it.
    ```bash
    sudo semanage fcontext -a -t var_log_t "/opt/my_app/logs(/.*)?"
    sudo restorecon -Rv /opt/my_app/logs
    ```
    *Explanation: `semanage fcontext -a -t var_log_t` adds a rule to the SELinux file context configuration. `restorecon -Rv` applies the correct context recursively.*

5.  **Verify the fix:**
    Restart the application and check `/var/log/audit/audit.log` for new AVC denials.

---

## Scenario 5: Managing User Accounts and Privileges

**Problem:** A new junior administrator, `jradmin`, needs an account on the system. They should have sudo privileges to run specific commands (e.g., `systemctl restart httpd`) but not full root access.

**RHCSA Skills Applied:** User and group management, sudo configuration.

### Solution Steps:

1.  **Create the new user account:**
    ```bash
    sudo useradd jradmin
    sudo passwd jradmin
    ```

2.  **Configure sudo privileges:**
    Edit the sudoers file using `visudo` to ensure proper syntax and prevent errors.
    ```bash
    sudo visudo
    ```
    Add the following line to allow `jradmin` to restart the `httpd` service without a password:
    ```
    jradmin ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart httpd
    ```
    *Note: For more complex scenarios, you might create a custom sudoers file in `/etc/sudoers.d/`.*

3.  **Verify sudo access:**
    Switch to the new user and test the sudo command.
    ```bash
    su - jradmin
    sudo systemctl restart httpd
    ```
    The command should execute without prompting for `jradmin`'s password.

---

These scenarios represent a fraction of the tasks an RHCSA might face, but they cover fundamental skills in storage, automation, containers, security, and user management. Mastering these areas is crucial for effective system administration on Red Hat Enterprise Linux.
