A Comprehensive Developer's Guide to the Lynx Framework


An Architectural Overview of the Lynx Framework

This section establishes the foundational principles of the Lynx framework, detailing its origins, core architecture, and positioning within the competitive landscape of cross-platform development. It explains the technical rationale behind its creation and the specific problems it is engineered to solve.

Defining Lynx: A Performance-First, Web-Inspired Cross-Platform Solution

Lynx is an open-source, cross-platform UI framework developed and battle-tested by ByteDance. It empowers developers to build native applications for Android, iOS, and the Web using familiar web technologies, primarily React and CSS.1 Before its public open-sourcing on March 5, 2025, Lynx was extensively used within high-traffic features of the TikTok ecosystem, including the Search panel, TikTok Shop, and the entire TikTok Studio application, validating its performance and scalability in a demanding production environment.1
The framework's primary objective is to address persistent challenges in cross-platform development, specifically performance bottlenecks, the complexities of styling for native platforms, and the maturity of the development ecosystem. It aims to deliver native-quality applications from a single, unified codebase, thereby streamlining development and maintenance.1
It is crucial to distinguish ByteDance's Lynx UI framework from other software projects sharing the same name. This guide exclusively covers the cross-platform UI framework available under the lynx-family GitHub organization.6 It is unrelated to the Lynx C++ server framework 7, the Luau-based web framework 8, the NodeJS framework 9, or the Lynx Large Language Model (LLM) project.10

The Core Differentiator: The Dual-Threaded Architecture Explained

The most significant and defining architectural feature of Lynx is its dual-threaded model. This design fundamentally separates the concerns of UI rendering and high-priority user interactions from the application's business logic and other computationally intensive tasks.1 This separation is not merely an optimization but the core principle from which Lynx's performance advantages are derived. While traditional single-threaded JavaScript frameworks often suffer from UI lag when the main thread is busy with heavy logic, Lynx avoids this bottleneck by design.
Main (UI) Thread: This thread is exclusively responsible for rendering the user interface, handling animations, and processing gestures. To ensure maximum responsiveness and prevent UI stutter, it operates on PrimJS, a custom, lightweight JavaScript engine. This dedicated focus keeps the UI fluid and interactive at all times.1
Background Thread: This thread manages the bulk of the application's logic. This includes the execution of React component lifecycles, data fetching from remote servers, state management, and any other heavy computations. By offloading these tasks from the UI thread, Lynx ensures that complex background processes do not degrade the user experience.2
This architectural separation enables two critical performance features that define the Lynx user experience:
Instant First-Frame Rendering (IFR): Lynx prioritizes the synchronous rendering of the initial UI on the main thread. This eliminates the common "white screen" flash seen during application startup, creating the perception of an immediate and responsive launch.2
Main-Thread Scripting (MTS): The framework allows developers to designate small, critical pieces of interaction code (such as gesture handlers) to run directly on the main thread. This ensures that user interactions feel instantaneous and "buttery-smooth," regardless of any heavy processing occurring on the background thread.2

Under the Hood: PrimJS, Rust-Based Tooling, and Native Rendering

Several key technologies underpin Lynx's architecture and contribute to its performance profile:
PrimJS Engine: A custom JavaScript engine forked from QuickJS and optimized specifically for Lynx's main thread. Its design prioritizes a fast startup time and efficient garbage collection, making it ideal for managing the highly responsive UI thread.1
Rust-Based Toolchain: Lynx leverages the performance and memory safety of Rust for its core engine and build tooling. The most prominent tool is Rspeedy, a build system based on the Rspack bundler, which provides exceptionally high-speed code bundling and compilation.1
Native Rendering: Unlike web views that render HTML DOM elements, Lynx components such as <view> and <text> are abstract representations that map directly to the target platform's native UI primitives. For example, a <view> becomes a UIView on iOS and a ViewGroup on Android. This approach ensures that the final application has the true look, feel, and performance of a native application.1

Comparative Analysis: Lynx vs. React Native

To contextualize Lynx's offerings, a direct comparison with React Native, the most established framework in this domain, is instructive. The following table highlights the key architectural and philosophical differences. This comparison reveals a deliberate strategy by Lynx to target specific pain points in the React Native developer experience, particularly around styling and performance architecture. By embracing standard CSS, Lynx significantly lowers the barrier to entry for the large community of web developers who find React Native's StyleSheet API to be a point of friction.

Feature
Lynx
React Native
Architecture
Inherently dual-threaded, separating UI and logic.
Primarily single-threaded, with newer architectures (Fabric) aiming to mitigate bottlenecks.
Styling
True CSS support: external .css files, selectors, animations, transitions, and variables.1
JavaScript-based styling via the StyleSheet API; lacks native CSS support.1
Performance
Avoids UI blocking by design through thread separation; enables IFR and MTS.2
Relies on optimizations like the Hermes engine and the Fabric renderer to improve performance over the traditional JS bridge.11
Tooling
Rust-based Rspeedy (built on Rspack) for fast bundling.15
Metro Bundler is the default.
Framework Support
Designed to be framework-agnostic, with official support for React (ReactLynx) and internal use of Vue and Svelte.1
Tightly coupled with the React library.
Ecosystem
Nascent and small, with a limited number of third-party libraries and community resources.1
Mature and extensive, with a vast ecosystem of libraries, tools, and community support.


Setting Up Your Development Environment

This section provides a practical, step-by-step guide for establishing a complete Lynx development environment, from installing prerequisites to running a live-reloading application in the Lynx Explorer sandbox.

System Prerequisites and Toolchain Installation

Before creating a Lynx project, certain system requirements must be met to ensure a smooth development experience.
Node.js: A recent version of Node.js is mandatory. The minimum requirement is version 18 or later. If using TypeScript for project configuration files, a more specific version of Node.js 18.19 or higher is necessary.15
Operating System: The officially recommended and supported development environment is macOS. While development on Windows and Linux is possible, it is not yet fully verified by the Lynx team, and developers may encounter platform-specific issues.1
Platform SDKs: For targeting specific platforms, their respective SDKs are required. iOS development necessitates the installation of Xcode, while Android development requires the Android SDK.15
Installation Command: Project initialization is handled by create-rspeedy, a command-line tool that leverages the Rust-powered Rspack bundler. The standard command to scaffold a new project is npm create rspeedy@latest.15

Project Initialization with Rspeedy

Executing the npm create rspeedy@latest command initiates an interactive setup process in the terminal. This wizard guides the developer through the initial project configuration:

Bash


npm create rspeedy@latest


