# React

React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies. React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js.

React was created by Jordan Walke, a software engineer at Facebook, in 2011. It was initially used internally at Facebook and Instagram, but was later released to the public in 2013. React has since become one of the most popular front-end development libraries, and is used by companies such as Netflix, Airbnb, and Twitter.

React uses a declarative programming paradigm, which makes it easy to create interactive UIs. React also uses a component-based architecture, which allows developers to break down complex UIs into smaller, reusable components. This makes code more modular and maintainable.

One of the key features of React is its use of a virtual DOM. The virtual DOM is a lightweight representation of the real DOM, which makes it much faster to update the UI. React only updates the real DOM when necessary, which improves performance.

React is a powerful and flexible library that can be used to build a wide variety of web applications. It is easy to learn and use, and has a large community of developers who contribute to its development.

# NextJS

Next.js is a flexible React framework that gives you building blocks to create fast web applications.
By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.

```
npx create-next-app@latest
```

### Building Blocks of a Web Application

There are a few things you need to consider when building modern applications. Such as:

- User Interface - how users will consume and interact with your application.
- Routing - how users navigate between different parts of your application.
- Data Fetching - where your data lives and how to get it.
- Rendering - when and where you render static or dynamic content.
- Integrations - what third-party services you use (CMS, auth, payments, etc) and how you connect to them.
- Infrastructure - where you deploy, store, and run your application code (Serverless, CDN, Edge, etc).
- Performance - how to optimize your application for end-users.
- Scalability - how your application adapts as your team, data, and traffic grow.
- Developer Experience - your team’s experience building and maintaining your application.

