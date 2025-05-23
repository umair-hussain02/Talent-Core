export interface Referral {
  id: string
  referredPerson: {
    name: string
    email: string
    phone?: string
    linkedin?: string
    resume?: string
    avatar?: string
  }
  referrer: {
    id: string
    name: string
    email: string
    department: string
    position: string
    avatar?: string
  }
  jobId?: string
  jobTitle?: string
  status: "new" | "contacted" | "interviewing" | "hired" | "rejected" | "withdrawn"
  dateReferred: string
  dateContacted?: string
  dateStatusUpdated?: string
  notes?: string
  candidateId?: string // If the referral has been converted to a candidate
  bonus?: {
    amount: number
    status: "pending" | "approved" | "paid" | "denied"
    datePaid?: string
  }
  source?: string
  tags?: string[]
  isHighPriority?: boolean
}

export interface ReferralStats {
  total: number
  new: number
  contacted: number
  interviewing: number
  hired: number
  rejected: number
  withdrawn: number
  conversionRate: number
  averageTimeToHire: number
  totalBonusesPaid: number
  pendingBonuses: number
}