Project Name: You will be prompted to enter a name for your project directory.
Language Selection: You can choose between TypeScript and JavaScript. TypeScript is the recommended option for its benefits of static type checking and improved editor support.20
Additional Tools: The setup allows for the optional inclusion of code formatters and linters, such as Biome.21
Upon completion, this process generates a new project directory with a standard file structure, including a src/ directory containing the main application component (App.tsx) and a lynx.config.ts file for build configurations.15

Configuring the Lynx Explorer Sandbox

Lynx Explorer is an essential development tool. It is a pre-built sandbox application that allows developers to quickly load, view, and interact with their Lynx app without the overhead of compiling a full native application shell for every change.18
iOS Setup:
Install Xcode: Ensure Xcode is installed and up-to-date from the Mac App Store.
Download Lynx Explorer: From the official Lynx GitHub releases page, download the appropriate pre-built binary for your Mac's architecture (LynxExplorer-arm64.app.tar.gz for Apple Silicon or LynxExplorer-x86_64.app.tar.gz for Intel).
Extract and Install: Extract the downloaded archive. Launch an iOS Simulator from within Xcode (Xcode > Open Developer Tool > Simulator). Finally, drag the extracted .app file directly into the simulator window to install it.18 For convenience, community-contributed versions of Lynx Explorer are also available on the App Store.22
Android Setup:
Download Lynx Explorer: The quickest way to get the Android version is to scan the QR code on the Lynx official website, which links to the latest LynxExplorer.apk on GitHub Releases.
Install APK: Install the downloaded APK onto a physical Android device or an Android emulator.18 A community-published version is also available on the Google Play Store.18
HarmonyOS Setup:
Install DevEco Studio: Download and install the official HarmonyOS IDE.
Download Lynx Explorer: Obtain the pre-built lynx_explorer-default-unsigned.hap file from the official releases.
Install on Simulator: Use the HarmonyOS Device Controller (hdc) command-line tool to install the application: hdc install lynx_explorer-default-unsigned.hap.18

Running and Live-Reloading Your First Application

With the environment and sandbox app configured, launching the development server is straightforward.
Navigate and Install Dependencies: Open a terminal, change the directory to your newly created project (cd <project-name>), and run npm install to download all required packages.18
Start the Development Server: Execute the command npm run dev. This will start the Rspeedy development server, which bundles the application and makes it available on your local network. A QR code will be displayed in the terminal.15
Connect Lynx Explorer: Open the Lynx Explorer app on your target device or simulator. Use its built-in scanner to scan the QR code from your terminal. Alternatively, you can copy the bundle URL printed in the terminal and paste it into the "Enter Card URL" input field within the app.18
Experience Live Reloading: The application will load and display within Lynx Explorer. Now, if you open the project in a code editor and modify a source file, such as src/App.tsx, the changes will be automatically reflected in the running app. This fast hot-reloading capability is a key feature of the Rspeedy toolchain and significantly speeds up the development cycle.1

Building User Interfaces with ReactLynx

This section delves into the practical aspects of UI construction using ReactLynx, the official React-based framework for Lynx. It covers the core building blocks, their relationship to native platform components, and the principles of composing them into complex and reusable interfaces.

Introduction to ReactLynx: The React Paradigm on Lynx

ReactLynx serves as the bridge that allows developers to leverage their existing React knowledge to build native Lynx applications. It is an idiomatic implementation of React, built upon the lightweight Preact library, and supports the familiar concepts of JSX, Hooks (e.g., useState, useEffect), and the Context API.1 While the mental model is consistent with React, developers must be aware of several key distinctions when moving from web development to ReactLynx.
Component Imports: Hooks and other React APIs are imported from the @lynx-js/react package instead of the standard react package.14
UI Component Set: ReactLynx does not use standard HTML DOM elements. Instead, it provides a specific set of native-mapped components like <view>, <text>, and <image> which serve as the fundamental UI building blocks.26
Event Naming Convention: Event handlers use a different naming scheme. For example, a click or tap event is handled with the bindtap attribute, not onClick.15
Absence of Browser Globals: The window and document objects, which are central to web development, are not available in the Lynx runtime. For functionality that would typically rely on these objects, Lynx provides alternative APIs under a global lynx object, such as lynx.reload() to refresh the page.26
Here is a basic example of a ReactLynx component that demonstrates these concepts:

TypeScript


// src/App.tsx
import { useState, useCallback } from '@lynx-js/react';
import './App.css';

export function App() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    // 'background only' directive ensures this logic runs on the background thread
    'background only';
    setCount(currentCount => currentCount + 1);
  },);

  return (
    <view className="container">
      <text className="title">Counter App</text>
      <text className="count-display">You clicked {count} times</text>
      <view className="button" bindtap={increment}>
        <text className="button-text">Click me</text>
      </view>
    </view>
  );
}



Core UI Elements: A Deep Dive into , , , and More

The foundation of any Lynx UI is its set of built-in elements. These are not HTML tags but rather abstract descriptors that the Lynx engine parses and translates into the corresponding native UI components for each target platform. This process forms an "element tree" that represents the rendered UI.17 Understanding this mapping is crucial for reasoning about application behavior and performance across different platforms.
The following table provides a clear translation of the primary Lynx elements to their native platform equivalents and their closest web analogies. This mapping helps demystify the rendering process, allowing developers from both web and native backgrounds to quickly build an accurate mental model of how their Lynx code translates into a tangible user interface.

Lynx Element
Android Equivalent
iOS Equivalent
Web Analogy
Description
<view>
ViewGroup
UIView
Non-scrollable <div>
The fundamental container for layout and grouping other elements.17
<text>
TextView
UITextView
<p> or <span>
Used for displaying styled text content.17
<image>
ImageView
UIImageView
<img>
Renders images from local or remote sources.17
<scroll-view>
ScrollView
UIScrollView
<div> with overflow:scroll
A basic container for content that needs to be scrollable.17
<list>
RecyclerView
UICollectionView
None
A high-performance, virtualized list for displaying large datasets efficiently through view reuse.17
<page>
ViewRootImpl
UIViewController.view
Non-resizable <body>
The root element of a Lynx page, typically managed by the framework.17


Composing Complex UIs with Scrollable and List Views

For interfaces that contain more content than can fit on a single screen, Lynx provides two primary elements for managing scrollable content.
<scroll-view>: This element serves as a general-purpose scrollable container. It is suitable for wrapping content of a determinate size that needs to be scrollable either horizontally or vertically. It is the direct equivalent of native scroll views on iOS and Android.17
<list>: For displaying long, dynamic lists of data, the <list> element is the superior choice. It is a high-performance component that implements view virtualization, similar to Android's RecyclerView and iOS's UICollectionView. This means it only renders the items currently visible on screen (plus a small buffer), and it reuses element instances as the user scrolls. This technique dramatically reduces memory consumption and ensures smooth scrolling performance, even with thousands of items.17 The official tutorial on building an image gallery provides a practical example of using
<list> with a waterfall layout to display a large number of images efficiently.28

