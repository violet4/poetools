#!/usr/bin/env python3
"""

https://www.craftofexile.com/


User-Agent: OAuth {$clientId}/{$version} (contact: {$contact}) ...

Example:

User-Agent: OAuth mypoeapp/1.0.0 (contact: mypoeapp@gmail.com) StrictMode


This product isn't affiliated with or endorsed by Grinding Gear Games in any way.

Code 	Text 	Description
200	OK	The request succeeded.
202	Accepted	The request was accepted but may not be processed yet.
400	Bad Request	The request was invalid. Check that all arguments are in the correct format.
404	Not Found	The requested resource was not found.
429	Too many requests	You are making too many API requests and have been rate limited.
500	Internal Server Error	We had a problem processing your request. Please try again later or post a bug report.


{
    "error": {
        "code": 2,
        "message": "Invalid query"
    }
}


Examples:
Code 	Message
0	Accepted
1	Resource not found
2	Invalid query
3	Rate limit exceeded
4	Internal error
5	Unexpected content type
8	Unauthorized
6	Forbidden
7	Temporarily Unavailable
9	Method not allowed
10	Unprocessable Entity



Invalid Requests Threshold
Applications (and users) that make too many invalid requests in a short period of time will be restricted from further access to our service.
Invalid requests include any response codes in the HTTP 4xx range. This includes common codes such as 401 (Unauthorized), 403 (Forbidden), and 429 (Too Many Requests).
Reasonable attempts must be made in order to avoid passing the threshold. 



HTTP/1.1 200 OK
...
X-Rate-Limit-Policy: ladder-view
X-Rate-Limit-Rules: client
X-Rate-Limit-Client: 10:5:10
X-Rate-Limit-Client-State: 1:5:0

Example that has exceeded the limit:

HTTP/1.1 429 Too Many Requests
...
X-Rate-Limit-Policy: ladder-view
X-Rate-Limit-Rules: client
X-Rate-Limit-Client: 10:5:10
X-Rate-Limit-Client-State: 11:5:10
Retry-After: 10
Retry-After
    Time to wait (in seconds) until the rate limit expires.



Registration is currently handled by us directly at our discretion. You can make a request by emailing oauth@grindinggear.com with your details and requirements.
Things to include:

    Your PoE account name.
    Your application's name.
    The scopes you are interested in.
    A secure redirect URI if you plan to use the authorization_code grant type.


https://www.pathofexile.com/my-account/applications

account:stashes
account:characters
service:psapi
account:league_accounts - allocated atlas passives
account:item_filter


Application Credentials

Once your application has been registered you will be able to find your credentials by clicking "Manage" on your application here. If this is your first time visiting this page you will need to generate your client_secret and copy it down somewhere safe. If you lose your current client_secret you can always regenerate another

https://www.pathofexile.com/my-account/applications
https://www.pathofexile.com/developer/docs#guidelines
https://www.pathofexile.com/developer/docs/authorization#scopes/www.pathofexile.com/developer/docs/authorization#scopes
https://www.pathofexile.com/developer/docs/authorization#scopes
https://www.pathofexile.com/developer/docs/authorization#oauth
https://www.pathofexile.com/developer/docs/reference
https://www.pathofexile.com/developer/docs#guidelines

https://github.com/brather1ng/RePoE

"""
import datetime
import os
import json

import requests

import falcon


def get_currency_values():
    today = datetime.date.today().strftime('%Y-%m-%d')
    filename = f'currency_{today}.txt'
    if not os.path.exists(filename):
        resp = requests.get('https://poe.ninja/api/data/CurrencyOverview?league=Kalandra&type=Currency&language=en')
        with open(filename, 'w') as fw:
            print(resp.content.decode(), file=fw)

    with open(filename, 'r') as fr:
        data = json.load(fr)

    currency = dict()
    for cur in data['lines']:
        currencyTypeName = cur['currencyTypeName']
        if 'receive' not in cur:
            # print(f"no data for {currencyTypeName}")
            continue
        value = cur['receive']['value']
        currency[currencyTypeName] = value

    return currency


class CurrencyResource:
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        # resp.content_type = falcon.MEDIA_TEXT
        resp.media = get_currency_values()


prefix = '/api'
# prefix = ''
app = falcon.App()
app.add_route(prefix+'/currency', CurrencyResource())
print(os.listdir(os.path.abspath('frontend/build')))
app.add_static_route('/', os.path.abspath('frontend/build'))

if __name__ == '__main__':
    currency = get_currency_values()
    print(json.dumps(currency, indent=4))
    print({k: v for k, v in currency.items() if 'chaos' in k.lower()})
