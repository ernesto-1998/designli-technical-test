# NestJS Technical Assessment

This repository contains solutions for two NestJS development challenges, demonstrating proficiency in API development, email parsing, data transformation, and comprehensive testing.

---

## Table of Contents

- [Project 1: AWS SES Email Validation (Easy Challenge)](#project-1-aws-ses-email-validation-easy-challenge)
- [Project 2: Email Parser with JSON Extraction (Real Challenge)](#project-2-email-parser-with-json-extraction-real-challenge)
- [Technologies Used](#technologies-used)
- [Author](#author)

---

## Project 1: AWS SES Email Validation (Easy Challenge)

### Overview

This project implements a REST API endpoint that processes AWS SES (Simple Email Service) events and extracts relevant validation information. The API receives AWS SES event data and transforms it into a structured response containing spam, virus, and DNS validation results.

### Features

- Parse AWS SES SNS event notifications
- Validate spam, virus, and DNS security checks
- Extract and transform email metadata
- Return structured JSON responses
- Comprehensive unit tests with 80%+ coverage
- Input validation using class-validator
- Swagger API documentation
- Rate limiting (100 requests/minute)
- Environment configuration support

### Project Structure

```
easy-one-exercise/
├── src/
│   ├── common/
│   │   ├── enums/
│   │   ├── filters/
│   │   └── utils/
│   ├── modules/
│   │   └── ses/
│   │       ├── controllers/
│   │       ├── services/
│   │       ├── mappers/
│   │       ├── dto/
│   │       └── helpers/
│   ├── app.module.ts
│   └── main.ts
├── test/
└── package.json
```

### Installation

```bash
cd easy-one-exercise
npm install
```

### Configuration

Create a `.env.dev` file in the project root (It is not necessary, if .env file does not exists, the app will take default values):

```env
PORT=5000
THROTTLE_TTL=60000
THROTTLE_LIMIT=100
```

### Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

### Testing

```bash
# Unit tests
npm test

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### API Documentation

Once the application is running, access the Swagger documentation at:

**http://localhost:5000/api#/**

### Example Request

```bash
POST http://localhost:5000/api/v1/ses/validate
Content-Type: application/json

{
"Records": [
    {
      "eventVersion": "1.0",
      "ses": {
        "receipt": {
          "timestamp": "2015-09-11T20:32:33.936Z",
          "processingTimeMillis": 222,
          "recipients": [
            "recipient@example.com"
          ],
          "spamVerdict": {
            "status": "PASS"
          },
          "virusVerdict": {
            "status": "PASS"
          },
          "spfVerdict": {
            "status": "PASS"
          },
          "dkimVerdict": {
            "status": "PASS"
          },
          "dmarcVerdict": {
            "status": "PASS"
          },
          "dmarcPolicy": "reject",
          "action": {
            "type": "SNS",
            "topicArn": "arn:aws:sns:us-east-1:012345678912:example-topic"
          }
        },
        "mail": {
          "timestamp": "2015-09-11T20:32:33.936Z",
          "source": "61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com",
          "messageId": "d6iitobk75ur44p8kdnnp7g2n800",
          "destination": [
            "recipient@example.com"
          ],
          "headersTruncated": false,
          "headers": [
            {
              "name": "Return-Path",
              "value": "<0000014fbe1c09cf-7cb9f704-7531-4e53-89a1-5fa9744f5eb6-000000@amazonses.com>"
            },
            {
              "name": "Received",
              "value": "from a9-183.smtp-out.amazonses.com (a9-183.smtp-out.amazonses.com [54.240.9.183]) by inbound-smtp.us-east-1.amazonaws.com with SMTP id d6iitobk75ur44p8kdnnp7g2n800 for recipient@example.com; Fri, 11 Sep 2015 20:32:33 +0000 (UTC)"
            },
            {
              "name": "DKIM-Signature",
              "value": "v=1; a=rsa-sha256; q=dns/txt; c=relaxed/simple; s=ug7nbtf4gccmlpwj322ax3p6ow6yfsug; d=amazonses.com; t=1442003552; h=From:To:Subject:MIME-Version:Content-Type:Content-Transfer-Encoding:Date:Message-ID:Feedback-ID; bh=DWr3IOmYWoXCA9ARqGC/UaODfghffiwFNRIb2Mckyt4=; b=p4ukUDSFqhqiub+zPR0DW1kp7oJZakrzupr6LBe6sUuvqpBkig56UzUwc29rFbJF hlX3Ov7DeYVNoN38stqwsF8ivcajXpQsXRC1cW9z8x875J041rClAjV7EGbLmudVpPX 4hHst1XPyX5wmgdHIhmUuh8oZKpVqGi6bHGzzf7g="
            },
            {
              "name": "From",
              "value": "sender@example.com"
            },
            {
              "name": "To",
              "value": "recipient@example.com"
            },
            {
              "name": "Subject",
              "value": "Example subject"
            },
            {
              "name": "MIME-Version",
              "value": "1.0"
            },
            {
              "name": "Content-Type",
              "value": "text/plain; charset=UTF-8"
            },
            {
              "name": "Content-Transfer-Encoding",
              "value": "7bit"
            },
            {
              "name": "Date",
              "value": "Fri, 11 Sep 2015 20:32:32 +0000"
            },
            {
              "name": "Message-ID",
              "value": "<61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com>"
            },
            {
              "name": "X-SES-Outgoing",
              "value": "2015.09.11-54.240.9.183"
            },
            {
              "name": "Feedback-ID",
              "value": "1.us-east-1.Krv2FKpFdWV+KUYw3Qd6wcpPJ4Sv/pOPpEPSHn2u2o4=:AmazonSES"
            }
          ],
          "commonHeaders": {
            "returnPath": "0000014fbe1c09cf-7cb9f704-7531-4e53-89a1-5fa9744f5eb6-000000@amazonses.com",
            "from": [
              "sender@example.com"
            ],
            "date": "Fri, 11 Sep 2015 20:32:32 +0000",
            "to": [
              "recipient@example.com"
            ],
            "cc": [
              "cc@example.com",
              "cc2@example.com"
            ],
            "messageId": "<61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com>",
            "subject": "Example subject"
          }
        }
      },
      "eventSource": "aws:ses"
    }
  ]
}
```

### Example Response

```json
{
  "spam": true,
  "virus": true,
  "dns": true,
  "mes": "September",
  "retrasado": false,
  "emisor": "sender",
  "receptor": ["recipient"]
}
```

### Key Technologies

- NestJS
- class-transformer
- class-validator
- Jest (testing)
- Swagger/OpenAPI

---

## Project 2: Email Parser with JSON Extraction (Real Challenge)

### Overview

This project implements an advanced email parsing system that extracts JSON data from `.eml` files. The system supports three different extraction strategies: direct file attachments, direct links to JSON files, and links to web pages containing JSON file references.

### Features

- Parse `.eml` (email) files using mailparser
- Extract JSON from file attachments
- Extract JSON from direct links in email body
- Scrape web pages to find JSON file links
- Support for both URL and file path inputs
- Comprehensive error handling
- Swagger API documentation
- Rate limiting (100 requests/minute)
- Environment configuration support

### Project Structure

```
email-parser-challenge/
├── src/
│   ├── common/
│   │   └── enums/
│   ├── modules/
│   │   └── email-parser/
│   │       ├── controllers/
│   │       ├── services/
│   │       │   ├── email-parser.service.ts
│   │       │   ├── eml-reader.service.ts
│   │       │   ├── email-extractor.service.ts
│   │       │   ├── body-parser.service.ts
│   │       │   ├── web-scraper.service.ts
│   │       │   └── file-downloader.service.ts
│   │       └── dto/
├── test/
└── package.json
```

### Installation

```bash
cd real-challenge
npm install
```

### Configuration

Create a `.env.dev` file in the project root:

```env
PORT=5001
THROTTLE_TTL=60000
THROTTLE_LIMIT=100
```

### Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

### Testing

```bash
# Unit tests
npm test

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### API Documentation

Once the application is running, access the Swagger documentation at:

**http://localhost:5001/api#/**

### Extraction Strategies

The system implements three extraction strategies in order of priority:

1. **Attachment Extraction**: Searches for `.json` files directly attached to the email
2. **Direct Link Extraction**: Searches for direct links to `.json` files in the email body
3. **Web Scraping Extraction**: Accesses web pages linked in the email body and searches for JSON file links

### Test Email Files

Use these `.eml` files to test the three different extraction scenarios:

**Scenario 1: JSON as Direct Attachment**

```
https://raw.githubusercontent.com/ernesto-1998/raw_files/refs/heads/main/original_msg.eml
```

**Scenario 2: Direct Link to JSON File**

```
https://raw.githubusercontent.com/ernesto-1998/raw_files/refs/heads/main/original_msg_linkToJson.eml
```

**Scenario 3: Link to Web Page Containing JSON Link**

```
https://raw.githubusercontent.com/ernesto-1998/raw_files/refs/heads/main/original_msg_LinkToWebPage_ToJson.eml
```

### Example Request

```bash
POST http://localhost:5001/api/v1/email-parser/parse
Content-Type: application/json

{
  "source": "https://raw.githubusercontent.com/ernesto-1998/raw_files/refs/heads/main/original_msg.eml"
}
```

### Example Response

```json
{
  "data": {
    "id": 123,
    "name": "Example Data",
    "items": ["item1", "item2"]
  },
  "source": "attachment",
  "originalSource": "data.json"
}
```

### Key Technologies

- NestJS
- mailparser (email parsing)
- axios (HTTP requests)
- cheerio (web scraping)
- class-transformer
- class-validator
- Jest (testing)
- Swagger/OpenAPI

---

## Technologies Used

### Common Stack

- **Node.js**: Runtime environment
- **NestJS**: Progressive Node.js framework
- **TypeScript**: Type-safe JavaScript
- **Jest**: Testing framework
- **Swagger/OpenAPI**: API documentation
- **class-validator**: DTO validation
- **class-transformer**: Object transformation

### Project-Specific Libraries

**Easy Challenge:**

- Custom utilities for email and date parsing

**Real Challenge:**

- mailparser: Email file parsing
- axios: HTTP client
- cheerio: HTML parsing and web scraping

---

## Common Features

Both projects include:

- **Swagger Documentation**: Interactive API documentation at `/api#/`
- **Rate Limiting**: Throttle protection (100 requests/minute)
- **Environment Configuration**: Ready-to-use config module with `.env.dev` support
- **Comprehensive Testing**: High test coverage with unit tests
- **Input Validation**: Request validation using DTOs and class-validator
- **Error Handling**: Proper exception handling and HTTP responses
- **Clean Architecture**: Modular structure following NestJS best practices

---

## Author

Ing. Ernesto Magaña

---

## License

This project is part of a technical assessment and is provided as-is for evaluation purposes.