Creating Reusable Components

In line with the React development paradigm, building complex UIs in Lynx is achieved by composing smaller, independent, and reusable components. This modular approach improves maintainability and code organization.
Component-Based Architecture: Developers define components as JavaScript functions that accept props (properties) and return JSX describing the UI. This allows for the creation of custom UI elements with encapsulated logic and styling.15
Stateful and Stateless Components: Lynx fully supports the creation of both stateless (presentational) components, which simply render UI based on the props they receive, and stateful components, which manage their own internal state using React hooks like useState and handle side effects with useEffect.15
Here is an example of a reusable Button component:

TypeScript


// src/components/Button.tsx
import './Button.css';

export function Button({ text, onTap }) {
  return (
    <view className="custom-button" bindtap={onTap}>
      <text className="custom-button-text">{text}</text>
    </view>
  );
}



CSS


/* src/components/Button.css */
.custom-button {
  padding: 10px 20px;
  background: #ff6448;
  border-radius: 10px;
  text-align: center;
}
.custom-button-text {
  color: white;
}



Mastering Layout and Styling in Lynx

One of the most compelling features of Lynx for web developers is its direct and comprehensive support for web-standard CSS. This section details how to leverage this capability to style native components and create complex, responsive layouts.

Leveraging True CSS for Native Components

Lynx's approach to styling represents a significant departure from other frameworks like React Native. Instead of requiring a JavaScript-based styling abstraction, it provides first-class support for CSS, making the transition for web developers nearly seamless.
The Core Advantage: Developers can write standard CSS in external .css files and apply it to native components. This includes support for complex selectors, CSS variables for theming, visual effects like gradients and shadows, and full animation capabilities. This stands in stark contrast to React Native's StyleSheet API, which uses JavaScript objects to define styles.1
Application Methods: Styles are applied to elements using the className attribute, which links to classes defined in an imported stylesheet. Inline styles are also supported via the style attribute, which accepts a JavaScript object, similar to React for the web.17 The build system also supports advanced features like Sass-style nesting syntax directly in CSS files.29
Lynx-Specific Properties: To handle platform-specific styling requirements that do not have a direct CSS equivalent, Lynx introduces a set of custom properties prefixed with -x-. An example is -x-handle-color, which allows for the customization of the color of text selection handles on mobile devices.29
Here is an example of applying styles using both a global CSS file and inline styles:

TypeScript


// src/index.tsx
import { root } from "@lynx-js/react";
import "./index.css"; // Import global stylesheet

function App() {
  return (
    <view 
      className="bg-gradient"
      style={{ 
        flexDirection: "column", 
        width: "150px", 
        height: "150px" 
      }}
    >
      <text className="title-text">Hello Lynx!</text>
    </view>
  );
}
root.render(<App />);



CSS


/* src/index.css */
.bg-gradient {
  background: radial-gradient(circle at top left, rgb(255, 53, 26), rgb(0, 235, 235));
}
.title-text {
  color: white;
  font-size: 20px;
}



A Guide to Lynx's Layout Systems

Lynx offers a flexible and powerful set of layout systems, allowing developers to choose the best model for their specific UI needs. The layout behavior of a container is controlled by its CSS display property, which can be set to one of several values.30
Linear Layout (display: linear): This is Lynx's default layout mode, inspired by Android's LinearLayout. It arranges child elements sequentially in a single direction, either vertically (column) or horizontally (row). It is simple and efficient for basic, ordered layouts.30
Flexible Box Layout (display: flex): Lynx provides a full implementation of Flexbox that is consistent with the web standard. This is a powerful, one-dimensional layout model for distributing space and aligning items within a container, and it is a familiar tool for any modern web developer.1
Grid Layout (display: grid): For more complex, two-dimensional layouts, Lynx supports CSS Grid Layout. This allows for the creation of sophisticated grid-based UIs, again with behavior consistent with the web standard.1
Relative Layout (display: relative): Inspired by Android's RelativeLayout, this system enables developers to position elements in relation to each other or to their parent container (e.g., align one element to the right edge of another). This can be useful for complex, non-linear arrangements.30

Styling Strategies: From Global CSS and Modules to Sass and Tailwind CSS

The Rspeedy build tool provides robust support for a variety of modern styling workflows, giving teams the flexibility to choose the approach that best fits their project.
Global CSS: Standard .css files can be imported into an application's entry point to apply styles globally across all components.32
CSS Modules: To ensure style encapsulation and avoid class name collisions in large applications, files that follow the [name].module.css naming convention are automatically treated as CSS Modules. When imported, their class names are programmatically scoped to be unique, preventing unintended style overrides.32
CSS Pre-processors: Rspeedy supports popular pre-processors like Sass, Less, and Stylus through optional plugins. This allows developers to use advanced CSS features such as variables, mixins, and nested rules to write more maintainable and organized stylesheets.32
PostCSS: The build process includes PostCSS, a tool for transforming CSS with JavaScript plugins. This enables automated transformations, such as converting pixel units to viewport-relative units (postcss-px-to-viewport) for better responsiveness.32
Tailwind CSS: For developers who prefer the utility-first CSS methodology, an official preset (@lynx-js/tailwind-preset) is available to integrate Tailwind CSS into a Lynx project. The documentation notes that this integration is still experimental and may not be fully stable.32

Implementing Animations and Transitions with CSS

A significant benefit of Lynx's native CSS support is the ability to create performant animations and transitions declaratively. Developers can use standard CSS properties like transition and define complex animation sequences with @keyframes rules. Because these animations are defined in CSS, the Lynx engine can often run them entirely on the main UI thread, resulting in smoother performance compared to JavaScript-driven animation libraries that can be subject to background thread workloads.1 The freeCodeCamp tutorial provides a practical demonstration of implementing CSS animations within a Lynx application.34

Managing State and Handling Data

This section addresses the application's logic layer, covering how to manage internal component state, shared application state, and data fetched from external APIs.

Client-Side State Management with React Hooks and Zustand

