# Endpoints

baseUrl: `https://api.gode.app`

## GET: v1/getans?phrase=`message`

Converts between QWERTY and Kedmanee.

![v1/getans](https://cdn.statically.io/img/i.imgur.com/q=50/S3nIW9o.png)

## GET: v2/convert/:EngLayout/:ThaLayout?message=`message`

Do the same thing as last one but with more layout.

* `EngLayout`: User's English keyboard layout. [QWERTY, Dvorak]
* `ThaLayout`: User's Thai keyboard layout. [Kedmanee, Manoonchai]
* `message`: User's message.

![v2/convert](https://cdn.statically.io/img/i.imgur.com/q=50/iGdq8Qs.png)

## POST: v2/raw

Also do the same thing as last one but with POST method.

* `EngLayout`: User's English keyboard layout. [QWERTY, Dvorak]
* `ThaLayout`: User's Thai keyboard layout. [Kedmanee, Manoonchai]
* `message`: User's message.

![v2/raw](https://cdn.statically.io/img/i.imgur.com/q=50/ASxuQNL.png)