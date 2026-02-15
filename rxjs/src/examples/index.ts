import type { RxJSExample } from "../types";
import IntervalCounter from "./Basic/IntervalCounter";
import OperatorBasics from "./Basic/OperatorBasics";
import SubjectSync from "./Basic/SubjectSync";
import SearchAsYouType from "./Intermediate/SearchAsYouType";
import DragAndDrop from "./Advanced/DragAndDrop";
import StateStore from "./Advanced/StateStore";

export const EXAMPLES: RxJSExample[] = [
  {
    id: "interval",
    title: "Observable Interval",
    description: "Basic periodic emissions using interval()",
    category: "Basic",
    component: IntervalCounter,
  },
  {
    id: "operators",
    title: "Pipeable Operators",
    description: "Transforming data with map, filter, and take",
    category: "Basic",
    component: OperatorBasics,
  },
  {
    id: "subjects",
    title: "BehaviorSubject State",
    description: "Sharing state across components using Subjects",
    category: "Basic",
    component: SubjectSync,
  },
  {
    id: "search",
    title: "Search As You Type",
    description: "Robust search with debounce and cancellation",
    category: "Intermediate",
    component: SearchAsYouType,
  },
  {
    id: "drag",
    title: "Complex Drag & Drop",
    description: "Coordinating multiple event streams",
    category: "Advanced",
    component: DragAndDrop,
  },
  {
    id: "store",
    title: "Enterprise State Pattern",
    description: "Scaling state management with selectors",
    category: "Advanced",
    component: StateStore,
  },
];