Lynx fully embraces the modern React ecosystem's approach to state management, providing support for both local and global state.
Local Component State: For state that is confined to a single component, the standard React hooks useState and useEffect are the primary tools. useState is used to declare and update state variables that trigger re-renders, while useEffect is used to handle side effects like data fetching or subscriptions in response to state changes.15
Global Application State with Zustand: When state needs to be accessed and updated by multiple, disparate components across the application, a global state management solution is required. The official Lynx documentation provides a clear example of how to integrate Zustand, a popular and minimalistic state management library. Zustand's hook-based API provides a simple and scalable way to create a shared state store without the boilerplate of more complex solutions.36
Here is an example of creating and using a Zustand store:

TypeScript


// src/store.ts
import { create } from 'zustand';

type State = {
  count: number;
};

type Action = {
  increment: () => void;
};

export const useStore = create<State & Action>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// src/App.tsx
import { useStore } from './store';

export function App() {
  const { count, increment } = useStore();

  return (
    <view bindtap={increment}>
      <text>Global count: {count}</text>
    </view>
  );
}



Server-State Management: Efficient Data Fetching with TanStack Query

Managing the lifecycle of data fetched from a server—including caching, re-fetching, and synchronization—is a complex task. For this purpose, Lynx officially recommends and documents the use of TanStack Query (formerly known as React Query).
Data Fetching and Caching: TanStack Query is a powerful library that simplifies the process of fetching, caching, and updating server state. It handles complex concerns like background refetching, stale-while-revalidate strategies, and request deduplication out of the box.35
Implementation: The library is used through its custom hooks. The useQuery hook is used to fetch and subscribe to data, while the useMutation hook is used to perform actions that modify data on the server (e.g., POST, PUT, DELETE requests). TanStack Query also supports advanced UI patterns like optimistic updates, where the UI is updated immediately in anticipation of a successful server response, providing a faster perceived experience for the user.37 A comprehensive video tutorial from freeCodeCamp walks through the entire process of setting up TanStack Query to fetch game data from the IGDB API.34
Here is a basic example of using useQuery with TanStack Query:

TypeScript


// api.ts
export async function fetchPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

// PostsList.tsx
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './api';

function PostsList() {
  const { data, error, isLoading } = useQuery({ 
    queryKey: ['posts'], 
    queryFn: fetchPosts 
  });

  if (isLoading) return <text>Loading...</text>;
  if (error) return <text>Error: {error.message}</text>;

  return (
    <list>
      {data.map(post => (
        <text key={post.id}>{post.title}</text>
      ))}
    </list>
  );
}



Making Network Requests with the Native Fetch API

For direct network communication, Lynx provides a built-in fetch API that is largely compatible with the web standard Fetch API.
Built-in API: The fetch function is available globally and returns a Promise, making it easy to work with asynchronous operations. It can be used to make requests to remote URLs for REST APIs or other resources.37
Usage: The API supports standard HTTP requests, allowing developers to specify the method (e.g., POST), add custom headers, and include a request body, such as a JSON payload. The modern async/await syntax provides a clean and readable way to handle these asynchronous requests.38
Compatibility Note: While the API is designed to be familiar, the official documentation cautions that there are subtle differences between Lynx's implementation and the browser's Fetch API. This means that some third-party networking libraries built for the web may require minor adaptations to work correctly in the Lynx environment.38
Example of a POST request using fetch:

TypeScript


