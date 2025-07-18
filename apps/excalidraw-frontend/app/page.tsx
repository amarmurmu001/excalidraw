import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Pencil, Share2, Users2, Sparkles, Github, Download } from "lucide-react";
import Link from "next/link";

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center rounded-full border bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm">
              <span className="text-primary">✨ New:</span>
              <span className="ml-2 text-muted-foreground">Real-time collaboration is now live</span>
            </div>
            <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
              Collaborative Whiteboarding
              <span className="block text-primary">Made Simple</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Create, collaborate, and share beautiful diagrams and sketches with our intuitive drawing tool. 
              Join thousands of teams already using our platform.
            </p>
            <div className="mt-12 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                Start Drawing
                <Pencil className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Everything you need to collaborate
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features that help your team work better together
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-primary rounded-3xl p-12 sm:p-20">
            <div className="absolute inset-0  opacity-50"></div>
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Ready to start creating?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-white/90">
                Join thousands of users who are already creating amazing diagrams and sketches.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg" variant="outline" className="h-12 px-8">
                  Start for Free
                  <Pencil className="ml-2 h-4 w-4" />
                </Button>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: <Share2 className="h-6 w-6 text-primary" />,
    title: "Real-time Collaboration",
    description: "Work together with your team in real-time. Share your drawings instantly with a simple link."
  },
  {
    icon: <Users2 className="h-6 w-6 text-primary" />,
    title: "Multiplayer Editing",
    description: "Multiple users can edit the same canvas simultaneously. See who's drawing what in real-time."
  },
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: "Smart Drawing",
    description: "Intelligent shape recognition and drawing assistance helps you create perfect diagrams."
  }
];

export default App;