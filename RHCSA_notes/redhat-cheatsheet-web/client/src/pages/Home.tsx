import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Copy, Check, ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import coursesData, { CommandDemo } from "@/data/cheatsheetData";

export default function Home() {
  const [activeTab, setActiveTab] = useState("RH124");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [expandedCommand, setExpandedCommand] = useState<string | null>(null);

  const currentCourse = coursesData[activeTab as keyof typeof coursesData];

  // Filter commands based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return currentCourse.categories;
    }

    const query = searchQuery.toLowerCase();
    const filtered = currentCourse.categories
      .map((category) => ({
        ...category,
        commands: category.commands.filter(
          (cmd) =>
            cmd.command.toLowerCase().includes(query) ||
            cmd.description.toLowerCase().includes(query) ||
            cmd.example.toLowerCase().includes(query) ||
            cmd.deepExplanation.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.commands.length > 0);

    return filtered;
  }, [searchQuery, activeTab]);

  const copyToClipboard = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    toast.success("Command copied to clipboard!");
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const toggleExpand = (commandName: string) => {
    setExpandedCommand(expandedCommand === commandName ? null : commandName);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div
        className="relative w-full h-96 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://private-us-east-1.manuscdn.com/sessionFile/Kr6wm7X9bJQ2LhW1viMT7u/sandbox/tiOTQy8J8VL2MZ7bKnHT4g-img-1_1770332798000_na1fn_aGVyby10ZXJtaW5hbA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3I2d203WDliSlEyTGhXMXZpTVQ3dS9zYW5kYm94L3RpT1RReThKOFZMMk1aN2JLbkhUNGctaW1nLTFfMTc3MDMzMjc5ODAwMF9uYTFmbl9hR1Z5YnkxMFpYSnRhVzVoYkEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=peb7-uO0XTpAA7p7Ssss4H-Q~4Sg8Z-IRHAJPSXcKdybz-1YxiF-ZKKVdGF59cFJkdowTQx8cUik-LWSY-Mn~MqcP8Wn1G6PvwoNBHWfHCGgzStt~oOiQVDOl7FMmPIvfaZK5JuNgtXdk5Zh-SUSyaL7MpfZYA7bv2dRp7MZEoyeokhm8eXCKcJJj0l3t32w3GfiUfHzXhBT8Ul0Amq6UZJeS7Kviu3LyX3dHcMhCNcaWu2xF0~Luq0DXcMZjw-ThiSsCX-MBMuCA9o~S4JfWnLgSdymH9syGVe0NtHwVekTnrSkN2UF6wKjSgOAHvlr1yDgNEcK4Mn3O2EFBTgXRQ__')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative h-full flex flex-col justify-center px-8 md:px-16">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            Red Hat Certification
          </h1>
          <h2 className="text-2xl md:text-3xl text-foreground/80 font-light">
            Complete Cheat Sheet Reference
          </h2>
          <p className="text-lg text-foreground/60 mt-4 max-w-2xl">
            Comprehensive command reference for RH124, RH134, and RH254 system
            administration courses with deep explanations and visual demonstrations
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search commands, descriptions, or examples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-base bg-card border-border"
            />
          </div>
        </div>

        {/* Course Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card border border-border">
            {Object.entries(coursesData).map(([key, course]) => (
              <TabsTrigger key={key} value={key} className="text-lg font-semibold">
                <div className="flex flex-col items-center">
                  <span>{key}</span>
                  <span className="text-xs text-muted-foreground">{course.subtitle}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(coursesData).map(([courseKey, course]) => (
            <TabsContent key={courseKey} value={courseKey} className="space-y-8">
              {/* Course Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-primary mb-2">{course.title}</h2>
                <p className="text-foreground/70">{course.description}</p>
              </div>

              {/* Categories and Commands */}
              <div className="space-y-8">
                {filteredCategories.length === 0 ? (
                  <Card className="p-8 text-center border-border">
                    <p className="text-foreground/60">
                      No commands found matching your search.
                    </p>
                  </Card>
                ) : (
                  filteredCategories.map((category) => (
                    <div key={category.name} className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-8 rounded-full bg-primary" />
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">
                            {category.name}
                          </h3>
                          <p className="text-sm text-foreground/60">{category.description}</p>
                        </div>
                      </div>

                      <div className="grid gap-4">
                        {category.commands.map((cmd: CommandDemo, idx: number) => (
                          <CommandCard
                            key={idx}
                            cmd={cmd}
                            isExpanded={expandedCommand === cmd.command}
                            onToggleExpand={() => toggleExpand(cmd.command)}
                            onCopy={() => copyToClipboard(cmd.command)}
                            isCopied={copiedCommand === cmd.command}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-foreground/60">
          <p>
            Red Hat Certification Cheat Sheet • RH124, RH134, RH254 Reference Guide
          </p>
          <p className="text-sm mt-2">
            For complete training, refer to official Red Hat documentation
          </p>
        </div>
      </footer>
    </div>
  );
}

interface CommandCardProps {
  cmd: CommandDemo;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onCopy: () => void;
  isCopied: boolean;
}

function CommandCard({
  cmd,
  isExpanded,
  onToggleExpand,
  onCopy,
  isCopied,
}: CommandCardProps) {
  return (
    <Card className="p-6 border-border hover:border-accent/50 transition-all duration-200 hover:shadow-lg hover:shadow-accent/10">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="font-mono text-lg font-semibold text-accent mb-1">
            {cmd.command}
          </div>
          <div className="font-mono text-sm text-muted-foreground bg-background/50 px-3 py-2 rounded border border-border">
            {cmd.syntax}
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={onCopy}
          className="ml-4 text-accent hover:bg-accent/10"
        >
          {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>

      <p className="text-foreground/80 mb-3">{cmd.description}</p>

      <div className="bg-background/50 border border-border rounded p-3 mb-4">
        <p className="text-xs text-muted-foreground mb-1">Example:</p>
        <p className="font-mono text-sm text-foreground">{cmd.example}</p>
      </div>

      {/* Expand/Collapse Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleExpand}
        className="w-full justify-between text-accent hover:bg-accent/10"
      >
        <span>{isExpanded ? "Hide Details" : "Show Deep Explanation & Demo"}</span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 space-y-4 border-t border-border pt-4">
          {/* Deep Explanation */}
          <div>
            <h4 className="font-semibold text-accent mb-2">Deep Explanation</h4>
            <p className="text-foreground/80 text-sm leading-relaxed">
              {cmd.deepExplanation}
            </p>
          </div>

          {/* Demo Image */}
          {cmd.demoImage && (
            <div>
              <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Command Demonstration
              </h4>
              <div className="bg-background/50 border border-border rounded overflow-hidden">
                <img
                  src={cmd.demoImage}
                  alt={`${cmd.command} demonstration`}
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}

          {/* Common Errors */}
          {cmd.commonErrors && cmd.commonErrors.length > 0 && (
            <div>
              <h4 className="font-semibold text-accent mb-2">Common Errors</h4>
              <ul className="space-y-1">
                {cmd.commonErrors.map((error, idx) => (
                  <li key={idx} className="text-sm text-foreground/70 flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Commands */}
          {cmd.relatedCommands && cmd.relatedCommands.length > 0 && (
            <div>
              <h4 className="font-semibold text-accent mb-2">Related Commands</h4>
              <div className="flex flex-wrap gap-2">
                {cmd.relatedCommands.map((relCmd, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-sm bg-accent/10 text-accent px-2 py-1 rounded border border-accent/20"
                  >
                    {relCmd}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
