# PORT - Understanding Ports in Networking

## What is a Port?
A port is a communication endpoint used by network protocols to identify specific **processes (combine of thread)** or services on a device. Ports allow multiple network services to run on a single IP address.

## Number of Ports in an IP
An IP address can have up to 65,535 ports. These ports are divided into three categories: well-known ports, registered ports, and dynamic/private ports.

## Do TCP and UDP Use the Same Ports?
Yes, TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) can use the same port numbers. However, they are distinct protocols and operate independently of each other. For example, both TCP and UDP can use port 80, but they will handle data transmission differently.

## Types of Ports
1. **Well-Known Ports**: Ranging from 0 to 1023, these ports are assigned to well-known services and protocols such as HTTP (port 80) and HTTPS (port 443).
2. **Registered Ports**: Ranging from 1024 to 49151, these ports are assigned by IANA for specific services upon application by a requesting entity.
3. **Dynamic/Private Ports**: Ranging from 49152 to 65535, these ports are used for private or temporary purposes, often assigned dynamically by the operating system.

## Well-Known Ports
- **HTTP**: Port 80
- **HTTPS**: Port 443
- **FTP**: Port 21
- **SSH**: Port 22
- **Telnet**: Port 23

## Registered Ports
Registered ports are used by specific applications and services that are not as universally recognized as those using well-known ports. Examples include:
- **MySQL**: Port 3306
- **PostgreSQL**: Port 5432
- **MongoDB**: Port 27017
- **Redis**: Port 6379
- **Cassandra**: Port 9042
- **Elasticsearch**: Port 9200
- **RabbitMQ**: Port 5672

## Dynamic/Private Ports
These ports are typically used for client-side communication and are assigned dynamically. They are not assigned to any specific service and can be used for any purpose.
