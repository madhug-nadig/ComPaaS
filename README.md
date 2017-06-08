# PaaS built from scratch - CloudComputing2017

An implementation of Platform-as-a-Service Cloud model using LXC containers as a part of Cloud Computing( CS341 ) Course.
The PaaS is built using Node.js and is made to run on Linux machines. The PaaS is now able to host node.js code along with MongoDB, essentially supporting the mean stack. 

Multi-user deployment is supported with the maximum number of containers per user set to 3. Each user can create upto 3 containers that run the same Node.js server program. The requests are forwarded to the different in a round-robin fashion by the load balancer.