![img_alt](https://nextjs.org/static/images/learn/foundations/next-app.png)

## What is React?

React is a JavaScript library for building interactive user interfaces. By user interfaces, we mean the elements that users see and interact with on-screen. By library, we mean React provides helpful functions to build UI, but leaves it up to the developer where to use those functions in their application.

It also means, however, that building a complete React application from the ground up requires some effort. Developers need to spend time configuring tools and reinventing solutions for common application requirements.

![img_alt](https://nextjs.org/static/images/learn/foundations/user-interface.png)

### DOM

DOM is an abbreviation for Document Object Model. It represents the HTML page as a tree of elements called nodes. The document is the root node, and the child nodes form the subtree. The DOM interface lets us do operations such as the addition, modification, or removal of items from the document. Whenever any change to the DOM occurs, the browser re-renders the UI.

### Virtual DOM

A virtual DOM is a lightweight JavaScript representation of the Document Object Model (DOM) used in declarative web frameworks such as React, Vue. js, and Elm. Updating the virtual DOM is comparatively faster than updating the actual DOM (via JavaScript).

The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation.

### JSX

JSX is a JavaScript Extension Syntax that React uses to combine HTML and JavaScript easily. We usually refer it as a syntactic sugar. We employ code transpilers such as babel to translate the JSX code to the JavaScript syntax.

### React Core

The React Core contains all of the API required to define React components. It is where we’ll find methods such as createElement. It also manages state management, communication between various components, and so forth.

### React Renderer

The renderer is a component of the React framework that is in charge of rendering React components on various platforms such as the Web, Mobile, and so on.
Different platforms utilize numerous rendering approaches. For example, in web-based applications, the DOM is utilized to render the content. To alter the DOM and re-render the UI, we may use methods like appendChild() and remove() on the DOM nodes. For mobile apps, however, we require UI support straight from the operating system.

### React Reconciler

React works faster because of the reconciliation process. Reconciliation is the process through which React changes the Browser DOM. It contains the diffing mechanism, which decides which parts of the tree the renderer should update. In other words, when we make a change, React reconciler reconciles the DOM tree with the React element tree. React uses the diffing mechanism to recognize the difference between the two trees and determine which portions of the tree React should rebuild.

Because the elements are unchangeable, we cannot update their children or properties as it reflects the user interface at a certain point in time. React constructs a new DOM model with each render cycle. It computes the differences between the two and makes only the necessary adjustments to the actual DOM.

### Keys in React

Keys function similarly to a special string attribute provided in creating a List of Elements. They are essential in React since they tell us which elements in a given list have changed, been updated, or deleted.

### How React works under the hood?

The importance of the Virtual DOM becomes more prominent. When a Component’s state value changes, React calls the Component’s render() function again. Similarly, as previously, invoking render() will produce a tree of Elements. This time, though, the tree will incorporate a new Element to symbolize the new objects. React now has an old tree that describes what it currently looks like and a new tree that represents how the updated page should look. React must now compare these two trees and provide ReactDOM with instructions to sync anything that has changed, which results in adding items to the UI. This is How React works.

## Babel

Babel is a JavaScript transpiler that converts edge JavaScript into plain old ES5 JavaScript that can run in any browser (even the old ones).
It makes available all the syntactical sugar that was added to JavaScript with the new ES6 specification, including classes, fat arrows and multiline strings.
We can also optionally use it to transpile TypeScript into regular JavaScript that will run in a browser.

## What is Vercel?

Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.
Vercel enable teams to iterate quickly and develop, preview, and ship delightful user experiences. Vercel has zero-configuration support for 35+ frontend frameworks and integrates with your headless content, commerce, or database of choice. Frameworks by Vercel: Next.JS, Nuxt, etc.

## Benefits of Next.JS

- Different Rendering Techniques
- Performance
- File Based Routing
- SEO

## Rendering Techniques

### What is Rendering?

There is an unavoidable unit of work to convert the code you write in React into the HTML representation of your UI. This process is called rendering.
Rendering can take place on the server or on the client. It can happen either ahead of time at build time, or on every request at runtime.

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

- Faster Builds
- Higher Cache Hit Rate

GENERATE PAGE ON BUILD IN ADVANCE + SERVER AFTER

## Performance with Next.JS

- Code spliting - Divide you web app in small chunks so you can only load the chunk that is used by the current page.
- Minifying files - NextJS minifies the code for you
- Image optimization - Image Component in NextJS
- Pre-fetching assets
- Server less functions - Vercel Serverless Functions enable running code on-demand without needing to manage your own infrastructure, provision servers, or upgrade hardware. Serverless Functions enable developers to write functions in JavaScript and other languages to handle user authentication, form submissions, database queries, custom Slack commands, and more.

![img_alt](https://i.imgur.com/ANnqbS6.png)

## What is SEO (Search Engine Optimization?

Search engine optimization is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic rather than direct traffic or paid traffic.

- Crawling - Discover Pages
- Indexing - Find whats on the page and understand the page
- Ranking - serves highly ranked page based on users location, language and device

In simple terms, SEO means the process of improving your website to increase its visibility in Google, Microsoft Bing, and other search engines whenever people search for:

- Products you sell.
- Services you provide.
- Information on topics in which you have deep expertise and/or experience.

## Important Tags for SEO

- Semnatics - A semantic element clearly describes its meaning to both the browser and the developer.

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

- Meta Tags - meta tags are HTML tags used to provide additional information about a page to search engines and other clients. Clients process the meta tags and ignore those they don't support. meta tags are added to the <head> section of your HTML page.

- Image Alt Tag - The alt attribute provides alternative information for an image if a user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader).

## Webpack

Webpack is a module bundler. Webpack can take care of bundling alongside a separate task runner. However, the line between bundler and task runner has become blurred thanks to community-developed webpack plugins. Sometimes these plugins are used to perform tasks that are usually done outside of webpack, such as cleaning the build directory or deploying the build although you can defer these tasks outside of webpack.

Modules are reusable chunks of code built from your app’s JavaScript, node_modules, images, and the CSS styles which are packaged to be easily used in your website. Webpack separates the code based on how it is used in your app, and with this modular breakdown of responsibilities, it becomes much easier to manage, debug, verify, and test your code.

### Webpack can be broken down into these 5 principals:

- Entry - Entry is the entry point for the application
- Output - The Output point is where the files are to be written on disk with thename of the files.
- Loaders - There are 2 configuration options required to add a loader — test which identifies file or file types should be transformed and use which tells Webpack which loader to use in order to transform these files
- Plugins - Plugins handle the additional tasks that can’t be completed by a loader. This includes things such as bundle optimization, defining environment variables, etc
- Mode - Mode tells Webpack which configuration and optimizations to use for your application.

Next.js has adopted webpack 5 as the default for compilation.

## Hyderation

Hydration is the process of using client-side JavaScript to add application state and interactivity to server-rendered HTML.

## Rehyderation

This is pretty much the same thing, but is used in reference to SSR - SSR returns full html, but you still need to attach the react listeners to it.

## New Features of Next 12

### Rust Compiler

Rust Compiler to provide 5x faster builds and faster refresh, which was the previously 3x the speed. This means that the performance has increased almost twice.

![img_alt](https://miro.medium.com/v2/resize:fit:720/format:webp/1*OypkoeuaKY7SF7G3ynwdfQ.png)

### Middlewares

Middleware enables you to use code over configuration. This gives you full flexibility in Next.js because you can run code before a request is completed. Based on the user’s incoming request, you can modify the response by rewriting, redirecting, adding headers, or even streaming HTML.

![img_alt](https://miro.medium.com/v2/resize:fit:640/format:webp/1*R-p0FElvWPI69xW0C2resQ.png)

### React 18

- Concurrency - with concurrent rendering, React can interrupt, pause, resume, or abandon a render. This allows React to respond to the user interaction quickly even if it is in the middle of a heavy rendering task. Before React 18, rendering was a single, uninterrupted, synchronous transaction and once rendering started, it couldn’t be interrupted.

- Automatic Batching - Previously, state updates that happened outside of event handlers were not batched. For example, if you had a promise or were making a network call, the state updates would not be batched. React 18 introduces automatic batching which allows all state updates – even within promises, setTimeouts, and event callbacks – to be batched.

- Transitions - Transitions can be used to mark UI updates that do not need urgent resources for updating. You can mark updates as non-urgent by using startTransition. Example, Showing a visual feedback to the user is important and therefore urgent. Searching is not so urgent, and so can be marked as non-urgent.

How are transitions different from debouncing or setTimeout?

a. startTransition executes immediately, unlike setTimeout.
b. setTimeout has a guaranteed delay, whereas startTransition's delay depends on the speed of the device.
c. startTransition updates can be interrupted unlike setTimeout and won't freeze the page.
d. React can track the pending state for you when marked with startTransition.

```jsx
import { startTransition } from "react";

// Urgent: Show what was typed
setInputValue(input);

// Mark any non-urgent state updates inside as transitions
startTransition(() => {
  // Transition: Show the results
  setSearchQuery(input);
});
```

- Suspense on the server - Code splitting on the server with suspense and Streaming rendering on the server.

React 18 adds support for Suspense on server. With the help of suspense, you can wrap a slow part of your app within the Suspense component, telling React to delay the loading of the slow component. This can also be used to specify a loading state that can be shown while it's loading.

one slow component doesn’t have to slow the render of your entire app. With Suspense, you can tell React to send HTML for other components first along with the HTML for the placeholder, like a loading spinner.

This way the user can see the skeleton of the page as early as possible and see it gradually reveal more content as more pieces of HTML Arrive.

- Strict mode - Strict mode in React 18 will simulate mounting, unmounting, and re-mounting the component with a previous state. This sets the ground for reusable state in the future where React can immediately mount a previous screen by remounting trees using the same component state before unmounting.

### Smaller images using AVIF

The built-in Image Optimization API now supports AVIF images, enabling 20% smaller images compared to WebP. AVIF images can take longer to optimize compared to WebP, so we’re making this feature opt-in using the new images.formats property in next.config.js

```js
module.exports = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};
```

### Bot-Aware ISR Fallback

In Next.js 12, web crawlers (e.g. search bots) will automatically server-render ISR pages using fallback: true, while still serving the previous behavior of the fallback state to non-crawler User-Agents. This prevents crawlers from indexing loading states.

### URL Imports

URL imports allow you to use any package directly through a URL. This enables Next.js to process remote HTTP(S) resources exactly like local dependencies.

```js
module.exports = {
  experimental: {
    urlImports: ["https://cdn.skypack.dev"],
  },
};
```

Then, you can import modules directly from URLs:

```jsx
import confetti from "https://cdn.skypack.dev/canvas-confetti";
```

## New Features of Next 13

### App/Directory for File-Based Routing

Next.js 13 offers revised file routing with the new directory. The optional app directory brings a new layout structure with several additional features and improvements.

The new structure enables us to include additional files in each path directory. Also, the page.js for a route, such as

- layout.js - A system for the path & its sub-paths.
- loading.js - A system for an instant loading state using React.

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

- next/image - Less client-side JavaScript, styling and configuration, and increased accessibility are all features of the new Image component in Next.js.
- next/font - The new @next/font allows you to use Google Fonts (or any custom font) without the browser sending any queries. CSS and font files are downloaded at build time with other static assets.

- next/link - It's a new font system that offers automatic font optimization, the ability to include custom fonts & all these things with no external network queries for increased privacy and efficiency.

### NextJS Structure, Methods & Configs

### \_app

Next.js uses the App component to initialize pages. You can override it and control the page initialization and:

- Persist layouts between page changes
- Keeping state when navigating pages
- Inject additional data into pages
- Add global CSS

```jsx
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

The Component prop is the active page, so whenever you navigate between routes, Component will change to the new page. Therefore, any props you send to Component will be received by the page.

pageProps is an object with the initial props that were preloaded for your page by one of our data fetching methods, otherwise it's an empty object.

### \_\_document

A custom Document can update the <html> and <body> tags used to render a Page. This file is only rendered on the server, so event handlers like onClick cannot be used in \_document. To override the default Document, create the file pages/\_document.js.

### pages/api/

API routes provide a solution to build your API with Next.js. Any file inside the folder pages/api is mapped to /api/\* and will be treated as an API endpoint instead of a page. They are server-side only bundles and won't increase your client-side bundle size.

For example, the following API route pages/api/user.js returns a json response with a status code of 200: For an API route to work, you need to export a function as default (a.k.a request handler)

```js
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
```

### getInitialProps

getInitialProps enables server-side rendering in a page and allows you to do initial data population, it means sending the page with the data already populated from the server. This is especially useful for SEO. getInitialProps will disable Automatic Static Optimization. getInitialProps is an async function that can be added to any page as a static method.

```jsx
function Page({ stars }) {
  return <div>Next stars: {stars}</div>;
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};

export default Page;
```

### getStaticProps

Exporting a function called getStaticProps will pre-render a page at build time using the props returned from the function.

```jsx
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
```

### getStaticPaths

If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.
When you export a function called getStaticPaths (Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.

getStaticPaths allows you to control which pages are generated during the build instead of on-demand with fallback. Generating more pages during a build will cause slower builds. You can defer generating all pages on-demand by returning an empty array for paths.

```jsx
// pages/posts/[id].js

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  return {
    // Passed to the page component as props
    props: { post: {} },
  };
}

export default function Post({ post }) {
  // Render post...
}
```

### getServerSideProps

When exporting a function called getServerSideProps (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by getServerSideProps. This is useful if you want to fetch data that changes often, and have the page update to show the most current data.

### Asset Prefix

To set up a CDN, you can set up an asset prefix and configure your CDN's origin to resolve to the domain that Next.js is hosted on.
Next.js will automatically use your asset prefix for the JavaScript and CSS files it loads from the /\_next/ path (.next/static/ folder).

The exact configuration for uploading your files to a given CDN will depend on your CDN of choice. The only folder you need to host on your CDN is the contents of .next/static/, which should be uploaded as \_next/static/ as the above URL request indicates. Do not upload the rest of your .next/ folder, as you should not expose your server code and other configuration to the public.

```js
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? "https://cdn.mydomain.com" : undefined,
};
```

### Build ID

Next.js uses a constant id generated at build time to identify which version of your application is being served. This can cause problems in multi-server deployments when next build is run on every server. In order to keep a consistent build id between builds you can provide your own build id.

Open next.config.js and add the generateBuildId function:

```js
module.exports = {
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "my-build-id";
  },
};
```

## Window Navigator Object

The navigator object contains information about the browser.
The navigator object is a property of the window object.
The navigator object is accessed with:

`window.navigator or just navigator`

```
appCodeName -	Returns browser code name
appName	- Returns browser name
appVersion	- Returns browser version
cookieEnabled	- Returns true if browser cookies are enabled
geolocation	- Returns a geolocation object for the user's location
language	- Returns browser language
onLine	- Returns true if the browser is online
platform	- Returns browser platform
product	- Returns browser engine name
userAgent	- Returns browser user-agent header
```

## React Contex

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

Reducers let you consolidate a component’s state update logic. Context lets you pass information deep down to other components. You can combine reducers and context together to manage state of a complex screen.

## Symantic HTML

Semantic HTML tags are tags that define the meaning of the content they contain.
For example, tags like <header>, <article>, and <footer> are semantic HTML tags. They clearly indicate the role of the content they contain.

### Why Do I Need to Use Semantic HTML Tags?

- Accessibility - For sighted users, it’s easy to identify the various parts of a webpage. Headers, footers, and the main content are all immediately visually apparent.
- SEO - Semantic HTML tags are important for SEO (search engine optimization) because they indicate the role of the content within the tags.

## Redux

Redux is a state management library that you can use with any JS library or framework like React, Angular, or Vue.

- Redux helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.
- Centralizing your application's state and logic enables powerful capabilities like undo/redo, state persistence, and much more.
- The Redux DevTools make it easy to trace when, where, why, and how your application's state changed. Redux's architecture lets you log changes, use "time-travel debugging", and even send complete error reports to a server.
- Redux works with any UI layer, and has a large ecosystem of addons to fit your needs.

![img_alt](https://www.freecodecamp.org/news/content/images/size/w1000/2022/06/2.png)

### What Makes Redux Predictable?

State is Read-only in Redux. What makes Redux predictable is that to make a change in the state of the application, we need to dispatch an action which describes what changes we want to make in the state.
These actions are then consumed by something known as reducers, whose sole job is to accept two things (the action and the current state of the application) and return a new updated instance of the state.

Note that reducers do not change any part of the state. Rather a reducer produces a new instance of the state with all the necessary updates.

Actions can be recorded and replayed later, so this makes state management predictable. With the same actions in the same order, you're going to end up in the same state.

### Redux Store

The Redux store is the main, central bucket which stores all the states of an application. It should be considered and maintained as a single source of truth for the state of the application.

If the store is provided to the App.js (by wrapping the App component within the <Provider> </Provider> tag) as shown in the code snippet below, then all its children (children components of App.js) can also access the state of the application from the store. This makes it act as a global state.

```jsx
const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### Actions

The only way to change the state is to emit an action, which is an object describing what happened
if anyone wants to change the state of the application, then they'll need to express their intention of doing so by emitting or dispatching an action.

### Reducers

Reducers, as the name suggests, take in two things: previous state and an action. Then they reduce it (read it return) to one entity: the new updated instance of state.
So reducers are basically pure JS functions which take in the previous state and an action and return the newly updated state.

## API and REST

Representational State Transfer (REST) is an architectural style that defines a set of constraints to be used for creating web services. REST API is a way of accessing web services in a simple and flexible way without having any processing. It’s used to fetch or give some information from a web service. All communication done via REST API uses only HTTP request.

_Working_: A request is sent from client to server in the form of a web URL as HTTP GET or POST or PUT or DELETE request. After that, a response comes back from the server in the form of a resource which can be anything like HTML, XML, Image, or JSON. But now JSON is the most popular format being used in Web Services.

In HTTP there are five methods that are commonly used in a REST-based Architecture i.e., POST, GET, PUT (Updating), PATCH (Modifying), and DELETE. These correspond to create, read, update, and delete (or CRUD) operations respectively.

_Idempotence_: An idempotent HTTP method is a HTTP method that can be called many times without different outcomes. It would not matter if the method is called only once, or ten times over. The result should be the same. Again, this only applies to the result, not the resource itself.

- API - APIs (Application Programming Interface) act as an interface between two applications to interact and provide the relevant data. It uses a set of protocols using which the operation is done. Salesforce was the first organization to officially launch API, followed by eBay and Amazon.

- RESTful - Restful API is a standardized implementation of the REST architecture, which makes it easier for developers to build and maintain web services. RESTful API provides a uniform interface for accessing resources, which simplifies the development process.

## CORS

Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.

- Preflight - CORS also relies on a mechanism by which browsers make a "preflight" request to the server hosting the cross-origin resource, in order to check that the server will permit the actual request.

For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, XMLHttpRequest and the Fetch API follow the same-origin policy. This means that a web application using those APIs can only request resources from the same origin the application was loaded from unless the response from other origins includes the right CORS headers.

## Service Worker API

A service worker is a script that runs independently in the browser background. On the user side, it can intercept its network requests and decide what to load (fetch).
Service workers mainly serve features like background sync, push notifications and they are commonly used for’offline first’ applications, giving the developers the opportunity to take complete control over the user experience.

The service worker lifecycle is completely separate from the web page. It’s a programmable network proxy, which is terminated when it’s not used and restarted when it’s next needed.

During installation, the service worker can cache some static assets like web pages. If the browser cache the files successfully, the service worker gets installed.

Afterward, the worker needs to be activated. During activation the service worker can manage and decide what to happen to the old caches, typically they are being deleted and replaced with the new versions.

- Registration:

```js
// Ensure that the browser supports the service worker API
if (navigator.serviceWorker) {
  // Start registration process on every page load
  window.addEventListener("load", () => {
    navigator.serviceWorker
      // The register function takes as argument
      // the file path to the worker's file
      .register("/service_worker.js")
      // Gives us registration object
      .then((reg) => console.log("Service Worker Registered"))
      .catch((swErr) =>
        console.log(`Service Worker Installation Error: ${swErr}}`)
      );
  });
}
```

