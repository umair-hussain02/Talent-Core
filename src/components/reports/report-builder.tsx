"use client"

import { useState } from "react"
import type { ReportTemplate, ReportParameter } from "@/types/report"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, BarChart3, Play, Save, X } from "lucide-react"

interface ReportBuilderProps {
  templates: ReportTemplate[]
  onCreateReport?: (reportData: Record<string, any>) => void // error in this line
}

export function ReportBuilder({ templates, onCreateReport }: ReportBuilderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null)
  const [reportName, setReportName] = useState("")
  const [reportDescription, setReportDescription] = useState("")
  const [parameters, setParameters] = useState<Record<string, string | number | boolean | null>>({})

  const handleTemplateSelect = (template: ReportTemplate) => {
    setSelectedTemplate(template)
    setReportName(`${template.name} - ${new Date().toLocaleDateString()}`)
    setReportDescription(template.description)

    const defaultParams: Record<string, string | number | boolean | null> = {}
    template.parameters.forEach((param) => {
      if (param.defaultValue !== undefined) {
        defaultParams[param.name] = param.defaultValue // and in this line
      }
    })
    setParameters(defaultParams)
  }

  const handleParameterChange = (paramName: string, value: string | number | boolean | null) => {
    setParameters((prev) => ({
      ...prev,
      [paramName]: value,
    }))
  }

  const handleCreateReport = () => {
    if (!selectedTemplate) return

    const reportData = {
      name: reportName,
      description: reportDescription,
      templateId: selectedTemplate.id,
      parameters,
      category: selectedTemplate.category,
    }

    onCreateReport?.(reportData)
    setIsOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setSelectedTemplate(null)
    setReportName("")
    setReportDescription("")
    setParameters({})
  }

  const renderParameterInput = (param: ReportParameter) => {
    switch (param.type) {
      case "text":
        return (
          <Input
            value={(parameters[param.name] as string) || ""}
            onChange={(e) => handleParameterChange(param.name, e.target.value)}
            placeholder={`Enter ${param.label.toLowerCase()}`}
          />
        )
      case "number":
        return (
          <Input
            type="number"
            value={parameters[param.name]?.toString() || ""}
            onChange={(e) => handleParameterChange(param.name, Number(e.target.value))}
            placeholder={`Enter ${param.label.toLowerCase()}`}
          />
        )
      case "select":
        return (
          <Select
            value={(parameters[param.name] as string | number | boolean | null)?.toString() || ""}
            onValueChange={(value) => handleParameterChange(param.name, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${param.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {param.options?.map((option) => (
                <SelectItem key={option.value?.toString()} value={option.value?.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "boolean":
        return (
          <Select
            value={parameters[param.name]?.toString() || ""}
            onValueChange={(value) => handleParameterChange(param.name, value === "true")}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${param.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        )
      case "date":
        return (
          <Input
            type="date"
            value={(parameters[param.name] as string) || ""}
            onChange={(e) => handleParameterChange(param.name, e.target.value)}
          />
        )
      default:
        return (
          <Input
            value={(parameters[param.name] as string) || ""}
            onChange={(e) => handleParameterChange(param.name, e.target.value)}
            placeholder={`Enter ${param.label.toLowerCase()}`}
          />
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Report</DialogTitle>
          <DialogDescription>Choose a template and configure parameters to create your report.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!selectedTemplate ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose a Template</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <BarChart3 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          {template.isPopular && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{template.category}</span>
                        <span>{template.parameters.length} parameters</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedTemplate.name}</h3>
                    <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedTemplate(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reportName">Report Name</Label>
                    <Input
                      id="reportName"
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                      placeholder="Enter report name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reportDescription">Description</Label>
                    <Textarea
                      id="reportDescription"
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      placeholder="Enter report description"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Parameters</h4>
                  {selectedTemplate.parameters.length > 0 ? (
                    selectedTemplate.parameters.map((param) => (
                      <div key={param.id}>
                        <Label htmlFor={param.name}>
                          {param.label}
                          {param.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        {renderParameterInput(param)}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No parameters required for this template.</p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button variant="outline" onClick={handleCreateReport}>
                  <Save className="h-4 w-4 mr-2" />
                  Save as Draft
                </Button>
                <Button onClick={handleCreateReport}>
                  <Play className="h-4 w-4 mr-2" />
                  Create & Run
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
