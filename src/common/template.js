export const webspacelist = [
  {
    name: "HTML/CSS/JS",
    language: "css",
    frameworks: "css",
    data: {
      input: "blank css space",
      lastinput: "blank css space",
      type: "html",
      htmlCode:
        '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Blank CSS Space</title>\n</head>\n<body>\n    <div id="container"></div>\n</body>\n</html>',
      cssCode:
        "body {\n    margin: 0;\n    padding: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    min-height: 100vh;\n    background-color: #f0f0f0;\n}\n\n#container {\n    width: 80%;\n    height: 80vh;\n    background-color: white;\n    border: 1px solid #ccc;\n    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);\n}",
      jsCode: "",
      frameworks: "css",
      heading: "Blank CSS Space with Styling",
      explanation:
        "This code creates a blank space styled using pure CSS.  The HTML provides a simple `div` with an ID of `container`. The CSS styles the body to center the container and sets a minimum viewport height. The `container` div is given a width and height, a white background, a border, and a subtle box shadow to visually separate it from the background.  The result is a clean, blank area suitable for various purposes, such as demonstrating CSS effects or acting as a placeholder for content loading. No JavaScript is needed; all styling is handled by CSS.  The use of flexbox for centering ensures responsiveness across different screen sizes. This solution is modular and can be easily adapted to different background colors, sizes, and shadow effects by modifying the CSS properties.",
    },
  },
  {
    name: "HTML/Tailwindcss",
    language: "tailwindcss",
    frameworks: "tailwindcss",
    data: {
      input: "blank tailwindcss space",
      lastinput: "blank tailwindcss space",
      type: "html",
      htmlCode:
        '<div class="p-4 bg-gray-100">\n  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">\n    <div class="bg-white p-4 rounded-lg shadow-md">\n      <h3 class="text-lg font-medium mb-2">Space 1</h3>\n      <p>Some content for space 1.</p>\n    </div>\n    <div class="bg-white p-4 rounded-lg shadow-md">\n      <h3 class="text-lg font-medium mb-2">Space 2</h3>\n      <p>Some content for space 2.</p>\n    </div>\n    </div>\n</div>',
      cssCode: "",
      jsCode: "",
      frameworks: "tailwindcss",
      heading: "Blank Tailwind CSS Space with Grid",
      explanation:
        "This code creates a simple layout using Tailwind CSS.  The `grid` utility is used to create a responsive grid system that adapts to different screen sizes.  The `grid-cols-*` classes define the number of columns for each screen size (sm, md, lg).  `gap-4` adds spacing between the grid items.  Each grid item is a div with a white background, padding, rounded corners, and a shadow.  The content within each grid item can be easily customized.  This provides a clean and easily extensible structure for creating spaced-out content areas.  The `p-4` class on the parent container adds padding for visual breathing room around the entire grid. The use of Tailwind CSS allows for rapid prototyping and highly customizable styling with minimal code.",
    },
  },
  {
    name: "HTML/Bulma",
    language: "bulma",
    frameworks: "bulma",
    data: {
      type: "html",
      input: "blank bulma space ",
      lastinput: "blank bulma space ",
      htmlCode:
        '<!DOCTYPE html>\n<html>\n\n<head>\n  <title>Blank Bulma Space with Grid</title>\n</head>\n\n<body>\n  <div class="grid p-5">\n    <div class="cell button">Cell 1</div>\n    <div class="cell button">Cell 2</div>\n    <div class="cell button">Cell 3</div>\n    <div class="cell button">Cell 4</div>\n    <div class="cell button">Cell 5</div>\n  </div>\n</body>\n\n</html>',
      cssCode: "",
      jsCode: "",
      frameworks: "bulma",
      heading: "Blank Bulma Space using Grid",
      explanation:
        "This code creates a blank space using Bulma's grid system.  The `container` class provides a responsive container.  The `columns` class divides the space into three columns using the `is-one-fifth` and `is-three-fifths` classes for proportional widths.  This allows for flexible spacing and layout adjustments within a Bulma framework.",
    },
  },
  {
    name: "HTML/Bootstrap",
    language: "bootstrap",
    frameworks: "bootstrap",
    data: {
      input: "blank bootstrap space",
      lastinput: "blank bootstrap space",
      type: "html",
      htmlCode:
        '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Blank Bootstrap Space</title>\n</head>\n<body>\n    <div class="container">\n        <div class="row">\n            <div class="col">\n                \n            </div>\n        </div>\n    </div>\n</body>\n</html>',
      cssCode: "",
      jsCode: "",
      frameworks: "bootstrap",
      heading: "Blank Bootstrap Space",
      explanation:
        'This code creates a simple HTML page using Bootstrap 5.  The `container` class provides a responsive container that centers the content. The `row` class is a Bootstrap grid row, and the `col` class represents a single column that takes up the full width of its parent container.  This results in a blank page with a responsive layout, effectively providing a blank space styled with Bootstrap\'s default styling.  To add content, simply add elements within the `<div class="col"></div>` section.  Note:  The JSON response omits the `<link>` tag for Bootstrap CSS as requested. To use this code you need to include the Bootstrap CSS link provided in the `html` section in your own project.',
    },
  },
  {
    name: "HTML/Purecss",
    language: "purecss",
    frameworks: "purecss",
    data: {
      input: "blank purecss space",
      lastinput: "blank purecss space",
      type: "html",
      htmlCode:
        '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Blank Pure.css Space</title>\n</head>\n<body>\n    <div class="pure-g">\n        <div class="pure-u-1">\n            <!-- Your content here -->\n        </div>\n    </div>\n</body>\n</html>',
      cssCode: "",
      jsCode: "",
      frameworks: "purecss",
      heading: "Blank Space using Pure.css",
      explanation:
        "This code provides a basic HTML structure utilizing the Pure.css framework.  The `pure-g` class sets up a grid layout, and `pure-u-1` makes the inner div occupy the full width.  This creates a blank, responsive space where you can easily add your content.  The Pure.css framework is lightweight and provides a good foundation for building clean and simple layouts without much overhead.  To use this, simply include the Pure.css CDN link in the `<head>` section as shown.  Then, add your desired content within the `<!-- Your content here -->` comment. The framework uses a grid-based system for easy layout management.",
    },
  },
  {
    name: "HTML/Uikit",
    language: "uikit",
    frameworks: "uikit",
    data: {
      input: "blank uikit space",
      lastinput: "blank uikit space",
      type: "html",
      htmlCode:
        '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Blank UIkit Space</title>\n</head>\n\n<body>\n    <div class="uk-container uk-margin-large-top">\n        <div class="uk-grid-small uk-flex-middle" uk-grid>\n            <div class="uk-width-1-1">\n                <!--  Content will go here -->\n            </div>\n        </div>\n    </div>\n</body>\n\n</html>',
      cssCode: "",
      jsCode: "",
      frameworks: "uikit",
      heading: "Blank UIkit Space",
      explanation:
        "This code creates a blank space using UIkit's grid system.  The `uk-container` class provides a responsive container.  `uk-margin-large-top` adds a large margin to the top for better visual spacing.  The `uk-grid-small` and `uk-flex-middle` classes create a small grid with vertically centered content.  `uk-width-1-1` makes the content occupy the full width of its container.  The `uk-grid` attribute is added to the parent div to enable the grid layout.  The `<!-- Content will go here -->` comment indicates where you should add your actual content. This approach provides a clean and easily extensible foundation for building upon with UIkit components and your own custom content.  Remember to include the UIkit CSS and JS files in your project to utilize this code effectively.  This example focuses on the structural foundation, providing a blank canvas ready for expansion.",
    },
  },
  {
    name: "HTML/ThreeJS",
    language: "threejs",
    frameworks: "css",
    data: {
      lastinput: "blank threejs space",
      explanation:
        "This code sets up a basic Three.js scene with a blank canvas.  The HTML provides a canvas element where the 3D scene will be rendered. The JavaScript code imports the Three.js library and creates a scene, a perspective camera, and a WebGL renderer. The camera is positioned 5 units along the z-axis, providing a view into the scene. The `animate` function uses `requestAnimationFrame` to continuously render the scene, creating a smooth animation loop.  Because there are no objects added to the scene, it will appear blank. This serves as a foundational structure for adding more complex 3D objects and interactions later.  To use this, you will need to include the Three.js library, either via a CDN link (not included here to keep the response clean) or via a package manager like npm.  The import statement assumes you have Three.js installed and accessible in your project. Remember to adjust camera position and other parameters to fit your desired viewpoint and scene dimensions.",
      cssCode: "",
      input: "blank threejs space",
      type: "html",
      frameworks: "css",
      htmlCode:
        '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n  <meta charset="UTF-8">\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n  <title>HTML + Three.js</title>\n</head>\n\n<body>\n  <div id="blank-space"></div>\n</body>\n\n</html>',
      jsCode:
        "const scene = new THREE.Scene();\nconst camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);\nconst renderer = new THREE.WebGLRenderer();\nrenderer.setSize(window.innerWidth, window.innerHeight);\ndocument.getElementById('blank-space').appendChild(renderer.domElement);\n\nconst geometry = new THREE.BoxGeometry();\nconst material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });\nconst cube = new THREE.Mesh(geometry, material);\nscene.add(cube);\ncamera.position.z = 5;\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  cube.rotation.x += 0.01;\n  cube.rotation.y += 0.01;\n  renderer.render(scene, camera);\n}\nanimate();",
      heading: "Three.js Blank Space Setup",
    },
  },
  {
    name: "HTML/GSAP",
    language: "gsap",
    frameworks: "css",
    data: {
      type: "html",
      htmlCode:
        '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n  <meta charset="UTF-8">\n  <title>GSAP Animated Hello World</title>\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>\n</head>\n\n<body>\n  <h1 id="title">Hello World</h1>\n</body>\n\n</html>',
      cssCode: "",
      heading: "Animate 'Hello World' using GSAP.",
      explanation:
        "This code uses the GSAP (GreenSock Animation Platform) library to animate the 'Hello World' heading.  The `gsap.to()` function targets the h1 element with the id 'title'. It then animates the x-coordinate of the element, moving it 200 pixels to the right over a duration of 2 seconds using a 'power1.out' easing function for a smooth deceleration effect.  To use this code, you'll need to include the GSAP library in your project (e.g., via a CDN).",
      frameworks: "css",
      lastinput: "blank gsap space \n",
      input: "blank gsap space \n",
      jsCode: "gsap.to('#title', {x: 200, duration: 2, ease: 'power1.out'});",
    },
  },
  {
    name: "HTML/ChartJS",
    language: "chartjs",
    frameworks: "css",
    data: {
      type: "html",
      htmlCode:
        '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n  <meta charset="UTF-8">\n  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n  <title>HTML + Chart.js</title>\n</head>\n\n<body>\n  <canvas id="myChart" width="400" height="200"></canvas>\n</body>\n\n</html>',
      lastinput: "blank chartjs space",
      frameworks: "css",
      input: "blank chartjs space",
      jsCode:
        "const ctx = document.getElementById('myChart').getContext('2d');\n    new Chart(ctx, {\n      type: 'bar',\n      data: {\n        labels: ['Red', 'Blue', 'Yellow', 'Green'],\n        datasets: [{\n          label: 'Votes',\n          data: [12, 19, 3, 5],\n          backgroundColor: ['red', 'blue', 'yellow', 'green']\n        }]\n      }\n    });",
      explanation:
        "This code creates a blank canvas for Chart.js.  The HTML provides a simple `<canvas>` element with the ID 'myChart'.  The JavaScript code uses the Chart.js library to create a line chart (you can easily change the `type` to create other chart types).  Currently, the chart is empty because the `data` property of the chart configuration is set to empty arrays for labels and datasets.  To populate the chart, you would need to replace the empty arrays with your actual data.  The `options` property provides basic configuration such as setting the y-axis to begin at zero. This setup allows for easy data integration and customization later on. Remember to include the Chart.js library in your project (via CDN or npm) for this code to work correctly.  The CSS is not needed as the styling is handled by Chart.js and the default HTML rendering.",
      cssCode: "",
      heading: "Blank Chart.js Canvas",
    },
  },
  {
    name: "HTML/A-Frame",
    language: "aframe",
    frameworks: "css",
    data: {
      lastinput: "blank aframe space",
      heading: "A-Frame Scene: Simple Ocean",
      type: "html",
      explanation:
        "This A-Frame scene creates a basic ocean effect using a large plane with a blue material and transparency to simulate water.  A light blue sky is added for context.  The double-sided material allows the ocean to be seen from above and below.  Ambient and directional lights are included for better scene illumination.",
      input: "blank aframe space",
      cssCode: "",
      jsCode: "",
      htmlCode:
        '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n  <meta charset="UTF-8">\n  <title>HTML + A-Frame Scene</title>\n  <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>\n</head>\n\n<body>\n  <a-scene>\n    <a-box position="0 1 -3" rotation="0 45 0" color="#4CC3D9"></a-box>\n    <a-sphere position="0 2 -5" radius="1.25" color="#EF2D5E"></a-sphere>\n    <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>\n    <a-sky color="#212121"></a-sky>\n  </a-scene>\n</body>\n\n</html>',
      frameworks: "bulma",
    },
  },
  {
    name: "HTML/JQuery",
    language: "jquery",
    frameworks: "css",
    data: {
      input: "blank jquery space with css ",
      frameworks: "css",
      lastinput: "blank jquery space with css ",
      jsCode:
        "$(document).ready(function() {\n  $('#myButton').click(function() {\n    $('#content').text('Text added by jQuery!');\n  });\n});",
      type: "html",
      htmlCode:
        '<div class="container">\n  <h1 class="title">A Blank Space with jQuery</h1>\n  <div id="content"></div>\n  <button id="myButton">Click Me</button>\n</div>',
      cssCode:
        ".container {\n  width: 80%;\n  margin: 0 auto;\n  padding: 20px;\n  text-align: center;\n}\n\n.title {\n  font-size: 2em;\n  margin-bottom: 20px;\n}\n\n#content {\n  border: 1px solid #ccc;\n  padding: 10px;\n  margin-bottom: 10px;\n}\n\n#myButton {\n  padding: 10px 20px;\n  background-color: #4CAF50;\n  color: white;\n  border: none;\n  cursor: pointer;\n}",
      explanation:
        "This code creates a simple HTML page with a button and a div.  When the button is clicked, jQuery updates the content of the div with new text.  The CSS provides basic styling for the page elements.",
      heading:
        "Blank HTML page with jQuery functionality for dynamic content update.",
    },
  },
  {
    name: "HTML/TensorFlowJS",
    language: "tensorflowjs",
    frameworks: "tailwindcss",
    data: {
      lastinput: "blank tensorflow.js space  ",
      htmlCode:
        '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n  <meta charset="UTF-8">\n  <title>Image Classification with TensorFlow.js</title>\n  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>\n  <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet"></script>\n</head>\n\n<body class="bg-gray-100 p-8 text-center font-sans">\n  <h1 class="text-3xl font-semibold text-gray-800 mb-6">Image Classification with TensorFlow.js</h1>\n\n  <div class="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">\n    <input type="file" id="imageUpload" accept="image/*" class="border-2 border-gray-300 p-2 rounded-lg mb-4 cursor-pointer" />\n\n    <br>\n    <img id="uploadedImage" src="" alt="Selected Image" class="w-80 mx-auto my-4" />\n\n    <p id="result" class="text-lg text-gray-700 mt-4">Prediction will appear here</p>\n\n    <button onclick="classifyImage()" class="bg-blue-500 text-white p-3 mt-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">Classify Image</button>\n  </div>\n</body>\n\n</html>',
      explanation:
        "This code implements an image classification application using TensorFlow.js and the MobileNet model.  It allows users to upload an image, which is then classified by the model. The prediction (class name) and probability are displayed on the page.  Tailwind CSS is used for styling.",
      frameworks: "tailwindcss",
      heading: "Image Classification using TensorFlow.js and MobileNet",
      cssCode: "",
      type: "html",
      input: "blank tensorflow.js space  ",
      jsCode:
        "let model;\n\n    // Load MobileNet Model\n    async function loadModel() {\n      model = await mobilenet.load();\n      console.log('Model Loaded');\n    }\n\n    // Handle Image Upload\n    document.getElementById('imageUpload').addEventListener('change', function (event) {\n      const reader = new FileReader();\n      reader.onload = function (e) {\n        document.getElementById('uploadedImage').src = e.target.result;\n      };\n      reader.readAsDataURL(event.target.files[0]);\n    });\n\n    // Classify Image\n    async function classifyImage() {\n      if (!model) {\n        alert('Model is still loading, please wait...');\n        return;\n      }\n      const img = document.getElementById('uploadedImage');\n      if (!img.src) {\n        alert('Please upload an image first.');\n        return;\n      }\n      const predictions = await model.classify(img);\n      document.getElementById('result').innerText = `\n        Prediction: ${predictions[0].className}\n        Probability: ${(predictions[0].probability * 100).toFixed(2)}%\n      `;\n    }\n\n    loadModel();",
    },
  },
  {
    name: "HTML/LeafletJS",
    language: "leafletjs",
    frameworks: "css",
    data: {
      input: "blank leaflerjs space\n",
      lastinput: "blank leaflerjs space\n",
      frameworks: "css",
      jsCode:
        "var map = L.map('map').setView([51.505, -0.09], 13);\n\nL.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {\n    maxZoom: 19,\n    attribution: '&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>'    \n}).addTo(map);",
      cssCode: "#map {\n    height: 90vh;\n    width: 100%;\n}",
      explanation:
        "This code creates a simple, blank Leaflet map.  The HTML provides a `div` element with the id `map` to hold the map. The CSS sets the height and width of this div to ensure the map is visible and sized appropriately.  The JavaScript uses the Leaflet library to create a map centered on London (51.505, -0.09) at zoom level 13.  OpenStreetMap tiles are used as the base layer. The `attribution` ensures proper credit is given to OpenStreetMap. This is a basic example; you can easily build upon it by adding markers, polygons, popups, and other Leaflet features.  No external CSS frameworks are used; the styling is kept minimal and directly within the CSS. The JavaScript is concise and easy to understand.  This structure promotes modularity by separating concerns between HTML, CSS, and JavaScript.",
      heading: "Blank Leaflet.js Map",
      htmlCode:
        '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n  <meta charset="UTF-8">\n  <title>Interactive City Guide</title>\n  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />\n<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>\n</head>\n\n<body>\n  <h1>City Guide Map</h1>\n  <div id="map"></div>\n</body>\n\n</html>\n',
      type: "html",
    },
  },
];

