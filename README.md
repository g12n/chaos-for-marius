# Chaos for Marius

An interactive generative art experiment that creates mesmerizing patterns using HTML5 Canvas and vanilla JavaScript.

## What It Does

This project generates a dynamic grid of rotated, colored squares that respond to your mouse or touch input. Click or drag anywhere on the canvas to create unique patterns where squares closer to your cursor ray become more chaotic and randomized, while distant squares remain orderly.

The visualization uses ray-based distance calculations to create a "spread" effect emanating from your interaction point, combined with color gradients that flow from warm pinks to cool magentas across the canvas.

## Features

- **Interactive Controls**: Click or drag on the canvas to influence the pattern direction and spread
- **Adjustable Grid Density**: Use the slider to control grid complexity (3-12 columns)
- **Touch Support**: Full touch interaction support for mobile devices
- **Export Functionality**: Download your generated artwork as PNG images
- **Responsive Design**: Adapts to different screen sizes and orientations

## Running Locally

To run the project locally with live reload:

```bash
npx five-server
```

Or alternatively:

```bash
npx @compodoc/live-server --port=5500 --host=0.0.0.0
```

The server will open your browser and make the project accessible on your local network.

## How It Works

1. A grid of points is generated across the canvas
2. For each point, the algorithm calculates its distance to a ray projected from the canvas center through your mouse/touch position
3. This distance determines the "variability" - how much randomness affects that point's rotation
4. Each grid cell contains two overlapping squares with different rotations and colors
5. Colors transition based on distance from the top-left corner using HSL gradients

## Technologies

- Pure vanilla JavaScript (ES6 modules)
- HTML5 Canvas with Path2D for rendering
- Vector math from [vec2 library](https://m.g12n.de/vec2/index.js)
- Zero build process - runs directly in the browser