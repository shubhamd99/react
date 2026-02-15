import React, { useEffect, useRef, useState } from "react";

const WebGPUTriangle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initWebGPU = async () => {
      if (!navigator.gpu) {
        setError(
          "WebGPU is not supported in this browser. Please use a compatible browser like Chrome (latest) or Edge.",
        );
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        setError("Failed to get GPU adapter.");
        return;
      }

      const device = await adapter.requestDevice();
      const context = canvas.getContext("webgpu");
      if (!context) {
        setError("Failed to get WebGPU context.");
        return;
      }

      const format = navigator.gpu.getPreferredCanvasFormat();
      context.configure({
        device,
        format,
        alphaMode: "opaque",
      });

      const shaderCode = `
        @vertex
        fn vs_main(@builtin(vertex_index) vertexIndex : u32) -> @builtin(position) vec4f {
          var pos = array<vec2f, 3>(
            vec2f(0.0, 0.5),
            vec2f(-0.5, -0.5),
            vec2f(0.5, -0.5)
          );
          return vec4f(pos[vertexIndex], 0.0, 1.0);
        }

        @fragment
        fn fs_main() -> @location(0) vec4f {
          return vec4f(1.0, 0.5, 0.0, 1.0);
        }
      `;

      const shaderModule = device.createShaderModule({
        code: shaderCode,
      });

      const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
          module: shaderModule,
          entryPoint: "vs_main",
        },
        fragment: {
          module: shaderModule,
          entryPoint: "fs_main",
          targets: [
            {
              format,
            },
          ],
        },
        primitive: {
          topology: "triangle-list",
        },
      });

      function frame() {
        if (!canvas) return;

        const commandEncoder = device.createCommandEncoder();
        const textureView = context!.getCurrentTexture().createView();

        const renderPassDescriptor: GPURenderPassDescriptor = {
          colorAttachments: [
            {
              view: textureView,
              clearValue: { r: 0.1, g: 0.1, b: 0.1, a: 1.0 },
              loadOp: "clear",
              storeOp: "store",
            },
          ],
        };

        const passEncoder =
          commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(pipeline);
        passEncoder.draw(3);
        passEncoder.end();

        device.queue.submit([commandEncoder.finish()]);
      }

      frame();
    };

    initWebGPU();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h3>WebGPU Basic Triangle</h3>
      {error ? (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#3a1a1a",
            color: "#ff6b6b",
            borderRadius: "8px",
            border: "1px solid #ff6b6b",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          {error}
        </div>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            style={{
              border: "2px solid #555",
              borderRadius: "8px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            }}
          />
          <p style={{ fontSize: "0.9rem", color: "#aaa", marginTop: "10px" }}>
            A simple orange triangle rendered using the modern WebGPU API.
          </p>
        </>
      )}
    </div>
  );
};

export default WebGPUTriangle;
