// Red Hat Certification Cheat Sheet Data with Visual Demonstrations
// RH124, RH134, RH254

export interface CommandDemo {
  command: string;
  syntax: string;
  description: string;
  example: string;
  deepExplanation: string;
  demoImage?: string;
  commonErrors?: string[];
  relatedCommands?: string[];
}

export interface Category {
  name: string;
  description: string;
  commands: CommandDemo[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  categories: Category[];
}

export const coursesData: Record<string, Course> = {
  RH124: {
    id: "RH124",
    title: "System Administration I",
    subtitle: "RHCSA Foundations",
    description: "Master Linux file management, user administration, permissions, networking, and basic system services. This course covers essential skills for day-to-day system administration.",
    categories: [
      {
        name: "File Management",
        description: "Essential commands for navigating, creating, and managing files and directories",
        commands: [
          {
            command: "ls -la",
            syntax: "ls [OPTIONS] [PATH]",
            description: "List directory contents with detailed information including permissions, ownership, and timestamps",
            example: "ls -lah /home",
            deepExplanation: "The 'ls' command displays file listings. The '-l' flag shows long format with permissions (rwxrwxrwx), link count, owner, group, size in bytes, date modified, and filename. The '-a' flag includes hidden files (starting with dot). The '-h' flag shows human-readable sizes (K, M, G). Understanding permissions is crucial: first character is file type (- for regular file, d for directory, l for symlink), followed by three groups of three characters for owner, group, and others permissions.",
            demoImage: "https://private-us-east-1.manuscdn.com/sessionFile/Kr6wm7X9bJQ2LhW1viMT7u/sandbox/uN72BrYQawMSyoSZc9mTVj-img-1_1770334214000_na1fn_ZGVtby1maWxlLW1hbmFnZW1lbnQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3I2d203WDliSlEyTGhXMXZpTVQ3dS9zYW5kYm94L3VONzJCcllRYXdNU3lvU1pjOW1UVmotaW1nLTFfMTc3MDMzNDIxNDAwMF9uYTFmbl9aR1Z0YnkxbWFXeGxMVzFoYm1GblpXMWxiblEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=KG4OymdEEhnLupCkpMAa06soC~UAAaRc4tD8~-eq130su49JkHZcxC4CN-sp1pV-ERZkfzSEDE0haJsc1-h8n2Z2~kgg1J3bZBld7e1pn6aeu~Eo6WAiVdPlaqDEAYziD-CXbssY8USwrvYlu0jnDFPckXdWNGMpThyKSaY5vqtjHwd5wiZD2GsgmkH~LPJLR9CZpu2s8SA7sOEVVP-n96nMbW7OH3vY6IwW-Jx9YfW7LPADubE67lFM4lNgiXWDhcJ-WBhmoX0Oe7pppK3h79b0tugM6vLYtulWYkMCY3qtR714IVWBcrF1VlRhWodXxFP7cQapWhKhZeeZAdvK9g__",
            commonErrors: ["Permission denied when accessing files", "No such file or directory", "Incorrect path specification"],
            relatedCommands: ["find", "locate", "grep"]
          },
          {
            command: "mkdir -p",
            syntax: "mkdir -p [DIRECTORY_PATH]",
            description: "Create directories including parent directories if they don't exist",
            example: "mkdir -p /var/log/app/backup",
            deepExplanation: "The 'mkdir' command creates directories. Without the '-p' flag, it fails if parent directories don't exist. The '-p' flag creates all necessary parent directories automatically. This is useful for creating nested directory structures in one command. The command returns no output on success, only errors on failure.",
            commonErrors: ["Permission denied", "File exists (when trying to create existing directory)"],
            relatedCommands: ["rmdir", "cd", "pwd"]
          },
          {
            command: "cp -r",
            syntax: "cp -r [SOURCE] [DESTINATION]",
            description: "Copy files or directories recursively, preserving directory structure",
            example: "cp -r /home/user/documents /backup/",
            deepExplanation: "The 'cp' command copies files. The '-r' flag enables recursive copying for directories and their contents. Use '-i' for interactive mode (asks before overwriting). Use '-v' for verbose output showing what's being copied. Use '-p' to preserve permissions and timestamps. Combine flags like 'cp -rip' for safe recursive copying with preservation.",
            commonErrors: ["Cannot stat: No such file or directory", "Permission denied", "Is a directory (when copying directory without -r)"],
            relatedCommands: ["mv", "rm", "rsync"]
          },
          {
            command: "mv",
            syntax: "mv [SOURCE] [DESTINATION]",
            description: "Move or rename files and directories",
            example: "mv old_filename.txt new_filename.txt",
            deepExplanation: "The 'mv' command moves files or directories. If source and destination are on the same filesystem, it's a rename operation. If on different filesystems, it copies then deletes. Use '-i' for interactive mode. Use '-v' for verbose output. Unlike 'cp', 'mv' doesn't require special flags for directories.",
            commonErrors: ["Permission denied", "Cannot move directory into itself"],
            relatedCommands: ["cp", "rm"]
          },
          {
            command: "rm -rf",
            syntax: "rm -rf [PATH]",
            description: "Remove files or directories recursively and forcefully without prompting",
            example: "rm -rf /tmp/old_cache/",
            deepExplanation: "The 'rm' command removes files. The '-r' flag enables recursive deletion for directories. The '-f' flag forces removal without prompting, even for write-protected files. CAUTION: 'rm -rf' is dangerous and irreversible. Always double-check the path. Consider using 'rm -ri' for interactive confirmation. Never run 'rm -rf /' or similar commands that could delete your entire system.",
            commonErrors: ["Permission denied", "No such file or directory", "Is a directory (without -r flag)"],
            relatedCommands: ["rmdir", "shred"]
          },
          {
            command: "find",
            syntax: "find [PATH] -name [PATTERN] -type [f|d]",
            description: "Search for files and directories matching specific criteria",
            example: "find /home -name '*.log' -type f",
            deepExplanation: "The 'find' command searches the filesystem recursively. Use '-name' for filename patterns (supports wildcards). Use '-type f' for files, '-type d' for directories. Use '-size' to search by file size (e.g., '+100M' for files larger than 100MB). Use '-mtime' to find files modified N days ago. Use '-exec' to execute commands on found files. Combine multiple criteria with '-and' or '-or'.",
            commonErrors: ["Permission denied on some directories", "No such file or directory"],
            relatedCommands: ["locate", "grep", "ls"]
          },
          {
            command: "tar -czf",
            syntax: "tar -czf [ARCHIVE.tar.gz] [FILES]",
            description: "Create compressed tar archive with gzip compression",
            example: "tar -czf backup.tar.gz /home/user/documents/",
            deepExplanation: "The 'tar' command creates archives. The '-c' flag creates archive, '-z' adds gzip compression, '-f' specifies filename. Use '-x' to extract, '-t' to list contents. Use '-v' for verbose output. Common compression options: '-z' for gzip (.tar.gz), '-j' for bzip2 (.tar.bz2), '-J' for xz (.tar.xz). Extraction example: 'tar -xzf archive.tar.gz'.",
            commonErrors: ["Cannot open file", "Permission denied"],
            relatedCommands: ["gzip", "zip", "unzip"]
          }
        ]
      },
      {
        name: "User Management",
        description: "Commands for creating, modifying, and managing user accounts and groups",
        commands: [
          {
            command: "useradd",
            syntax: "useradd -m -s /bin/bash [USERNAME]",
            description: "Create a new user account with home directory and shell",
            example: "useradd -m -s /bin/bash john",
            deepExplanation: "The 'useradd' command creates new user accounts. The '-m' flag creates the home directory (/home/username). The '-s' flag sets the login shell (typically /bin/bash or /bin/sh). The '-u' flag specifies UID (user ID). The '-g' flag specifies primary group. The '-G' flag adds supplementary groups. The '-c' flag sets the comment/full name. User information is stored in /etc/passwd, passwords in /etc/shadow, and groups in /etc/group.",
            demoImage: "https://private-us-east-1.manuscdn.com/sessionFile/Kr6wm7X9bJQ2LhW1viMT7u/sandbox/uN72BrYQawMSyoSZc9mTVj-img-2_1770334212000_na1fn_ZGVtby11c2VyLW1hbmFnZW1lbnQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3I2d203WDliSlEyTGhXMXZpTVQ3dS9zYW5kYm94L3VONzJCcllRYXdNU3lvU1pjOW1UVmotaW1nLTJfMTc3MDMzNDIxMjAwMF9uYTFmbl9aR1Z0YnkxMWMyVnlMVzFoYm1GblpXMWxiblEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=F5JtA1yv3f3uQw3oy-xxb4fUGCJ3~Z7TFOiiDiaUSFjW0PQou~w~bobmAqro0fZ0tqWchLEF0~dPmwZf7iWP0~WFuThvHprR60LW3FYe277apSs1C44-gSCFNFXPnxCvXrSt--Vwq2uRAT1jFNos42gFTo0TRa4wkg9qY6iKUHhZAk1QtwPlrAST1qApyCigGjKUB7GhmcSlCJIfKGM-8VgUIG8qwgE5gUbvOGfizc1quzjFRWphm1Rn-XatzHCX5RjpLS1YU2xLuRpreKgApTUBmFikbtvm2PH9pOH~ovqCz4eGa46nbr63V3588YqMMZrksEGdXLAeX3qWOofZAw__",
            commonErrors: ["User already exists", "UID already in use", "Permission denied"],
            relatedCommands: ["userdel", "usermod", "passwd"]
          },
          {
            command: "usermod",
            syntax: "usermod -aG [GROUP] [USERNAME]",
            description: "Modify user account properties, commonly used to add users to groups",
            example: "usermod -aG wheel john",
            deepExplanation: "The 'usermod' command modifies existing user accounts. The '-aG' flags append the user to supplementary groups (the 'a' prevents removing from other groups). The '-l' flag renames the user. The '-d' flag changes home directory. The '-s' flag changes login shell. The '-L' flag locks the account, '-U' unlocks it. Changes take effect on next login for most modifications.",
            commonErrors: ["User does not exist", "Group does not exist", "User is currently logged in"],
            relatedCommands: ["useradd", "userdel", "groups"]
          },
          {
            command: "passwd",
            syntax: "passwd [USERNAME]",
            description: "Change user password or manage password policies",
            example: "passwd john",
            deepExplanation: "The 'passwd' command changes passwords. Run without arguments to change your own password. Root can change any user's password. The '-e' flag expires password forcing change on next login. The '-l' flag locks the account. The '-u' flag unlocks it. The '-d' flag removes password (not recommended). The '-x' flag sets maximum days before password must change. The '-w' flag sets warning days before expiration.",
            commonErrors: ["Permission denied", "User does not exist"],
            relatedCommands: ["usermod", "chage"]
          },
          {
            command: "groupadd",
            syntax: "groupadd [GROUPNAME]",
            description: "Create a new group",
            example: "groupadd developers",
            deepExplanation: "The 'groupadd' command creates new groups. The '-g' flag specifies GID (group ID). Groups are used to manage permissions for multiple users. Group information is stored in /etc/group. Use 'groupmod' to modify groups and 'groupdel' to delete them. Primary groups are assigned during user creation, supplementary groups via 'usermod -aG'.",
            commonErrors: ["Group already exists", "GID already in use"],
            relatedCommands: ["groupmod", "groupdel", "groups"]
          },
          {
            command: "id",
            syntax: "id [USERNAME]",
            description: "Display user and group information",
            example: "id john",
            deepExplanation: "The 'id' command displays the UID, GID, and all group memberships for a user. Output format: 'uid=1001(john) gid=1001(john) groups=1001(john),10(wheel)'. This is useful for verifying user configuration and group membership. Run without arguments to display your own information.",
            commonErrors: ["No such user"],
            relatedCommands: ["groups", "whoami", "w"]
          },
          {
            command: "groups",
            syntax: "groups [USERNAME]",
            description: "Display group membership for a user",
            example: "groups john",
            deepExplanation: "The 'groups' command shows all groups a user belongs to. The first group listed is the primary group. Run without arguments to display your own groups. This is simpler than 'id' when you only need group information.",
            relatedCommands: ["id", "usermod"]
          }
        ]
      },
      {
        name: "File Permissions",
        description: "Understanding and managing file and directory permissions using chmod, chown, and umask",
        commands: [
          {
            command: "chmod 755",
            syntax: "chmod [MODE] [FILE]",
            description: "Change file permissions using octal notation (rwxr-xr-x)",
            example: "chmod 755 script.sh",
            deepExplanation: "The 'chmod' command changes file permissions. Octal notation: first digit for owner, second for group, third for others. Each digit is calculated: read(4) + write(2) + execute(1). So 755 means: owner=rwx(7), group=r-x(5), others=r-x(5). Common values: 644 (rw-r--r--) for files, 755 (rwxr-xr-x) for executables/directories, 600 (rw-------) for private files, 777 (rwxrwxrwx) for unrestricted access.",
            demoImage: "https://private-us-east-1.manuscdn.com/sessionFile/Kr6wm7X9bJQ2LhW1viMT7u/sandbox/uN72BrYQawMSyoSZc9mTVj-img-3_1770334223000_na1fn_ZGVtby1wZXJtaXNzaW9ucw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3I2d203WDliSlEyTGhXMXZpTVQ3dS9zYW5kYm94L3VONzJCcllRYXdNU3lvU1pjOW1UVmotaW1nLTNfMTc3MDMzNDIyMzAwMF9uYTFmbl9aR1Z0Ynkxd1pYSnRhWE56YVc5dWN3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ikRajLZOjN2ZnCmIGvdGZuvLqsmdl4b5Mz4JooSnpeTxBM016jlkZJ1nUtjxQcmYnv3G8sMxaUFdGgBEIYsvxLNxOyXCV7THvsLPOl8D-zvlxZr1HJEPPXNgRr0ZGbZRnf43iV6czbYMmyWWvGTj7YBZPdtH75KjBKfeQfRCvAalHiE8mxsl4gaaQY~rl~7MGLShrqBRHhzjAlg2s1MqG5nNt9gA6zaf4IFxEIl~P-Told9dCQq9Ao78cAMBp-e4bsw9KSC4A6MbS7NUMB-gQCPjNC2bRZEOSLyqJXztbbnVn6Iloag5~QzmGSMjokl2B0xc2U5hdSmLMfLDGEbQKg__",
            commonErrors: ["Permission denied", "Cannot access file"],
            relatedCommands: ["chown", "umask", "stat"]
          },
          {
            command: "chmod u+x",
            syntax: "chmod [u/g/o][+/-][rwx] [FILE]",
            description: "Change permissions using symbolic notation (add/remove specific permissions)",
            example: "chmod u+x script.sh",
            deepExplanation: "Symbolic notation provides more readable permission changes. 'u' = user/owner, 'g' = group, 'o' = others, 'a' = all. '+' adds permission, '-' removes, '=' sets exactly. Examples: 'u+x' (add execute for owner), 'g-w' (remove write for group), 'o=r' (set others to read-only), 'a+r' (add read for all). Combine multiple changes: 'chmod u+x,g-w,o-rwx file'.",
            commonErrors: ["Permission denied"],
            relatedCommands: ["chmod", "chown"]
          },
          {
            command: "chown",
            syntax: "chown [USER:GROUP] [FILE]",
            description: "Change file owner and group ownership",
            example: "chown john:developers /home/john/project/",
            deepExplanation: "The 'chown' command changes file ownership. Use 'user:group' format to change both. Use just 'user:' to change owner and set group to user's primary group. Use ':group' to change only group. The '-R' flag recursively changes ownership of directories and contents. Only root can change ownership. Use 'chgrp' to change only group ownership.",
            commonErrors: ["Permission denied", "No such user", "No such group"],
            relatedCommands: ["chgrp", "chmod"]
          },
          {
            command: "umask",
            syntax: "umask [VALUE]",
            description: "Set default permissions for newly created files and directories",
            example: "umask 0022",
            deepExplanation: "The 'umask' command sets the default permission mask. It subtracts from maximum permissions (666 for files, 777 for directories). Default umask 0022 means: files get 644 (666-022), directories get 755 (777-022). Common umask values: 0022 (standard), 0077 (restrictive - only owner access), 0002 (group-friendly). Set in ~/.bashrc or /etc/profile for persistence.",
            relatedCommands: ["chmod", "chown"]
          }
        ]
      },
      {
        name: "Services and Systemd",
        description: "Managing system services using systemctl and understanding systemd",
        commands: [
          {
            command: "systemctl start",
            syntax: "systemctl start [SERVICE]",
            description: "Start a system service immediately",
            example: "systemctl start httpd",
            deepExplanation: "The 'systemctl' command manages systemd services. 'start' begins service execution. 'stop' halts it. 'restart' stops then starts. 'reload' reloads configuration without stopping. 'status' shows current state. 'enable' makes service start on boot. 'disable' prevents boot startup. Services are defined in /etc/systemd/system/ or /usr/lib/systemd/system/.",
            demoImage: "https://private-us-east-1.manuscdn.com/sessionFile/Kr6wm7X9bJQ2LhW1viMT7u/sandbox/uN72BrYQawMSyoSZc9mTVj-img-4_1770334221000_na1fn_ZGVtby1zZXJ2aWNlcw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3I2d203WDliSlEyTGhXMXZpTVQ3dS9zYW5kYm94L3VONzJCcllRYXdNU3lvU1pjOW1UVmotaW1nLTRfMTc3MDMzNDIyMTAwMF9uYTFmbl9aR1Z0YnkxelpYSjJhV05sY3cucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=o719QhWF0I8YyBklN-fmExqBdubSpJtUFE8E1OCP38irIurPAz8aGYPiJEOZPcukynGtnKXQJypljiGVBznZOiH6iecClvYnN9n5cvIVmd3h85nlE93gCly~n5VFqIoo9~Pq1e~pmjd43gDJbcleKsmJRxlMRwzejSqd7u6vIVm3mmMpJ7zZIiSSaYoLQOj7W8nDRUyJTSehNUwOeZiHs7DwPVrQAphfp2bXJBbuQqac2RbFX-9K-AZNFt2axTv~h3lKLvDT~-K~BHL2d8Q5vvc5N0Fo7uDL0PtYE7qipuaYnkbBfoe4xmrHQ2rhk-Ehy9LKf6MmMk0bM61Q3caH9w__",
            commonErrors: ["Unit not found", "Permission denied", "Service failed to start"],
            relatedCommands: ["systemctl enable", "systemctl status", "journalctl"]
          },
          {
            command: "systemctl enable",
            syntax: "systemctl enable [SERVICE]",
            description: "Enable service to start automatically on system boot",
            example: "systemctl enable sshd",
            deepExplanation: "The 'enable' command creates symbolic links in /etc/systemd/system/ to make services start automatically on boot. Use 'disable' to prevent boot startup. Use 'is-enabled' to check if service is enabled. Enabled services still need to be started manually unless the system reboots. Use 'enable --now' to both enable and start immediately.",
            commonErrors: ["Unit not found", "Permission denied"],
            relatedCommands: ["systemctl disable", "systemctl start"]
          },
          {
            command: "systemctl status",
            syntax: "systemctl status [SERVICE]",
            description: "Check current status of a service",
            example: "systemctl status httpd",
            deepExplanation: "The 'status' command displays service state (active/inactive), whether it's enabled for boot, main PID, memory usage, and recent log entries. Output shows: Loaded (where service file is located), Active (running/dead status and duration), and Main PID. Exit code 0 means active, 3 means inactive. Use 'systemctl list-units --type=service' to list all services.",
            relatedCommands: ["systemctl start", "journalctl"]
          },
          {
            command: "journalctl",
            syntax: "journalctl -u [SERVICE] -n 50",
            description: "View system and service logs from journald",
            example: "journalctl -u httpd -n 50",
            deepExplanation: "The 'journalctl' command displays logs from systemd's journal. The '-u' flag filters by service unit. The '-n' flag shows last N lines (default 10). The '-f' flag follows log in real-time. The '-p' flag filters by priority (err, warning, info, debug). The '--since' and '--until' flags filter by time. Logs are stored in /var/log/journal/.",
            relatedCommands: ["systemctl status", "tail"]
          }
        ]
      },
      {
        name: "Networking",
        description: "Network configuration and troubleshooting with ip, nmcli, and related tools",
        commands: [
          {
            command: "ip addr show",
            syntax: "ip addr show [INTERFACE]",
            description: "Display IP addresses and network interface information",
            example: "ip addr show eth0",
            deepExplanation: "The 'ip' command is the modern replacement for ifconfig. 'addr show' displays all IP addresses, both IPv4 and IPv6. Shows interface state (UP/DOWN), MAC address, MTU, and associated IP addresses with CIDR notation. Run without interface name to show all interfaces. Use 'ip link show' for layer 2 information, 'ip route show' for routing table.",
            demoImage: "https://private-us-east-1.manuscdn.com/sessionFile/Kr6wm7X9bJQ2LhW1viMT7u/sandbox/uN72BrYQawMSyoSZc9mTVj-img-5_1770334220000_na1fn_ZGVtby1uZXR3b3JraW5n.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3I2d203WDliSlEyTGhXMXZpTVQ3dS9zYW5kYm94L3VONzJCcllRYXdNU3lvU1pjOW1UVmotaW1nLTVfMTc3MDMzNDIyMDAwMF9uYTFmbl9aR1Z0YnkxdVpYUjNiM0pyYVc1bi5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=KhPbG9zEESLbbtFdtkOcpTuyBuUDV9RUlia6XrI4msDyjiN097S5xHx9nZpj8Src-silXKvm52tgplOELWJOve5lTHyFvZ4icz-MJKwrXjEjHeSlQr4miiKqLj4jgaA80l~ANTClZ63qTJ5Qft8ZdprhHnd6H6Maf3uWt-KEotRC5legGmzqm8On8uBOg3inBK5hmsRpl6B9tfASS2re7jhr5yFA1j2eUM4HPTWBAFFPmc4zzmmQ5qKYtgKENqYhFJP0D6KNS4mjU6W7dokV5mSl-s2Vjijhpf-cfD6btzQaP5zNK9oywVxTykPO2DEdWtX~q808EOqlqGtxBrdJVQ__",
            commonErrors: ["No such device"],
            relatedCommands: ["nmcli", "ifconfig", "ip route"]
          },
          {
            command: "nmcli con show",
            syntax: "nmcli con show [CONNECTION]",
            description: "Display network connections managed by NetworkManager",
            example: "nmcli con show",
            deepExplanation: "The 'nmcli' command manages NetworkManager connections. 'con show' lists all connections with UUID, type (ethernet/wifi), and device. Shows connection status and configuration. Use 'nmcli con up [name]' to activate a connection, 'nmcli con down [name]' to deactivate. Use 'nmcli device show' to see device information. NetworkManager stores connection configs in /etc/NetworkManager/system-connections/.",
            commonErrors: ["Unknown or ambiguous command"],
            relatedCommands: ["ip addr", "hostnamectl"]
          },
          {
            command: "hostnamectl",
            syntax: "hostnamectl set-hostname [HOSTNAME]",
            description: "Set or display system hostname",
            example: "hostnamectl set-hostname server01",
            deepExplanation: "The 'hostnamectl' command manages the system hostname. Run without arguments to display current hostname and other system information. The 'set-hostname' option changes the hostname persistently. Changes take effect immediately for most applications but may require shell restart. The hostname is stored in /etc/hostname. Use 'hostname' command for quick display without hostnamectl.",
            commonErrors: ["Permission denied"],
            relatedCommands: ["hostname", "nmcli"]
          },
          {
            command: "ping",
            syntax: "ping -c [COUNT] [HOST]",
            description: "Test network connectivity to a host",
            example: "ping -c 4 8.8.8.8",
            deepExplanation: "The 'ping' command sends ICMP echo requests to test connectivity. The '-c' flag specifies number of packets (on Linux, ping runs indefinitely without this). Shows response times and packet loss percentage. Useful for troubleshooting network issues. The '-i' flag sets interval between packets. The '-t' flag sets TTL (time to live). Use Ctrl+C to stop.",
            relatedCommands: ["traceroute", "netstat", "ss"]
          },
          {
            command: "netstat -tulpn",
            syntax: "netstat -tulpn",
            description: "Display network connections and listening ports (deprecated, use ss)",
            example: "netstat -tulpn | grep LISTEN",
            deepExplanation: "The 'netstat' command displays network statistics. The '-t' flag shows TCP connections, '-u' shows UDP, '-l' shows listening sockets, '-p' shows associated processes, '-n' shows numeric addresses. Modern replacement is 'ss' command with same flags. Common usage: 'netstat -tulpn' to see all listening ports and their associated processes.",
            commonErrors: ["Command not found (use ss instead)"],
            relatedCommands: ["ss", "lsof", "netstat"]
          }
        ]
      },
      {
        name: "Software Installation",
        description: "Package management using DNF (Dandified YUM) for Red Hat systems",
        commands: [
          {
            command: "dnf install",
            syntax: "dnf install [PACKAGE]",
            description: "Install a package and its dependencies",
            example: "dnf install vim",
            deepExplanation: "The 'dnf' command is the package manager for RHEL/CentOS/Fedora. 'install' downloads and installs packages and dependencies from configured repositories. Use '-y' flag for automatic yes to prompts. Use 'dnf install -y package1 package2' to install multiple packages. DNF resolves dependencies automatically. Packages are installed from /etc/yum.repos.d/ configured repositories.",
            commonErrors: ["No package found", "Permission denied"],
            relatedCommands: ["dnf update", "dnf remove"]
          },
          {
            command: "dnf update",
            syntax: "dnf update",
            description: "Update all packages to latest available versions",
            example: "dnf update",
            deepExplanation: "The 'dnf update' command updates all installed packages to their latest versions from repositories. Use 'dnf update [package]' to update specific package. Use 'dnf check-update' to see available updates without installing. Updates may require system restart, especially for kernel. Use 'dnf upgrade' as synonym (upgrade is more aggressive, removes conflicting packages).",
            commonErrors: ["Permission denied"],
            relatedCommands: ["dnf install", "dnf check-update"]
          },
          {
            command: "dnf search",
            syntax: "dnf search [KEYWORD]",
            description: "Search for packages by name or description",
            example: "dnf search apache",
            deepExplanation: "The 'dnf search' command searches package repositories for matching packages. Searches both package names and descriptions. Results show package name, version, and repository. Use 'dnf info [package]' for detailed information about specific package. Use 'dnf list' to list all available packages.",
            relatedCommands: ["dnf info", "dnf list"]
          },
          {
            command: "dnf remove",
            syntax: "dnf remove [PACKAGE]",
            description: "Remove a package and its dependencies (if not needed by other packages)",
            example: "dnf remove vim",
            deepExplanation: "The 'dnf remove' command uninstalls packages. DNF checks dependencies and won't remove packages needed by other installed packages. Use '-y' for automatic confirmation. Use 'dnf autoremove' to remove packages installed as dependencies but no longer needed.",
            commonErrors: ["No package found", "Permission denied"],
            relatedCommands: ["dnf autoremove", "dnf install"]
          }
        ]
      }
    ]
  },
  RH134: {
    id: "RH134",
    title: "System Administration II",
    subtitle: "RHCSA Advanced Topics",
    description: "Advanced system administration covering storage management with LVM, security with SELinux, task scheduling, and container basics. Build on RH124 foundations.",
    categories: [
      {
        name: "LVM (Logical Volume Manager)",
        description: "Storage virtualization for flexible disk space management",
        commands: [
          {
            command: "pvcreate",
            syntax: "pvcreate [DEVICE]",
            description: "Initialize a physical volume for use with LVM",
            example: "pvcreate /dev/sdb1",
            deepExplanation: "The 'pvcreate' command prepares a disk partition for LVM use. This writes LVM metadata to the device. Use 'pvdisplay' to view physical volumes. Physical volumes are the foundation of LVM - they're the actual disk partitions. Multiple PVs are combined into volume groups (VGs), which are then divided into logical volumes (LVs).",
            demoImage: "https://private-us-east-1.manuscdn.com/sessionFile/Kr6wm7X9bJQ2LhW1viMT7u/sandbox/egMe1D5krLJEvWzNbEi2Ls-img-1_1770334243000_na1fn_ZGVtby1sdm0.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3I2d203WDliSlEyTGhXMXZpTVQ3dS9zYW5kYm94L2VnTWUxRDVrckxKRXZXek5iRWkyTHMtaW1nLTFfMTc3MDMzNDI0MzAwMF9uYTFmbl9aR1Z0Ynkxc2RtMC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=GlqQDUTS2TfzTczzzmichA~3-IVbvuKL~PacjxPmCbrLDh-hGAxwh66AYdAvFxJKqreMenfKS9W8VxcwAJrHbF46OBiXmJYcylyHuMkgiDDaqklsD137Iq9D44e3NAdLr71RqdJQANAEsWtfALwoNzpe6ICkb6THj-YkkTQPcqyV5jNZipEAmMilyMCiwLiJUgJeNEcSOncW84VGGltwIaMQ6QMR-k~Wc9e5ZMyMv58hGqpRNeHLJDLO-H~5H2oPHB10UPytTuTy7hAC54wVMmY4HIJ572M-Nx7-cw7NUwZ~e316GJ9QtFx3d~0~zzXVpC32ZWgWDzmaM7qndnloIw__",
            commonErrors: ["Device not found", "Device already in use", "Permission denied"],
            relatedCommands: ["vgcreate", "lvcreate", "pvdisplay"]
          },
          {
            command: "vgcreate",
            syntax: "vgcreate [VG-NAME] [PV1] [PV2] ...",
            description: "Create a volume group from one or more physical volumes",
            example: "vgcreate myvg /dev/sdb1 /dev/sdc1",
            deepExplanation: "The 'vgcreate' command creates a volume group by combining physical volumes. A VG is a pool of storage that can be allocated to logical volumes. Use 'vgdisplay' to view VGs. Use 'vgextend' to add more PVs to a VG. Use 'vgreduce' to remove PVs. VGs allow flexible allocation of storage to multiple LVs.",
            commonErrors: ["Physical volume not found", "Volume group already exists"],
            relatedCommands: ["pvcreate", "lvcreate", "vgdisplay"]
          },
          {
            command: "lvcreate",
            syntax: "lvcreate -n [LV-NAME] -L [SIZE] [VG-NAME]",
            description: "Create a logical volume from a volume group",
            example: "lvcreate -n mylv -L 2G myvg",
            deepExplanation: "The 'lvcreate' command creates logical volumes from volume group space. The '-n' flag specifies LV name. The '-L' flag specifies size (e.g., 2G, 500M). The '-l' flag specifies size in extents. LVs appear as /dev/vg-name/lv-name and can be formatted with filesystems. Use 'lvdisplay' to view LVs.",
            commonErrors: ["Volume group not found", "Insufficient space", "Logical volume already exists"],
            relatedCommands: ["vgcreate", "lvextend", "lvdisplay"]
          },
          {
            command: "lvextend -r",
            syntax: "lvextend -r -L +[SIZE] [LV-PATH]",
            description: "Extend logical volume and resize filesystem in one command",
            example: "lvextend -r -L +1G /dev/myvg/mylv",
            deepExplanation: "The 'lvextend' command increases LV size. The '-r' flag also resizes the filesystem (requires ext4, xfs, or other resizable filesystem). The '-L +1G' adds 1GB to current size. The '-L 5G' sets total size to 5GB. Without '-r', you must manually resize filesystem with 'resize2fs' (ext4) or 'xfs_growfs' (xfs). Always extend LV before filesystem.",
            commonErrors: ["Insufficient space in volume group", "Logical volume not found"],
            relatedCommands: ["lvcreate", "lvreduce", "resize2fs"]
          }
        ]
      },
      {
        name: "SELinux",
        description: "Security Enhanced Linux - mandatory access control system",
        commands: [
          {
            command: "getenforce",
            syntax: "getenforce",
            description: "Display current SELinux enforcement mode",
            example: "getenforce",
            deepExplanation: "The 'getenforce' command shows SELinux mode: Enforcing (policies enforced), Permissive (policies logged but not enforced), or Disabled (SELinux not active). Use 'setenforce' to temporarily change mode (changes lost on reboot). Permanent changes require editing /etc/selinux/config and rebooting. Enforcing mode provides maximum security but may break applications.",
            demoImage: "https://private-us-east-1.manuscdn.com/sessionFile/Kr6wm7X9bJQ2LhW1viMT7u/sandbox/egMe1D5krLJEvWzNbEi2Ls-img-2_1770334241000_na1fn_ZGVtby1zZWxpbnV4.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3I2d203WDliSlEyTGhXMXZpTVQ3dS9zYW5kYm94L2VnTWUxRDVrckxKRXZXek5iRWkyTHMtaW1nLTJfMTc3MDMzNDI0MTAwMF9uYTFmbl9aR1Z0YnkxelpXeHBiblY0LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Kn7vISfgrCSQTxwenB98e5BMr~P3KtRlqms0YGgIwX4iQ-b2xkEC0v2fwCFR3SZb04MdrFBLg7I2aR0MCC5brFGDULrRHqiev7ndDHYw0b8XbVvs2ELbPQymTY~YPg~~kuO19ck-6~Ctgu97JNRrMLeR1Sr0xTuqOQK3pJkdM7Ywo7fMqt5xM0YpNqjqwHEvTWNlmuIwExlpxDVxNIj3vN~mXvqBkrmfKg6ZgK098H~ENEPTu-LTzbljwW1Le-6UzrEoTH8RfUhCyTcdlDGs5uBL36cifupLTaAChB5hnldk7Du12Z31N9RF-i-AYUNUaqjmA6m6J1Hk2jq1PU41FA__",
            relatedCommands: ["setenforce", "getsebool", "restorecon"]
          },
          {
            command: "setenforce",
            syntax: "setenforce [0|1]",
            description: "Temporarily change SELinux enforcement mode (0=Permissive, 1=Enforcing)",
            example: "setenforce 0",
            deepExplanation: "The 'setenforce' command temporarily changes SELinux mode without rebooting. Use '0' for Permissive (logs violations but allows access) or '1' for Enforcing (blocks violations). Changes are lost on reboot. For permanent changes, edit /etc/selinux/config and set SELINUX=enforcing or SELINUX=permissive, then reboot.",
            commonErrors: ["Permission denied", "Invalid argument"],
            relatedCommands: ["getenforce"]
          },
          {
            command: "getsebool",
            syntax: "getsebool [BOOLEAN]",
            description: "Query SELinux boolean values that control policy behavior",
            example: "getsebool httpd_can_network_connect",
            deepExplanation: "SELinux booleans are on/off switches that modify policy behavior. 'getsebool' shows current value (on/off). Use 'setsebool -P' to change permanently (writes to /etc/selinux/targeted/booleans.local). Common booleans: httpd_can_network_connect (allow web server network access), httpd_can_sendmail (allow sending mail), ftp_home_dir (allow FTP access to home directories).",
            commonErrors: ["Boolean not found"],
            relatedCommands: ["setsebool", "getsebool -a"]
          },
          {
            command: "restorecon -Rv",
            syntax: "restorecon -Rv [PATH]",
            description: "Restore SELinux file contexts to policy defaults",
            example: "restorecon -Rv /var/www/",
            deepExplanation: "The 'restorecon' command resets file SELinux contexts to match policy. The '-R' flag recursively processes directories. The '-v' flag shows what's being changed. Useful when files have incorrect contexts preventing access. Use 'ls -Z' to view current contexts. Use 'chcon' to manually change contexts (not persistent across restorecon).",
            commonErrors: ["Permission denied"],
            relatedCommands: ["chcon", "semanage fcontext"]
          }
        ]
      },
      {
        name: "Task Scheduling",
        description: "Schedule tasks to run at specific times using cron and at",
        commands: [
          {
            command: "crontab -e",
            syntax: "crontab -e",
            description: "Edit user's cron jobs (scheduled tasks)",
            example: "0 2 * * * /usr/local/bin/backup.sh",
            deepExplanation: "The 'crontab -e' command opens an editor for user's cron jobs. Each line is a cron expression: minute hour day month weekday command. Examples: '0 2 * * *' runs at 2 AM daily, '0 */6 * * *' runs every 6 hours, '0 0 1 * *' runs first day of month. Cron jobs run as the user who created them. Root's crontab is edited with 'sudo crontab -e'. System-wide cron jobs go in /etc/cron.d/.",
            commonErrors: ["No crontab for user", "Permission denied"],
            relatedCommands: ["crontab -l", "at", "anacron"]
          },
          {
            command: "crontab -l",
            syntax: "crontab -l",
            description: "List user's cron jobs",
            example: "crontab -l",
            deepExplanation: "The 'crontab -l' command displays all scheduled cron jobs for the current user. Each line shows the schedule and command. Use 'crontab -l -u username' to view another user's crontab (requires root). Cron jobs are stored in /var/spool/cron/crontabs/.",
            relatedCommands: ["crontab -e", "crontab -r"]
          },
          {
            command: "at",
            syntax: "at [TIME]",
            description: "Schedule a one-time task to run at a specific time",
            example: "at 10:00 PM",
            deepExplanation: "The 'at' command schedules one-time commands (unlike cron which is recurring). Run 'at [time]' then type commands, then press Ctrl+D to save. Use 'atq' to list scheduled jobs. Use 'atrm [job-id]' to remove jobs. Times can be: '10:00 PM', 'tomorrow', 'next Monday', 'now + 2 hours'. The 'atd' daemon must be running.",
            commonErrors: ["at: command not found", "at: permission denied"],
            relatedCommands: ["atq", "atrm", "crontab"]
          }
        ]
      },
      {
        name: "Firewall Management",
        description: "Configure firewall rules using firewall-cmd",
        commands: [
          {
            command: "firewall-cmd --list-all",
            syntax: "firewall-cmd --list-all",
            description: "Display current firewall configuration and rules",
            example: "firewall-cmd --list-all",
            deepExplanation: "The 'firewall-cmd' command manages firewalld (dynamic firewall). '--list-all' shows active zone configuration including services, ports, and rules. Firewalld uses zones (public, private, trusted, etc.) with different rule sets. Changes without '--permanent' are temporary (lost on reboot). Always use '--permanent' for persistent rules, then '--reload' to apply.",
            demoImage: "https://private-us-east-1.manuscdn.com/sessionFile/Kr6wm7X9bJQ2LhW1viMT7u/sandbox/egMe1D5krLJEvWzNbEi2Ls-img-3_1770334241000_na1fn_ZGVtby1maXJld2FsbA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3I2d203WDliSlEyTGhXMXZpTVQ3dS9zYW5kYm94L2VnTWUxRDVrckxKRXZXek5iRWkyTHMtaW1nLTNfMTc3MDMzNDI0MTAwMF9uYTFmbl9aR1Z0YnkxbWFYSmxkMkZzYkEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qZ0ciobMAd0lAnF-45~6ZNcbfUygtgxEQ8PtCVYiDRd4wQcZUGm5zOVKFHAOWUB24~ZjO3m7iEcPp7bIRT67gxMW8KlEG2ezbi1ghTcwk6KVsUCs~aPfvWn5Yb7saJQK4BS02z2Lq7SeB0mjBhRpQh739F278j~DJh-ILBXjQ~N1UfJJ4e7avuoIfsBf62wb5cynkn6V~T1-QBWJbDL3hIGgurA0kIFKbZc4rjT1lz14Gva5mWv~7N54aiFPxM-iC7Gz~sDV58QwRrrPk8eTzj70vBxQqZZ9RyK5r0Qi3STZGCVg2SGQ66m2n6f8Xzz8AGaKz~QnPuuomglB0K6yWA__",
            relatedCommands: ["firewall-cmd --add-service", "firewall-cmd --add-port"]
          },
          {
            command: "firewall-cmd --add-service",
            syntax: "firewall-cmd --add-service=[SERVICE] --permanent",
            description: "Permanently allow a service through the firewall",
            example: "firewall-cmd --add-service=http --permanent",
            deepExplanation: "The '--add-service' option allows predefined services (http, https, ssh, ftp, etc.). Services are defined in /usr/lib/firewalld/services/. Always use '--permanent' for persistent rules. Use '--reload' after making changes to apply them. Use '--remove-service' to block services. Use '--list-services' to see available services.",
            commonErrors: ["Service not found", "Permission denied"],
            relatedCommands: ["firewall-cmd --reload", "firewall-cmd --list-services"]
          },
          {
            command: "firewall-cmd --reload",
            syntax: "firewall-cmd --reload",
            description: "Reload firewall configuration to apply changes",
            example: "firewall-cmd --reload",
            deepExplanation: "The '--reload' option applies permanent firewall changes without dropping active connections. Use after adding/removing services or ports. Use '--complete-reload' if '--reload' doesn't work (drops connections). Always reload after making '--permanent' changes.",
            relatedCommands: ["firewall-cmd --add-service", "firewall-cmd --add-port"]
          }
        ]
      }
    ]
  },
  RH254: {
    id: "RH254",
    title: "System Administration III",
    subtitle: "RHCSA Advanced Services",
    description: "Advanced system administration covering network services, scripting, and troubleshooting. Master DNS, web services, databases, NFS, and Bash scripting.",
    categories: [
      {
        name: "Bash Scripting",
        description: "Write shell scripts for automation and system administration",
        commands: [
          {
            command: "for loop",
            syntax: "for var in list; do ... done",
            description: "Iterate over a list of items in Bash",
            example: "for i in {1..5}; do echo \"Backup $i\"; done",
            deepExplanation: "The 'for' loop iterates over items. Syntax: 'for variable in list; do commands; done'. The list can be: {1..5} (range), $(command) (command output), $@ (script arguments), or explicit items. Use 'break' to exit loop, 'continue' to skip iteration. Nested loops are supported. Example with files: 'for file in *.txt; do cat \"$file\"; done'.",
            demoImage: "https://private-us-east-1.manuscdn.com/sessionFile/Kr6wm7X9bJQ2LhW1viMT7u/sandbox/egMe1D5krLJEvWzNbEi2Ls-img-4_1770334242000_na1fn_ZGVtby1iYXNoLXNjcmlwdA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3I2d203WDliSlEyTGhXMXZpTVQ3dS9zYW5kYm94L2VnTWUxRDVrckxKRXZXek5iRWkyTHMtaW1nLTRfMTc3MDMzNDI0MjAwMF9uYTFmbl9aR1Z0YnkxaVlYTm9MWE5qY21sd2RBLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=huG14sCmebG-dUeR7dntoq1bC5NJDK4sfWk9nayj0oZUS7kemxm4ughjbVD8LFxq6yzQRRmC4cAIvs~evMMgc8pOnxIzS5nASmYBgNDlKov9SBqQu3V~PHtJHBwxlaMR-ttK0Uth2KtU7SKgAF6WxWV5lzPDTHF4E161EU3i3dz76imxgbX6pucqQ2W98gN3RPk~PBBOqWfOU1XGVWCS-XmqoMJlBS20WhkZqjHpxtCKxjOwNZvr2LYdOdp~iXQMz3~2QxpUysBB-vPUxdTKSYEn8ikr-xU1cqxTTQRIiMH1~8MWim-tokSpQmfqprCYuiDuejZjyikRYv~ZlEqmrg__",
            commonErrors: ["Syntax error", "Unmatched quotes"],
            relatedCommands: ["while", "if", "case"]
          },
          {
            command: "if statement",
            syntax: "if [ condition ]; then ... elif [ condition ]; then ... else ... fi",
            description: "Conditional execution based on test conditions",
            example: "if [ -f /etc/passwd ]; then echo 'File exists'; fi",
            deepExplanation: "The 'if' statement executes commands based on conditions. Use '[ condition ]' for tests. Common tests: '-f' (file exists), '-d' (directory exists), '-z' (string is empty), '-n' (string is not empty), '=' (strings equal), '-eq' (numbers equal), '-lt' (less than), '-gt' (greater than). Use 'elif' for additional conditions, 'else' for fallback. Always end with 'fi'.",
            commonErrors: ["Syntax error near unexpected token", "Unmatched fi"],
            relatedCommands: ["test", "case", "for"]
          },
          {
            command: "while loop",
            syntax: "while [ condition ]; do ... done",
            description: "Loop while a condition is true",
            example: "while [ $count -lt 10 ]; do echo $count; ((count++)); done",
            deepExplanation: "The 'while' loop repeats commands while condition is true. Use '(( count++ ))' for arithmetic increment. Use 'break' to exit loop, 'continue' to skip iteration. Useful for reading files line-by-line: 'while read line; do echo \"$line\"; done < file.txt'.",
            relatedCommands: ["for", "until", "break"]
          },
          {
            command: "case statement",
            syntax: "case $var in pattern1) commands;; pattern2) commands;; esac",
            description: "Execute different commands based on variable value",
            example: "case $1 in start) systemctl start httpd;; stop) systemctl stop httpd;; esac",
            deepExplanation: "The 'case' statement matches variable against patterns. Each pattern ends with ')'. Commands for that pattern follow. Use ';;' to separate cases. Use '*' for default case. Patterns support wildcards: 'start*' matches start, start-all, etc.",
            relatedCommands: ["if", "for"]
          }
        ]
      },
      {
        name: "Package Management Advanced",
        description: "Advanced DNF operations and repository management",
        commands: [
          {
            command: "dnf install -y",
            syntax: "dnf install -y [PACKAGE]",
            description: "Install package with automatic yes to all prompts",
            example: "dnf install -y httpd mariadb-server",
            deepExplanation: "The '-y' flag automatically answers 'yes' to all prompts, useful for scripts and automation. Install multiple packages in one command. Use '--setopt=install_weak_deps=False' to skip weak dependencies. Use '--nobest' to allow older package versions if needed.",
            demoImage: "https://private-us-east-1.manuscdn.com/sessionFile/Kr6wm7X9bJQ2LhW1viMT7u/sandbox/egMe1D5krLJEvWzNbEi2Ls-img-5_1770334247000_na1fn_ZGVtby1wYWNrYWdlLW1nbXQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3I2d203WDliSlEyTGhXMXZpTVQ3dS9zYW5kYm94L2VnTWUxRDVrckxKRXZXek5iRWkyTHMtaW1nLTVfMTc3MDMzNDI0NzAwMF9uYTFmbl9aR1Z0Ynkxd1lXTnJZV2RsTFcxbmJYUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=UpKXrvuVi3w1qxLv4Z57UXOoGyEh6B~M9Issg0WNZdKJqXLFz3lpa2Xvl17Hme5XQBts0TIEiE0PYplZmp8j38enrS4BY94gybajZ4X3nxgFJZOpifFLkfWlLZMEY-W1P6eibHuS35vV4lfArmIj8e1Mbv-IUGisY-R0X0o41dcA2sepdkBgBu1vJsMAXLGtmwriX4n0RUZtj~XwV4pBuSR6qQf4dOAfFnTdvyxmkrsRtJ8iDrAv2P3f6xTGSwA-4gpQ5QsN5lfP3oA8MmbBUiL~f88bW65Samy8ET~8W9FsTMp0QlNN9gIaI8DJGNuzDZWFin6WlClpkoJ302KQlQ__",
            commonErrors: ["No package found", "Permission denied"],
            relatedCommands: ["dnf install", "dnf remove"]
          },
          {
            command: "dnf group install",
            syntax: "dnf group install [GROUP-NAME]",
            description: "Install a group of related packages",
            example: "dnf group install 'Web Server'",
            deepExplanation: "DNF groups bundle related packages. Use 'dnf group list' to see available groups. Install groups with 'dnf group install \"Group Name\"' (use quotes if name has spaces). Use 'dnf group remove' to uninstall groups. Groups are useful for installing complete software stacks.",
            commonErrors: ["Group not found", "No package found"],
            relatedCommands: ["dnf group list", "dnf install"]
          }
        ]
      },
      {
        name: "NFS (Network File System)",
        description: "Configure and manage NFS for network file sharing",
        commands: [
          {
            command: "exportfs -a",
            syntax: "exportfs -a",
            description: "Export all NFS filesystems defined in /etc/exports",
            example: "exportfs -a",
            deepExplanation: "The 'exportfs' command manages NFS exports. The '-a' flag exports all filesystems in /etc/exports. The '-r' flag reexports all (useful after editing /etc/exports). Use 'exportfs -v' to view current exports. Edit /etc/exports to define shares: '/path/to/share client-ip(rw,sync)' for read-write, '(ro)' for read-only.",
            commonErrors: ["Permission denied", "Invalid export entry"],
            relatedCommands: ["mount -t nfs", "showmount"]
          },
          {
            command: "mount -t nfs",
            syntax: "mount -t nfs [SERVER]:[PATH] [MOUNT-POINT]",
            description: "Mount an NFS share from a remote server",
            example: "mount -t nfs server.example.com:/home /mnt/home",
            deepExplanation: "The 'mount -t nfs' command mounts remote NFS shares. Use 'mount -t nfs4' for NFSv4 (recommended). Add to /etc/fstab for persistent mounting: 'server:/path /mnt/point nfs defaults 0 0'. Use 'umount' to unmount. Use 'showmount -e server' to see available exports.",
            commonErrors: ["Permission denied", "Connection refused", "No such file or directory"],
            relatedCommands: ["umount", "showmount", "exportfs"]
          }
        ]
      }
    ]
  }
};

export default coursesData;