export const codespacelist = [
  {
    name: "Java Programing",
    language: "java",
    data: {
      input: "Getting started with java",
      lastinput: "Getting started with java",
      language: "java",
      heading: "Getting Started with Java: Hello, World!",
      videos: [
        {
          kind: "youtube#searchResult",
          etag: "0Cg0wUdUzcNZ3ahFcwRCz4byl_o",
          id: {
            kind: "youtube#video",
            videoId: "Q3frCkyVC_Q",
          },
          snippet: {
            publishedAt: "2020-10-07T14:43:40Z",
            channelId: "UCV7cZwHMX_0vk8DSYrS7GCg",
            title:
              "First Java Program | Java Hello World program | How to Compile &amp; Run Java Program",
            description:
              "Java JDK Download & Install video Link     https://youtu.be/TNoggqhhvZo Please Subscribe our Channel...! Learn Coding ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/Q3frCkyVC_Q/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/Q3frCkyVC_Q/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/Q3frCkyVC_Q/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Learn Coding",
            liveBroadcastContent: "none",
            publishTime: "2020-10-07T14:43:40Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "orZG1O4oO6DBYD1qTtlI-vXu1Bc",
          id: {
            kind: "youtube#video",
            videoId: "-SoX6DLcDGQ",
          },
          snippet: {
            publishedAt: "2022-07-03T14:57:54Z",
            channelId: "UC1nrlkYcj3hI8XnQgz8aK_g",
            title:
              "HelloWorld code in Java | Why “Hello World” Is The Perfect Launching Point For Coding",
            description:
              "codersarts #java #shorts #shortsfeed #coding Comment your answers of these below questions Why is Hello World so famous in ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/-SoX6DLcDGQ/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/-SoX6DLcDGQ/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/-SoX6DLcDGQ/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "CodersArts",
            liveBroadcastContent: "none",
            publishTime: "2022-07-03T14:57:54Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "vuBr7Y-lE2kk3yTjSe1Ih2hOMD8",
          id: {
            kind: "youtube#video",
            videoId: "I2wvhRUVNTM",
          },
          snippet: {
            publishedAt: "2014-01-21T10:13:27Z",
            channelId: "UC19i1XD6k88KqHlET8atqFQ",
            title: "First  Program | Hello World  | Java Tutorial",
            description:
              "https://www.guru99.com/first-java-program.html This video guide how to write First Program called hello world in Java, compile it ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/I2wvhRUVNTM/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/I2wvhRUVNTM/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/I2wvhRUVNTM/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Guru99",
            liveBroadcastContent: "none",
            publishTime: "2014-01-21T10:13:27Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "Vg9dstazUk0Ke1ACJu5pYJq0seU",
          id: {
            kind: "youtube#video",
            videoId: "LCOxwjh1Go8",
          },
          snippet: {
            publishedAt: "2021-12-07T17:00:13Z",
            channelId: "UC0T6MVd3wQDB5ICAe45OxaQ",
            title:
              "Java Hello World: Write &amp; Run Your First Java Program in Notepad | Android Tutorial",
            description:
              "In this video, learn Java Hello World: Write & Run Your First Java Program in Notepad | Android Tutorial. Find all the videos of the ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/LCOxwjh1Go8/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/LCOxwjh1Go8/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/LCOxwjh1Go8/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "WsCube Tech",
            liveBroadcastContent: "none",
            publishTime: "2021-12-07T17:00:13Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "qpagHKalQPfKi_m8L1qnQZgOeyA",
          id: {
            kind: "youtube#video",
            videoId: "zIdg7hkqNE0",
          },
          snippet: {
            publishedAt: "2020-08-31T10:16:08Z",
            channelId: "UCeVMnSShP_Iviwkknt83cww",
            title:
              "Basic Structure of a Java Program: Understanding our First Java Hello World Program",
            description:
              "Understanding Java hello world Program: This Java tutorial for beginners will teach you java programming from scratch.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/zIdg7hkqNE0/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/zIdg7hkqNE0/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/zIdg7hkqNE0/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "CodeWithHarry",
            liveBroadcastContent: "none",
            publishTime: "2020-08-31T10:16:08Z",
          },
        },
      ],
      videoID: "Q3frCkyVC_Q",
      explanation:
        'This Java program is a classic example used to introduce beginners to the language. It demonstrates the basic structure of a Java program. Let\'s break down the code:\n\n1. `public class HelloWorld`: This line declares a class named `HelloWorld`.  In Java, everything runs inside a class.  `public` means this class is accessible from anywhere.\n2. `public static void main(String[] args)`: This is the `main` method, the entry point of the program.  The Java Virtual Machine (JVM) starts execution here. \n    * `public`:  Means the method is accessible from anywhere.\n    * `static`:  Allows the method to be called without creating an object of the `HelloWorld` class.\n    * `void`:  Indicates that the method doesn\'t return any value.\n    * `main`: The specific name the JVM looks for to start execution. \n    * `String[] args`: This is an array of strings that allows command-line arguments to be passed to the program. \n3. `System.out.println("Hello, World!");`: This line prints the text "Hello, World!" to the console. \n    * `System.out`:  A static member of the `System` class representing the standard output stream (typically the console).\n    * `println()`:  A method that prints a line of text to the console, followed by a new line character.',
      code: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    },
  },
  {
    name: "Python Programing",
    language: "python",
    data: {
      input: "Getting started with python ",
      lastinput: "Getting started with python ",
      language: "python",
      heading: 'Simple Python "Hello, World!" Program',
      videos: [
        {
          kind: "youtube#searchResult",
          etag: "su8qgoFcP4LKyd6Ie2LxgRDCVv0",
          id: {
            kind: "youtube#video",
            videoId: "0T3FzGaPE4I",
          },
          snippet: {
            publishedAt: "2021-11-09T13:08:21Z",
            channelId: "UChGy8J-jvkIecA-qnxyEl1g",
            title:
              "First python program🤞|| print &quot;Hello world!&quot; in python 😇#pythonprogram #HelloWorld #print",
            description: "",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/0T3FzGaPE4I/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/0T3FzGaPE4I/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/0T3FzGaPE4I/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Code With Soniya",
            liveBroadcastContent: "none",
            publishTime: "2021-11-09T13:08:21Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "FcJwEQOx2qNK09eo5FhRlTZCSco",
          id: {
            kind: "youtube#video",
            videoId: "m7r95oO3IF8",
          },
          snippet: {
            publishedAt: "2022-12-31T14:45:52Z",
            channelId: "UCR50kP07vlnVLd_YrpX1XjQ",
            title:
              "Python First Program HELLO WORLD #shorts #shortsvideo #python",
            description:
              "Python First Program HELLO WORLD #shorts #shortsvideo #python @codewithharry.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/m7r95oO3IF8/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/m7r95oO3IF8/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/m7r95oO3IF8/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "CodeTrail",
            liveBroadcastContent: "none",
            publishTime: "2022-12-31T14:45:52Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "CDOyIrDqJUmIJGstAy4tvBZRF7s",
          id: {
            kind: "youtube#video",
            videoId: "UwGwdjjz-Sk",
          },
          snippet: {
            publishedAt: "2021-12-10T02:40:43Z",
            channelId: "UCuQjAtz3UyPpKmbR1p8NCLw",
            title:
              "How To Print Hello World in Python #shorts #coding #programming",
            description:
              "Source Code - https://techdecodetutorials.com/python-installation/pythonprograms/how-to-print-hello-world-in-python/ Python ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/UwGwdjjz-Sk/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/UwGwdjjz-Sk/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/UwGwdjjz-Sk/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Tech Decode Tutorials",
            liveBroadcastContent: "none",
            publishTime: "2021-12-10T02:40:43Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "nutJD31ZfG2yUQAp6Qnd_T6MCBA",
          id: {
            kind: "youtube#video",
            videoId: "f_jjkwRLnGI",
          },
          snippet: {
            publishedAt: "2023-10-29T07:10:19Z",
            channelId: "UCJihyK0A38SZ6SdJirEdIOw",
            title: "&quot;Hello World&quot; | First program in Python",
            description: "",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/f_jjkwRLnGI/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/f_jjkwRLnGI/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/f_jjkwRLnGI/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Gate Smashers",
            liveBroadcastContent: "none",
            publishTime: "2023-10-29T07:10:19Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "A0ReXCC6__QWSmhrGgfEGlL9yas",
          id: {
            kind: "youtube#video",
            videoId: "nPTJAFZJrqY",
          },
          snippet: {
            publishedAt: "2022-07-06T05:30:16Z",
            channelId: "UC0T6MVd3wQDB5ICAe45OxaQ",
            title:
              "HELLO WORLD PROGRAM IN PYTHON - First Python Program (HINDI)",
            description:
              "In this video, learn HELLO WORLD PROGRAM IN PYTHON - First Python Program (HINDI). Find all the videos of the Python ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/nPTJAFZJrqY/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/nPTJAFZJrqY/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/nPTJAFZJrqY/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "WsCube Tech",
            liveBroadcastContent: "none",
            publishTime: "2022-07-06T05:30:16Z",
          },
        },
      ],
      videoID: "nPTJAFZJrqY",
      explanation:
        'This single line of Python code uses the built-in `print()` function to display the text "Hello, World!" on the console.  It\'s the most basic example used to demonstrate that your Python installation is working correctly.',
      code: 'print("Hello, World!")',
    },
  },
  {
    name: "C Programing",
    language: "c",
    data: {
      input: "Getting Started with C Programing",
      lastinput: "Getting Started with C Programing",
      language: "c",
      heading: 'A Simple C "Hello, World!" Program',
      videos: [
        {
          kind: "youtube#searchResult",
          etag: "zkrTlQ0o3QBuMKrYsuL7WiqUOR4",
          id: {
            kind: "youtube#video",
            videoId: "mxtHR1oq_NM",
          },
          snippet: {
            publishedAt: "2023-03-17T18:14:35Z",
            channelId: "UCoOx0jUPsffDvZa2EaCiAeg",
            title:
              "Print Hello World in C Programming | First Program in C Language #c #coding #programming #shorts",
            description: "",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/mxtHR1oq_NM/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/mxtHR1oq_NM/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/mxtHR1oq_NM/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Coders Community",
            liveBroadcastContent: "none",
            publishTime: "2023-03-17T18:14:35Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "NSumprnHNVutu1Gs0v_HEapjSqQ",
          id: {
            kind: "youtube#video",
            videoId: "8qlwdKa_ZKM",
          },
          snippet: {
            publishedAt: "2022-10-05T06:47:05Z",
            channelId: "UC8goWQpxJql94WPWufvKYIg",
            title:
              "C Hello World Program | Coding On Mobile | Hello World Program | C tutorial #codeontrend #c",
            description: "",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/8qlwdKa_ZKM/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/8qlwdKa_ZKM/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/8qlwdKa_ZKM/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "TechPlus Academy",
            liveBroadcastContent: "none",
            publishTime: "2022-10-05T06:47:05Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "smJSKbqNxyUsdL1uihE8meO0fP0",
          id: {
            kind: "youtube#video",
            videoId: "3zK8ftWsOM8",
          },
          snippet: {
            publishedAt: "2022-09-12T09:34:44Z",
            channelId: "UCslsBCiMgQ6qcBpxNEk8CWA",
            title: "C language first program hello world",
            description: "",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/3zK8ftWsOM8/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/3zK8ftWsOM8/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/3zK8ftWsOM8/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "All India Coder Life",
            liveBroadcastContent: "none",
            publishTime: "2022-09-12T09:34:44Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "mzOU-3fTEyh2KHrkohpkIXWBIjg",
          id: {
            kind: "youtube#video",
            videoId: "oqUDYOJnjK8",
          },
          snippet: {
            publishedAt: "2022-05-25T03:31:40Z",
            channelId: "UCHW1I0f6-Wa-uVbaxKwNBJQ",
            title: "C program to print &quot;Hello World &quot; #shorts",
            description:
              'C program to print "Hello World " Query Solve - c programming language write a program in c Programming language to print ...',
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/oqUDYOJnjK8/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/oqUDYOJnjK8/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/oqUDYOJnjK8/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "STRACK ZONE",
            liveBroadcastContent: "none",
            publishTime: "2022-05-25T03:31:40Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "p5k3cfKH-D1aqlPVpod7pUpSwkg",
          id: {
            kind: "youtube#video",
            videoId: "8mo6hpxXn8A",
          },
          snippet: {
            publishedAt: "2021-05-29T02:17:06Z",
            channelId: "UCV7cZwHMX_0vk8DSYrS7GCg",
            title:
              "C Program to Print &quot;Hello World&quot; | First C Program",
            description:
              "C Language Full Course for Beginners (Hindi) ....! https://youtu.be/VSEnzzjAm0c Don't forget to tag our Channel.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/8mo6hpxXn8A/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/8mo6hpxXn8A/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/8mo6hpxXn8A/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Learn Coding",
            liveBroadcastContent: "none",
            publishTime: "2021-05-29T02:17:06Z",
          },
        },
      ],
      videoID: "8mo6hpxXn8A",
      explanation:
        'This C program uses the standard input/output library (stdio.h) to print the text "Hello, World!" to the console. \nThe `main` function is the entry point of the program. `printf` is a function that sends formatted output to the standard output stream (typically the console). The `\\n` is a newline character, which moves the cursor to the next line after printing the message.  `return 0;` indicates that the program executed successfully. To compile and run this code, you\'ll need a C compiler (like GCC). Save the code as a .c file (e.g., hello.c), then compile it from your terminal using a command like `gcc hello.c -o hello` and then run it with `./hello`.',
      code: '#include <stdio.h>\n\nint main() {\n  // This is a simple C program that prints "Hello, World!" to the console.\n  printf("Hello, World!\\n");\n  return 0; //Indicates successful execution\n}',
    },
  },
  {
    name: "C++ Programing",
    language: "cpp",
    data: {
      input: "Getting Started with C++ Programing",
      lastinput: "Getting Started with C++ Programing",
      language: "cpp",
      heading: "A Simple C++ Hello World Program",
      videos: [
        {
          kind: "youtube#searchResult",
          etag: "vqxm70iK3mSzczst5xGW9Kr38Ng",
          id: {
            kind: "youtube#video",
            videoId: "CyZsSlTyv5Y",
          },
          snippet: {
            publishedAt: "2022-08-06T15:32:58Z",
            channelId: "UC8goWQpxJql94WPWufvKYIg",
            title:
              "C++ Hello World Program | Coding on mobile | Hello World Program | C++ tutorial  #CodeOnTrend #C++",
            description:
              "CodeOnTrend #python #cpp #java Python Program Examples ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/CyZsSlTyv5Y/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/CyZsSlTyv5Y/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/CyZsSlTyv5Y/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "TechPlus Academy",
            liveBroadcastContent: "none",
            publishTime: "2022-08-06T15:32:58Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "7eP0SpHJEbwkf3ae_4njRRHpfGk",
          id: {
            kind: "youtube#video",
            videoId: "w-RMbt2FZnU",
          },
          snippet: {
            publishedAt: "2022-10-30T08:09:27Z",
            channelId: "UC8goWQpxJql94WPWufvKYIg",
            title:
              "C++ Hello World Program| Visual Studio Code | Hello World Program | C++ tutorial #CodeOnTrend #C++",
            description:
              "Name of the above C++ file is main.cpp. Extension of a C++ file is .cpp. Let us go into the program and understand it line by line.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/w-RMbt2FZnU/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/w-RMbt2FZnU/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/w-RMbt2FZnU/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "TechPlus Academy",
            liveBroadcastContent: "none",
            publishTime: "2022-10-30T08:09:27Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "l2bPYyk7aWa60ZWNFD9C2__sqlg",
          id: {
            kind: "youtube#video",
            videoId: "6YLozGy5bD4",
          },
          snippet: {
            publishedAt: "2022-08-01T10:01:55Z",
            channelId: "UCfbrkOtMBWps70z0g-5006A",
            title:
              "First programme in c++ | Hello World programme in c++ | cpp programming language | c++ coding",
            description:
              "print Hello World in cpp programming language first programme in c++.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/6YLozGy5bD4/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/6YLozGy5bD4/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/6YLozGy5bD4/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Coding center",
            liveBroadcastContent: "none",
            publishTime: "2022-08-01T10:01:55Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "cjLr_m44VLQeS8FR84Rn1PFKwxo",
          id: {
            kind: "youtube#video",
            videoId: "bo7qCSBY-Xw",
          },
          snippet: {
            publishedAt: "2022-08-22T06:33:09Z",
            channelId: "UC713vtBuTqo-FqiFQ0_p-8A",
            title:
              "How to write first program in c++ | print hello world in c++ #c++ #programming #coding #coding.w0rld",
            description:
              "hello coders.. welcome in my yt channel coding.w0rld please subscribe my channel..... Thanks for watching my video.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/bo7qCSBY-Xw/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/bo7qCSBY-Xw/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/bo7qCSBY-Xw/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "coding.w0rld",
            liveBroadcastContent: "none",
            publishTime: "2022-08-22T06:33:09Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "H6lMJouAHw7WAvwTjEBx0N-UI-g",
          id: {
            kind: "youtube#video",
            videoId: "O_CxjHkAelg",
          },
          snippet: {
            publishedAt: "2022-04-25T17:34:21Z",
            channelId: "UCBwmMxybNva6P_5VmxjzwqA",
            title: "Why do we write &quot;Hello World&quot;?",
            description:
              "shorts Complete C Course : https://bit.ly/FullTutorialC Java Placement Course(with DSA) : https://bit.ly/JavaPlaylistComplete ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/O_CxjHkAelg/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/O_CxjHkAelg/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/O_CxjHkAelg/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Apna College",
            liveBroadcastContent: "none",
            publishTime: "2022-04-25T17:34:21Z",
          },
        },
      ],
      videoID: "w-RMbt2FZnU",
      explanation:
        'This C++ program demonstrates the basic structure of a C++ program. It starts with an include statement that includes the iostream library, which is necessary for input and output operations.  The main function is where the program execution begins. Inside the main function, `std::cout << "Hello, world!\\n";` sends the text "Hello, world!" followed by a newline character (`\\n`) to the standard output stream (typically the console).  `return 0;` indicates that the program has executed successfully.',
      code: '#include <iostream>\n\nint main() {\n  // Prints a greeting message to the console\n  std::cout << "Hello, world!\\n";\n  return 0;\n}',
    },
  },
  {
    name: "Javascript Programing",
    language: "javascript",
    data: {
      input: "Getting Started with Javascript",
      lastinput: "Getting Started with Javascript",
      language: "javascript",
      heading: "Javascript Hello World Program",
      videos: [
        {
          kind: "youtube#searchResult",
          etag: "hjQXcKPvQ5wAAAadbJcmWgB2W4Q",
          id: {
            kind: "youtube#video",
            videoId: "0YFtEZaN6wU",
          },
          snippet: {
            publishedAt: "2020-04-13T14:30:00Z",
            channelId: "UCsvqVGtbbyHaMoevxPAq9Fg",
            title:
              "Hello World In JavaScript | Javascript Hello World Program | JavaScript For Beginners | Simplilearn",
            description:
              "Full Stack Java Developer Program (Discount Code - YTBE15) ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/0YFtEZaN6wU/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/0YFtEZaN6wU/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/0YFtEZaN6wU/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Simplilearn",
            liveBroadcastContent: "none",
            publishTime: "2020-04-13T14:30:00Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "Ra035tuFqnOce83iUIk9s3tX7mI",
          id: {
            kind: "youtube#video",
            videoId: "9UjmLhsxzjA",
          },
          snippet: {
            publishedAt: "2022-05-15T04:00:07Z",
            channelId: "UC0T6MVd3wQDB5ICAe45OxaQ",
            title:
              "Hello World In JavaScript - Print your First Hello World using Javascript",
            description:
              "In this video, learn Hello World In JavaScript - Print your First Hello World using Javascript. Find all the videos of the JavaScript ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/9UjmLhsxzjA/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/9UjmLhsxzjA/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/9UjmLhsxzjA/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "WsCube Tech",
            liveBroadcastContent: "none",
            publishTime: "2022-05-15T04:00:07Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "pA_25Qygg1d_1lX7dKJskb3llCM",
          id: {
            kind: "youtube#video",
            videoId: "ranSYb-EhrU",
          },
          snippet: {
            publishedAt: "2015-07-24T09:11:42Z",
            channelId: "UCW5YeuERMmlnqo4oq8vwUpg",
            title:
              "JavaScript Tutorial For Beginners 03 - Hello World! in JavaScript",
            description:
              "Hey ninjas, welcome to your 3rd JavaScript for beginners tutorial! It's customary that when you learn a new programming ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/ranSYb-EhrU/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/ranSYb-EhrU/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/ranSYb-EhrU/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Net Ninja",
            liveBroadcastContent: "none",
            publishTime: "2015-07-24T09:11:42Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "Ei7YD4SiEW1K4WLgPoOIfZgkyg4",
          id: {
            kind: "youtube#video",
            videoId: "iF7l7h1Shxs",
          },
          snippet: {
            publishedAt: "2022-10-27T12:53:21Z",
            channelId: "UCKnum1hAC5KSNy1bWLFkxDA",
            title: "print &quot;Hello World&quot; in js",
            description: "viral.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/iF7l7h1Shxs/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/iF7l7h1Shxs/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/iF7l7h1Shxs/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Programming With Hassan",
            liveBroadcastContent: "none",
            publishTime: "2022-10-27T12:53:21Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "nTekjKb9qD6CLcSEvsuq2ID9gM8",
          id: {
            kind: "youtube#video",
            videoId: "1_Ix5Y6WzJc",
          },
          snippet: {
            publishedAt: "2023-08-06T12:30:02Z",
            channelId: "UCNWtzvDbkpm9kSUrL4nPcUA",
            title:
              "Hello World Program In Javascript | how to write hello world in javascript | 1st Program In Javascri",
            description:
              "HelmetyYoutuber #helmetyyoutuber Hello World Program In Javascript | how to write hello world in javascript | 1st Program In ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/1_Ix5Y6WzJc/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/1_Ix5Y6WzJc/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/1_Ix5Y6WzJc/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Helmety YouTuber",
            liveBroadcastContent: "none",
            publishTime: "2023-08-06T12:30:02Z",
          },
        },
      ],
      videoID: "0YFtEZaN6wU",
      explanation:
        'This code uses the console.log() method to print the string "Hello, world!" to the console.  This is a standard way to display output in JavaScript and is often used as the first program when learning a new programming language.',
      code: 'console.log("Hello, world!");',
    },
  },
  {
    name: "Typescript Programing",
    language: "typescript",
    data: {
      input: "Getting Started with TypeScript",
      lastinput: "Getting Started with TypeScript",
      language: "typescript",
      heading: "TypeScript Hello World",
      videos: [
        {
          kind: "youtube#searchResult",
          etag: "C7P7vRgmQBoO6orQV_h5Dvqlkls",
          id: {
            kind: "youtube#video",
            videoId: "HcAXU_GcJc4",
          },
          snippet: {
            publishedAt: "2023-02-20T13:30:06Z",
            channelId: "UCNCMtijH5TFf4-P5rYQ6pRA",
            title:
              "How to create first Hello World program in TypeScript | TypeScript Programming | TypeScript Tutorial",
            description:
              "In this Typescript video tutorial, I covered the introduction of Typescript, why we need Typescript, and How to install Typescript on ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/HcAXU_GcJc4/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/HcAXU_GcJc4/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/HcAXU_GcJc4/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "TSInfo Technologies",
            liveBroadcastContent: "none",
            publishTime: "2023-02-20T13:30:06Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "A116Rj3qeRYjxeoUSSeakk6F3U8",
          id: {
            kind: "youtube#video",
            videoId: "qGhyLo6xqgI",
          },
          snippet: {
            publishedAt: "2023-07-03T21:00:30Z",
            channelId: "UCpV2E1V1Ntwb1-prNj92hzQ",
            title: "Hello World in Typescript",
            description:
              "In this tutorial, I show how to do a basic Hello World in Typescript, plus how to create and handle primitive data types in Typescript ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/qGhyLo6xqgI/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/qGhyLo6xqgI/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/qGhyLo6xqgI/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Not A Bot",
            liveBroadcastContent: "none",
            publishTime: "2023-07-03T21:00:30Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "ttl4h-a-3zUSGd2RZzbkrvzw8JM",
          id: {
            kind: "youtube#video",
            videoId: "Uh_0fZ_Q1v8",
          },
          snippet: {
            publishedAt: "2016-02-16T08:30:36Z",
            channelId: "UCJUmE61LxhbhudzUugHL2wQ",
            title: "TypeScript Tutorial 5: Hello World",
            description:
              "Write your first Hello World program in typescript! Website: http://codedamn.com Forum: http://clan.codedamn.com codedamn is a ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/Uh_0fZ_Q1v8/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/Uh_0fZ_Q1v8/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/Uh_0fZ_Q1v8/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Mehul - Codedamn",
            liveBroadcastContent: "none",
            publishTime: "2016-02-16T08:30:36Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "n60gnO0VYq7ZVOcPaK6ilERYG2Q",
          id: {
            kind: "youtube#video",
            videoId: "LrxUqn5f68Y",
          },
          snippet: {
            publishedAt: "2021-10-14T17:00:12Z",
            channelId: "UCTt7pyY-o0eltq14glaG5dg",
            title: "TypeScript Beginner Tutorial 3 | 1st Program | Hello World",
            description:
              "All FREE courses - https://automationstepbystep.com/ 1st TypeScript Program Step 1 - Create a new folder and open in VS Code ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/LrxUqn5f68Y/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/LrxUqn5f68Y/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/LrxUqn5f68Y/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Automation Step by Step",
            liveBroadcastContent: "none",
            publishTime: "2021-10-14T17:00:12Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "MpckqvNTZdc41Fud699oD4Cay8g",
          id: {
            kind: "youtube#video",
            videoId: "K6qafSgXV3I",
          },
          snippet: {
            publishedAt: "2022-09-26T05:47:30Z",
            channelId: "UCzQvgRgjjxhzEORvefubDPw",
            title:
              "How To Run TypeScript In VSCode | Create TS Project | Compile TypeScript",
            description:
              "Sign Up https://semicolon.dev/YouTube (We're free online community, meet other makers!) #typescript #vscode ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/K6qafSgXV3I/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/K6qafSgXV3I/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/K6qafSgXV3I/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Ghost Together",
            liveBroadcastContent: "none",
            publishTime: "2022-09-26T05:47:30Z",
          },
        },
      ],
      videoID: "HcAXU_GcJc4",
      explanation:
        'This code uses the built-in `console.log` function in JavaScript to print the string "Hello, world!" to the console.  This is a standard way to display output in many programming environments, including web browsers. The text within the parentheses is the message to be displayed.',
      code: 'console.log("Hello, world!");',
    },
  },
  {
    name: "C# Programing",
    language: "csharp",
    data: {
      input: "Getting Started with C#",
      lastinput: "Getting Started with C#",
      language: "csharp",
      heading: 'A Simple C# "Hello, World!" Program',
      videos: [
        {
          kind: "youtube#searchResult",
          etag: "inctFyFkM5aUgUoBDZt5AfMg8UA",
          id: {
            kind: "youtube#video",
            videoId: "X93DnM0AyxU",
          },
          snippet: {
            publishedAt: "2022-10-29T15:15:29Z",
            channelId: "UCu-AqGqgR0sww6q4Q_eLrew",
            title: "c sharp hello world program",
            description: "",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/X93DnM0AyxU/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/X93DnM0AyxU/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/X93DnM0AyxU/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Code With Ahmed",
            liveBroadcastContent: "none",
            publishTime: "2022-10-29T15:15:29Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "imPyKwRwl5zRgWduwY-W4n1aoq8",
          id: {
            kind: "youtube#video",
            videoId: "7kFlcPKky7o",
          },
          snippet: {
            publishedAt: "2019-10-06T03:35:15Z",
            channelId: "UCJko6ws31nQ1DNQGpCs5WAQ",
            title: "C# Tutorial Hello World",
            description: "Subscribe :)",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/7kFlcPKky7o/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/7kFlcPKky7o/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/7kFlcPKky7o/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "code technique",
            liveBroadcastContent: "none",
            publishTime: "2019-10-06T03:35:15Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "giQm1Oqw_scVZf13oxGe2yzn390",
          id: {
            kind: "youtube#video",
            videoId: "HFLALzkcjLM",
          },
          snippet: {
            publishedAt: "2023-11-10T20:00:15Z",
            channelId: "UCvtT19MZW8dq5Wwfu6B0oxw",
            title: "Hello World! [Pt 2] | C# for Beginners",
            description:
              "View full playlist: https://aka.ms/dotnet/beginnervideos/youtube/csharp Set up C# in VS Code: ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/HFLALzkcjLM/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/HFLALzkcjLM/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/HFLALzkcjLM/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "dotnet",
            liveBroadcastContent: "none",
            publishTime: "2023-11-10T20:00:15Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "PVKGFbG-HpCSFAgdr8RJhc65B-k",
          id: {
            kind: "youtube#video",
            videoId: "FXCTk5cDsho",
          },
          snippet: {
            publishedAt: "2022-07-09T13:38:13Z",
            channelId: "UCdAlFEVZZZ8dwAnIJZqDY2Q",
            title: "Hello World - First Program in C#",
            description:
              'BackCoding simple "Hello World!" program in C#. This will get you familiar with the basic syntax and requirements of a C# ...',
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/FXCTk5cDsho/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/FXCTk5cDsho/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/FXCTk5cDsho/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "BackCoding",
            liveBroadcastContent: "none",
            publishTime: "2022-07-09T13:38:13Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "CNSlIcvHvEbi-qrU7637tYsyVZE",
          id: {
            kind: "youtube#video",
            videoId: "TJae-L33KJo",
          },
          snippet: {
            publishedAt: "2021-12-03T08:16:37Z",
            channelId: "UCIUW31QeWjeFM7OG7u1wSUg",
            title:
              "Visual Studio 2019 C# How to Create Your First Program (Hello World)",
            description:
              "Visual Studio 2019 C# How to Create Your First Program (Hello World) In this video, you are going to learn how to write simple ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/TJae-L33KJo/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/TJae-L33KJo/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/TJae-L33KJo/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "My Coding Project",
            liveBroadcastContent: "none",
            publishTime: "2021-12-03T08:16:37Z",
          },
        },
      ],
      videoID: "7kFlcPKky7o",
      explanation:
        'This C# code defines a class named `HelloWorld` that contains the `Main` method. The `Main` method is the entry point of the program. Inside the `Main` method, the `System.Console.WriteLine()` method is used to print the text "Hello, World!" to the console. The `System.Console.WriteLine()` method is a static method of the `System.Console` class, which is part of the .NET Framework. This method takes a string as an argument and prints it to the console. Semicolons are used to end statements.',
      code: 'public class HelloWorld {\n    public static void Main(string[] args) {\n        // Prints "Hello, World!" to the console\n        System.Console.WriteLine("Hello, World!");\n    }\n}',
    },
  },
  {
    name: "Rust Programing",
    language: "rust",
    data: {
      input: "Getting Started with Rust Programing",
      lastinput: "Getting Started with Rust Programing",
      language: "rust",
      heading: "Simple Hello World Program in Rust",
      videos: [
        {
          kind: "youtube#searchResult",
          etag: "VHWQuxbhKfbQ5bRLatK38QOqbQI",
          id: {
            kind: "youtube#video",
            videoId: "DtGtwdPbRHE",
          },
          snippet: {
            publishedAt: "2022-04-02T07:00:03Z",
            channelId: "UCdhWNfnBWZ2KZqwTHA-Z4Hg",
            title: "Rust HELLO WORLD EXAMPLE 👨‍💻 #shorts",
            description:
              "rust programming,rust programming language,rust,rust programming tutorial,rust programming for beginners,rust programming ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/DtGtwdPbRHE/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/DtGtwdPbRHE/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/DtGtwdPbRHE/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "truthybyte",
            liveBroadcastContent: "none",
            publishTime: "2022-04-02T07:00:03Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "--IMBQB2DsgRmsgj3BKac-UPEZQ",
          id: {
            kind: "youtube#video",
            videoId: "vOMJlQ5B-M0",
          },
          snippet: {
            publishedAt: "2017-11-04T11:14:00Z",
            channelId: "UCjX0FtIZBBVD3YoCcxnDC4g",
            title:
              "Rust Programming Tutorial #1 - Hello World | Getting Started with Rust",
            description:
              'In this video I\'ll be showing you how to make a simple "Hello World!" application using the Rust Programming Language. We do ...',
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/vOMJlQ5B-M0/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/vOMJlQ5B-M0/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/vOMJlQ5B-M0/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "dcode",
            liveBroadcastContent: "none",
            publishTime: "2017-11-04T11:14:00Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "wkXimPSjNCLArIkLnvqjaPlv-Z8",
          id: {
            kind: "youtube#video",
            videoId: "-iER2NwD8OU",
          },
          snippet: {
            publishedAt: "2021-08-12T22:48:31Z",
            channelId: "UCa22ge_MKVapVkX8lN1jDuQ",
            title: "Rust &quot;Hello World&quot; Explained in 3 Minutes",
            description:
              "notgull attempts to explain something he's passionate about. Will it make any sense? Probably not, but I hope you enjoy the pretty ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/-iER2NwD8OU/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/-iER2NwD8OU/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/-iER2NwD8OU/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "notgull",
            liveBroadcastContent: "none",
            publishTime: "2021-08-12T22:48:31Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "o5K1S5j9sNvdxbTKfKy743ssORw",
          id: {
            kind: "youtube#video",
            videoId: "5C_HPTJg5ek",
          },
          snippet: {
            publishedAt: "2021-10-12T15:24:43Z",
            channelId: "UCsBjURrPoezykLs9EqgamOA",
            title: "Rust in 100 Seconds",
            description:
              "Rust is a memory-safe compiled programming language for building high-performance systems. It has the simplicity of high-level ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/5C_HPTJg5ek/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/5C_HPTJg5ek/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/5C_HPTJg5ek/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Fireship",
            liveBroadcastContent: "none",
            publishTime: "2021-10-12T15:24:43Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "HSFr4_Ib33Wq4QyfkLRfvTVPk-M",
          id: {
            kind: "youtube#video",
            videoId: "KVoWwbdS_l0",
          },
          snippet: {
            publishedAt: "2023-01-10T02:35:05Z",
            channelId: "UC5CPmQkLmX77h-b_Q8UxeEA",
            title: "Rust in 60 seconds: Hello World (Video 1)",
            description:
              "Rust hello world in 60 seconds #shorts #rust #programming #coding #tutorial #helloworld Sign up for our Rust bootcamp at ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/KVoWwbdS_l0/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/KVoWwbdS_l0/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/KVoWwbdS_l0/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "RareSkills",
            liveBroadcastContent: "none",
            publishTime: "2023-01-10T02:35:05Z",
          },
        },
      ],
      videoID: "vOMJlQ5B-M0",
      explanation:
        'This Rust program prints the message "Hello, world!" to the console.  It uses the `println!` macro, which is Rust\'s way of performing formatted output. The `main` function is the entry point of the program, where execution begins.',
      code: 'fn main() {\n    println!("Hello, world!");\n}',
    },
  },
  {
    name: "Go Programing",
    language: "go",
    data: {
      input: "Getting Started with Go Programing",
      lastinput: "Getting Started with Go Programing",
      language: "go",
      heading: "A basic Go program",
      videos: [
        {
          kind: "youtube#searchResult",
          etag: "C77N73pn7DZt45xkQXQwiN97UAY",
          id: {
            kind: "youtube#video",
            videoId: "8uiZC0l4Ajw",
          },
          snippet: {
            publishedAt: "2023-09-04T13:47:22Z",
            channelId: "UCr3L56DsMxhNtHqtm2AIsMw",
            title: "Learn GO Fast: Full Tutorial",
            description:
              "This is a full tutorial on learning Golang! From start to finish in less than an hour, including a full demo of how to build an api in Go.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/8uiZC0l4Ajw/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/8uiZC0l4Ajw/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/8uiZC0l4Ajw/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Alex Mux",
            liveBroadcastContent: "none",
            publishTime: "2023-09-04T13:47:22Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "gti2OwH9oZv5OhMEX1oULaOpJ7U",
          id: {
            kind: "youtube#video",
            videoId: "446E-r0rXHI",
          },
          snippet: {
            publishedAt: "2021-10-07T15:49:35Z",
            channelId: "UCsBjURrPoezykLs9EqgamOA",
            title: "Go in 100 Seconds",
            description:
              "Learn the basics of the Go Programming Language. Go (not Golang) was developed at Google as a modern version of C for ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/446E-r0rXHI/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/446E-r0rXHI/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/446E-r0rXHI/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Fireship",
            liveBroadcastContent: "none",
            publishTime: "2021-10-07T15:49:35Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "Nz4FCM90hK3iK3KHONBbRnO94Go",
          id: {
            kind: "youtube#video",
            videoId: "un6ZyFkqFKo",
          },
          snippet: {
            publishedAt: "2023-05-11T13:41:01Z",
            channelId: "UC8butISFwT-Wl7EV0hUK0BQ",
            title: "Go Programming – Golang Course with Bonus Projects",
            description:
              "Learn the Go programming language in this full course for beginners. You'll practice writing performant, idiomatic Go with these ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/un6ZyFkqFKo/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/un6ZyFkqFKo/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/un6ZyFkqFKo/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "freeCodeCamp.org",
            liveBroadcastContent: "none",
            publishTime: "2023-05-11T13:41:01Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "94qMzAiUKPvLP7mw7OgZ8525X6g",
          id: {
            kind: "youtube#video",
            videoId: "yyUHQIec83I",
          },
          snippet: {
            publishedAt: "2021-12-20T15:05:11Z",
            channelId: "UCdngmbVKX1Tgre699-XLlUA",
            title: "Golang Tutorial for Beginners | Full Go Course",
            description:
              "Full Golang Tutorial to learn the Go Programming Language while building a simple CLI application In this full Golang course you ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/yyUHQIec83I/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/yyUHQIec83I/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/yyUHQIec83I/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "TechWorld with Nana",
            liveBroadcastContent: "none",
            publishTime: "2021-12-20T15:05:11Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "KZieFM6hfBA-JhNixA7hmWm0Klc",
          id: {
            kind: "youtube#video",
            videoId: "LHhsNa_Kgns",
          },
          snippet: {
            publishedAt: "2021-12-03T16:04:02Z",
            channelId: "UC4JX40jDee_tINbkjycV4Sg",
            title: "Go Beginner Project Tutorial - Learn Golang",
            description:
              "Welcome back to another tutorial! In this video I'm going to be teaching the basics of Go while applying what we learn directly into ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/LHhsNa_Kgns/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/LHhsNa_Kgns/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/LHhsNa_Kgns/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Tech With Tim",
            liveBroadcastContent: "none",
            publishTime: "2021-12-03T16:04:02Z",
          },
        },
      ],
      videoID: "un6ZyFkqFKo",
      explanation:
        'This Go program consists of a single file named `main.go`. The `package main` declaration specifies that this code is part of the `main` package, which is the entry point for executable programs in Go.\n\nThe `import "fmt"` line imports the `fmt` package, which provides formatted I/O capabilities (like printing to the console).\n\nThe `main` function is the main entry point of the program.  Inside this function, `fmt.Println("Hello, World!")` prints the text "Hello, World!" to the console, which is a standard way to demonstrate a working program.\n\nTo run this program:\n\n1. Save the code as `main.go`\n2. Open a terminal in the directory where you saved the file.\n3. Run the command `go run main.go`',
      code: 'package main\n\nimport "fmt"\n\nfunc main() {\n\n        fmt.Println("Hello, World!")\n\n}',
    },
  },
  {
    name: "Dart Programing",
    language: "dart",
    data: {
      input: "Getting Started with Dart Programing",
      lastinput: "Getting Started with Dart Programing",
      language: "dart",
      heading: "Hello World in Dart",
      videos: [
        {
          kind: "youtube#searchResult",
          etag: "tEvXvCH6RFoSfYsVau7aM9qtuks",
          id: {
            kind: "youtube#video",
            videoId: "GH1qn_YTeQE",
          },
          snippet: {
            publishedAt: "2023-04-26T04:16:34Z",
            channelId: "UC9Q3E15Nv6SbgG-tXkRNOTA",
            title: "First Program || Hello World in Dart || Dart Programming",
            description:
              "In this video, we will learn how to write our first program in Dart programming language.Hello, World in Dart. First Program || Hello ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/GH1qn_YTeQE/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/GH1qn_YTeQE/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/GH1qn_YTeQE/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "WTF Code",
            liveBroadcastContent: "none",
            publishTime: "2023-04-26T04:16:34Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "2-rGIwThTFBP64puVQaWqGFv3ug",
          id: {
            kind: "youtube#video",
            videoId: "FaZwPpDB0e4",
          },
          snippet: {
            publishedAt: "2021-09-24T11:15:00Z",
            channelId: "UCC73HBJaxDlEAbdPAWhjp1A",
            title:
              "01 Dart Hello World |  First Program | Dart Tutorial for Beginners",
            description:
              "This video guide how to write the First program called hello world in #Dart, compile it and finally run it by using the terminal in ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/FaZwPpDB0e4/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/FaZwPpDB0e4/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/FaZwPpDB0e4/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Dev.Skills",
            liveBroadcastContent: "none",
            publishTime: "2021-09-24T11:15:00Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "TkeCwHgjeQCRxoKDkZKmD4efOzc",
          id: {
            kind: "youtube#video",
            videoId: "lJ3n9tiVG3g",
          },
          snippet: {
            publishedAt: "2022-01-06T02:45:56Z",
            channelId: "UC80VxaHAVG7LVlArZD5p_2Q",
            title: "#1 Hello World in Dart | Dart for beginners",
            description: "",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/lJ3n9tiVG3g/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/lJ3n9tiVG3g/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/lJ3n9tiVG3g/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "The CodingGenius (All Android Projects)",
            liveBroadcastContent: "none",
            publishTime: "2022-01-06T02:45:56Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "wrt04SpEW2oSMeCINFZ0_NxQAos",
          id: {
            kind: "youtube#video",
            videoId: "dsyucuytW2k",
          },
          snippet: {
            publishedAt: "2018-09-27T02:48:33Z",
            channelId: "UC0FPjuZLQ16UpvLtbs6LYpg",
            title:
              "Create First Flutter Application: Flutter Hello World Tutorial: Flutter Dart Tutorial #1.3",
            description:
              "Access 7000+ courses for 60 days FREE: https://pluralsight.pxf.io/c/1291657/424552/7490 Flutter beginners guide to learn to ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/dsyucuytW2k/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/dsyucuytW2k/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/dsyucuytW2k/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Smartherd",
            liveBroadcastContent: "none",
            publishTime: "2018-09-27T02:48:33Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "vpACy7hb-djrE5-MuKziXThSPJc",
          id: {
            kind: "youtube#video",
            videoId: "f663fBx_GIU",
          },
          snippet: {
            publishedAt: "2018-07-01T02:45:11Z",
            channelId: "UC0FPjuZLQ16UpvLtbs6LYpg",
            title:
              "Dart Hello World : Write your First Code in Dart and run it in DartPad or Intellij IDEA #2.1",
            description:
              "Access 7000+ courses for 15 days FREE: https://pluralsight.pxf.io/c/1291657/431340/7490 Dart Programming for Flutter: Create ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/f663fBx_GIU/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/f663fBx_GIU/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/f663fBx_GIU/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Smartherd",
            liveBroadcastContent: "none",
            publishTime: "2018-07-01T02:45:11Z",
          },
        },
      ],
      videoID: "FaZwPpDB0e4",
      explanation:
        "This Dart code uses the `main` function, the entry point of any Dart program.  The `print` function is used to display the text 'Hello, world!' on the console.  The text is enclosed in single quotes because it's a string literal.",
      code: "void main() {\n  print('Hello, world!');\n}",
    },
  },
  {
    name: "Fortran Programing",
    language: "fortran",
    data: {
      input: "Getting Started with Fortran",
      lastinput: "Getting Started with Fortran",
      language: "fortran",
      heading: 'A Simple Fortran "Hello, World!" Program',
      videos: [
        {
          kind: "youtube#searchResult",
          etag: "W8MGRPTVbS3smetivs-NlEEt34M",
          id: {
            kind: "youtube#video",
            videoId: "SyC9qL6Tg18",
          },
          snippet: {
            publishedAt: "2022-09-14T08:55:28Z",
            channelId: "UCwuOiDipZYLnp6mNUVc1ovw",
            title: "First Program in Fortran | Hello World",
            description:
              "fortran #python #sql FORTRAN stand for FORmula TRANslation. Learn FORTRAN Programming. Hello World Program in ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/SyC9qL6Tg18/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/SyC9qL6Tg18/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/SyC9qL6Tg18/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "emahar",
            liveBroadcastContent: "none",
            publishTime: "2022-09-14T08:55:28Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "RDXCsYMtRnIIL5iMMFiwd4bYxZg",
          id: {
            kind: "youtube#video",
            videoId: "X1x0fgn1tMo",
          },
          snippet: {
            publishedAt: "2018-08-07T12:41:47Z",
            channelId: "UCDuQsPzfqxcYKVp_uuKCzqw",
            title: "[Fortran Tuto 1] Hello World !",
            description:
              "In this tutorial, I'll introduce you to the most basic things you should know about FORTRAN: - How to write a quick Hello World ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/X1x0fgn1tMo/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/X1x0fgn1tMo/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/X1x0fgn1tMo/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Cyprien Rusu",
            liveBroadcastContent: "none",
            publishTime: "2018-08-07T12:41:47Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "RSLPg2_BNiilvvu7hPk2F58GWbU",
          id: {
            kind: "youtube#video",
            videoId: "y3ncWFnZygg",
          },
          snippet: {
            publishedAt: "2020-04-25T15:34:25Z",
            channelId: "UC9Htyps_StjytT0A38eyOew",
            title: "Fortran Hello World program",
            description:
              "Fortran the very basic Hello World program using fortran f90 compiler.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/y3ncWFnZygg/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/y3ncWFnZygg/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/y3ncWFnZygg/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Explore Your Views",
            liveBroadcastContent: "none",
            publishTime: "2020-04-25T15:34:25Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "lirgAJhyJXAPc2Q_dv1SQVe-6E8",
          id: {
            kind: "youtube#video",
            videoId: "wTJYD08O1zE",
          },
          snippet: {
            publishedAt: "2022-10-02T01:25:05Z",
            channelId: "UCOs-lpOoIeJoh6gpJthPoGg",
            title: "Hello World in Fortran",
            description:
              "helloworld #fortran #programming #coding #vlog #motivation #computerscience #problemsolving #education #tutorial ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/wTJYD08O1zE/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/wTJYD08O1zE/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/wTJYD08O1zE/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Jake Pomperada",
            liveBroadcastContent: "none",
            publishTime: "2022-10-02T01:25:05Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "7WVOVoARvZik5maftg766fy76ig",
          id: {
            kind: "youtube#video",
            videoId: "pbP7sfbgWKQ",
          },
          snippet: {
            publishedAt: "2022-11-22T09:24:42Z",
            channelId: "UCjxgUATotjYk4CcWUHwf8hA",
            title:
              "Hello World in Fortran Programming Language | #coding #programming #shorts #fortran",
            description: "",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/pbP7sfbgWKQ/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/pbP7sfbgWKQ/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/pbP7sfbgWKQ/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "simplifAI",
            liveBroadcastContent: "none",
            publishTime: "2022-11-22T09:24:42Z",
          },
        },
      ],
      videoID: "y3ncWFnZygg",
      explanation:
        'This Fortran program consists of a single program unit named \'hello\'.\n\nThe `implicit none` statement is a crucial declaration. It specifies that all variables in the program must be explicitly declared before use. This helps prevent accidental typos and improves the overall readability and maintainability of the code.  It is considered best practice.\n\nThe `print *, "Hello, World!"` statement is the core logic of this program. It uses the default formatted output to write the string "Hello, World!" to the console. The asterisk (*) is a placeholder, indicating the compiler should choose the default format for output. The string literal is enclosed in double quotes.\n\nThe `end program hello` statement signals the end of the program unit.',
      code: 'program hello\n  implicit none\n  print *, "Hello, World!" \nend program hello',
    },
  },
  {
    name: "Pascal Programing",
    language: "pascal",
    data: {
      input: "Getting Started with Pascal",
      lastinput: "Getting Started with Pascal",
      language: "pascal",
      heading: "A Simple Pascal 'Hello, World!' Program",
      videos: [
        {
          kind: "youtube#searchResult",
          etag: "a88ud2HNV-lS7GTWPvyUK7P9Q-4",
          id: {
            kind: "youtube#video",
            videoId: "JwzwjHVPnAA",
          },
          snippet: {
            publishedAt: "2022-09-11T02:01:41Z",
            channelId: "UCrxs0nZYksSTaZ2f-R5F4eA",
            title: "Pascal Programming Language -  First Program - Hello World",
            description:
              "shorts Pascal - How to print Hello World First Program Hello World Subscribe if you enjoy :)",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/JwzwjHVPnAA/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/JwzwjHVPnAA/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/JwzwjHVPnAA/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "The Art Of Code",
            liveBroadcastContent: "none",
            publishTime: "2022-09-11T02:01:41Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "UCP5EYKLTdaUyYxsjeqEEuEFspU",
          id: {
            kind: "youtube#video",
            videoId: "zMzU_-RDy0Q",
          },
          snippet: {
            publishedAt: "2012-05-20T10:25:38Z",
            channelId: "UCvC17Jh1FZ66X0jabDfgRXQ",
            title: "Pascal Hello World - English",
            description:
              "In this tutorial i'm using free pascal to make a simple hello world program.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/zMzU_-RDy0Q/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/zMzU_-RDy0Q/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/zMzU_-RDy0Q/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "SkullsWithSkills",
            liveBroadcastContent: "none",
            publishTime: "2012-05-20T10:25:38Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "ASH2YNsnXBNcXnPyV0_Xa_Fj_MQ",
          id: {
            kind: "youtube#video",
            videoId: "0ZQCXXhXq6Q",
          },
          snippet: {
            publishedAt: "2009-01-20T19:09:53Z",
            channelId: "UCk1jb1IPM_s7ENi4jOyYTTA",
            title: "Turbo pascal: Hello world",
            description:
              "A good first program if you want to learn Pascal with an explanation of what is actually happening.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/0ZQCXXhXq6Q/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/0ZQCXXhXq6Q/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/0ZQCXXhXq6Q/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "gerard mcmanus",
            liveBroadcastContent: "none",
            publishTime: "2009-01-20T19:09:53Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "8wTYPJjhQ6ecUU5saabjBYaGfd4",
          id: {
            kind: "youtube#video",
            videoId: "S4u2tKVTOAM",
          },
          snippet: {
            publishedAt: "2021-10-28T16:42:51Z",
            channelId: "UCuKTMubIgNhi87ayhxPKcKw",
            title:
              "Membuat Program Hello World Menggunakan PASCAL N IDE | Creating a Hello World Using PASCAL N IDE",
            description:
              "Video ini menjelaskan bagaimana membuat program hello world menggunakan PASCAL N IDE di HP Android. Hello world ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/S4u2tKVTOAM/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/S4u2tKVTOAM/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/S4u2tKVTOAM/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Channel Mesran",
            liveBroadcastContent: "none",
            publishTime: "2021-10-28T16:42:51Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "jsp0X7SRklDh8me8bvOLFgkMDyc",
          id: {
            kind: "youtube#video",
            videoId: "BUuUAz7PS7w",
          },
          snippet: {
            publishedAt: "2019-02-17T00:29:54Z",
            channelId: "UC2pgqN9-4rIj1NC33X0yL4Q",
            title: "Pascal Hello World Program - 01",
            description: "",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/BUuUAz7PS7w/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/BUuUAz7PS7w/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/BUuUAz7PS7w/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Dammika Adikari",
            liveBroadcastContent: "none",
            publishTime: "2019-02-17T00:29:54Z",
          },
        },
      ],
      videoID: "zMzU_-RDy0Q",
      explanation:
        "This Pascal program consists of a single program block named `HelloWorld`. The `begin` and `end` keywords enclose the program's statements. The `writeln` procedure is used to display the text string 'Hello, World!' on the console.",
      code: "// A Simple Pascal 'Hello, World!' Program\n// Time Complexity: O(1)\n// Space Complexity: O(1)\nprogram HelloWorld;\nbegin\n  writeln('Hello, World!');\nend.",
    },
  },
  {
    name: "R Programing",
    language: "rscript",
    data: {
      videoID: "mRlncrX94xQ",
      videos: [
        {
          kind: "youtube#searchResult",
          etag: "QBLX1p1H3JLwKgl3otW5oJ5g1mY",
          id: {
            kind: "youtube#video",
            videoId: "mRlncrX94xQ",
          },
          snippet: {
            publishedAt: "2021-02-01T15:00:31Z",
            channelId: "UCjXUIvMeiEUna3KTQtYmScA",
            title: "How To... Display &quot;Hello World&quot; in R #01",
            description:
              'Start learning the R programming language by displaying the classic message "Hello World" with @EugeneOLoughlin. The R ...',
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/mRlncrX94xQ/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/mRlncrX94xQ/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/mRlncrX94xQ/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Eugene O'Loughlin",
            liveBroadcastContent: "none",
            publishTime: "2021-02-01T15:00:31Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "vOFtF7nHkd3yD-hllJHoJnufIsE",
          id: {
            kind: "youtube#video",
            videoId: "W-enQqRXWfI",
          },
          snippet: {
            publishedAt: "2017-10-21T10:45:10Z",
            channelId: "UC9vlPXQfuWR1NMO2BFBZueQ",
            title: "First R script | Hello World | RStudio | R 3.3",
            description:
              "No audio in this video. Hello World script in R using RStudio and R console.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/W-enQqRXWfI/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/W-enQqRXWfI/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/W-enQqRXWfI/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "RoboMex",
            liveBroadcastContent: "none",
            publishTime: "2017-10-21T10:45:10Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "E6u3EOndRHtcjH2jMCljm0uZ9b0",
          id: {
            kind: "youtube#video",
            videoId: "gYdR_3TrNYU",
          },
          snippet: {
            publishedAt: "2021-07-23T07:21:15Z",
            channelId: "UCpEobxv_G7tr5iB3VXXHLQg",
            title: "Hello World Program using RStudio",
            description:
              "Hello World Program using RStudio In this video, I show you how to run a simple Hello World programming in R Software.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/gYdR_3TrNYU/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/gYdR_3TrNYU/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/gYdR_3TrNYU/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Business Analytics Made Easy",
            liveBroadcastContent: "none",
            publishTime: "2021-07-23T07:21:15Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "z1RkxxtaD5idw32BET2y-onxNto",
          id: {
            kind: "youtube#video",
            videoId: "M1jycCH2kL4",
          },
          snippet: {
            publishedAt: "2022-05-06T04:15:58Z",
            channelId: "UCqyprj0AwBdb7yfK-T9Er4Q",
            title:
              "Hello World in different programming languages #programming #memes",
            description:
              "hello world program in different programming languages.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/M1jycCH2kL4/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/M1jycCH2kL4/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/M1jycCH2kL4/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "HB0x00",
            liveBroadcastContent: "none",
            publishTime: "2022-05-06T04:15:58Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "iG8Ip6QSzTQ1nR9XIAouQqajm1I",
          id: {
            kind: "youtube#video",
            videoId: "EJKpLVD6mfw",
          },
          snippet: {
            publishedAt: "2021-11-22T14:15:15Z",
            channelId: "UC-1VtIZ_g8VwIm4CdQ__v2w",
            title: "R programming language Hello world #shortsyoutube",
            description: "",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/EJKpLVD6mfw/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/EJKpLVD6mfw/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/EJKpLVD6mfw/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Byte code programming",
            liveBroadcastContent: "none",
            publishTime: "2021-11-22T14:15:15Z",
          },
        },
      ],
      heading: "Hello, World! in R",
      language: "rscript",
      explanation:
        'The `cat()` function in R is used to print output to the console.  The text "Hello, World!\\n" is passed as an argument to the function.  The `\\n` is a newline character, which moves the cursor to the next line after printing the text. ',
      code: 'cat("Hello, World!\\n")',
      input: "Getting Started with R Programing",
      lastinput: "Getting Started with R Programing",
    },
  },
];
