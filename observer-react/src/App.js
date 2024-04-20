import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    // The observer function triggers when the adjusted bounding box enters or exits the intersection with the specified root element
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      // The rootMargin value defines the margins around the observed element,
      // effectively expanding or contracting its bounding box

      //  It is important to note that if you specify a negative value for rootMargin,
      // the observer function will fire when the observed element is already partially visible.
      // For example, a value of -300px means that the observer function will trigger when 300 pixels of the observed element have come into view.
      { rootMargin: "-300px" }
    );
    console.log(isIntersecting);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    // reveal on scroll functionality
    if (isIntersecting) {
      ref.current.querySelectorAll("div").forEach((el) => {
        el.classList.add("slide-in");
      });
    } else {
      // make the child elements leave the viewport once there’s no longer an intersection
      ref.current.querySelectorAll("div").forEach((el) => {
        el.classList.remove("slide-in");
      });
    }
  }, [isIntersecting]);

  return (
    <div className="App">
      <header>This is the Header</header>
      <main ref={ref}>
        <div className="child-one">Child One</div>
        <div className="child-two">Child Two</div>
      </main>
      <footer>This is the Footer</footer>
    </div>
  );
}

export default App;
