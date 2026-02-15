#include <emscripten.h>

// The extern "C" block prevents C++ name mangling, 
// making the functions reachable from JavaScript.
extern "C" {
    
    // EMSCRIPTEN_KEEPALIVE ensures the compiler doesn't 
    // remove these functions during optimization if they 
    // aren't called within the C++ code itself.
    EMSCRIPTEN_KEEPALIVE
    int add(int a, int b) {
        return a + b;
    }

    EMSCRIPTEN_KEEPALIVE
    int multiply(int a, int b) {
        return a * b;
    }
}
