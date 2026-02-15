# WebGraphics: Learning WebGL and WebGPU

A React-based project designed to explore and demonstrate the fundamentals of web-based graphics programming using WebGL and the next-generation WebGPU API.

## 🚀 Overview

This project serves as a learning platform for two major web graphics standards:

- **WebGL (Web Graphics Library)**: The current standard based on OpenGL ES 2.0/3.0.
- **WebGPU**: The future of web graphics, providing lower-level access to GPU hardware, better performance, and modern features.

## 🛠 Features

### 1. WebGL Triangle Example

- Demonstrates the legacy graphics pipeline.
- Uses GLSL (GL Shader Language) for Vertex and Fragment shaders.
- Manages manual context initialization and buffer binding.

### 2. WebGPU Triangle Example

- Demonstrates the modern GPU compute and rendering pipeline.
- Uses WGSL (WebGPU Shader Language).
- Showcases the use of Adapters, Devices, and Command Encoders.
- Includes browser compatibility checks.

## 🚦 Getting Started

### Prerequisites

- **Node.js**: v18 or higher.
- **Enabled WebGPU Browser**:
  - Chrome 113+
  - Edge 113+
  - Safari (with WebGPU flag enabled)
  - Firefox Nightly (with WebGPU flag enabled)

### Installation

```bash
cd webgraphics
npm install
```

### Running the App

```bash
npm run dev
```

## 📖 Technical Concepts

### WebGL vs WebGPU

| Feature             | WebGL                           | WebGPU                             |
| :------------------ | :------------------------------ | :--------------------------------- |
| **Origin**          | OpenGL ES                       | Modern APIs (Vulkan, Metal, D3D12) |
| **Simplicity**      | High-level, state-machine based | Low-level, object-based            |
| **Shader Language** | GLSL                            | WGSL                               |
| **Multi-threading** | Limited                         | Native support for compute shaders |
| **Status**          | Ubiquitous                      | Emerging Standard                  |

## 📂 Project Structure

- `src/components/examples/WebGL/`: WebGL specific components.
- `src/components/examples/WebGPU/`: WebGPU specific components.
- `src/App.tsx`: Main entry point integrating the examples.

---

Created for educational purposes to bridge the gap between legacy and modern web graphics.
