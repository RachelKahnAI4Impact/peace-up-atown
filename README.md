# AI for Impact x InnovateMA Program
## Background
This repository serves as a base chatbot application that uses AWS products. The following branches are customized applications built off the base project for agency-specific use cases.
- DOT
- MassHealth
- MBTA
- EEA

## Front-end
The front-end of the base application is located in this repository. 
To edit the user interface explore the /src/components and /src/pages/chatbot folders.
Quick customizations:
- To change the logo swap out the logo.png file.
- /src/common/constants.ts change the name of the project on line 109.
- /src/components/chatbot/chat-input-panel.tsx customize the system prompt on line 395 and input the kendra project id on line 403.

# AWS Tools Used
AWS Amplify
- Connects to Github repository (Super-Secret-Swag), agency specific branches
Cloudscape Design System
- Front-end components to be used with the AWS suite of products


## Back-end
The back-end code is a series of AWS lambda functions that serve as connectors between AWS services.

# AWS Tools 
AWS API GATEWAY (Websocket, REST, HTTP)
AWS Lambda
AWS Kendra
AWS Bedrock
- Connects to Lambda
- Used for model access
AWS Cognito
S3
- Connects to Kendra
- Used for knowledge management
DynamoDB
- Connects to Lambda
- Used for session history
