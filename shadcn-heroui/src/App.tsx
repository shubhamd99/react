import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShadcnExamples } from "./components/ShadcnExamples.tsx"
import { HeroUIExamples } from "./components/HeroUIExamples.tsx"
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">UI Components Playground</h1>
          <p className="text-muted-foreground text-lg">
            A comprehensive showcase of Shadcn UI and HeroUI components.
          </p>
        </div>

        <Tabs defaultValue="shadcn" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-8">
            <TabsTrigger value="shadcn">Shadcn UI</TabsTrigger>
            <TabsTrigger value="heroui">HeroUI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="shadcn" className="mt-0">
            <ShadcnExamples />
          </TabsContent>
          
          <TabsContent value="heroui" className="mt-0">
            <HeroUIExamples />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App
