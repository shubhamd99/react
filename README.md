# NextJS

Next.js is a flexible React framework that gives you building blocks to create fast web applications. 
By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.


### Building Blocks of a Web Application
There are a few things you need to consider when building modern applications. Such as:

* User Interface - how users will consume and interact with your application.
* Routing - how users navigate between different parts of your application.
* Data Fetching - where your data lives and how to get it.
* Rendering - when and where you render static or dynamic content.
* Integrations - what third-party services you use (CMS, auth, payments, etc) and how you connect to them.
* Infrastructure - where you deploy, store, and run your application code (Serverless, CDN, Edge, etc).
* Performance - how to optimize your application for end-users.
* Scalability - how your application adapts as your team, data, and traffic grow.
* Developer Experience - your team’s experience building and maintaining your application.

![img_alt](https://nextjs.org/static/images/learn/foundations/next-app.png)

## What is React?
React is a JavaScript library for building interactive user interfaces. By user interfaces, we mean the elements that users see and interact with on-screen. By library, we mean React provides helpful functions to build UI, but leaves it up to the developer where to use those functions in their application.

It also means, however, that building a complete React application from the ground up requires some effort. Developers need to spend time configuring tools and reinventing solutions for common application requirements.

![img_alt](https://nextjs.org/static/images/learn/foundations/user-interface.png)

## Benefits of Next.JS

* Different Rendering Techniques
* Performance
* File Based Routing
* SEO

## Rendering Techniques

### Client Side Rendering

JavaScript-based web apps as we traditionally know them work by running libraries like React or scripts at run time in the browser.
When the browser receives the page, it’s usually simple HTML without a lot of content. This then loads the scripts to pull the content into the page, a process also known as hydration.

Client-side rendering (CSR) means rendering pages directly in the browser using JavaScript. All logic, data fetching, templating and routing are handled on the client rather than the server.

### Static Site Generation

Static Generation describes the process of compiling and rendering a website or app at build time. The output is a bunch of static files, including the HTML file itself and assets like JavaScript and CSS.
Eg. Products, our static coffee stores, blog posts etc.

### Server Side Rendering

Server-side rendering (SSR) means that the content of your site is generated on the server, then sent to the browser. This is useful for SEO purposes, because search engines can "see" the content of your site before they send it to users.
Eg. Dyanmic News Feed, Netflix, GENERATE PAGE ON THE SERVER

### Incremental Site Regeneration

Next.js allows you to create or update static pages after you’ve built your site.
Incremental Static Regeneration (ISR) enables developers and content editors to use static-generation on a per-page basis, without needing to rebuild the entire site.
Static pages can be generated at runtime (on-demand) instead of at build-time with ISR. Using analytics, A/B testing, or other metrics, you are equipped with the flexibility to make your own tradeoff on build times.
Eg. static + server

* Faster Builds
* Higher Cache Hit Rate

GENERATE PAGE ON BUILD IN ADVANCE + SERVER AFTER

## Performance with Next.JS

* Code spliting - Divide you web app in small chunks so you can only load the chunk that is used by the current page.
* Minifying files - NextJS minifies the code for you
* Image optimization - Image Component in NextJS
* Pre-fetching assets