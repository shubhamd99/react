export type ExampleCategory = "Basic" | "Intermediate" | "Advanced";

export interface RxJSExample {
  id: string;
  title: string;
  description: string;
  category: ExampleCategory;
  component: React.ComponentType;
}
