export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          name: string | null
          avatar_url: string | null
          email: string
          theme: "dark" | "light" | "system"
          notifications_enabled: boolean
          public_profile: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          name?: string | null
          avatar_url?: string | null
          email: string
          theme?: "dark" | "light" | "system"
          notifications_enabled?: boolean
          public_profile?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          name?: string | null
          avatar_url?: string | null
          email?: string
          theme?: "dark" | "light" | "system"
          notifications_enabled?: boolean
          public_profile?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      ship_scores: {
        Row: {
          id: string
          user_id: string
          total: number
          commits: number
          launches: number
          revenue: number
          growth: number
          current_streak: number
          longest_streak: number
          last_activity_date: string | null
          is_on_fire: boolean
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total?: number
          commits?: number
          launches?: number
          revenue?: number
          growth?: number
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string | null
          is_on_fire?: boolean
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total?: number
          commits?: number
          launches?: number
          revenue?: number
          growth?: number
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string | null
          is_on_fire?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ship_scores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      global_ranks: {
        Row: {
          id: string
          user_id: string
          position: number
          total_users: number
          percentile: number
          tier: "diamond" | "gold" | "silver" | "bronze"
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          position?: number
          total_users?: number
          percentile?: number
          tier?: "diamond" | "gold" | "silver" | "bronze"
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          position?: number
          total_users?: number
          percentile?: number
          tier?: "diamond" | "gold" | "silver" | "bronze"
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "global_ranks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string
          url: string | null
          status: "idea" | "validating" | "building" | "live" | "paused"
          mrr: number
          users: number
          growth: number
          velocity: number
          last_commit_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description: string
          url?: string | null
          status?: "idea" | "validating" | "building" | "live" | "paused"
          mrr?: number
          users?: number
          growth?: number
          velocity?: number
          last_commit_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string
          url?: string | null
          status?: "idea" | "validating" | "building" | "live" | "paused"
          mrr?: number
          users?: number
          growth?: number
          velocity?: number
          last_commit_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      milestones: {
        Row: {
          id: string
          project_id: string
          title: string
          description: string | null
          completed: boolean
          completed_at: string | null
          order: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          title: string
          description?: string | null
          completed?: boolean
          completed_at?: string | null
          order?: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          title?: string
          description?: string | null
          completed?: boolean
          completed_at?: string | null
          order?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      launch_platform_status: {
        Row: {
          id: string
          project_id: string
          platform: "product_hunt" | "indie_hackers" | "hacker_news" | "reddit" | "twitter"
          status: "not_started" | "in_progress" | "ready" | "launched"
          progress: number
          launch_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          platform: "product_hunt" | "indie_hackers" | "hacker_news" | "reddit" | "twitter"
          status?: "not_started" | "in_progress" | "ready" | "launched"
          progress?: number
          launch_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          platform?: "product_hunt" | "indie_hackers" | "hacker_news" | "reddit" | "twitter"
          status?: "not_started" | "in_progress" | "ready" | "launched"
          progress?: number
          launch_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "launch_platform_status_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      checklist_items: {
        Row: {
          id: string
          launch_platform_id: string
          label: string
          completed: boolean
          required: boolean
          order: number
        }
        Insert: {
          id?: string
          launch_platform_id: string
          label: string
          completed?: boolean
          required?: boolean
          order?: number
        }
        Update: {
          id?: string
          launch_platform_id?: string
          label?: string
          completed?: boolean
          required?: boolean
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "checklist_items_launch_platform_id_fkey"
            columns: ["launch_platform_id"]
            isOneToOne: false
            referencedRelation: "launch_platform_status"
            referencedColumns: ["id"]
          }
        ]
      }
      ideas: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          demand: number
          competition: number
          feasibility: number
          overall: number
          status: "pending" | "validated" | "rejected" | "needs_research"
          notes: string | null
          converted_to_project_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          demand?: number
          competition?: number
          feasibility?: number
          overall?: number
          status?: "pending" | "validated" | "rejected" | "needs_research"
          notes?: string | null
          converted_to_project_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          demand?: number
          competition?: number
          feasibility?: number
          overall?: number
          status?: "pending" | "validated" | "rejected" | "needs_research"
          notes?: string | null
          converted_to_project_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ideas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ideas_converted_to_project_id_fkey"
            columns: ["converted_to_project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      smart_goals: {
        Row: {
          id: string
          user_id: string
          project_id: string
          title: string
          description: string
          specific: string
          measurable_target: number
          measurable_current: number
          measurable_unit: string
          achievable: string
          relevant: string
          start_date: string
          due_date: string
          status: "active" | "on_track" | "at_risk" | "completed" | "failed"
          progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          title: string
          description: string
          specific: string
          measurable_target?: number
          measurable_current?: number
          measurable_unit?: string
          achievable: string
          relevant: string
          start_date: string
          due_date: string
          status?: "active" | "on_track" | "at_risk" | "completed" | "failed"
          progress?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string
          title?: string
          description?: string
          specific?: string
          measurable_target?: number
          measurable_current?: number
          measurable_unit?: string
          achievable?: string
          relevant?: string
          start_date?: string
          due_date?: string
          status?: "active" | "on_track" | "at_risk" | "completed" | "failed"
          progress?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "smart_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "smart_goals_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      goal_milestones: {
        Row: {
          id: string
          goal_id: string
          label: string
          target_value: number
          completed: boolean
          completed_at: string | null
          order: number
        }
        Insert: {
          id?: string
          goal_id: string
          label: string
          target_value?: number
          completed?: boolean
          completed_at?: string | null
          order?: number
        }
        Update: {
          id?: string
          goal_id?: string
          label?: string
          target_value?: number
          completed?: boolean
          completed_at?: string | null
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "goal_milestones_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "smart_goals"
            referencedColumns: ["id"]
          }
        ]
      }
      accountability_checkins: {
        Row: {
          id: string
          goal_id: string
          date: string
          progress_note: string
          blockers: string | null
          next_steps: string
          created_at: string
        }
        Insert: {
          id?: string
          goal_id: string
          date: string
          progress_note: string
          blockers?: string | null
          next_steps: string
          created_at?: string
        }
        Update: {
          id?: string
          goal_id?: string
          date?: string
          progress_note?: string
          blockers?: string | null
          next_steps?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "accountability_checkins_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "smart_goals"
            referencedColumns: ["id"]
          }
        ]
      }
      financial_health: {
        Row: {
          id: string
          user_id: string
          project_id: string
          health_score: number
          runway: number
          mrr: number
          monthly_expenses: number
          growth_rate: number
          cash_on_hand: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          health_score?: number
          runway?: number
          mrr?: number
          monthly_expenses?: number
          growth_rate?: number
          cash_on_hand?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string
          health_score?: number
          runway?: number
          mrr?: number
          monthly_expenses?: number
          growth_rate?: number
          cash_on_hand?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_health_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_health_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      financial_metrics: {
        Row: {
          id: string
          financial_health_id: string
          category: "revenue" | "expenses" | "runway" | "growth"
          name: string
          value: number
          previous_value: number | null
          unit: "currency" | "percentage" | "months"
          updated_at: string
        }
        Insert: {
          id?: string
          financial_health_id: string
          category: "revenue" | "expenses" | "runway" | "growth"
          name: string
          value?: number
          previous_value?: number | null
          unit?: "currency" | "percentage" | "months"
          updated_at?: string
        }
        Update: {
          id?: string
          financial_health_id?: string
          category?: "revenue" | "expenses" | "runway" | "growth"
          name?: string
          value?: number
          previous_value?: number | null
          unit?: "currency" | "percentage" | "months"
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_metrics_financial_health_id_fkey"
            columns: ["financial_health_id"]
            isOneToOne: false
            referencedRelation: "financial_health"
            referencedColumns: ["id"]
          }
        ]
      }
      customer_feedback: {
        Row: {
          id: string
          user_id: string
          project_id: string
          source: "email" | "twitter" | "chat" | "survey" | "review" | "support"
          sentiment: "positive" | "neutral" | "negative"
          category: "feature_request" | "bug_report" | "praise" | "complaint" | "question"
          status: "new" | "reviewed" | "actionable" | "resolved" | "archived"
          content: string
          customer_name: string | null
          customer_email: string | null
          tags: string[]
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          source: "email" | "twitter" | "chat" | "survey" | "review" | "support"
          sentiment?: "positive" | "neutral" | "negative"
          category: "feature_request" | "bug_report" | "praise" | "complaint" | "question"
          status?: "new" | "reviewed" | "actionable" | "resolved" | "archived"
          content: string
          customer_name?: string | null
          customer_email?: string | null
          tags?: string[]
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string
          source?: "email" | "twitter" | "chat" | "survey" | "review" | "support"
          sentiment?: "positive" | "neutral" | "negative"
          category?: "feature_request" | "bug_report" | "praise" | "complaint" | "question"
          status?: "new" | "reviewed" | "actionable" | "resolved" | "archived"
          content?: string
          customer_name?: string | null
          customer_email?: string | null
          tags?: string[]
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_feedback_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      directory_submissions: {
        Row: {
          id: string
          user_id: string
          project_id: string
          directory: string
          status: "not_started" | "preparing" | "submitted" | "in_review" | "approved" | "live" | "rejected"
          progress: number
          submission_url: string | null
          listing_url: string | null
          submitted_at: string | null
          approved_at: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          directory: string
          status?: "not_started" | "preparing" | "submitted" | "in_review" | "approved" | "live" | "rejected"
          progress?: number
          submission_url?: string | null
          listing_url?: string | null
          submitted_at?: string | null
          approved_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string
          directory?: string
          status?: "not_started" | "preparing" | "submitted" | "in_review" | "approved" | "live" | "rejected"
          progress?: number
          submission_url?: string | null
          listing_url?: string | null
          submitted_at?: string | null
          approved_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "directory_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "directory_submissions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      directory_requirements: {
        Row: {
          id: string
          submission_id: string
          label: string
          completed: boolean
          required: boolean
          order: number
        }
        Insert: {
          id?: string
          submission_id: string
          label: string
          completed?: boolean
          required?: boolean
          order?: number
        }
        Update: {
          id?: string
          submission_id?: string
          label?: string
          completed?: boolean
          required?: boolean
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "directory_requirements_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "directory_submissions"
            referencedColumns: ["id"]
          }
        ]
      }
      public_posts: {
        Row: {
          id: string
          user_id: string
          project_id: string
          platform: "twitter" | "linkedin" | "indiehackers" | "reddit" | "blog"
          type: "milestone" | "lesson" | "metrics" | "behind_scenes" | "question"
          status: "draft" | "scheduled" | "published" | "failed"
          title: string | null
          content: string
          scheduled_for: string | null
          published_at: string | null
          likes: number
          comments: number
          shares: number
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          platform: "twitter" | "linkedin" | "indiehackers" | "reddit" | "blog"
          type?: "milestone" | "lesson" | "metrics" | "behind_scenes" | "question"
          status?: "draft" | "scheduled" | "published" | "failed"
          title?: string | null
          content: string
          scheduled_for?: string | null
          published_at?: string | null
          likes?: number
          comments?: number
          shares?: number
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string
          platform?: "twitter" | "linkedin" | "indiehackers" | "reddit" | "blog"
          type?: "milestone" | "lesson" | "metrics" | "behind_scenes" | "question"
          status?: "draft" | "scheduled" | "published" | "failed"
          title?: string | null
          content?: string
          scheduled_for?: string | null
          published_at?: string | null
          likes?: number
          comments?: number
          shares?: number
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_posts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      pricing_experiments: {
        Row: {
          id: string
          user_id: string
          project_id: string
          name: string
          description: string | null
          status: "draft" | "running" | "paused" | "completed" | "winner_declared"
          start_date: string | null
          end_date: string | null
          winning_variant_id: string | null
          minimum_sample_size: number
          confidence_level: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          name: string
          description?: string | null
          status?: "draft" | "running" | "paused" | "completed" | "winner_declared"
          start_date?: string | null
          end_date?: string | null
          winning_variant_id?: string | null
          minimum_sample_size?: number
          confidence_level?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string
          name?: string
          description?: string | null
          status?: "draft" | "running" | "paused" | "completed" | "winner_declared"
          start_date?: string | null
          end_date?: string | null
          winning_variant_id?: string | null
          minimum_sample_size?: number
          confidence_level?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pricing_experiments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pricing_experiments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      price_variants: {
        Row: {
          id: string
          experiment_id: string
          name: string
          price: number
          features: string[]
          visitors: number
          conversions: number
          revenue: number
          order: number
        }
        Insert: {
          id?: string
          experiment_id: string
          name: string
          price?: number
          features?: string[]
          visitors?: number
          conversions?: number
          revenue?: number
          order?: number
        }
        Update: {
          id?: string
          experiment_id?: string
          name?: string
          price?: number
          features?: string[]
          visitors?: number
          conversions?: number
          revenue?: number
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "price_variants_experiment_id_fkey"
            columns: ["experiment_id"]
            isOneToOne: false
            referencedRelation: "pricing_experiments"
            referencedColumns: ["id"]
          }
        ]
      }
      activity_items: {
        Row: {
          id: string
          user_id: string
          type: "commit" | "revenue" | "signup" | "launch" | "milestone" | "idea_validated"
          title: string
          description: string | null
          project_id: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: "commit" | "revenue" | "signup" | "launch" | "milestone" | "idea_validated"
          title: string
          description?: string | null
          project_id?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: "commit" | "revenue" | "signup" | "launch" | "milestone" | "idea_validated"
          title?: string
          description?: string | null
          project_id?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_items_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      waitlist: {
        Row: {
          id: string
          email: string
          source: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          source?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          source?: string | null
          created_at?: string
        }
        Relationships: []
      }
      analytics_snapshots: {
        Row: {
          id: string
          user_id: string
          project_id: string
          date: string
          mrr: number
          users: number
          growth: number
          revenue: number
          visitors: number
          conversions: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          date: string
          mrr?: number
          users?: number
          growth?: number
          revenue?: number
          visitors?: number
          conversions?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string
          date?: string
          mrr?: number
          users?: number
          growth?: number
          revenue?: number
          visitors?: number
          conversions?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_snapshots_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_snapshots_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for easier usage
export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"]
export type InsertTables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"]
export type UpdateTables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"]

// Specific table row types for convenience
export type Profile = Tables<"profiles">
export type ShipScoreRow = Tables<"ship_scores">
export type GlobalRankRow = Tables<"global_ranks">
export type ProjectRow = Tables<"projects">
export type MilestoneRow = Tables<"milestones">
export type LaunchPlatformStatusRow = Tables<"launch_platform_status">
export type ChecklistItemRow = Tables<"checklist_items">
export type IdeaRow = Tables<"ideas">
export type SmartGoalRow = Tables<"smart_goals">
export type GoalMilestoneRow = Tables<"goal_milestones">
export type AccountabilityCheckinRow = Tables<"accountability_checkins">
export type FinancialHealthRow = Tables<"financial_health">
export type FinancialMetricRow = Tables<"financial_metrics">
export type CustomerFeedbackRow = Tables<"customer_feedback">
export type DirectorySubmissionRow = Tables<"directory_submissions">
export type DirectoryRequirementRow = Tables<"directory_requirements">
export type PublicPostRow = Tables<"public_posts">
export type PricingExperimentRow = Tables<"pricing_experiments">
export type PriceVariantRow = Tables<"price_variants">
export type ActivityItemRow = Tables<"activity_items">
export type WaitlistRow = Tables<"waitlist">
export type AnalyticsSnapshotRow = Tables<"analytics_snapshots">
