"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Employee } from "@/types/employee"

interface OrgChartProps {
  employees: Employee[]
  onEmployeeClick?: (employee: Employee) => void
}

interface OrgNode {
  employee: Employee
  children: OrgNode[]
}

export function OrgChart({ employees, onEmployeeClick }: OrgChartProps) {
  // Build the org chart tree
  const buildOrgTree = (): OrgNode[] => {
    const employeeMap = new Map<string, Employee>()
    employees.forEach((emp) => employeeMap.set(emp.id, emp))

    const nodes: OrgNode[] = []
    const childrenMap = new Map<string, OrgNode[]>()

    // Initialize all nodes with empty children arrays
    employees.forEach((emp) => {
      childrenMap.set(emp.id, [])
    })

    // Populate children arrays
    employees.forEach((emp) => {
      if (emp.manager) {
        const children = childrenMap.get(emp.manager) || []
        children.push({ employee: emp, children: childrenMap.get(emp.id) || [] })
        childrenMap.set(emp.manager, children)
      }
    })

    // Find root nodes (employees without managers)
    employees
      .filter((emp) => !emp.manager)
      .forEach((rootEmp) => {
        nodes.push({
          employee: rootEmp,
          children: childrenMap.get(rootEmp.id) || [],
        })
      })

    return nodes
  }

  const orgTree = buildOrgTree()

  return (
    <div className="space-y-4">
      {orgTree.map((node) => (
        <OrgChartNode key={node.employee.id} node={node} level={0} onEmployeeClick={onEmployeeClick} />
      ))}
    </div>
  )
}

interface OrgChartNodeProps {
  node: OrgNode
  level: number
  onEmployeeClick?: (employee: Employee) => void
}

function OrgChartNode({ node, level, onEmployeeClick }: OrgChartNodeProps) {
  const [expanded, setExpanded] = useState(level < 1)
  const hasChildren = node.children.length > 0

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded(!expanded)
  }

  return (
    <div className="org-chart-node">
      <Card
        className={`hover:shadow-md transition-all duration-200 cursor-pointer ${
          level === 0 ? "border-l-4 border-l-purple-500" : ""
        }`}
        onClick={() => onEmployeeClick?.(node.employee)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={node.employee.avatar || "/placeholder.svg"} alt={node.employee.name} />
                <AvatarFallback>{getInitials(node.employee.name)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-gray-900">{node.employee.name}</h3>
                <p className="text-sm text-gray-500">{node.employee.position}</p>
              </div>
            </div>
            {hasChildren && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleExpanded}>
                {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {expanded && hasChildren && (
        <div className="pl-8 mt-2 space-y-2 border-l border-gray-200 ml-5">
          {node.children.map((childNode) => (
            <OrgChartNode
              key={childNode.employee.id}
              node={childNode}
              level={level + 1}
              onEmployeeClick={onEmployeeClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}