const postData = async (url = '', data = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

postData('https://jsonplaceholder.typicode.com/posts', {
  title: 'foo',
  body: 'bar',
  userId: 1,
});



Implementing User Interaction and Navigation

This section focuses on how to capture user input, manage the flow of events through the application, and enable navigation between different screens or views.

The Lynx Event Model: Handling User Input Across Two Threads

Lynx's event handling system is designed to be intuitive for web developers while being fully integrated with its unique dual-threaded architecture.39
Event Handlers: User interactions, such as taps, are bound to elements using specific attributes. The most common is bindtap, which corresponds to a click or tap event. The function provided to this attribute serves as the event handler.15
Dual-Thread Execution: By default, event handler functions are executed on the background thread. This is suitable for logic that does not require immediate UI feedback. However, for interactions where instantaneous visual response is critical (e.g., a button's press state), the latency of cross-thread communication can be noticeable. To solve this, Lynx allows handlers to be run directly on the main UI thread.39
Main-Thread Handlers: To execute an event handler on the main thread, two things are required:
The event attribute must be prefixed with main-thread:, for example, main-thread:bindtap.
The handler function itself must begin with the string literal directive "main thread";.39 This static marker allows the compiler to place the function in the correct JavaScript bundle for main-thread execution.
Event Object: The handler function receives an event object as its argument. This object contains contextual information about the event, such as its type, a timestamp, and references to the target (the element that originated the event) and currentTarget (the element the listener is attached to).41 The structure and capabilities of this object differ slightly depending on whether the handler is running on the main or background thread.39

Understanding Event Propagation: Bubbling, Capturing, and Interception

Similar to the web's DOM event model, events in Lynx propagate through the element tree, allowing for sophisticated event handling strategies. The propagation occurs in two phases:
Capture Phase: The event travels from the root of the element tree down to the target element.
Bubbling Phase: The event travels back up from the target element to the root.
Developers can control when and how they listen to these events using different prefixes on the event handler attribute. A clear understanding of these prefixes is essential for implementing correct event logic and preventing common bugs.

Property Prefix
Phase
Behavior
bind...
Bubbling
Listens to the event during the bubbling phase without stopping its propagation.39
catch...
Bubbling
Listens to the event during the bubbling phase and stops its propagation, preventing parent elements from receiving it.39
capture-bind...
Capture
Listens to the event during the capture phase without stopping its propagation.39
capture-catch...
Capture
Listens to the event during the capture phase and stops all further propagation (both capture and bubbling).39


Implementing Application Routing with TanStack Router

For navigating between different screens in a single-page application (SPA) architecture, Lynx's official documentation provides a comprehensive guide for using TanStack Router.
Recommended Solution: TanStack Router is the suggested library for handling client-side navigation within a ReactLynx application.42
Setup and Configuration: The setup process involves several steps:
Install the necessary packages: @tanstack/react-router and url-search-params-polyfill.
In the lynx.config.ts file, enable the TanStack Router Rspack plugin.
Configure a source alias to point react to @lynx-js/react/compat. This compatibility layer provides certain React 18 APIs that TanStack Router depends on.42
Memory-Based Routing: The Lynx runtime environment does not have a browser History API. Consequently, routing must be configured to use memory-based history. This is achieved by creating an instance of createMemoryHistory and passing it to the router setup.42
File-Based Routing: A key feature of TanStack Router is its support for file-based routing. By structuring components within a src/routes directory, the application's routes are automatically generated by the build plugin, simplifying route management.42
Alternative Router: React Router version 6 is also a viable option. However, the documentation notes that native-like components such as <Link> and <NavLink> are not available. Navigation must be handled programmatically by using the useNavigate hook.44

Direct Element Manipulation for Complex Interactions

While declarative UI updates are the standard paradigm, there are scenarios where direct, imperative manipulation of an element is necessary, such as controlling a media player or triggering a custom animation.
Accessing Elements with Refs: Lynx provides a ref mechanism similar to React's for obtaining a direct reference to an element instance.
Background Thread: Using the useRef hook, a developer can create a reference and attach it to an element. This reference object exposes an .invoke() method, which can be used to call native methods on the underlying element asynchronously.45
Main Thread: For interactions requiring lower latency, the useMainThreadRef hook combined with the main-thread:ref attribute provides a direct, synchronous reference to the element object on the main thread. This allows for immediate method calls from within a main-thread script, avoiding the delay of cross-thread communication.45

The Dual-Thread Architecture in Practice

Effectively utilizing Lynx's dual-threaded architecture requires a shift in thinking from traditional single-threaded JavaScript development. This section provides practical guidance on how to leverage this architecture for maximum performance and responsiveness.

Identifying Main Thread vs. Background Thread Tasks

The fundamental rule is to keep the main thread as free as possible to handle UI rendering and user input.
Background-Only Code: Any code that is not directly and immediately manipulating the UI should be considered "background only." The official documentation explicitly categorizes the following as background-only tasks:
Event handlers (by default).
React side effects (code within useEffect).
Network requests, timers, and data processing logic.12
Main-Thread Code: Code should only be run on the main thread when it is essential for providing immediate, high-fidelity user feedback. Prime candidates for main-thread execution include:
Handling button press animations or visual state changes.
Processing continuous gestures like dragging or swiping where visual updates must be perfectly synchronized with user input.2

Achieving Silky-Smooth Interactions with Main-Thread Scripting (MTS)

Main-Thread Scripting (MTS) is the mechanism that allows developers to execute specific functions on the UI thread. Its purpose is to eliminate the perceptible delay that can occur when an event on the main thread has to send a message to the background thread and wait for a UI update instruction in return.14
To implement MTS, a function must be explicitly marked as a main-thread script by placing the string literal "main thread"; as the very first line of its body. This is a static directive that the Rspeedy compiler recognizes during the build process, ensuring the function is bundled for main-thread execution.12

Practical Use of 'main thread' and 'background only' Directives

These two directives are crucial for communicating intent to the Lynx compiler and ensuring code runs in the correct context.
"main thread";: This directive is used inside a function that will handle a main-thread: prefixed event or be passed to a main-thread:ref. It guarantees the function's execution on the UI thread, providing the lowest possible latency for user interactions.40
TypeScript
import { MainThread } from "@lynx-js/types";

function App() {
  const color = 'blue';

  function handleTap(event: MainThread.TouchEvent) {
    'main thread'; // Directive for main thread execution
    event.currentTarget.setStyleProperty('background-color', color);
  }

  return (
    <view main-thread:bindtap={handleTap}>
      <text>Tap me to change color!</text>
    </view>
  );
}


"background only";: This directive is used to explicitly mark a function as safe to run only on the background thread. This is particularly important when passing event handlers as props down to child components. Without this directive, the compiler might not be able to determine that the function contains background-only APIs (like network requests) and could incorrectly include it in the main-thread bundle, leading to runtime errors.12
TypeScript
function MyButton({ onClick }) {
  return <view bindtap={onClick} />;
}

function App() {
  function handleTap() {
    'background only'; // Necessary when passing event handlers as props
    // Perform network request or other background tasks
    fetch('https://api.example.com/data');
  }
  return <MyButton onClick={handleTap} />;
}



Optimizing for Instant First-Frame Rendering (IFR)

IFR is a key performance feature that greatly enhances the perceived startup speed of a Lynx application.
How it Works: The Lynx engine is designed to synchronously render the initial UI on the main thread using an initial set of data. This happens before the full React runtime and application logic have finished initializing on the background thread, effectively bypassing the "white screen" phase common in other frameworks.13
Key Constraint: The primary limitation of IFR is its synchronous nature. If the data required to render the first screen must be fetched asynchronously (e.g., via a network request), IFR cannot be achieved, and a loading state will be necessary.13
Using Host Platform Data: In a real-world scenario where a Lynx view is embedded in a native application, the most effective way to leverage IFR is to pass the initial data directly from the native host to the LynxView during its initialization. This synchronously provides the necessary data for the first render, enabling a seamless transition from a native splash screen to the interactive Lynx UI.13

Debugging and Performance Optimization

This section provides an overview of the tools and techniques available for diagnosing issues, fixing bugs, and optimizing the performance of Lynx applications.

A Tour of the Lynx DevTool Suite

Lynx DevTool is a powerful, standalone desktop application that serves as the central hub for debugging and inspecting Lynx applications. It connects to a running app—either in Lynx Explorer or as an embedded LynxView—via a USB cable, providing a suite of tools familiar to web developers.18
Connection: To connect, USB debugging must be enabled on Android devices. The DevTool interface displays the connection status, communication latency, and allows the developer to select which connected device and which specific Lynx page instance to debug.48
Core Panels:
Elements Panel: Allows for live inspection and modification of the rendered element tree. Developers can view computed styles, change CSS properties on the fly, and understand the final layout structure.48
Console Panel: A full-featured JavaScript console that displays logs from both the main and background threads. It also functions as a REPL (Read-Eval-Print Loop), allowing developers to execute arbitrary JavaScript code within the context of either thread.48
Sources Panel: A comprehensive JavaScript debugger. It allows developers to navigate the project's source files, set breakpoints to pause execution, step through code line-by-line, and inspect the values of variables and the call stack. It fully supports source maps, enabling debugging directly within the original TypeScript or ES6+ source code.48
Layers Panel: This visualization tool helps diagnose rendering performance issues by displaying how the page is composed into different layers by the rendering engine.48

Debugging Strategies for a Dual-Threaded Environment

Debugging a dual-threaded application requires special attention to the execution context.
Context Switching: The Console and Sources panels in Lynx DevTool feature a context selector dropdown. This allows the developer to explicitly switch between the background thread and the main thread. This is critical for tasks like evaluating expressions or inspecting variables that may only exist in one of the two environments.49
Log Interpretation: To help differentiate the origin of console messages, logs originating from the main thread are automatically prefixed with [main-thread.js]. This makes it easy to trace the execution flow across both threads.49

Inspecting the Element Tree, Console Logs, and Network Requests

The DevTool suite provides all the necessary tools for common debugging tasks.
Element and Style Inspection: The Elements panel is the primary tool for debugging visual and layout issues. It provides a live view of the element tree and the CSS rules being applied to each element.48
Logging and Tracing: console.log() is a fundamental debugging tool. Statements can be placed in code running on either thread, and their output will appear in the DevTool's Console panel, providing a way to trace execution and inspect data at runtime.49
Network Inspection: While the documentation snippets do not detail a dedicated "Network" panel, the overall debugging process includes the ability to check network requests, indicating that this functionality is part of the DevTool suite, likely within the Console or another panel.15

Performance Profiling and Best Practices

Beyond debugging, the Lynx ecosystem provides tools for performance analysis.
Performance Measurement Tools: The official documentation refers to a "Performance Metrics" page and a dedicated "Lynx Trace" tool. These tools are designed to help developers perform in-depth performance analysis and identify bottlenecks in their applications.51
Optimization Best Practices:
Adhere strictly to the dual-threaded model by offloading all non-UI logic to the background thread.
Use Main-Thread Scripting (MTS) sparingly, reserving it only for interactions that demand the lowest possible latency.
For long, scrollable datasets, always use the high-performance <list> component over <scroll-view> to benefit from view virtualization.
Structure the application to take advantage of Instant First-Frame Rendering (IFR) by ensuring the data for the initial view is available synchronously.

Deployment and Native Integration

This section covers the process of transitioning a Lynx application from a development environment to a production-ready deployment, with a focus on the primary model of embedding Lynx within an existing native application.

The Primary Deployment Model: Integrating Lynx into Existing Applications

The most mature, documented, and production-tested deployment strategy for Lynx is to embed it as a component within an existing native iOS or Android application. This approach reflects Lynx's origins as a tool for enhancing the TikTok app with features developed using web technologies.52 The process involves adding the Lynx rendering engine as a library to a native project and then using a native
LynxView component to display the Lynx-powered content.53

Step-by-Step Guide: Embedding a LynxView in an iOS App

Dependency Management (Cocoapods): Add the necessary Lynx pods to the project's Podfile. This includes Lynx for the core engine, PrimJS for the JavaScript runtime, and optionally LynxService for capabilities like image loading.53
Ruby
# Podfile
source 'https://cdn.cocoapods.org/'
platform :ios, '10.0'

target 'YourTarget' do
  pod 'Lynx', '3.2.0', :subspecs => ['Framework']
  pod 'PrimJS', '2.12.0', :subspecs => ['quickjs', 'napi']

  # Optional: integrate image-service, log-service, and http-service
  pod 'LynxService', '3.2.0', :subspecs => ['Image', 'Log', 'Http']

  # ImageService dependencies
  pod 'SDWebImage','5.15.5'
end


Environment Initialization: In the AppDelegate's application:didFinishLaunchingWithOptions: method, initialize the LynxEnv singleton. This sets up the global environment for the Lynx engine and must be done before any Lynx views are created.53
Objective-C
// AppDelegate.m
#import <Lynx/LynxEnv.h>

@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [LynxEnv sharedInstance];
  return YES;
}
@end


Rendering the View:
Within a UIViewController, instantiate a LynxView.
The LynxView must be configured with a LynxTemplateProvider, which is a custom class responsible for loading the JavaScript bundle file (e.g., from the app's embedded resources).
Add the configured LynxView as a subview to the UIViewController's view hierarchy.
Finally, call the loadTemplateFromURL: method on the LynxView instance, passing the name of the bundle to be rendered.53
Objective-C
// ViewController.m
#import <Lynx/LynxView.h>
#import "ViewController.h"
#import "DemoLynxProvider.h" // Your custom template provider

@implementation ViewController
- (void)viewDidLoad {
 ;

  LynxView *lynxView = [[LynxView alloc] initWithBuilderBlock:^(LynxViewBuilder *builder) {
    builder.config = [[LynxConfig alloc] initWithProvider: init]];
    builder.screenSize = self.view.frame.size;
  }];

  // Set layout properties
  lynxView.frame = self.view.bounds;

 ;

 ;
}
@end



Step-by-Step Guide: Embedding a LynxView in an Android App

Dependency Management (Gradle): In the app-level build.gradle file, add the Maven dependencies for the Lynx libraries, such as org.lynxsdk.lynx:lynx and org.lynxsdk.lynx:primjs. If using services like image loading, their dependencies (e.g., Fresco) must also be included.53
Gradle
// app/build.gradle
dependencies {
  // lynx dependencies
  implementation "org.lynxsdk.lynx:lynx:3.2.0"
  implementation "org.lynxsdk.lynx:primjs:2.12.0"

  // Optional: integrating image-service
  implementation "org.lynxsdk.lynx:lynx-service-image:3.2.0"

  // image-service dependencies (Fresco)
  implementation "com.facebook.fresco:fresco:2.3.0"
}


Environment Initialization: Create a custom Application class. In its onCreate method, initialize any required LynxService modules (e.g., LynxImageService) and then initialize the LynxEnv singleton.53
Java
// YourApplication.java
import android.app.Application;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.lynx.service.image.LynxImageService;
import com.lynx.tasm.LynxEnv;
import com.lynx.tasm.service.LynxServiceCenter;

public class YourApplication extends Application {
  @Override
  public void onCreate() {
    super.onCreate();
    // Init Fresco for LynxImageService
    Fresco.initialize(getApplicationContext());
    LynxServiceCenter.inst().registerService(LynxImageService.getInstance());

    // Init Lynx Environment
    LynxEnv.inst().init(this, null, null, null);
  }
}


Rendering the View:
Within an Activity, use a LynxViewBuilder to construct a LynxView instance.
The builder must be configured with an AbsTemplateProvider, a custom class that tells the engine how to load the JavaScript bundle (e.g., from the project's assets folder).
Add the resulting LynxView to the Activity's layout.
Call the renderTemplateUrl: method on the LynxView instance to load and display the content from the bundle.53
Java
// MainActivity.java
import android.app.Activity;
import android.os.Bundle;
import com.lynx.tasm.LynxView;
import com.lynx.tasm.LynxViewBuilder;

public class MainActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    LynxViewBuilder viewBuilder = new LynxViewBuilder();
    viewBuilder.setTemplateProvider(new DemoTemplateProvider(this)); // Your custom provider
    LynxView lynxView = viewBuilder.build(this);

    setContentView(lynxView);

    String url = "main.lynx.bundle";
    lynxView.renderTemplateUrl(url, "");
  }
}



