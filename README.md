This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


<a name="readme-top"></a>

https://www.linkedin.com/in/shawnmcrowley



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
       </li>
       <li><a href="#installation">Installation and Configuration</a></li>
        <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Simple Form to represent Responsive Design and the Ability to add PWA for Desktop/Mobile Installation, offline usage, and rendering on Desktop and Mobile

Here's why:
* Your time should be focused on creating something amazing. A project that solves a problem and helps others
* You shouldn't be doing the same tasks over and over like creating multiple Apps from scratch
* You should implement DRY principles to the rest of your life :smile:


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* https://nextjs.org

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- INSTALLATION -->

## Installation and Configuration

# Snowflake REST API Using Key Pair Authentication

**REST API:**

A REST API (Representational State Transfer API) is a way for different software systems to talk to each other over the internet. It uses standard HTTP methods like GET, POST, PUT, and DELETE to request and send data, allowing clients (like websites or apps) to interact with a server to access, update, or delete information. It’s like a set of rules that makes it easy for systems to communicate and exchange data in a consistent way.

![](https://miro.medium.com/v2/resize:fit:630/1*vt4rMGaLLs-FwqttEST8jw.png)

**JWT (JSON Web Token):**

JWT (JSON Web Token) is commonly used in REST APIs for secure authentication and authorization. It allows the server to verify the identity of a client by sending a token with each request. The token, containing user information, is signed to ensure integrity and can be verified without needing to store session data on the server, enabling stateless communication.

**Synopsis:**

In today’s data-driven world, managing and running SQL queries efficiently is crucial for businesses to make the most of their data. The Snowflake REST API provides a powerful and flexible way to interact with your Snowflake environment, allowing you to automate SQL execution, integrate queries into your workflows, and reduce the need for manual work. This makes tasks like building data pipelines, automating reports, or connecting with other systems much easier and more efficient. One of the secure ways to use this API is through key pair authentication, which uses a pair of cryptographic keys — _a public and a private one_ — instead of traditional passwords. This method ensures that your API requests are secure and only accessible to authorized users. This guide will walk you through how to use the Snowflake REST API to execute SQL queries step by step.

In this article, I have explained how to execute queries using the Snowflake REST API on both Linux and Windows systems. For Linux, I’ve used a shell script, while for Windows, I’ve employed the SnowSQL CLI. Additionally, if you prefer a more stable approach and are familiar with Python, I’ve included a Python-based method as well. The process includes the following steps:

1. 1.  Create a Database, Schema, Table, and Insert Dummy Data
1. 2.  Generate Public and Private Keys Using OpenSSL
1. 3.  Assign the Public Key to a Snowflake User and Verify the User’s Public Key Fingerprint (_jump to step 6 after this step if using Python; skip steps 4 and 5_)
1. 4.  Generate a JWT Token using the private key
1. 5.  Send the Request Using cURL
1. 6.  Create a JWT token and send an API Request using Python.

**Step-1: Create a Database, Schema, Table, and Insert Dummy Data**

The initial step in using the Snowflake REST API is to establish the required database environment. Start by creating a database and a schema to organize your data. After setting up the schema, create a dummy table and insert some sample data into it for testing purposes.

create database restapi\_db;  
create schema restapi\_schema;  
create table dummy\_data(first\_name varchar(20), last\_name varchar(20));  
insert into dummy\_data(first\_name, last\_name) values ('Tony', 'Stark');

**Step-2: Generate Public and Private Keys Using OpenSSL**

To set up secure API access with Snowflake, you’ll need to configure key pair authentication. This involves generating a public and private RSA key pair using OpenSSL, a tool commonly used for cryptographic operations. Your private key stays securely on your local machine, while the public key is uploaded to your Snowflake user profile. This key pair will be used to authenticate your API requests, ensuring that only authorized users can access your Snowflake environment.

If you’re on a Windows system, you’ll need to install a couple of tools to get started. First, install OpenSSL, which you’ll use to generate your RSA key pair. OpenSSL is a command-line tool that handles key generation and other cryptographic tasks. Additionally, you’ll need to install SnowSQL, Snowflake’s command-line interface (CLI). SnowSQL allows you to interact with your Snowflake account, run SQL queries, manage databases, and upload your public key for authentication. These tools are crucial for setting up and managing key pair authentication on Windows.

**_‘’’Note:_** _If you’re using a Linux machine, there’s no need to install the following tools.’’’_

**link to download SnowSQL CLI for Windows User:** [https://sfc-repo.snowflakecomputing.com/snowsql/bootstrap/1.3/windows\_x86\_64/snowsql-1.3.2-windows\_x86\_64.msi](https://sfc-repo.snowflakecomputing.com/snowsql/bootstrap/1.3/windows_x86_64/snowsql-1.3.2-windows_x86_64.msi)

**Link to download Open SSL for Windows User:** [https://slproweb.com/download/Win64OpenSSL-3\_3\_0.exe](https://slproweb.com/download/Win64OpenSSL-3_3_0.exe)

**Command to generate private key:**

openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out rsa\_key.p8 -nocrypt

**Command to generate public key:**

openssl rsa -in rsa\_key.p8 -pubout -out rsa\_key.pub

**Step-3: Assign the Public Key to a Snowflake User and Verify the User’s Public Key Fingerprint**

After generating your RSA keys, the next step is to assign the public key to your Snowflake user account so Snowflake can authenticate your API requests. You can do this using the following SQL command.

ALTER USER example\_user SET RSA\_PUBLIC\_KEY\='PASTE YOUR PUBLIC KEY HERE';

it’s important to verify the public key fingerprint to ensure it has been correctly uploaded and linked to your user profile. This verification step ensures that your key pair is properly configured for secure API access.

**Execute the following command to retrieve the user’s public key fingerprint:**

DESC USER example\_user;  
SELECT SUBSTR((SELECT "value" FROM TABLE(RESULT\_SCAN(LAST\_QUERY\_ID()))  
  WHERE "property" \= 'RSA\_PUBLIC\_KEY\_FP'), LEN('SHA256:') + 1);

**Run the following command on the command line:**

openssl rsa -pubin -in rsa\_key.pub -outform DER | openssl dgst -sha256 -binary | openssl enc -base64

Compare both outputs. If they match, your public key is correctly configured.

_‘’’Note: jump to step 6 after this step if using Python; skip steps 4 and 5'’’_

**Step-4: Generate a JWT Token using private key**

In this step, you’ll generate a JSON Web Token (JWT) to authenticate your API requests to Snowflake. The JWT token is signed using your private RSA key and contains essential information like your user ID, role, and expiration time. This token is then included in your API requests to securely verify your identity and access permissions. Generating the JWT is a crucial step in ensuring that your API interactions with Snowflake are both secure and authorized.

**Command to generate JWT token in windows:**

snowsql --generate-jwt -a <account\_identifier> -u <username> --private-key-path <path>/rsa\_key.p8

**To generate JWT token in linux use the following shell script:**

#!/bin/bash  
  
\# Variables  
PRIVATE\_KEY\_PATH="/path/to/your/private\_key.p8"  \# Path to your RSA private key  
ACCOUNT\_IDENTIFIER="YOUR\_ACCOUNT\_IDENTIFIER"     \# Replace with your Snowflake account identifier  
USER\_NAME="YOUR\_USERNAME"                        \# Replace with your Snowflake username  
KEY\_PAIR\_ID="SHA256:your\_key\_pair\_fingerprint"   \# Replace with your exact Key Pair ID (public key fingerprint)  
EXPIRATION\_TIME=$(( $(date +%s) + 3600 ))        \# Token expiration time (1 hour from now)  
  
HEADER=$(echo -n '{"alg":"RS256","typ":"JWT"}' | openssl base64 -e | tr -d '=' | tr '/+' '\_-' | tr -d '\\n')  
  
PAYLOAD=$(echo -n '{"iss":"'"$ACCOUNT\_IDENTIFIER.$USER\_NAME.$KEY\_PAIR\_ID"'","sub":"'"$ACCOUNT\_IDENTIFIER.$USER\_NAME"'","iat":'$(date +%s)',"exp":'"$EXPIRATION\_TIME"'}' | openssl base64 -e | tr -d '=' | tr '/+' '\_-' | tr -d '\\n')  
  
\# JWT Signature  
SIGNATURE=$(echo -n "$HEADER.$PAYLOAD" | openssl dgst -sha256 -sign "$PRIVATE\_KEY\_PATH" | openssl base64 -e | tr -d '=' | tr '/+' '\_-' | tr -d '\\n')  
  
\# Complete JWT Token  
JWT\_TOKEN="$HEADER.$PAYLOAD.$SIGNATURE"  
  
\# Output the JWT token  
echo "Generated JWT Token:"  
echo "$JWT\_TOKEN"

To retrieve `your_key_pair_fingerprint`, execute the following SQL query in Snowflake:

DESC USER example\_user;  
SELECT SUBSTR((SELECT "value" FROM TABLE(RESULT\_SCAN(LAST\_QUERY\_ID()))  
  WHERE "property" \= 'RSA\_PUBLIC\_KEY\_FP'), LEN('SHA256:') + 1);

Create a file named **\`generate\_token.sh\`** and paste the code with all the necessary parameters included. Running this shell script with **\`sh generate\_token.sh\`** will generate and return a JWT token that you can use for sending requests.

_‘’’Note: This JWT token is valid for only one hour, repeat step 4 again if JWT expires.’’’_

**Step-5: Send the Request Using cURL**

In this step, you’ll use cURL to send an HTTP request to the Snowflake REST API. cURL is a command-line tool for interacting with web services. To use it, create a cURL command with the required HTTP method (e.g., GET or POST), the API endpoint, and include the JWT token in the \`Authorization\` header for authentication. Once you’ve prepared the command, run it in your terminal to send the request and interact with the Snowflake API.

**Payload:**

{   
  "statement": "select \* from dummy\_data",   
  "timeout": 60,   
  "database": "RESTAPI\_DB",   
  "schema": "RESTAPI\_SCHEMA",   
  "warehouse": "TESTWH",   
  "role": "ACCOUNTADMIN",   
  "bindings": {   
    "1": {   
      "type": "FIXED",   
      "value": "123"   
    }   
  }   
} 

To send your SQL query request, save the above JSON payload in a file named `payload.json`. This file includes the details of your query, such as the SQL statement, database, schema, and other parameters. You can then use this file as the payload in your cURL request.

**CURL Request:**

curl -i -X POST -H "Content-Type: application/json" -H "Authorization: Bearer JWT\_TOKEN" -H "Accept: application/json" -H "User-Agent: myApplicationName/1.0" -H "X-Snowflake-Authorization-Token-Type: KEYPAIR\_JWT" -d "@<path>/payload.json" "snowflake\_account\_url/api/v2/statements"

The command will send a request to the Snowflake REST API and fetch the results of the query outlined in the payload.

For testing purposes, we are querying data from the **\`dummy\_data\`** table that was created in Step-1.

**Output:**

![](https://miro.medium.com/v2/resize:fit:630/1*JtTRrHosEVvLc7EVadwT-Q.png)

**Step-6:**

Utilize the following Python code to generate a JWT token and execute a data query from Snowflake using a REST API request.

from datetime import timedelta, timezone, datetime  
import jwt  
from cryptography.hazmat.primitives import serialization  
from cryptography.hazmat.backends import default\_backend  
import requests  
import json  
  
\# Function to generate JWT token  
def generate\_jwt\_token(private\_key\_path, account, user, public\_key\_fp, role="AccountAdmin"):  
    \# Uppercase account and user  
    account = account.upper()  
    user = user.upper()  
    qualified\_username = account + "." + user  
  
    \# Current time and token lifetime  
    now = datetime.now(timezone.utc)  
    lifetime = timedelta(minutes=59)  
  
    \# Payload for the token  
    payload = {  
        "iss": qualified\_username + '.' + public\_key\_fp,  
        "sub": qualified\_username,  
        "iat": now,  
        "exp": now + lifetime  
    }  
  
    \# Load the private key  
    with open(private\_key\_path, "rb") as key\_file:  
        private\_key = serialization.load\_pem\_private\_key(  
            key\_file.read(),  
            password=None,  \# Replace with the password for your key if it's encrypted  
            backend=default\_backend()  
        )  
  
    \# Generate the JWT token  
    encoding\_algorithm = "RS256"  
    token = jwt.encode(payload, key=private\_key, algorithm=encoding\_algorithm)  
  
    \# Convert to string if necessary  
    if isinstance(token, bytes):  
        token = token.decode('utf-8')  
  
    return token  
  
\# Function to make API request using JWT token  
def make\_api\_request(jwt\_token, api\_endpoint, payload):  
    \# Define headers  
    headers = {  
        "Content-Type": "application/json",  
        "Authorization": f"Bearer {jwt\_token}",  
        "Accept": "application/json",  
        "User-Agent": "myApplicationName/1.0",  
        "X-Snowflake-Authorization-Token-Type": "KEYPAIR\_JWT"  
    }  
  
    \# Make the POST request  
    response = requests.post(api\_endpoint, headers=headers, json=payload)  
  
    \# Print the response status and data  
    print(f"Status Code: {response.status\_code}")  
    print(f"Response: {response.json()}")  
  
  
if \_\_name\_\_ == '\_\_main\_\_':  
    \# Variables  
    private\_key\_path = "PATH\_TO\_PRIVATE\_KEY/rsa\_key.p8"  
    account = "ACCOUNT\_NAME"  
    user = "USER\_NAME"  
    public\_key\_fp = "PUBLIC\_KEY\_FINGERPRINT"  
    api\_endpoint = "https://ACCOUNT\_REGION.snowflakecomputing.com/api/v2/statements"  
    payload = {'statement': 'select \* from dummy\_data', 'timeout': 60, 'database': 'RESTAPI\_DB', 'schema': 'RESTAPI\_SCHEMA', 'warehouse': 'TESTWH', 'role': 'ACCOUNTADMIN', 'bindings': {'1': {'type': 'FIXED', 'value': '123'}}}  
      
    \# Generate the JWT token  
    jwt\_token = generate\_jwt\_token(private\_key\_path, account, user, public\_key\_fp)  
    \# Use the token to make the API request  
    make\_api\_request(jwt\_token, api\_endpoint, payload)

**Output:**

![](https://miro.medium.com/v2/resize:fit:630/1*jXiiQwQt9wUN6vi2ermg-w.png)

_‘‘‘Note: The process of generating Public and Private Keys using OpenSSL and python code is referenced from the_ [_official Snowflake documentation_](https://docs.snowflake.com/en/user-guide/key-pair-auth)_.’’’_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@shawnmcrowley](https://twitter.com/shawnmcrowley) - scrowley@buffalo.edu

Project Link: [https://github.com/shawnmcrowley/responsive_form_pwa](https://github.com/shawnmcrowley/responsive_form_pwa)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
