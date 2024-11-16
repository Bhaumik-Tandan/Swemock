'use client'

import { useState } from 'react'
import { MonitorPlay, Server, Database, Terminal, Brain, Code, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"

const skills = [
  { name: 'Frontend', icon: MonitorPlay },
  { name: 'Backend', icon: Server },
  { name: 'Database', icon: Database },
  { name: 'DevOps', icon: Terminal },
  { name: 'Algorithms', icon: Brain },
  { name: 'System Design', icon: Code },
]

export default function InterviewerSkills() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const handleSubmit = () => {
    if (selectedSkills.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one skill.",
        variant: "destructive",
      })
      return
    }
    
    // Here you would typically send the data to your backend
    console.log('Selected skills:', selectedSkills)
    toast({
      title: "Success",
      description: "Your skills have been updated.",
      icon: <Check className="h-4 w-4" />,
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Set Your Expert Skills</CardTitle>
        <CardDescription>Select the skills you're proficient in for conducting interviews.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill) => {
            const Icon = skill.icon
            return (
              <div key={skill.name} className="flex items-center space-x-2">
                <Checkbox
                  id={skill.name}
                  checked={selectedSkills.includes(skill.name)}
                  onCheckedChange={() => handleSkillToggle(skill.name)}
                />
                <label
                  htmlFor={skill.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {skill.name}
                </label>
              </div>
            )
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Save Skills
        </Button>
      </CardFooter>
    </Card>
  )
}
