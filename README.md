# Node.js 12 XML to JSON Benchmark Test

Benchmark Node.js ability to transform XML to JSON.

## Prerequisites

### Minimum Software Required To Deploy Application

You **only** need these items to run the application on any supported device:

* [Docker](https://www.docker.com)
* [Compose](https://docs.docker.com/compose)

## Getting Started

### Provide XML Payload To Test

Place your XML payload at `payload.xml` in the project root directory (same dir as this readme).

### Configure environment parameters (optional)

View `docker-compose.yml` to modify defaults. Here are the vanilla values:

    ITERATION_COUNT=1000000
    THREAD_COUNT=8

### Build Docker Image & Run Application

    docker-compose up --build
    
The test will begin as soon as the application finishes building and starts.

## Contribute

Community feedback is welcome. If you spot bugs or optimization issues in the code or believe that the README can be improved, feel free to submit a pull request. You're also welcome to submit a new issue as well that fully explains the problem and recommended solution.
