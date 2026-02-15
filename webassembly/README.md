# Learn WebAssembly with C++ and React

This project demonstrates how to write high-performance logic in C++, compile it to WebAssembly (Wasm), and integrate it into a modern React application.

## Prerequisites

To compile the C++ code, you need the **Emscripten SDK (emsdk)**.

### 1. Install Emscripten

If you don't have it, follow these steps:

```bash
# Clone the repo
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk

# Install and activate the latest version
./emsdk install latest
./emsdk activate latest

# Set up the environment (Run this in every new terminal)
source ./emsdk_env.sh  # Linux/macOS
emsdk_env.bat          # Windows
```

## How to Run

### Step 1: Compile C++ to WebAssembly

Navigate to the `webassembly` folder and run the following command:

```bash
emcc wasm/math.cpp -O3 -s WASM=1 -o public/math.wasm --no-entry
```

- `wasm/math.cpp`: The source C++ file.
- `-O3`: High optimization level.
- `-s WASM=1`: Output a `.wasm` file.
- `-o public/math.wasm`: Save the result to the React `public` folder so it's accessible at runtime.
- `--no-entry`: Tell the compiler there is no `main()` function; we just want to export specific functions.

### Step 2: Start the React App

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

### Step 3: Test in Browser

Open `http://localhost:5173`. You can now use the UI to call the `add` and `multiply` functions, which are executed inside the WebAssembly module!

## Project Structure

- `wasm/math.cpp`: Your C++ source code.
- `src/utils/wasmLoader.ts`: Logic to load and instantiate the `.wasm` file.
- `src/App.tsx`: The React interface.
- `public/math.wasm`: The compiled binary (generated after Step 1).