- Installing:

```js
var cacheName = "geeks-cache-v1";
var cacheAssets = [
  "/assets/pages/offline-page.html",
  "/assets/styles/offline-page.css",
  "/assets/script/offline-page.js",
];

// Call install Event
self.addEventListener("install", (e) => {
  // Wait until promise is finished
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log(`Service Worker: Caching Files: ${cache}`);
      cache
        .addAll(cacheAssets)
        // When everything is set
        .then(() => self.skipWaiting());
    })
  );
});
```

- Activating:

```js
// Call Activate Event
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  // Clean up old caches by looping through all of the
  // caches and deleting any old caches or caches that
  // are not defined in the list
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
```

## SWR

SWR (stale-while-revalidate) is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.

```jsx
import useSWR from 'swr'

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}`
```

- Fast, lightweight and reusable data fetching
- Built-in cache and request deduplication
- Real-time experience
- Transport and protocol agnostic
- SSR / ISR / SSG support
- TypeScript ready
- React Native

## CSS

### Grid Layout

The CSS Grid Layout Module offers a grid-based layout system, with rows and columns, making it easier to design web pages without having to use floats and positioning.

An HTML element becomes a grid container when its display property is set to grid or inline-grid.

```.grid-container {
  display: grid;
}
```

## CI/CD

- CI or Continuous Integration is the practice of automating the integration of code changes from multiple developers into a single codebase. It is a software development practice where the developers commit their work frequently into the central code repository (Github or Stash). Then there are automated tools that build the newly committed code and do a code review, etc as required upon integration.

The key goals of Continuous Integration are to find and address bugs quicker, make the process of integrating code across a team of developers easier, improve software quality and reduce the time it takes to release new feature updates. Some popular CI tools are Jenkins, TeamCity, and Bamboo.

- CD or Continuous Delivery is carried out after Continuous Integration to make sure that we can release new changes to our customers quickly in an error-free way. This includes running integration and regression tests in the staging area (similar to the production environment) so that the final release is not broken in production.

Continuous Delivery automates the entire software release process. The final decision to deploy to a live production environment can be triggered by the developer/project lead as required. Some popular CD tools are AWS CodeDeploy, Jenkins, and GitLab.

![img_alt](https://media.geeksforgeeks.org/wp-content/uploads/20201103135931/CICD.PNG)

## Lighthouse

Lighthouse is an open-source, automated tool for improving the quality of web pages. You can run it against any web page, public or requiring authentication. It has audits for performance, accessibility, progressive web apps, SEO, and more.

You can run Lighthouse in Chrome DevTools, from the command line, or as a Node module. You give Lighthouse a URL to audit, it runs a series of audits against the page, and then it generates a report on how well the page did.

![img_alt](https://wd.imgix.net/image/MtjnObpuceYe3ijODN3a79WrxLU2/IYRw9kB2rqEsnAj48IJ9.png?auto=format&w=1252)

### Box Model

CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content.

## Monorepo

A monorepo is a version-controlled code repository that holds many projects. While these projects may be related, they are often logically independent and run by different teams.

When teams build several different applications, dozens of “micro-frontends” aka features and experiences, and hundreds of smaller components — the traditional repo architecture won’t do.

Problems like code-sharing begin to rise, as different applications need to consume and use the same components, features, or even each other.

Monorepos are sometimes called monolithic repositories, but they should not be confused with monolithic architecture, which is a software development practice for writing self-contained applications. An example of this is a Ruby on Rails monolith handling websites, API endpoints, and background jobs.

![img_alt](https://wpblog.semaphoreci.com/wp-content/uploads/2022/06/02-multi-to-mono-1056x934-1.jpeg)

### Lerna

Lerna is a fast, modern build system for managing and publishing multiple JavaScript/TypeScript packages from the same repository.

Lerna is now maintained by the NX team, but was originally created by the developers of BabelJS. It was built as a rather simple tool for managing repositories with multiple packages, so you can version and publish each package separately. It provides useful automation for that purpose.

## Intersection Observer API

Intersection Observer is a web-based API that enables developers to detect when a specific element intersects with another element or the viewport.
You can use this API to monitor any changes in the visibility of an element as it intersects with another element, or exits / enters the viewport.

### Scroll Animations

It's worth mentioning that although using the Intersection Observer for scroll animations is effective, there are newer approaches to implementing reveal-on-scroll animations in React. These approaches include the use of animation libraries such as Framer Motion and GSAP.

- https://www.framer.com/motion/
- https://greensock.com/gsap/

## Difference bwteen GraphQL, REST and gRPC

https://dev.to/somadevtoo/difference-between-graphql-rest-and-grpc-58bl

## React Query

React Query is a powerful library developed by TanStack that simplifies data fetching and state management in React applications. It provides a straightforward way to manage remote data and keep it in sync with the UI.
React Query is a JavaScript library designed to simplify the complex task of data fetching and caching in React applications. It offers a set of hooks and utilities that enable you to manage data from various sources, including REST APIs, GraphQL, or even local state, effortlessly.

Key Features:

- Declarative Data Fetching: React Query promotes a declarative approach to data fetching. You define queries and mutations using hooks like useQuery and useMutation. This leads to cleaner and more organized code.
- Automatic Caching: React Query includes a built-in cache that stores query results. It automatically updates data when mutations occur, ensuring your UI remains consistent.
- Background Data Sync: It can automatically refetch data in the background, keeping your data fresh without manual intervention.
- Pagination and Infinite Scrolling: React Query provides utilities for handling pagination and infinite scrolling effortlessly.
- Optimistic Updates: You can implement optimistic updates with ease, making your app feel more responsive.

Website - https://tanstack.com/query/latest
