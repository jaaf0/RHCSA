# RHCSA Advanced Daily Tasks and Solutions: Real-World Scenarios

Building upon the foundational RHCSA skills, system administrators often encounter more complex challenges that require a deeper understanding of Red Hat Enterprise Linux. This document presents additional advanced scenarios, focusing on networking, boot troubleshooting, swap management, and SSH security, along with detailed solutions.

---

## Scenario 1: Configuring Network Bonding for High Availability

**Problem:** A critical database server requires network redundancy and increased throughput. The administrator needs to configure network bonding (mode 1 - active-backup) using two Ethernet interfaces (`enp1s0` and `enp2s0`) to create a single logical interface `bond0` with a static IP address.

**RHCSA Skills Applied:** Network configuration, network bonding, `nmcli`.

### Solution Steps:

1.  **Verify Network Interfaces:**
    Ensure both physical interfaces are available and not currently configured.
    ```bash
    nmcli device status
    ```

2.  **Create the Bonding Interface:**
    Create the `bond0` connection in active-backup mode with a static IP address.
    ```bash
    sudo nmcli connection add type bond ifname bond0 con-name bond0 mode active-backup ip4 192.168.1.100/24 gw4 192.168.1.1
    sudo nmcli connection modify bond0 ipv4.dns "8.8.8.8 8.8.4.4"
    sudo nmcli connection modify bond0 bond.miimon 100
    ```
    *Explanation: `mode active-backup` (mode 1) provides redundancy. `bond.miimon 100` sets the MII link monitoring frequency to 100ms.*

3.  **Add Slave Interfaces to the Bond:**
    Add `enp1s0` and `enp2s0` as slave interfaces to `bond0`.
    ```bash
    sudo nmcli connection add type ethernet ifname enp1s0 master bond0 con-name bond0-slave1
    sudo nmcli connection add type ethernet ifname enp2s0 master bond0 con-name bond0-slave2
    ```

4.  **Activate the Connections:**
    Bring up the bond and its slave interfaces.
    ```bash
    sudo nmcli connection up bond0
    sudo nmcli connection up bond0-slave1
    sudo nmcli connection up bond0-slave2
    ```

5.  **Verify Bonding Status:**
    Check the status of the bond interface.
    ```bash
    cat /proc/net/bonding/bond0
    nmcli device show bond0
    ```

---

## Scenario 2: Recovering from a Corrupted GRUB Bootloader

**Problem:** A server fails to boot after a failed kernel update, displaying a `grub>` prompt or a blank screen. The administrator needs to restore the GRUB bootloader to make the system bootable again.

**RHCSA Skills Applied:** Boot process troubleshooting, GRUB repair, chroot environment.

### Solution Steps:

1.  **Boot from a Live CD/USB:**
    Boot the affected system using a RHEL installation ISO or a rescue disk.

2.  **Mount the Root Filesystem:**
    Identify the root partition (e.g., `/dev/sda2`) and mount it.
    ```bash
    sudo fdisk -l
    sudo mount /dev/sda2 /mnt
    ```

3.  **Mount Essential Filesystems for Chroot:**
    Mount `/boot`, `/boot/efi` (if UEFI), `/dev`, `/proc`, and `/sys`.
    ```bash
    sudo mount /dev/sda1 /mnt/boot  # Assuming /boot is on sda1
    sudo mount /dev/sda0 /mnt/boot/efi # Assuming /boot/efi is on sda0 for UEFI
    sudo mount --bind /dev /mnt/dev
    sudo mount --bind /proc /mnt/proc
    sudo mount --bind /sys /mnt/sys
    ```

4.  **Chroot into the Installed System:**
    Change the root directory to the mounted system.
    ```bash
    sudo chroot /mnt
    ```

5.  **Reinstall GRUB:**
    Reinstall GRUB to the master boot record (MBR) or EFI partition. Replace `/dev/sda` with the correct disk.
    ```bash
    grub2-install /dev/sda
    ```
    *For UEFI systems, ensure `grub2-efi` is installed and run `grub2-mkconfig -o /boot/efi/EFI/redhat/grub.cfg`.*

6.  **Generate GRUB Configuration:**
    Create a new `grub.cfg` file.
    ```bash
    grub2-mkconfig -o /boot/grub2/grub.cfg
    ```

7.  **Exit Chroot and Reboot:**
    ```bash
    exit
    sudo umount -R /mnt
    sudo reboot
    ```

---

## Scenario 3: Adding and Managing Swap Space Dynamically

**Problem:** A server is experiencing performance issues due to insufficient RAM, leading to excessive swapping. The administrator needs to add a new 4GB swap file to supplement the existing swap space without rebooting.

**RHCSA Skills Applied:** Swap management, file system utilities.

### Solution Steps:

1.  **Check Current Swap Status:**
    Verify the existing swap space.
    ```bash
    sudo swapon --show
    sudo free -h
    ```

