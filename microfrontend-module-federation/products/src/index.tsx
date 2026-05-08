// Module Federation initializes shared packages asynchronously.
// Keeping React rendering in bootstrap prevents runtime #RUNTIME-006.
import('./bootstrap').catch((error: unknown) => {
  console.error('Failed to start products app', error);
});
