# NextJS

Next.js is a flexible React framework that gives you building blocks to create fast web applications. 
By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.

```
npx create-next-app@latest
```


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

## What is Vercel?

Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.
Vercel enable teams to iterate quickly and develop, preview, and ship delightful user experiences. Vercel has zero-configuration support for 35+ frontend frameworks and integrates with your headless content, commerce, or database of choice. Frameworks by Vercel: Next.JS, Nuxt, etc.

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
* Server less functions - Vercel Serverless Functions enable running code on-demand without needing to manage your own infrastructure, provision servers, or upgrade hardware. Serverless Functions enable developers to write functions in JavaScript and other languages to handle user authentication, form submissions, database queries, custom Slack commands, and more.

![img_alt](https://i.imgur.com/ANnqbS6.png)

## What is SEO (Search Engine Optimization?

Search engine optimization is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic rather than direct traffic or paid traffic.

* Crawling - Discover Pages
* Indexing - Find whats on the page and understand the page
* Ranking - serves highly ranked page based on users location, language and device

In simple terms, SEO means the process of improving your website to increase its visibility in Google, Microsoft Bing, and other search engines whenever people search for:

* Products you sell.
* Services you provide.
* Information on topics in which you have deep expertise and/or experience.

## Important Tags for SEO

* Semnatics - A semantic element clearly describes its meaning to both the browser and the developer.

Examples of non-semantic elements: <div> and <span> - Tells nothing about its content.

Examples of semantic elements: <form>, <table>, and <article> - Clearly defines its content.

```
<article>
<aside>
<details>
<figcaption>
<figure>
<footer>
<header>
<main>
<mark>
<nav>
<section>
<summary>
<time>
```

* Meta Tags - meta tags are HTML tags used to provide additional information about a page to search engines and other clients. Clients process the meta tags and ignore those they don't support. meta tags are added to the <head> section of your HTML page.

* Image Alt Tag - The alt attribute provides alternative information for an image if a user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader).

## Webpack

Webpack is a module bundler. Webpack can take care of bundling alongside a separate task runner. However, the line between bundler and task runner has become blurred thanks to community-developed webpack plugins. Sometimes these plugins are used to perform tasks that are usually done outside of webpack, such as cleaning the build directory or deploying the build although you can defer these tasks outside of webpack.

Modules are reusable chunks of code built from your app’s JavaScript, node_modules, images, and the CSS styles which are packaged to be easily used in your website. Webpack separates the code based on how it is used in your app, and with this modular breakdown of responsibilities, it becomes much easier to manage, debug, verify, and test your code.

### Webpack can be broken down into these 5 principals:

* Entry - Entry is the entry point for the application
* Output - The Output point is where the files are to be written on disk with thename of the files.
* Loaders - There are 2 configuration options required to add a loader — test which identifies file or file types should be transformed and use which tells Webpack which loader to use in order to transform these files
* Plugins - Plugins handle the additional tasks that can’t be completed by a loader. This includes things such as bundle optimization, defining environment variables, etc
* Mode - Mode tells Webpack which configuration and optimizations to use for your application. 

Next.js has adopted webpack 5 as the default for compilation. 

## New Features of Next 12

### Rust Compiler
Rust Compiler to provide 5x faster builds and faster refresh, which was the previously 3x the speed. This means that the performance has increased almost twice.