2.  **Create a Swap File:**
    Create a 4GB file (e.g., `/swapfile`) using `fallocate`.
    ```bash
    sudo fallocate -l 4G /swapfile
    ```

3.  **Set Correct Permissions:**
    Restrict access to the swap file for security.
    ```bash
    sudo chmod 600 /swapfile
    ```

4.  **Format the File as Swap:**
    Initialize the file as a swap area.
    ```bash
    sudo mkswap /swapfile
    ```

5.  **Activate the Swap File:**
    Enable the new swap space.
    ```bash
    sudo swapon /swapfile
    ```

6.  **Make Swap Persistent:**
    Add an entry to `/etc/fstab` to ensure the swap file is activated on every boot.
    ```bash
    echo '/swapfile none swap defaults 0 0' | sudo tee -a /etc/fstab
    ```

7.  **Verify New Swap Status:**
    Confirm the new swap space is active.
    ```bash
    sudo swapon --show
    sudo free -h
    ```

---

## Scenario 4: Hardening SSH Access with Key-Based Authentication and Custom Port

**Problem:** The security team mandates that all servers use SSH key-based authentication exclusively, disable password authentication, and change the default SSH port from 22 to 2222 for enhanced security.

**RHCSA Skills Applied:** SSH configuration, firewall management, user management.

### Solution Steps:

1.  **Generate SSH Keys (if not already done):**
    On the client machine, generate an SSH key pair.
    ```bash
    ssh-keygen -t rsa -b 4096
    ```

2.  **Copy Public Key to Server:**
    Use `ssh-copy-id` to transfer the public key to the server. Replace `user@server_ip`.
    ```bash
    ssh-copy-id user@server_ip
    ```
    *Verify key-based login works before proceeding.*

3.  **Modify SSH Daemon Configuration:**
    Edit `/etc/ssh/sshd_config` on the server.
    ```bash
    sudo vi /etc/ssh/sshd_config
    ```
    Change/add the following lines:
    ```
    Port 2222
    PasswordAuthentication no
    PermitRootLogin no
    ```

4.  **Update SELinux Policy for Custom SSH Port:**
    If SELinux is enforcing, you must allow the new port.
    ```bash
    sudo semanage port -a -t ssh_port_t -p tcp 2222
    ```

5.  **Configure Firewall for Custom SSH Port:**
    Allow the new port and remove the old one.
    ```bash
    sudo firewall-cmd --permanent --add-port=2222/tcp
    sudo firewall-cmd --permanent --remove-service=ssh
    sudo firewall-cmd --reload
    ```

6.  **Restart SSH Service:**
    Apply the changes.
    ```bash
    sudo systemctl restart sshd
    ```

7.  **Test New SSH Configuration:**
    From the client, attempt to connect using the new port and key.
    ```bash
    ssh -p 2222 user@server_ip
    ```
    *Ensure you can log in with the key before closing the old SSH session.*

---

## Scenario 5: Troubleshooting a Systemd Service Failure

**Problem:** A custom application service (`mywebapp.service`) fails to start after a server reboot. The administrator needs to diagnose the issue and get the service running.

**RHCSA Skills Applied:** Systemd management, log analysis, troubleshooting.

### Solution Steps:

1.  **Check Service Status:**
    Examine the service status for immediate clues.
    ```bash
    sudo systemctl status mywebapp.service
    ```
    Look for `Active: failed` and any error messages.

2.  **Examine Journal Logs:**
    View recent logs for the service.
    ```bash
    sudo journalctl -u mywebapp.service --since "1 hour ago"
    ```
    Look for specific error messages, failed dependencies, or permission issues.

3.  **Check Service Unit File:**
    Inspect the service unit file for syntax errors or incorrect paths.
    ```bash
    sudo systemctl cat mywebapp.service
    ```
    Pay attention to `ExecStart`, `WorkingDirectory`, `User`, and `Group` directives.

4.  **Test the ExecStart Command Manually:**
    Try running the command specified in `ExecStart` directly from the shell to see if it produces errors.
    ```bash
    # Example: sudo /usr/local/bin/mywebapp --config /etc/mywebapp/config.conf
    ```

5.  **Check File Permissions and SELinux:**
    Ensure the service executable and its configuration/log files have correct permissions and SELinux contexts.
    ```bash
    ls -lZ /usr/local/bin/mywebapp
    ls -lZ /etc/mywebapp/config.conf
    sudo restorecon -Rv /usr/local/bin/mywebapp
    ```

6.  **Reload Systemd and Restart Service:**
    After making any changes to the unit file or system, reload systemd and attempt to restart.
    ```bash
    sudo systemctl daemon-reload
    sudo systemctl restart mywebapp.service
    sudo systemctl status mywebapp.service
    ```

---

These advanced scenarios highlight the problem-solving skills and in-depth knowledge expected of an RHCSA in a production environment. Each task requires not just command execution but also a methodical approach to diagnosis and resolution.
