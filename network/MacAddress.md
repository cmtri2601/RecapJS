# MAC Address - Media Access Control Address
## Comparing MAC Address and IP Address

### MAC Address
- **Definition**: A MAC (Media Access Control) address is a unique identifier assigned to network interfaces for communications on the physical network segment.
- **Format**: Typically represented as six groups of two hexadecimal digits, separated by colons or hyphens (e.g., `00:1A:2B:3C:4D:5E`).
- **Scope**: Operates at the Data Link Layer (Layer 2) of the OSI model.
- **Permanence**: Usually hardcoded into the network interface card (NIC) and remains constant.
- **Purpose**: Used for local network communication within the same network segment.

### IP Address
- **Definition**: An IP (Internet Protocol) address is a numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication.
- **Format**: Can be IPv4 (e.g., `192.168.1.1`) or IPv6 (e.g., `2001:0db8:85a3:0000:0000:8a2e:0370:7334`).
- **Scope**: Operates at the Network Layer (Layer 3) of the OSI model.
- **Permanence**: Can be static (permanent) or dynamic (assigned by DHCP).
- **Purpose**: Used for identifying devices across different networks and routing traffic on the internet.

### Key Differences
- **Layer**: MAC addresses operate at Layer 2, while IP addresses operate at Layer 3.
- **Permanence**: MAC addresses are typically permanent, whereas IP addresses can change.
- **Scope**: MAC addresses are used for local network communication, while IP addresses are used for global network communication.
- **Format**: MAC addresses are hexadecimal, while IP addresses are numerical (decimal for IPv4, hexadecimal for IPv6).

### Conclusion
Both MAC and IP addresses are essential for network communication, but they serve different purposes and operate at different layers of the OSI model. Understanding their differences is crucial for network configuration and troubleshooting.