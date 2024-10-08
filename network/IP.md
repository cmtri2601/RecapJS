# Public and Private IP Addresses

## Public IP Address
- **Definition**: A public IP address is an IP address that is accessible over the Internet.
- **Usage**: Used for devices that need to be accessible from outside the local network.
- **Example**: Web servers, email servers.

## Private IP Address
- **Definition**: A private IP address is an IP address that is used within a private network.
- **Usage**: Used for devices within a local network and not accessible from the Internet.
- **Example**: Home routers, printers, and local servers.

## Example:
- **IP**
    - Network IP: 192.168.1.0/24
    - Netmask/SubnetMask: 255.255.255.0
    - Broadcast Address: 192.168.1.255
    - Number of Addresses: 256
    - Default Gateway (in case private ip): 192.168.1.1
- **Explanation**:
    - Network IP: The base IP address of the network.
    - Netmask/SubnetMask: Defines which portion of the IP address is the network part and which part is the host part.
    - Broadcast Address: The last address in the subnet, used to communicate with all devices in the subnet.
    - Number of Addresses: Total number of IP
    - Default Gateway: package from private ip go to gateway first, then go out to destination public ip

## Key Differences
- **Scope**: Public IP addresses are used globally, while private IP addresses are used within a local network.
- **Accessibility**: Public IP addresses can be accessed over the Internet, whereas private IP addresses cannot.
- **Transfer**: request come from private IP address (and port) then NAT/PAT (in router) transfer it to public IP address (and port) and vice versa.

- **Range**: 
    - Private IP ranges include:
        - 10.0.0.0 to 10.255.255.255 (10.0.0.0/8)
        - 172.16.0.0 to 172.31.255.255 (172.16.0.0/12) <=> '/16' * 2^4 (= 16 = 32-16)
        - 192.168.0.0 to 192.168.255.255 (192.168.0.0/16)
- **IPv4 Subnetting and Special Purpose IP Addresses**
    https://www.meanservers.com/billing/knowledgebase/33/IPv4-Subnetting-and-Special-Purpose-IP-Addresses.html#:~:text=Special%20Purpose%20IP%20addresses%20(reserved)&text=Used%20for%20communications%20between%20a,as%20specified%20by%20RFC%206598.&text=Used%20for%20loopback%20addresses%20to,as%20specified%20by%20RFC%20990.

## Conclusion
Understanding the difference between public and private IP addresses is crucial for network configuration and security.
