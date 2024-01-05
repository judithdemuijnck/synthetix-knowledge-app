# Synthetix Knowledge API Use Case

This project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This is an unoffical web application to demo basic capabilities of the Synthetix Knowledge API.

## Installation

As a prerequesite, you will need to have a package manager like npm or yarn installed.

### Installing Dependencies

To install all dependencies, open this directory in a new shell and run the command

`$ npm install`

### Setting Up Environmental Variables

In the root directory, you will need to create a .env.local file with the following environmental variables:

```
NEXT_PUBLIC_APPLICATIONKEY={your application key}
NEXT_PUBLIC_CONSUMERKEY={your consumer key}
NEXT_PUBLIC_BASE_URL=https://api{environment}.synthetix.com/2.0/external/
```

You can obtain your application and consumer key from your account manager.

Beware that these are public environmental variables that will be explicitly embedded during build time. Your keys will be exposed if you share this application externally.

### Run the Application

To start the application, open this directory in a new shell and run the command

`$ npm run dev`

The application will be served from [http://localhost:3000](http://localhost:3000) by default.

## Using the Synthetix Knowledge API

### Session Management

You need a session token to access the Synthetix API. When you launch your application, you should verify that your stored session token is still valid. If it is no longer valid, or you have no previously stored session token, you need to initialise a new session.

#### Initialise a Session

Send a `POST` request to `https://api{environment}.synthetix.com/2.0/external/session`. Your request header needs to include your `APPLICATIONKEY` and your `CONSUMERKEY`. If your api keys are valid, the response will include a new session token.

```
{
    "token": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "view": "FAQs"
}
```

#### Verifiy an Existing Session

Send a `GET` request to `https://api{environment}.synthetix.com/2.0/external/session`. Your request header needs to include your `APPLICATIONKEY` and your `CONSUMERKEY`. As `Authorization`, you need to use your existing session token as a Bearer Token. If your session token has expired, an error will be thrown. Otherwise, the response will include the following information:

```
{
    "ValidToken": true,
    "Expired": false,
    "ValidApplication": true,
    "IP": true,
    "view": "FAQs",
    "return": null
}
```

All subsequent API calls will need to include the following request headers and Authorization:

```
{
    "headers": {
        "APPLICATIONKEY": {your application key},
        "CONSUMERKEY": {your consumer key},
        "Authorization": Bearer XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
    }
}
```

### Displaying Popular FAQs

You can get a list of the most popular FAQs by sending a `GET` request to `https://api{environment}.synthetix.com/2.0/external/all_faqs` with the query parameter `?pop=true`. If `pop` is set to `false`, you will receive a list of FAQs that are not sorted by popularity. Other params include `limitno` to set a limit to the amount of FAQs returned, and `limitdate` to set a date range. Refer to the [official Synthetix API documentation](https://documentation.synthetix.com/#dd682fbf-af5b-49b8-a3c9-fd075d28866b) for a list of all possible parameters and their use cases.

The response will include the following information:

```
{
    "items": [
        {
            "label": "qedxxxxxx",
            "comments": 0,
            "question": “How do I use the Synthetix API?”,
            "category": "Test",
            "subcategory": "",
            "last edited": "2023-12-19 12:58:27",
            "timestamp": 1702990707,
            "views": [
                "FAQs"
            ]
        }
    ],
    "totalresults": {same number as limitno param}
}
```

### Search Functionality

To search for specific articles based on a search query, send a `POST` request to `https://api{environment}.synthetix.com/2.0/external/search`. The following body is required

```
{
    "body": {
        "query": {Your search query},
        "channel": {use channel 14 to search Knowledgebase},
        "userid": {neccessary in external searches such as this}
    }
}
```

For optional body parameters and their use cases, refer to the [official Synthetix API documentation](https://documentation.synthetix.com/#b1917ea3-3ea5-47b1-a945-0f23e1a4ad10).

This is an excerpt from the response:

```
{
    "results": [
        {
            "index": 0,
            "label": "qedXXXXXX",
            "faq": "How do I use the Synthetix API?",
            "view": "FAQs",
            "id": "qedxxxxxxxxxxxxxxx",
            "comments": 0,
            "confidence": 33,
            "faq_mnemonics": "",
            "recommended": false,
            "taxonomy": {
                "category": [
                    "Test"
                ]
            }
        }
    ]
}
```

To see an example of a full response format, check the [official Synthetix API documentation](https://documentation.synthetix.com/#b1917ea3-3ea5-47b1-a945-0f23e1a4ad10).

### Article Display

To access individual articles, you will need the corresponding article label.
Send a `POST` request to `https://api{environment}.synthetix.com/2.0/external/article`. The following body is required:

```
{
    "body": {
        "label": "qedXXXXXX",
        "channel": 14,
        "userid": "XXXXXX"
    }
}
```

For optional body parameters and their use cases, refer to the [official Synthetix API documentation](https://documentation.synthetix.com/#7cb87ae9-2558-4f8e-8397-bf8e1af71f0d).

This is an excerpt from the response:

```
{
    "question": "How do I use the Synthetix API?",
    "answer": "<h1>This is how you use the Synthetix API</h1>",
    "category": "Test",
    "view": "FAQs",
    "lastediteddate": "Tue, 24 Oct 2023 13:13:09 UTC",
    "lasteditedauthor": "Max Mustermann",
     "newfeedback": {
        "1": {
            "Did this answer your question?": [
                {
                    "3246": "Yes"
                },
                {
                    "3247": "No"
                }
            ]
        },
     },
      "comments": [
        {
            "id": 6182,
            "operator": null,
            "operatorid": XXXX,
            "comment": "Helpful",
            "date_time": "2018-07-25 09:13:00"
        }
      ]
}
```

To see an example of a full response format, check the [official Synthetix API documentation](https://documentation.synthetix.com/#7cb87ae9-2558-4f8e-8397-bf8e1af71f0d).

### Collecting Feedback

You can collect feedback for each article. Each feedback question and answer cobination is represented by a unique ID that will be logged. A common feedback question is "Did this answer your question?" with answer options being a thumb up or a thumb down. Additional feedback text can also be captured.
Send a `POST`request to `https://api{environment}.synthetix.com/2.0/external/article_feedback`. In the request body, you need to send the label fo the corresponding article, the feedback question/answer combo id via the `feedback` param, and, optionally, the additionally captured feedback text.

```
{
    "body": {
        "label": "qedXXXXXX",
        "feedback": 3246,
        "text": "Great article"
    }
}
```

On successfull feedback, the response returns `{"success": true}`

_Please note that the provided logic serves as a reference implementation, and you should adapt it to suit your specific use case and application architecture._
