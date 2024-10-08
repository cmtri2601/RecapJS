# NAT - Network Address Translation
Network Address Translation (NAT) is a method used in networks to remap one IP address space into another by modifying network address information in the IP header of packets while they are in transit. This technique is commonly used to improve security and decrease the number of IP addresses an organization needs.

There are several types of NAT:
- **Static NAT**: Maps a single private IP address to a single public IP address.
- **Dynamic NAT**: Maps a private IP address to a public IP address from a pool of public addresses.
- **Overloading (PAT)**: Maps multiple private IP addresses to a single public IP address using different ports.

NAT helps in conserving the global address space and adds a layer of security by hiding internal IP addresses from external networks.

# DHCP - Dynamic Host Configuration Protocol
Dynamic Host Configuration Protocol (DHCP) is a network management protocol used to automate the process of configuring devices on IP networks. It allows devices to be automatically assigned IP addresses and other network settings, reducing the need for manual configuration.

### How DHCP Works
1. **DHCP Discover**: The client device sends a broadcast message to find available DHCP servers.
2. **DHCP Offer**: DHCP servers respond with an offer message containing an available IP address and configuration details.
3. **DHCP Request**: The client selects an offer and sends a request message to the chosen DHCP server.
4. **DHCP Acknowledgment**: The DHCP server acknowledges the request and assigns the IP address to the client.

### Benefits of DHCP
- **Simplifies Network Management**: Automatically assigns IP addresses, reducing manual configuration.
- **Efficient IP Address Utilization**: Reuses IP addresses when devices leave the network.
- **Centralized Management**: Allows network administrators to manage IP address allocation from a central point.

### DHCP Lease
The IP address assigned by DHCP is not permanent. It is leased for a specific period, after which the client must renew the lease or obtain a new IP address.

DHCP is essential for managing large networks efficiently and ensuring devices can connect to the network with minimal manual intervention.