![img_alt](https://miro.medium.com/v2/resize:fit:720/format:webp/1*OypkoeuaKY7SF7G3ynwdfQ.png)

### Middlewares
Middleware enables you to use code over configuration. This gives you full flexibility in Next.js because you can run code before a request is completed. Based on the user’s incoming request, you can modify the response by rewriting, redirecting, adding headers, or even streaming HTML.

![img_alt](https://miro.medium.com/v2/resize:fit:640/format:webp/1*R-p0FElvWPI69xW0C2resQ.png)

### React 18

* Concurrency - with concurrent rendering, React can interrupt, pause, resume, or abandon a render. This allows React to respond to the user interaction quickly even if it is in the middle of a heavy rendering task. Before React 18, rendering was a single, uninterrupted, synchronous transaction and once rendering started, it couldn’t be interrupted.

* Automatic Batching - Previously, state updates that happened outside of event handlers were not batched. For example, if you had a promise or were making a network call, the state updates would not be batched. React 18 introduces automatic batching which allows all state updates – even within promises, setTimeouts, and event callbacks – to be batched. 

* Transitions - Transitions can be used to mark UI updates that do not need urgent resources for updating. You can mark updates as non-urgent by using startTransition. Example, Showing a visual feedback to the user is important and therefore urgent. Searching is not so urgent, and so can be marked as non-urgent. 

How are transitions different from debouncing or setTimeout?

a. startTransition executes immediately, unlike setTimeout.
b. setTimeout has a guaranteed delay, whereas startTransition's delay depends on the speed of the device.
c. startTransition updates can be interrupted unlike setTimeout and won't freeze the page.
d. React can track the pending state for you when marked with startTransition.

```jsx
import { startTransition } from 'react';

// Urgent: Show what was typed
setInputValue(input);

// Mark any non-urgent state updates inside as transitions
startTransition(() => {
  // Transition: Show the results
  setSearchQuery(input);
});
```

* Suspense on the server - Code splitting on the server with suspense and Streaming rendering on the server.

React 18 adds support for Suspense on server. With the help of suspense, you can wrap a slow part of your app within the Suspense component, telling React to delay the loading of the slow component. This can also be used to specify a loading state that can be shown while it's loading.

one slow component doesn’t have to slow the render of your entire app. With Suspense, you can tell React to send HTML for other components first along with the HTML for the placeholder, like a loading spinner. 

This way the user can see the skeleton of the page as early as possible and see it gradually reveal more content as more pieces of HTML Arrive.

* Strict mode - Strict mode in React 18 will simulate mounting, unmounting, and re-mounting the component with a previous state. This sets the ground for reusable state in the future where React can immediately mount a previous screen by remounting trees using the same component state before unmounting.

### Smaller images using AVIF
The built-in Image Optimization API now supports AVIF images, enabling 20% smaller images compared to WebP. AVIF images can take longer to optimize compared to WebP, so we’re making this feature opt-in using the new images.formats property in next.config.js

```js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp']
  }
}
```

### Bot-Aware ISR Fallback
In Next.js 12, web crawlers (e.g. search bots) will automatically server-render ISR pages using fallback: true, while still serving the previous behavior of the fallback state to non-crawler User-Agents. This prevents crawlers from indexing loading states.

### URL Imports
URL imports allow you to use any package directly through a URL. This enables Next.js to process remote HTTP(S) resources exactly like local dependencies.

```js
module.exports = {
  experimental: {
    urlImports: ['https://cdn.skypack.dev']
  }
}
```

Then, you can import modules directly from URLs:

```jsx
import confetti from 'https://cdn.skypack.dev/canvas-confetti'
```


## New Features of Next 13

### App/Directory for File-Based Routing

Next.js 13 offers revised file routing with the new directory. The optional app directory brings a new layout structure with several additional features and improvements.

The new structure enables us to include additional files in each path directory. Also, the page.js for a route, such as

* layout.js - A system for the path & its sub-paths.
* loading.js - A system for an instant loading state using React.

![img_alt](https://cdn.sanity.io/images/ay6gmb6r/production/db1f7975616df7b550df3f8c3b134a571aab030f-2240x1260.png?w=729&fm=webp&fit=max&auto=format)

Suspense under the hood & error.js, a component is displayed if the primary component cannot load. We can now co locate source files inside our path directories because each path is now its directory.

### React Server Components

React Server Components allows the server and the client (browser) to collaborate in rendering your React application.
Consider the typical React element tree that is rendered for your page, which is usually composed of different React components rendering more React components. RSC makes it possible for some components in this tree to be rendered by the server, and some components to be rendered by the browser.

### Async Components & Data Fetching

Async components, a new method of data collecting for server-rendered components, are also introduced in Next.js 13. We can render systems using Promises with async & await when utilizing async components.

```jsx
async function getData() {
  const res = await fetch ('https://api.example.com/...');​
  return res.json();

}

export default async function Page() {
  const name = await getData();
  return '...';
}
```

### Streaming

Users may have to wait for the entire page to generate before accessing them. As the UI is generated, the server will send small bits of it to the client. It implies that larger chunks won't obstruct smaller ones. Of course, right now, this feature is only supported in the app directory, and it doesn't appear that this will change.

This new addition won't help those with fast Wi-Fi or access to a strong internet connection as much as those with poorer connections.

### Turbopack

As the "successor to Webpack," a new JavaScript bundler named Turbopack was the final significant update made with Next.js 13 release.
The developers of Webpack have created Turbopack, which is built in Rust and promises to be 700 times quicker than the original Webpack (and 10x faster than Vite, a more modern alternative).

### Other upgrades

* next/image - Less client-side JavaScript, styling and configuration, and increased accessibility are all features of the new Image component in Next.js.
* next/font - The new @next/font allows you to use Google Fonts (or any custom font) without the browser sending any queries. CSS and font files are downloaded at build time with other static assets.

* next/link - It's a new font system that offers automatic font optimization, the ability to include custom fonts & all these things with no external network queries for increased privacy and efficiency.


### NextJS Structure

### _app
Next.js uses the App component to initialize pages. You can override it and control the page initialization and:

* Persist layouts between page changes
* Keeping state when navigating pages
* Inject additional data into pages
* Add global CSS

```jsx
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

The Component prop is the active page, so whenever you navigate between routes, Component will change to the new page. Therefore, any props you send to Component will be received by the page.

pageProps is an object with the initial props that were preloaded for your page by one of our data fetching methods, otherwise it's an empty object.

### __document

A custom Document can update the <html> and <body> tags used to render a Page. This file is only rendered on the server, so event handlers like onClick cannot be used in _document. To override the default Document, create the file pages/_document.js.

### getInitialProps

getInitialProps enables server-side rendering in a page and allows you to do initial data population, it means sending the page with the data already populated from the server. This is especially useful for SEO.

```jsx
function Page({ stars }) {
  return <div>Next stars: {stars}</div>
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page
```