Considerations for Building a Standalone Application

While the create-rspeedy command provides a development experience that feels like building a standalone app, the path to a production-ready, standalone .apk or .ipa file is less clear and not the primary focus of the current tooling and documentation.54
Community feedback suggests that building a Lynx app from scratch can be a tedious process that requires significant native code expertise. This is because the ecosystem of third-party native modules is still very small, meaning developers often need to write their own native bridges to access platform APIs.54 Therefore, for mission-critical, production-ready applications, the recommended and safest approach is the native integration model. Standalone builds are currently better suited for smaller projects, MVPs, and experimentation until the tooling and ecosystem mature further.14

Advanced Topics and the Lynx Ecosystem

This final section explores more advanced capabilities of the framework, provides a realistic assessment of its current ecosystem, and discusses its future trajectory.

Extending Functionality with Custom Native Components

Given the nascent state of the Lynx ecosystem, developers will likely encounter scenarios where they need to access platform-specific APIs or create custom UI components that are not available in the core framework. Lynx provides a mechanism for creating these custom native extensions, although it requires native development skills.
The process involves:
Creating a Native Class: On iOS, this would be a class inheriting from LynxUI; on Android, it would follow a similar pattern.
Implementing View Creation: The class must implement a method that returns an instance of the native view (e.g., a UITextField on iOS).
Handling Properties: Macros like LYNX_PROP_SETTER are used to create methods that are called when a corresponding property is set from JavaScript, allowing the native view to be updated.
Registering the Component: The custom component must be registered with the Lynx engine so that it can be instantiated when its corresponding tag (e.g., <input>) is encountered in the JSX.55
Here is a condensed example of registering and implementing a custom <input> element for iOS 55:

Objective-C


// LynxExplorerInput.h
#import <Lynx/LynxUI.h>

@interface LynxExplorerInput : LynxUI <UITextFieldDelegate>
@end

// LynxExplorerInput.m
#import "LynxExplorerInput.h"
#import <Lynx/LynxComponentRegistry.h>
#import <Lynx/LynxPropsProcessor.h>

@implementation LynxExplorerInput

// 1. Register the component with the tag name "input"
LYNX_LAZY_REGISTER_UI("input")

// 2. Create the native view instance
- (UITextField *)createView {
    UITextField *textField = init];
    textField.delegate = self;
    //... other initial setup...
    return textField;
}

// 3. Handle property updates from JavaScript
LYNX_PROP_SETTER("value", setValue, NSString *) {
    self.view.text = value;
}

// 4. (Optional) Send events back to JavaScript
- (void)textFieldDidChange:(NSNotification *)notification {
    LynxCustomEvent *eventInfo = 
        initWithName:@"input"
        targetSign:[self sign]
        detail:@{@"value": [self.view text]?: @""}];
    [self.context.eventEmitter dispatchCustomEvent:eventInfo];
}

@end



The Current State of the Lynx Community and Third-Party Libraries

Lynx is a new and emerging framework, and its ecosystem reflects this.
Ecosystem Status: The community is small, and the number of mature, production-ready third-party libraries is limited. Developers should not expect the vast selection of off-the-shelf packages available in the React Native ecosystem.1
Community Resources: The primary hubs for community interaction are the official lynx-family GitHub organization 6, a dedicated Discord channel for developers 19, and the
r/lynxjs subreddit.56 An
awesome-lynx repository on GitHub exists to curate resources, but it is still in its early stages.57
Implications for Developers: Adopting Lynx at this stage means being prepared for a greater degree of self-reliance. Problem-solving may require deeper dives into the official documentation or source code, as community forums and AI coding assistants will have a limited knowledge base to draw from.14

Future Outlook and Roadmap

