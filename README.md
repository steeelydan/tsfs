# TSFS

https://www.npmjs.com/package/@steeelydan/tsfs

**No semantic versioning before v1.0.0. Expect breaking changes.**

TSFS (roughly **TypeScript Full Stack framework**) is a 'mid-level' framework for TypeScript web applications. While it doesn't guide you in a way let's say [NestJS](https://github.com/nestjs/nest) would, it helps you to get past the `npm install express` phase of your application.

It provides you with

-   A selection of libraries for everyday serverside tasks (Express as the microframework, the usual middleware for common tasks)
-   Opinionated, drop-in solutions for basic decisions (database, authentication, templating, security, logging...)
-   A clean, functional-ish starting point for custom architectures
-   A more complete view at classic web application development than the usual tutorials for that ecosystem provide
-   An application framework where you feel free and able but also enjoy guidance and security
-   A solid base for serverside rendered UI as well as API driven SPAs

Its intended use is in classical web applications, where users might register, get authenticated, save and query data. A monolith whose backend deals with a single database, deployed as-is on a VPS. It's also a take on stability and established web development principles in the fast paced JS/TS universe. While I'm in no way opposed to contemporary architecture, I'm confident that there are benefits of such a tried-and-tested setup in certain situations. TSFS combines 'cutting edge' decisions (all-in on TypeScript, full commitment to Node ES Modules) with those conservative choices.

Influences:

-   'Old-fashioned' full stack frameworks from other ecosystems (Rails, Django, Spring, Symfony)
-   Gary Bernhardt's musings on full stack TypeScript
    -   https://www.executeprogram.com/blog/porting-to-typescript-solved-our-api-woes
    -   https://fullstackradio.com/144
-   Hacker News discussions of monolith-first architecture
-   The 'boring stack' discussed in places like hacker news

Further description coming soon. Meanwhile, you can see it in action here: https://github.com/steeelydan/sync-party

## Usage

### Install

Install from npm: `npm install @steeelydan/tsfs`

### Example

```typescript
import express from 'express';
import dotenv from 'dotenv';

import { Base } from '@steeelydan/tsfs';

dotenv.config(); // TODO Use TSFS implementation

const runApp = async () => {
    const app = express();

    app.get('/', (req, res) => {
        console.log('Hey Server');

        res.send('Hey Client');
    });

    const server = Base.HttpServer.create(app);

    server.listen(process.env.PORT, () => {
        console.log(`Listening on Port ${process.env.PORT}`);
    });
};

runApp().catch((error) => console.error(error));
```
