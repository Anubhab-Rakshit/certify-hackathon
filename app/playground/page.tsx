"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Code, Copy, Eye, Sparkles } from "lucide-react"
import Image from "next/image"

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState("alt-text")
  const [showOriginal, setShowOriginal] = useState(true)

  const examples = {
    "alt-text": {
      title: "Image Alt Text",
      description: "Screen readers rely on alt text to describe images to users who cannot see them.",
      original: {
        code: '<img src="/product.jpg" class="product-image">',
        preview: "/placeholder.svg?height=300&width=500&query=product%20image%20without%20alt%20text",
      },
      fixed: {
        code: '<img src="/product.jpg" class="product-image" alt="Red running shoes with white soles and black laces">',
        preview: "/placeholder.svg?height=300&width=500&query=product%20image%20with%20alt%20text",
      },
      screenReaderOutput: {
        original: "image",
        fixed: "Red running shoes with white soles and black laces, image",
      },
    },
    "color-contrast": {
      title: "Color Contrast",
      description: "Text must have sufficient contrast with its background to be readable by users with low vision.",
      original: {
        code: '<div style="background-color: #f0f0f0;">\n  <p style="color: #a0a0a0; font-size: 16px;">This text has poor contrast with its background.</p>\n</div>',
        preview: "/placeholder.svg?height=300&width=500&query=text%20with%20poor%20contrast",
      },
      fixed: {
        code: '<div style="background-color: #f0f0f0;">\n  <p style="color: #505050; font-size: 16px;">This text has good contrast with its background.</p>\n</div>',
        preview: "/placeholder.svg?height=300&width=500&query=text%20with%20good%20contrast",
      },
    },
    "form-labels": {
      title: "Form Labels",
      description: "Form inputs must have associated labels to help screen reader users understand their purpose.",
      original: {
        code: '<input type="text" id="name" placeholder="Enter your name">',
        preview: "/placeholder.svg?height=300&width=500&query=form%20input%20without%20label",
      },
      fixed: {
        code: '<label for="name">Name</label>\n<input type="text" id="name" placeholder="Enter your name">',
        preview: "/placeholder.svg?height=300&width=500&query=form%20input%20with%20label",
      },
      screenReaderOutput: {
        original: "edit text",
        fixed: "Name, edit text",
      },
    },
    "keyboard-navigation": {
      title: "Keyboard Navigation",
      description: "All interactive elements must be accessible via keyboard for users who cannot use a mouse.",
      original: {
        code: '<div onclick="alert(\'Clicked!\')" class="clickable-div">\n  Click me\n</div>',
        preview: "/placeholder.svg?height=300&width=500&query=non-keyboard%20accessible%20element",
      },
      fixed: {
        code: '<button onclick="alert(\'Clicked!\')" class="clickable-button">\n  Click me\n</button>',
        preview: "/placeholder.svg?height=300&width=500&query=keyboard%20accessible%20button",
      },
    },
  }

  const currentExample = examples[activeTab as keyof typeof examples]

  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Interactive Learning</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">Accessibility Playground</h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore common accessibility issues and see how to fix them with these interactive examples.
            </p>
          </div>

          <div className="bg-background rounded-xl border shadow-sm overflow-hidden mb-12">
            <div className="p-6 border-b">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="alt-text">Alt Text</TabsTrigger>
                  <TabsTrigger value="color-contrast">Color Contrast</TabsTrigger>
                  <TabsTrigger value="form-labels">Form Labels</TabsTrigger>
                  <TabsTrigger value="keyboard-navigation">Keyboard Navigation</TabsTrigger>
                </TabsList>

                <div className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">{currentExample.title}</h2>
                      <p className="text-muted-foreground">{currentExample.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={showOriginal ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowOriginal(true)}
                      >
                        Original
                      </Button>
                      <Button
                        variant={!showOriginal ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowOriginal(false)}
                      >
                        Accessible
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Code</h3>
                      <div className="relative bg-accent/50 rounded-lg p-4 border">
                        <pre className="text-sm overflow-x-auto">
                          <code>{showOriginal ? currentExample.original.code : currentExample.fixed.code}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              showOriginal ? currentExample.original.code : currentExample.fixed.code,
                            )
                          }
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy code</span>
                        </Button>
                      </div>

                      {currentExample.screenReaderOutput && (
                        <div className="bg-accent/50 rounded-lg p-4 border">
                          <h3 className="font-medium mb-2 flex items-center gap-2">
                            <Eye className="h-4 w-4" /> Screen Reader Output
                          </h3>
                          <div className="bg-background rounded p-3 text-sm">
                            {showOriginal
                              ? currentExample.screenReaderOutput.original
                              : currentExample.screenReaderOutput.fixed}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Preview</h3>
                      <div className="bg-accent/50 rounded-lg p-4 border h-[300px] flex items-center justify-center">
                        <motion.div
                          key={showOriginal ? "original" : "fixed"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={showOriginal ? currentExample.original.preview : currentExample.fixed.preview}
                            alt={`${currentExample.title} ${showOriginal ? "original" : "accessible"} example`}
                            width={500}
                            height={300}
                            className="rounded-md border shadow-sm"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs>
            </div>

            <div className="p-6 bg-accent/50 border-t">
              <div className="flex items-center gap-3">
                <Code className="h-5 w-5 text-primary" />
                <p className="text-sm">
                  <span className="font-medium">Pro Tip:</span> Toggle between Original and Accessible to see the
                  differences.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Check Your Website?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Use our AI-powered accessibility analyzer to identify and fix accessibility issues on your website.
            </p>
            <Button size="lg" asChild>
              <a href="/analyze">Analyze Your Website</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