Despite its youth, Lynx's strong architectural foundation and the backing of ByteDance position it for significant future growth.
Framework Agnosticism: A key design principle of the Lynx core engine is that it is framework-agnostic. While ReactLynx is the first officially supported view layer, about half of the internal usage at ByteDance already involves other frameworks like Vue and Svelte. This strongly suggests that official support for these and other frameworks is a likely part of the future roadmap.1
Platform Expansion: The rendering engine is also designed to be platform-agnostic. It can adapt to new platform primitives or even switch to a custom renderer for pixel-perfect consistency. This flexibility opens the door for Lynx to expand beyond mobile and web to other platforms such as desktop, TV, and IoT devices.3
Key Growth Factors: The long-term success of Lynx will hinge on several factors: the continued growth of its third-party library ecosystem, improvements in the developer experience and tooling (especially for creating standalone applications), and the cultivation of a vibrant and active developer community.15
Works cited
Lynxjs: ByteDance's Bold New Cross-Platform Framework — A Deep Dive and Comparison with React Native | by Akshay Chame | Medium, accessed on August 29, 2025, https://medium.com/@akshaychame2/lynxjs-bytedances-bold-new-cross-platform-framework-a-deep-dive-and-comparison-with-react-f70dbfbbaab9
Lynx by ByteDance vs React Native - Appwrite, accessed on August 29, 2025, https://appwrite.io/blog/post/bytedance-lynx-vs-react-native
Lynx JS - the new cross-platform mobile framework | UniqueDevs, accessed on August 29, 2025, https://uniquedevs.com/en/blog/lynx-modern-cross-platform-framework/
Unlock Native App Experiences with Lynx - TikTok for Developers, accessed on August 29, 2025, https://developers.tiktok.com/blog/lynx-opensource-introduction
Exploring Lynx: A New Cross Platform Development Framework In 2025 - RipenApps, accessed on August 29, 2025, https://ripenapps.com/blog/lynx-a-new-cross-platform-development-framework/
Lynx - GitHub, accessed on August 29, 2025, https://github.com/lynx-family
wlonestar/lynx: Lynx is a flexible and scalable server framework for Linux written in C++ with support for multi-threading and non-blocking I/O. - GitHub, accessed on August 29, 2025, https://github.com/wlonestar/lynx
Lynx Web Framework | Lynx, accessed on August 29, 2025, https://lynx.land/
lynx-framework - NPM, accessed on August 29, 2025, https://www.npmjs.com/package/lynx-framework
bytedance/lynx-llm: paper: https://arxiv.org/abs/2307.02469 page: https://lynx-llm.github.io - GitHub, accessed on August 29, 2025, https://github.com/bytedance/lynx-llm
ByteDance's Lynx: A Comprehensive Analysis of the New Cross-Platform Framework - Rutvik Bhatt - Technologist & Engineering Leader, accessed on August 29, 2025, https://www.rutvikbhatt.com/bytedances-lynx-a-comprehensive-analysis-of-the-new-cross-platform-framework/
Thinking in ReactLynx - Lynx, accessed on August 29, 2025, https://lynxjs.org/react/thinking-in-reactlynx.html
Instant First-Frame Rendering (IFR) - Lynx, accessed on August 29, 2025, https://lynxjs.org/guide/interaction/ifr.html
Lynx: The mobile framework for web devs - Alex Valle's Blog, accessed on August 29, 2025, https://alexvalle.dev/lynx-the-mobile-framework-for-web-devs
Getting Started with Lynx: A Next-Gen Cross-Platform Framework | by Dilshara Hetti Arachchige | Medium, accessed on August 29, 2025, https://medium.com/@dilsharahasanka/getting-started-with-lynx-a-next-gen-cross-platform-framework-15fe7a76e14d
Lynx: Unlock Native for More, accessed on August 29, 2025, https://lynxjs.org/blog/lynx-unlock-native-for-more.html
Composing Elements - Lynx, accessed on August 29, 2025, https://lynxjs.org/guide/ui/elements-components
Quick Start - Lynx, accessed on August 29, 2025, https://lynxjs.org/guide/start/quick-start.html
lynx-family/lynx: Empower the Web community and invite more to build across platforms. - GitHub, accessed on August 29, 2025, https://github.com/lynx-family/lynx
How to get started with Lynx js? Configure your first project - UniqueDevs, accessed on August 29, 2025, https://uniquedevs.com/en/blog/getting-started-with-lynxjs/
Create Lynx project - DEV Community, accessed on August 29, 2025, https://dev.to/iarchitsharma/create-lynx-project-eo7
Quick Start - Lynx, accessed on August 29, 2025, https://lynxjs.org/guide/start/quick-start
I managed to publish the Lynx Go (Explorer) app on App Store : r/lynxjs - Reddit, accessed on August 29, 2025, https://www.reddit.com/r/lynxjs/comments/1jay0v8/i_managed_to_publish_the_lynx_go_explorer_app_on/
[Feature]: publish Lynx Explorer to App Store · Issue #209 · lynx-family/lynx - GitHub, accessed on August 29, 2025, https://github.com/lynx-family/lynx/issues/209
How to Get Started with LynxJS. “Write Once, Render Anywhere” … I ..., accessed on August 29, 2025, https://medium.com/@hakoniemi/how-to-get-started-with-lynxjs-c1053f0ad9cc
What is ReactLynx? - Lynx, accessed on August 29, 2025, https://lynxjs.org/react/introduction.html
Understanding Lynx Core Elements - DEV Community, accessed on August 29, 2025, https://dev.to/iarchitsharma/understanding-lynx-core-elements-2jod
Tutorial: Product Gallery - Lynx, accessed on August 29, 2025, https://lynxjs.org/guide/start/tutorial-gallery
Styling the Lynx project - DEV Community, accessed on August 29, 2025, https://dev.to/iarchitsharma/styling-the-lynx-project-26d5
Understanding Layout - Lynx, accessed on August 29, 2025, https://lynxjs.org/guide/ui/layout/
Linear Layout - Lynx, accessed on August 29, 2025, https://lynxjs.org/guide/ui/layout/linear-layout
Styling - Lynx, accessed on August 29, 2025, https://lynxjs.org/rspeedy/styling
Styling - Lynx, accessed on August 29, 2025, https://lynxjs.org/rspeedy/styling.html
Free Video: Lynx Tutorial - Building a Game Search Application with ..., accessed on August 29, 2025, https://www.classcentral.com/course/freecodecamp-lynx-tutorial-js-framework-for-cross-platform-development-443615
Learn Lynx to Create JavaScript Mobile Apps - freeCodeCamp, accessed on August 29, 2025, https://www.freecodecamp.org/news/learn-lynx-to-create-javascript-mobile-apps/
Zustand - Lynx, accessed on August 29, 2025, https://lynxjs.org/react/state-management/zustand
Data Fetching - Lynx, accessed on August 29, 2025, https://lynxjs.org/react/data-fetching
Networking - Lynx, accessed on August 29, 2025, https://lynxjs.org/guide/interaction/networking
Event Handling - Lynx, accessed on August 29, 2025, https://lynxjs.org/guide/interaction/event-handling
Lynx Tutorial – JS Framework for Cross Platform Development - YouTube, accessed on August 29, 2025, https://www.youtube.com/watch?v=KCQsP91Wor0
Event - Lynx, accessed on August 29, 2025, https://lynxjs.org/api/lynx-api/event/event
TanStack Router - Lynx, accessed on August 29, 2025, https://lynxjs.org/react/routing/tanstack-router
TanStack Router - Lynx, accessed on August 29, 2025, https://lynxjs.org/zh/react/routing/tanstack-router
React Router - Lynx, accessed on August 29, 2025, https://lynxjs.org/react/routing/react-router
Direct Manipulation of Elements - Lynx, accessed on August 29, 2025, https://lynxjs.org/guide/interaction/event-handling/manipulating-element.react.html
Main Thread Script - Lynx, accessed on August 29, 2025, https://lynxjs.org/react/main-thread-script.html
Rendering Process and Lifecycle - Lynx, accessed on August 29, 2025, https://lynxjs.org/react/lifecycle
Lynx DevTool, accessed on August 29, 2025, https://lynxjs.org/guide/debugging/lynx-devtool.html
Console Panel - Lynx, accessed on August 29, 2025, https://lynxjs.org/guide/debugging/lynx-devtool/console-panel
Sources Panel - Lynx, accessed on August 29, 2025, https://lynxjs.org/guide/debugging/lynx-devtool/sources-panel
Overview - Lynx, accessed on August 29, 2025, https://lynxjs.org/guide/performance/overview
Introducing Lynx: A New Era of Cross-Platform Development - DEV Community, accessed on August 29, 2025, https://dev.to/surhidamatya/introducing-lynx-a-new-era-of-cross-platform-development-39nf
Integrate with Existing Apps - Lynx, accessed on August 29, 2025, https://lynxjs.org/guide/start/integrate-with-existing-apps.html
Lynx can't build from scratch ? : r/lynxjs - Reddit, accessed on August 29, 2025, https://www.reddit.com/r/lynxjs/comments/1j9isaz/lynx_cant_build_from_scratch/
Custom Element - Lynx, accessed on August 29, 2025, https://lynxjs.org/guide/custom-native-component.html
r/lynxjs - Reddit, accessed on August 29, 2025, https://www.reddit.com/r/lynxjs/
A curated list of awesome lynx ecosystem - GitHub, accessed on August 29, 2025, https://github.com/funcsio/awesome-lynx
