'use client'

import { Book } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ContactCardComponent() {
  return (
    <Card className="w-64 bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-pointer">
      <CardContent className="p-4 flex items-center space-x-4">
        <div className="bg-blue-500 p-2 rounded">
          <Book className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold">Select contacts</h3>
          <p className="text-zinc-400 text-sm">Get record data</p>
        </div>
      </CardContent>
    </Card>
  )
}